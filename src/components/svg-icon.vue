<template>
  <svg class="svg-icon" :style="iconStyle">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#6673EF'
    },
    size: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#my-icon-${this.icon}`
    },
    iconStyle () {
      return {
        fontSize: this.size + 'px',
        color: this.color,
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  flex: 0 0 auto;
}
</style>
