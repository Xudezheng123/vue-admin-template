<template>
    <div class="app-container">
        <div class="filter-container" style="margin-bottom:20px">
            <el-input v-model="listQuery.title" placeholder="请输入所属系统查询" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">新增</el-button>
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

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
</template>
<script>
/* eslint-disable */
import {addPermission,editPermission,deletePermission,getPermissionList} from '@/api/table'
export default {
    data() {
        return {
            list: [{
            id: '2016-05-02',
            code: '王小虎',
            name: '上海市普陀区金沙江路 1518 弄',
            desc:'王小虎',
            sys:'王小虎'
            }, {
            id: '2016-05-02',
            code: '王小虎',
            name: '上海市普陀区金沙江路 1518 弄',
            desc:'王小虎',
            sys:'王小虎'
            }, {
            id: '2016-05-02',
            code: '王小虎',
            name: '上海市普陀区金沙江路 1518 弄',
            desc:'王小虎',
            sys:'王小虎'
            }, {
            id: '2016-05-02',
            code: '王小虎',
            name: '上海市普陀区金沙江路 1518 弄',
            desc:'王小虎',
            sys:'王小虎'
            }],
            total:0,
            listQuery:{
                page:1,
                limit:20,
                importance:undefined,
                title:undefined,
                type:undefined,
                sort:'+id'
            },

        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            //请求权限列表
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
            this.tableData.pagination.pageSize = val;
            this.loadData();
        },
        handleCurrentChange(val) {
            this.tableData.pagination.pageNo = val;
            this.getList();
        },
    }
}
</script>