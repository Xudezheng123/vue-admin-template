<!--
 * @Descripttion:
 * @version:
 * @Author: silva.yanhui
 * @Date: 2020-12-28 09:28:47
 * @LastEditors: silva.yanhui
 * @LastEditTime: 2021-01-21 09:43:00
-->
<template>
  <el-select
    :value="value"
    filterable
    placeholder="请选择"
    clearable
    :disabled="disabled"
    v-on="listeners"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.value"
      :value="`${item.key}`"
    />
  </el-select>
</template>

<script>

import { articleCategory } from '@/api/server.article'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    topRoleDisabled: {
      default: true,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event)
      }
    }
  },
  mounted() {
    this.fetchData(true)
  },
  methods: {
    fetchData() {
      // 获取文章类型
      articleCategory().then(res => {
        console.log(res)
        this.options = res
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
}

</script>

<style>
</style>
