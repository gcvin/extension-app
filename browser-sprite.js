import BrowserSprite from 'svg-baker-runtime/src/browser-sprite'
import domready from 'domready'

const spriteNodeId = '__EH_SVG_SPRITE_NODE__'
const spriteGlobalVarName = '__EH_SVG_SPRITE__'
const isSpriteExists = !!window[spriteGlobalVarName]

let sprite

if (isSpriteExists) {
  sprite = window[spriteGlobalVarName]
} else {
  sprite = new BrowserSprite({
    attrs: {
      id: spriteNodeId,
      'aria-hidden': 'true'
    }
  })
  window[spriteGlobalVarName] = sprite
}

const root = document.getElementById('content-host')?.shadowRoot || document.body

const loadSprite = () => {
  const existing = root.querySelector('#' + spriteNodeId)

  if (existing) {
    sprite.attach(existing)
  } else {
    sprite.mount(root, true)
  }
}

if (root) {
  loadSprite()
} else {
  domready(loadSprite)
}

export default sprite
