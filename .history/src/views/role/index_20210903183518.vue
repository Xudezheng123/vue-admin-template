<template>
    <div class="app-container">
        <div class="filter-container" style="margin-bottom:20px">
            <el-input prefix-icon="el-icon-search" v-model="pagination.name" placeholder="请输入角色名称查询" style="width:200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"></el-input>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleNewAdd">新增</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        </div>
        <el-table
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55"
            >
            </el-table-column>
            <el-table-column
                prop="id"
                label="角色ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="角色名称">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="角色描述">
            </el-table-column>
            <el-table-column
                label="角色权限码">
              <template slot-scope="scope">
                <el-tag :key="perm.id" v-for="perm in scope.row.permissions" style="margin:0 5px 2px 0">{{ perm.name }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="toDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.pageIndex"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog
            :title="form.id?'修改表单':'新增表单'"
            :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="角色ID" v-show="form.id && form.id!=0">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="desc">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="角色权限码" prop="permissions">
                  <el-select v-model="form.permissions" multiple placeholder="请选择权限ID" style="width:500px">
                    <el-option
                    v-for="item in permissions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    <span style="float:left">{{item.name}}</span>
                    <span style="float:right;color:#8492a6; font-size: 13px">{{item.code}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="form.id?editData():createData()" v-text="form.id?'修改':'新增'"></el-button>
                    <el-button type="danger" @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import {addRole,editRole,deleteRole,getRoleList,getAllPermissions} from '@/api/table'
export default {
    name:'role',
    components:{},
    data() {
        return {
            list:[],
            dialogVisible:false,
            total:0,
            pagination: {
                name:'',
                pageIndex: 1,
                pageSize: 10,
            },
            form:{
                id:'',
                name:'',
                desc:'',
                permissions:''
            },
            rules:{
                name:[{required:true,message:'请输入名称',trigger:'blur'}],
                desc:[{required:true,message:'请输入描述',trigger:'blur'}],
                permissions:[{required:true,message:'请输入所属系统',trigger:'blur'}]
            },
            multipleSelection: [],
            permissions:[]
        }
    },
    created(){
        this.getList();
        this.getAllPermission();
    },
    methods:{
        getList(){
            getRoleList(this.pagination).then(res=>{
              this.total = res.totalCount;
              console.log(res.data);
              this.list = res.data;
            }).catch(e=>{});
        },
        getAllPermission(){
          getAllPermissions().then(res=>{
            this.permissions = res.data
          }).catch(e=>{})
        },
        handleFilter(){
            this.pagination.page = 1;
            this.getList()
        },
        handleEdit(index, row) {
            this.form=Object.assign({},row);
            this.dialogVisible =true;
        },
        handleDelete() {
            if(this.multipleSelection == null||this.multipleSelection.length == 0){
                this.$message.warning('请选择要删除的资源');
                return;
            }
            this.$confirm('确定删除？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                let data = this.multipleSelection.reduce((pre,cur,index,array)=>{
                    pre.push(cur.id);
                    return pre;
                },[]).join(',');
                deleteRole(data).then((res)=>{
                    this.$message({message:'操作成功',type:'success'});
                    this.getList();
                }).catch(e=>{})
            })
        },
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pagination.pageIndex = val;
            this.getList();
        },
        createData(){
          console.log(this.form)
          // this.form.permissions = this.form.permissions.join(',')
          
          // this.$refs.form.validate((valid)=>{
          //     if(valid){
          //         addRole(this.form).then(()=>{
          //             this.$message({message:'操作成功',type:'success'});
          //             this.dialogVisible = false;
          //             this.getList();
          //         }).catch(e=>{});
          //     }else{
          //         return false
          //     }
          // })
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        toDelete(index,row){
            this.$confirm('确定删除？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                deleteRole(row.id).then((res)=>{
                    this.$message({message:'操作成功',type:'success'});
                    this.getList();
                }).catch(e=>{})
            })

        },
        handleNewAdd(){
            this.form={
                name:'',
                desc:'',
                permissions:''
            }
            this.dialogVisible = true;
        },
        editData(){
          this.form.permissions = this.form.permissions.id.join(',');
          console.log("cur",this.form);
          // this.$refs.form.validate((valid)=>{
          //     if(valid){
          //         editRole(this.form).then(()=>{
          //             this.$message({message:'操作成功',type:'success'});
          //             this.dialogVisible = false;
          //             this.getList();
          //         }).catch(e=>{});
          //     }else{
          //         return false
          //     }
          // })
        }
    }
}
</script>