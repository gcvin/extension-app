// 后台发送消息到content
export const sendMessageBackToContent = async (message) => {
  const tabs = await chrome.tabs.query({ pinned: false })
  if (!tabs.length) throw new Error('can not find the tab')
  let tab = tabs.find(tab => !tab.url.startsWith('chrome://') && tab.active)
  if (!tab) tab = tabs[0]
  return await chrome.tabs.sendMessage(tab.id, message)
}
