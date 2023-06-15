<template>
  <div class="expandable">
    <div ref="text" :class="{ 'ellipsis': !isExpand }" :style="{ '-webkit-line-clamp': line }">{{ text }}</div>
    <template v-if="showExpand">
      <a v-if="!isExpand" @click="isExpand = true">more</a>
      <a v-else @click="isExpand = false">less</a>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ExpandableComp',
  props: {
    text: String,
    line: {
      type: Number,
      default: 3
    },
    width: String
  },
  data () {
    return {
      isExpand: true,
      showExpand: false
    }
  },
  watch: {
    text () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const style = getComputedStyle(this.$refs.text)
      const div = document.createElement('div')
      div.textContent = this.text
      div.style.position = 'absolute'
      div.style.zIndex = -1
      div.style.top = 0
      div.style.left = 0
      div.style.visibility = 'hidden'
      div.style.width = this.width || style.width
      div.style.lineHeight = style.lineHeight
      div.style.fontSize = style.fontSize
      div.style.fontFamily = style.fontFamily
      div.style.fontWeight = style.fontWeight
      div.style.fontStyle = style.fontStyle
      document.body.appendChild(div)
      const height = div.clientHeight
      document.body.removeChild(div)
      if (height / parseInt(style.lineHeight) > this.line) {
        this.isExpand = false
        this.showExpand = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ellipsis {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
