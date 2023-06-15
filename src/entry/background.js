chrome.runtime.onMessage.addListener(() => true)

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  try {
    if (message?.type?.startsWith('FETCH_CORS_API')) {
      const res = await fetch(message.value?.url, {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
        ...(message.value?.options || {})
      })
      const json = await res.json()
      sendResponse(json)
    }

    if (message?.type?.startsWith('GET_COOKIE')) {
      const cookie = await chrome.cookies.get(message.value)
      sendResponse(cookie)
    }
  } catch (err) {
    sendResponse({ type: 'Error', message: err.message, cause: err.cause })
  }

  return true
})

chrome.runtime.onInstalled.addListener(async details => {
  const url = chrome.runtime.getURL('')
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [{
      id: 1,
      priority: 1,
      condition: {
        regexFilter: '^https?:\\/\\/[^/]+\\/(extension-static\\/[\\S]+)$'
      },
      action: {
        type: 'redirect',
        redirect: {
          regexSubstitution: url + '\\1'
        }
      }
    }]
  })
})
