const path = require('path')
const fs = require('fs')

// Generate pages object
const pages = {}

function getEntryFile (entryPath) {
  const files = fs.readdirSync(entryPath)
  return files
}
function getFileExtension (filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}
getEntryFile(path.resolve('src/entry')).forEach((name) => {
  const fileExtension = getFileExtension(name)
  const fileName = name.replace('.' + fileExtension, '')
  pages[fileName] = {
    entry: `src/entry/${name}`,
    template: 'public/index.html',
    filename: `${fileName}.html`
  }
})
getEntryFile(path.resolve('src/inject')).forEach((name) => {
  const fileExtension = getFileExtension(name)
  const fileName = name.replace('.' + fileExtension, '')
  pages['inject/' + fileName] = `src/inject/${name}`
})

pages['inject/fonts'] = 'src/assets/style/fonts.css'

const isDevMode = process.env.NODE_ENV === 'development'
const installType = process.env.INSTALL_TYPE || process.env.NODE_ENV

module.exports = {
  pages,
  assetsDir: 'extension-static',
  filenameHashing: false,
  chainWebpack: (config) => {
    Object.keys(pages).forEach(page => {
      if (page === 'popup') return
      config.plugins.delete(`html-${page}`)
    })
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: path.resolve('src/manifest.json'),
            to: `${path.resolve('dist')}/manifest.json`
          },
          {
            from: path.resolve('public/'),
            to: `${path.resolve('dist')}/`
          }
        ]
      }
    ])
    !isDevMode && config.plugin('zip').use(require('zip-webpack-plugin'), [
      {
        path: `${path.resolve('')}/pack`,
        filename: `my-extension-${installType}.zip`
      }
    ])
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'my-icon-[name]',
        spriteModule: require.resolve('./browser-sprite')
      })
      .end()
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    resolve: {
      alias: {
        'view-design': '@/view-design/src'
      }
    },
    devtool: isDevMode ? 'inline-source-map' : false
  },
  css: {
    extract: {
      filename: '[name].css',
      chunkFilename: '[name].css'
    },
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
}
