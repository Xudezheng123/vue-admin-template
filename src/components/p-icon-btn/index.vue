<template>
  <el-tooltip class="item"
    effect="dark"
    :hide-after="1000"
    :content="tip"
    placement="top-start"
    :disabled="(!tip) || tip.length === 0">
    <span class="p-icon-btn"
      @click="onIconClick">
      <i :class="`${icon}`" />
      <slot />
    </span>
  </el-tooltip>
</template>

<script>
export default {
  name: 'PIconBtn',
  props: {
    icon: {
      default: ''
    },
    tip: {
      default: ''
    }
  },
  methods: {
    onIconClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
</style>
