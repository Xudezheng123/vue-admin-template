<template>
  <div>
    <el-tag v-for="(item, index) in map"
      v-show="`${value}`==`${item.key}`"
      :key="index"
      :type="typeMap[index]"
      size="small">
      {{ item.value }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    map: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Number || String,
      default: 0
    },
    typeMap: {
      type: Array,
      default() {
        return ['warning', 'primary', 'success', 'info', 'danger']
      }
    }
  }
}
</script>

