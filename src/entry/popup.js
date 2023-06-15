import Vue from 'vue'
import store from '../store'
import i18n from '../utils/i18n'
import App from '../views/popup.vue'
import '@/assets/style/fonts.css'
import '@/assets/style/theme.less'

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')

const req = require.context('../assets/svg', false, /\.svg$/)

const requireAll = (requireContext) => {
  requireContext.keys().map(requireContext)
}

requireAll(req)
