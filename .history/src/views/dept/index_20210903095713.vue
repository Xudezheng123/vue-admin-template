<template>
    <div class="app-container">
        <div class="filter-container" style="margin-bottom:20px">
            <el-input v-model="pagination.system" placeholder="请输入部门名称查询" style="width:200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"></el-input>
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
                prop="id"
                label="部门ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="部门名称">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="部门描述">
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
        <el-dialog
            :title="form.id?'修改表单':'新增表单'"
            :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="部门ID" v-show="form.id && form.id!=0">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="form.desc"></el-input>
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
import {addDept,editDept,deleteDept,getAllDepartmentList} from '@/api/table'
export default {
    name:'dept',
    components:{},
    data() {
        return {
            list:[],
            dialogVisible:false,
            form:{
                id:'',
                name:'',
                desc:''
            },
            rules:{
                name:[{required:true,message:'请输入名称',trigger:'blur'}],
                desc:[{required:true,message:'请输入描述',trigger:'blur'}],
            },
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            getAllDepartmentList().then(res=>{
                this.list = res.data;
            }).catch(e=>{});
        },
        handleFilter(){
            
            this.getList()
        },
        handleEdit(index, row) {
            this.form=Object.assign({},row);
            this.dialogVisible =true;
        },
        createData(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    addPermission(this.form).then(()=>{
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
            }).
            deletePermission(row.id).then((res)=>{
                this.$message({message:'操作成功',type:'success'});
                this.getList();
            }).catch(e=>{})
        },
        handleNewAdd(){
            this.form={
                code:'',
                name:'',
                desc:'',
                system:''
            }
            this.dialogVisible = true;
        },
        editData(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    editPermission(this.form).then(()=>{
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