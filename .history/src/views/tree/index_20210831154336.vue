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
          <el-button
            class="filter-item"
            style="margin:10px 10px 10px 0"
            type="primary"
            icon="el-icon-plus"
            size="small"
          >
            新增
          </el-button>
          <el-button
            class="filter-item"
            style="margin:10px 0 10px 0"
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="batchDelete"
          >
            删除
          </el-button>
        </div>
        <el-tree
          :data="MenuDatas"
          ref="MenuDatas"
          node-key="id"
          default-expand-all
          @node-drop="handleDrop"
          @node-click="handleNodeClick"
          draggable
          show-checkbox
          :props="defaultProps"
        >
        </el-tree>
      </el-col>
      <!--用户数据-->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <!--表格渲染-->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="菜单名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="菜单父ID" prop="pid">
            <treeselect
              v-model="form.pid"
              :options="MenuDatas"
              :normalizer="normalizer"
              style="width: 450px;"
              placeholder="选择父级菜单"
            />
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-switch 
            v-model="form.openType"
            active-text="内部菜单"
            inactive-text="外链菜单"
            ></el-switch>
          </el-form-item>
          <el-form-item label="路由地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="菜单可见">
            <el-switch v-model="form.isShow"></el-switch>
          </el-form-item>
          <el-form-item label="是否登录">
            <el-switch v-model="form.isLogin"></el-switch>
          </el-form-item>
          <el-form-item label="权限ID">
            <el-select v-model="form.region" placeholder="请选择权限ID">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.mark"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-popover
              placement="bottom-start"
              width="450"
              trigger="click"
              @show="reset"
            >
              <IconSelect ref="IconSelect" @selected="selected" />
              <el-input slot="reference" v-model="form.icon" style="width: 450px;" placeholder="点击选择图标" readonly>
                <svg-icon v-if="form.icon" slot="prefix" :icon-class="form.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
                <i v-else slot="prefix" class="el-icon-search el-input__icon" />
              </el-input>
            </el-popover>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import {getAllMenu ,deleteMenus} from '@/api/table'
import IconSelect from '@/components/IconSelect'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'tree',
  components: { IconSelect , Treeselect},
  mixins: [],
  data() {
    return {
      filterText:'',
      MenuDatas:[],
      defaultProps:{ children: 'children', label: 'name'},
      
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        mark: '',
        address:'',
        openType:'',
        isShow:'',
        isLogin:'',
        icon:'',
        pid:'请选择父级类目'
      }
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
    this.getMenuDatas();
  },
  methods: {
    getMenuDatas(node, resolve) {
      getAllMenu().then(res => {
        console.log(res)
        this.MenuDatas = res.data;
      })
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
    },
    onSubmit() {
      console.log('submit!');
    },
    // 选中图标
    selected(name) {
      this.form.icon = name
      console.log(name)
    },
    reset(){
      console.dir(this.$refs.IconSelect.name);
    },
    batchDelete(){
      let checkKeys = this.$refs.MenuDatas.getCheckedKeys();
      console.log(checkKeys);
      if(checkKeys == null || checkKeys.length <=0){
        this.$message.warning('请选择要删除的资源');
        return;
      }
      this.$confirm('确定删除？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        deleteMenus(params).then(res=>{
          
        })
      }).catch(()=>{
      })
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
