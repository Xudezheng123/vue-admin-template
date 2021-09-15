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
          :load="getMenuDatas"
          :props="defaultProps"
          :expand-on-click-node="false"
          lazy
          draggable
          @node-click="handleNodeClick"
        />
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
  name: 'menu',
  components: { },
  mixins: [],
  data() {
    return {
      filterText:'',
      MenuDatas:'',
      defaultProps:{ children: 'children', label: 'name', isLeaf: 'leaf' },

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
          if (resolve) {
            resolve(res.content)
          } else {
            this.deptDatas = res.content
          }
        })
      }, 100)
    },
    getMenus() {
      getMenus({ enabled: true }).then(res => {
        console.log(res);
        this.depts = res.content.map(function(obj) {
          if (obj.hasChildren) {
            obj.children = null
          }
          return obj
        })
      })
    },
    handleNodeClick(data){
      if(data.pid === 0){
        this.query.deptId = null
      }else{
        this.query.deptId = data.id
      }
      this.crud.toQuery()
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
