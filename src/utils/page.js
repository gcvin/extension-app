// 页面发送消息到content
export const sendMessagePageToContent = async (message) => {
  return new Promise(resolve => {
    const onMessage = (e) => {
      if (e.data?.type !== message.type + '_RES') return
      resolve(e.data?.value)
      window.removeEventListener('message', onMessage)
    }
    window.postMessage(message)
    window.addEventListener('message', onMessage)
  })
}
