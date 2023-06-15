import Vue from 'vue'
import router from '../router'
import store from '../store'
import i18n from '../utils/i18n'
import App from '../views/content.vue'
import '@/assets/style/theme.less'

Vue.config.productionTip = false
const root = document.getElementById('content-host').shadowRoot.getElementById('content-app')

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount(root)

const req = require.context('../assets/svg', false, /\.svg$/)

const requireAll = (requireContext) => {
  requireContext.keys().map(requireContext)
}

requireAll(req)
