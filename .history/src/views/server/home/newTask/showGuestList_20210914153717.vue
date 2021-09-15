<template>
  <el-dialog title="嘉宾信息(选中后双击即可)" :visible.sync="visible" :before-close="handleClose" :model="form" v-dialog-drag>
    <el-col :span="6">
      <el-input size="small" v-model="form.name" placeholder="请输入嘉宾名称" clearable></el-input>
    </el-col>
    <el-button icon="el-icon-search" size="small" type="primary" style="margin-left: 30px;" @click="fetchData">查询</el-button>
    <el-table :data="gridData" max-height="400" @row-dblclick="selectGuestName">
      <el-table-column label="序号" type="index" width="60" :index="(this.pagination.currentPage - 1) * this.pagination.pageSize + 1"></el-table-column>
      <el-table-column label="嘉宾名称" width="150px">
        <template slot-scope="scope">
            <el-avatar style="display: inline-block;vertical-align: middle;" :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            <span style="margin-left: 10px;">{{ scope.row.guestName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="workUnit" label="工作单位" min-width="100px"></el-table-column>
      <el-table-column prop="workPosition" label="职位" min-width="100px"></el-table-column>
      <el-table-column prop="guestPhone" label="联系方式" min-width="100px"></el-table-column>
      <el-table-column prop="workExp" label="简介" min-width="150"></el-table-column>
    </el-table>
    <el-pagination small flex="main:left" :layout="pagination.layout" :total="pagination.total" :page-size="pagination.pageSize"
      :current-page="pagination.currentPage" @current-change="paginationCurrentChange" style="margin-top:20px;"/>
  </el-dialog>
</template>

<script>
import { paginationMixin } from '@/plugin/mixins/pagination'
import { getGuestsInfo } from '@/api/guest.pool'
export default{
  name: "showGuestList",
  mixins: [paginationMixin],
  props:{
    visible:{
      type: Boolean,
      default: false
    },
    guestList:{
      type: Object,
      default: {}
    }
  },
  data(){
    return{
      form:{
        nickName:'',
        status:'',
        name:''
      },
      gridData: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods:{
    handleClose(){
      this.$confirm('确认关闭？').then(_ => {
        this.$emit('update:visible', false)
        done()
      }).catch(_ => {})
    },
    //获取嘉宾库列表数据
    getData() {
      return new Promise((resolve) => {
        getGuestsInfo({
          ...this.form,
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }).then((res) => {
          const { list, total } = res
          this.gridData = list || []
          this.pagination.total = total
        })
        resolve()
      })
    },
    //选择嘉宾
    selectGuestName(row){
      this.$emit('selectName', row.guestName)
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
