window.addEventListener('message', async event => {
  if (!event.data?.type?.endsWith('_RES')) {
    const response = await chrome.runtime.sendMessage({
      type: event.data?.type,
      value: event.data?.value
    })
    let error, cause
    let value = response
    if (response?.type === 'Error') {
      error = response.message
      cause = response.cause
      value = null
    }
    window.postMessage({ type: event.data?.type + '_RES', value, error, cause })
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const contentHost = document.createElement('div')
  contentHost.id = 'content-host'
  const contentRoot = contentHost.attachShadow({ mode: 'open' })

  const contentFont = document.createElement('link')
  contentFont.rel = 'stylesheet'
  contentFont.href = chrome.runtime.getURL('inject/fonts.css')
  document.head.appendChild(contentFont)

  const contentStyle = document.createElement('style')
  contentStyle.innerText = '#content-app{display:none}'
  contentRoot.appendChild(contentStyle)

  const contentCss = document.createElement('link')
  contentCss.rel = 'stylesheet'
  contentCss.href = chrome.runtime.getURL('inject/content-main.css')
  contentRoot.appendChild(contentCss)

  const contentMain = document.createElement('script')
  contentMain.defer = true
  contentMain.src = chrome.runtime.getURL('inject/content-main.js')
  contentRoot.appendChild(contentMain)

  const contentApp = document.createElement('div')
  contentApp.id = 'content-app'
  contentRoot.appendChild(contentApp)

  !document.getElementById('content-host') && document.body.appendChild(contentHost)
})
