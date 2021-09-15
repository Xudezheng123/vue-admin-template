<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--侧边菜单树-->
      <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="head-container">
          <el-input
            v-model="filterText"
            clearable
            size="small"
            placeholder="输入菜单名称搜索"
            prefix-icon="el-icon-search"
            class="filter-item"
            @input="getMenuDatas"
          />
        </div>
        <el-tree
          :data="MenuDatas"
          node-key="id"
          default-expand-all
          @node-drop="handleDrop"
          @node-click="handleNodeClick"
          draggable
        >
        </el-tree>
      </el-col>
      <!--用户数据-->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <!--表格渲染-->
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import {getMenus} from '@/api/menu'
export default {
  name: 'tree',
  components: { },
  mixins: [],
  data() {
    return {
      filterText:'',
      MenuDatas:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
             id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
      defaultProps:{ children: 'children', label: 'name'},

    }
  },
  watch:{
    filterText(val){
      this.$refs.tree.filter(val);
    }
  },
  computed: {

  },
  created() {

  },
  mounted: function() {

  },
  methods: {
    getMenuDatas(node, resolve) {
      const sort = 'id,desc'
      const params = { sort: sort }
      if (typeof node !== 'object') {
        if (node) {
          params['name'] = node
        }
      } else if (node.level !== 0) {
        params['pid'] = node.data.id
      }
      setTimeout(() => {
        getMenus(params).then(res => {
          // this.MenuDatas = res.data
          console.log(res)
        })
      }, 100)
    },
    handleNodeClick(data){
      // if(data.pid === 0){
      //   this.query.deptId = null
      // }else{
      //   this.query.deptId = data.id
      // }
      // this.crud.toQuery()
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>
