<template>
  <div class="check-all">
    <Checkbox size="small" :indeterminate="indeterminate" :value="checkAll && !indeterminate"
      @click.prevent.native="onCheckAll">
      <slot name="header">{{ $t('check_all.message') }} ({{ checked.length }})</slot>
    </Checkbox>
    <CheckboxGroup :value="checked" @on-change="onCheckAllGroup" size="small">
      <Checkbox v-for="(item, index) in list" :key="item[idKey]" :label="item[idKey]" :disabled="item.disabled"
        size="small" :style="itemStyle">
        <slot :item="item" :index="index">{{ item[labelKey] }}</slot>
      </Checkbox>
      <slot name="append"></slot>
    </CheckboxGroup>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup } from 'view-design'

export default {
  components: { Checkbox, CheckboxGroup },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    idKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    itemStyle: {
      type: String,
      default: ''
    },
    checked: {
      type: Array,
      require: true
    },
    checkAll: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    indeterminate () {
      return !!this.checked.length && this.checked.length !== this.list.length
    }
  },
  methods: {
    onCheckAll () {
      if (this.checkAll) {
        this.$emit('update:checkAll', false)
        this.$emit('update:checked', [])
      } else {
        this.$emit('update:checkAll', true)
        this.$emit('update:checked', this.list.map(item => item[this.idKey]))
      }
    },
    onCheckAllGroup (data) {
      console.log(data)
      this.$emit('update:checked', data)
      if (data.length === this.list.length) {
        this.$emit('update:checkAll', true)
      } else {
        this.$emit('update:checkAll', false)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
