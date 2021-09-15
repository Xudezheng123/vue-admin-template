<template>
    <div class="app-container">
        <div class="filter-container" style="margin-bottom:20px">
            <el-input prefix-icon="el-icon-search" v-model="pagination.name" placeholder="请输入用户名称查询" style="width:200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"></el-input>
            <el-select v-model="pagination.deptId" clearable placeholder="请选择部门" style="width:200px;margin-left: 10px;" @keyup.enter.native="handleFilter">
              <el-option
              v-for="item in dept"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float:left">{{item.name}}</span>
              </el-option>
            </el-select>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleNewAdd">新增</el-button>
        </div>
        <el-table
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%">
            <el-table-column
                prop="managerId"
                label="用户ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="managerName"
                label="名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="account"
                label="账号">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="deptId"
                label="部门ID">
            </el-table-column>
            <el-table-column
                prop="deptName"
                label="部门名称">
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
                    type="success"
                    icon="el-icon-refresh-right"
                    @click="handleResetpassword(scope.$index, scope.row)"></el-button>
                    <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-s-tools"
                    @click="handleRole(scope.$index, scope.row)"></el-button>
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
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户ID" v-if="form.id && form.id!=0" prop="id">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="用户账号" prop="account">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="deptId">
                    <el-select v-model="form.deptId" placeholder="请选择部门">
                        <el-option
                        v-for="item in dept"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        <span style="float:left">{{item.name}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="form.id?editData():createData()" v-text="form.id?'修改':'新增'"></el-button>
                    <el-button type="danger" @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            title="匹配角色"
            :visible.sync="dialogRoleVisible">
            <el-transfer 
            v-model="role" 
            :props="{
                key: 'id',
                label: 'name'
            }"
            :data="transfer.roleIds">
            </el-transfer>
            <el-button type="primary" @click="handleTransfer">保存</el-button>
            <el-button type="danger" @click="dialogRoleVisible = false">取消</el-button>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import {getManagerList,addManager,editManager,deleteManager
,resetPassword,bindRole,getRoleList,getAllDepartmentList,getUserRole} from '@/api/table'
export default {
    name:'permission',
    components:{},
    data() {
        return {
            queryRole:{
                pageSize:0,
                pageIndex:1
            },
            list:[],
            dialogVisible:false,
            dialogRoleVisible:false,
            total:0,
            pagination: {
                name:'',
                pageIndex: 1,
                pageSize: 10,
                deptId:''
            },
            form:{
                id:'',
                account:'',
                name:'',
                phone:'',
                deptId:''
            },
            rules:{
                id:[{required:true,message:'请输入id',trigger:'blur'}],
                account:[{required:true,message:'请输入账户',trigger:'blur'}],
                name:[{required:true,message:'请输入名称',trigger:'blur'}],
                phone:[{required:true,message:'请输入手机号码',trigger:'blur'}],
                deptId:[{required:true,message:'请选择部门',trigger:'change'}]
            },
            multipleSelection: [],
            dept:[],
            role:[],
            transfer:{
                id:'',
                roleIds:[]
            }
        }
    },
    created(){
        this.getList();
        this.getAllDept();
        this.getAllRole();
    },
    methods:{
        getList(){
            getManagerList(this.pagination).then(res=>{
                this.total = res.totalCount;
                this.list = res.data;
                console.log("用户列表",res)
            }).catch(e=>{});
        },
        getAllDept(){
            getAllDepartmentList().then(res=>{
                this.dept = res.data;
            }).catch(e=>{})
        },
        getAllRole(){
            getRoleList(this.queryRole).then(res=>{
                this.role = res.data;
            })
        },
        handleTransfer(){

        }, 
        handleFilter(){
            this.pagination.page = 1;
            this.getList()
        },
        handleEdit(index, row) {
            this.form={
                id:row.managerId,
                account:row.account,
                name:row.managerName,
                phone:row.phone,
                deptId:row.deptId
            };
            this.dialogVisible =true;
        },
        handleRole(index,row){
            dialogRoleVisible = true;
            getUserRole(row.managerId).then((res)=>{
                this.matchId = res.data.id;
            })
        },
        handleResetpassword(index,row){
            resetPassword(row.managerId).then(res=>{
                this.$message({message:'操作成功',type:'success'});
            }).catch(e=>{})
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
            this.$refs.form.validate((valid)=>{
                if(valid){
                    console.log("新增：",this.form);
                    addManager(this.form).then(()=>{
                        this.$message({message:'操作成功',type:'success'});
                        this.dialogVisible = false;
                        this.getList();
                    }).catch(e=>{});
                }else{
                    return false
                }
            })
        },
        toDelete(index,row){
            this.$confirm('确定删除？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                deleteManager(row.managerId).then((res)=>{
                    this.$message({message:'操作成功',type:'success'});
                    this.getList();
                }).catch(e=>{})
            })
        },
        handleNewAdd(){
            this.form={
                account:'',
                name:'',
                phone:'',
                deptId:null
            }
            this.dialogVisible = true;
        },
        editData(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    editManager(this.form).then(()=>{
                        this.$message({message:'操作成功',type:'success'});
                        this.dialogVisible = false;
                        this.getList();
                    }).catch(e=>{});
                }else{
                    return false
                }
            })
        }
    }
}
</script>