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
          />
          <el-button
            class="filter-item"
            style="margin:10px 10px 10px 0"
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="newAdd"
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
          :filter-node-method="filterNode"
        >
        </el-tree>
      </el-col>
      <!--用户数据-->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <!--表格渲染-->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="菜单ID">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="菜单父ID" prop="parentId">
            <treeselect
              v-model="form.parentId"
              :options="MenuDatas"
              :normalizer="normalizer"
              style="width: 450px;"
              placeholder="选择父级菜单"
            />
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-switch 
            v-model="form.openType"
            active-text="外链菜单"
            inactive-text="内部菜单"
            :active-value=1
            :inactive-value=0
            ></el-switch>
          </el-form-item>
          <el-form-item label="路由地址">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="菜单可见">
            <el-switch 
            v-model="form.isShow"
            :active-value=1
            :inactive-value=0>
            </el-switch>
          </el-form-item>
          <el-form-item label="是否登录">
            <el-switch 
            v-model="form.isLogin"
            :active-value=1
            :inactive-value=0>
            </el-switch>
          </el-form-item>
          <el-form-item label="权限ID">
            <el-select v-model="form.permCode" placeholder="请选择权限ID">
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
            <el-button type="primary" @click="onSubmit" v-text="form.id?'修改':'新增'"></el-button>
            <el-button type="danger" @click="deleteSelected" icon="delete" v-show="form.id && form.id!=0">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import {getAllMenu ,deleteMenus ,getMenuDetail ,addMenu} from '@/api/table'
import IconSelect from '@/components/IconSelect'
import Treeselect from '@riophae/vue-treeselect'
import merge from 'element-ui/src/utils/merge'
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
      normalizer(node){
        return{
          id:node.id,
          label:node.name,
          children:node.children
        }
      },
      form: {
        id:null,
        parentId:null,
        name: '',
        url:'',
        openType:0,
        isShow:0,
        isLogin:0,
        mark:'',
        icon:'',
        permCode: ''
      }
    }
  },
  watch:{
    filterText(val){
      this.$refs.MenuDatas.filter(val);
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
    getMenuDatas() {
      getAllMenu().then(res => {
        this.MenuDatas = res.data;
      }).catch(e=>{})
    },
    filterNode(value,data){
      if(!value)return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data){
      getMenuDetail(data.id).then(res=>{
        this.form = merge({},res.data);
      }).catch(e=>{})
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    onSubmit() {
      if(!this.form.id){
        addMenu(this.form).then(res=>{
          this.$message('操作成功');
          console.log(res);
          this.getMenuDatas();
        }).catch(e=>{})
      }
    },
    // 选中图标
    selected(name) {
      this.form.icon = name
      console.log(name)
    },
    reset(){
      console.dir(this.$refs.IconSelect.name);
    },
    newAdd(){
      this.form = {
        id:null,
        parentId:null,
        name: '',
        url:'',
        openType:0,
        isShow:0,
        isLogin:0,
        mark:'',
        icon:'',
        permCode: ''
      };
    },
    batchDelete(){
      let checkKeys = this.$refs.MenuDatas.getCheckedKeys();
      if(checkKeys == null || checkKeys.length <=0){
        this.$message.warning('请选择要删除的资源');
        return;
      }
      this.$confirm('确定删除？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        deleteMenus(checkKeys.join(',')).then(res=>{
          this.$message('操作成功');
          this.getMenuDatas();
        })
      }).catch((e)=>{
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
