<template>
    <div class="app-container">
        <div class="filter-container" style="margin-bottom:20px">
            <el-input v-model="listQuery.title" placeholder="请输入所属系统查询" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="dialogVisible = true">新增</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        </div>
        <el-table
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
                prop="id"
                label="权限码ID"
                width="180">
            </el-table-column>
            <el-table-column
                prop="code"
                label="权限码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="权限码名称">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="权限码描述">
            </el-table-column>
            <el-table-column
                prop="sys"
                label="所属系统">
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
                    @click="handleDelete(scope.$index, scope.row)"></el-button>
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
            title="提示"
            :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="权限码" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="所属系统" prop="system">
                    <el-input v-model="form.system"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createData">新增</el-button>
                    <el-button type="danger" @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import {addPermission,editPermission,deletePermission,getPermissionList} from '@/api/table'
export default {
    name:'permission',
    components:{},
    data() {
        return {
            list:[],
            dialogVisible:false,
            total:0,
            listQuery:{
                page:1,
                limit:20,
                importance:undefined,
                title:undefined,
                type:undefined,
                sort:'+id'
            },
            pagination: {
                pageIndex: 1,
                pageSize: 10,
            },
            form:{
                code:'',
                name:'',
                desc:'',
                system:''
            },
            rules:{
                code:[{required:true,message:'请输入权限码',trigger:'blur'}],
                name:[{required:true,message:'请输入名称',trigger:'blur'}],
                desc:[{required:true,message:'请输入描述',trigger:'blur'}],
                system:[{required:true,message:'请输入所属系统',trigger:'blur'}]
            }
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            //请求权限列表
            getPermissionList(this.pagination).then(res=>{
                this.total = res.totalCount;
                this.list = res.data;
            }).catch(e=>{})
        },
        handleFilter(){
            this.listQuery.page = 1;
            this.getList()
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
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
                    
                }else{
                    return false
                }
            })
        }
    }
}
</script>