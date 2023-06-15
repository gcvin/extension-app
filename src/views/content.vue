<template>
  <div id="content-app">
    <CheckAll :list="list" :checked.sync="checked" :check-all.sync="checkAll">
      <SvgIcon icon="icon" size="24"></SvgIcon>
    </CheckAll>
  </div>
</template>

<script>
import SvgIcon from '@/components/svg-icon.vue'
import CheckAll from '@/components/check-all.vue'
export default {
  name: 'ContentView',
  components: { SvgIcon, CheckAll },
  data () {
    return {
      list: [{
        id: 0,
        label: '1'
      }, {
        id: 1,
        label: '2'
      }],
      checked: [1],
      checkAll: false
    }
  }
}
</script>

<style lang="less" scoped>
#content-app {
  font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999999;
}
</style>
