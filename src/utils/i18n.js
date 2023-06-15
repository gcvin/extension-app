import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'view-design/locale/index'
import zh from '../../public/_locales/zh_CN/messages'
import en from '../../public/_locales/en/messages'
import ivuEn from 'view-design/locale/lang/en-US'
import ivuZh from 'view-design/locale/lang/zh-CN'

Vue.use(VueI18n)

const language = navigator.language
locale.use(language === 'zh-CN' ? ivuZh : ivuEn)

const messages = {
  zh,
  en
}

const i18n = new VueI18n({
  messages,
  locale: language,
  silentTranslationWarn: true
})

export default i18n
