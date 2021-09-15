<template>
  <div class="p-page-container">
    <p-card title="图文消息" :bodyStyle="{ padding: '10px' }">
      <div slot="header-right" flex="cross:center">
        <div style="width:150px;margin-right:10px;margin-top:-2px;">
          <el-input v-model="form.title" style="" clearable size="mini">
            <el-button
              size="mini"
              slot="append"
              icon="el-icon-search"
              @click="fetchData"
            ></el-button>
          </el-input>
        </div>

        <el-button
          class="p-mr-5"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="newMedia"
          >新建图文</el-button
        >
      </div>
      <div slot="body">
        <el-table
          v-loading="loading"
          :data="data"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" label="序号" width="55" />

          <el-table-column prop="thumbUrl" label="封面">
            <template v-slot="props">
              <div flex="cross:center">
                <el-image
                  :src="props.row.thumbUrl"
                  style="width:128px;height:68px;margin-right:10px;"
                />
                <p style="">
                  {{ props.row.title }}
                </p>
                <el-button type="text" style="width:53px;">
                  [共{{ props.row.articles.length }}篇]
                </el-button>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300px">
            <template v-slot="scope">
              <el-dropdown
                @command="
                  (id) => {
                    preview(id, scope.row.articles)
                  }
                "
              >
                <el-button
                  class="p-btn-primary preview"
                  style=" margin-right: 10px;"
                  size="mini"
                >
                  预览<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <span
                  style="color:#ddd;font-size:13px;padding-left:5px;"
                    >选择一项内容预览</span
                  >
                  <el-dropdown-item
                    v-for="article in scope.row.articles"
                    :key="article.id"
                    :command="article.id"
                  >
                    <div style="width:100%;text-align:center;">
                      {{ article.title }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="primary" size="mini" @click="editRow(scope.row)">
                编辑
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="sendItem(scope.row)"
              >
                群发
              </el-button>
              <el-button
                type="danger"
                plain
                size="mini"
                class="p-btn-delete"
                @click="deleteRow(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-pagination
          flex="main:left"
          :layout="pagination.layout"
          :total="pagination.total"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
          @current-change="paginationCurrentChange"
        />
      </div>
    </p-card>

    <!-- 新增编辑窗口 -->
    <EditForm
      v-model="editFormVisible"
      :selected="selectedCell"
      :max-send-time="maxSendTime"
      :is-edit="isEdit"
      @closed="handleClosed"
    />
  </div>
</template>

<script>
import { paginationMixin } from '@/utils/mixins/pagination'
import pCard from '@/components/p-card'
import {
  getMediaPagelist,
  deleteMedia,
  mediaSendCount,
  mediaSendall
} from '@/api/server.media'
import EditForm from './editForm'
export default {
  components: { EditForm, 'p-card':pCard },
  mixins: [paginationMixin],
  data() {
    return {
      form: {
        title: ''
      },
      data: [],
      maxSendTime: 4,
      selectedCell: {},
      editFormVisible: false,
      isEdit: false,
      statusMap: [
        { label: '待办', value: 0, type: 'warning' },
        { label: '编辑中', value: 1, type: 'primary' },
        { label: '完成', value: 3, type: 'success' }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.fetchData()
    this.getMaxSentCount()
  },

  methods: {
    // 获取剩余群发次数
    getMaxSentCount() {
      mediaSendCount().then((res) => {
        const { data } = res
        this.maxSendTime = data
      })
    },
    // fetchData 封装的内部调用
    getData() {
      return getMediaPagelist({
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.currentPage,
        title: this.form.title
      }).then((res) => {
        const { data } = res
        this.data = data.list || []
        this.pagination.total = data.total
      })
    },

    // 新增图文消息
    newMedia() {
      this.isEdit = false
      this.selectedCell = {}
      this.editFormVisible = true
    },
    editTask(row) {
      this.$router.push({
        name: 'home/edit',
        query: {
          data: row.taskId,
          isEdit: true
        }
      })
    },
    // 编辑窗口关闭回调
    handleClosed() {
      this.fetchData()
    },
    // 编辑图文消息
    editRow(row) {
      this.isEdit = true
      this.editFormVisible = true
      this.selectedCell = row
    },
    // 预览
    preview(id, articles) {
      const item = articles.find((item) => item.id === id)
      console.log(id, item)
      window.open(item.url)
    },
    // 群发
    sendItem(id) {
      this.$confirm(`您还能群发${this.maxSendTime}次`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      })
        .then(() => {
          mediaSendall(id).then((res) => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    // 删除
    deleteRow(row) {
      deleteMedia({ id: row.id }).then(() => {
        this.$message.success('已删除')
        this.fetchData({ needInit: false })
      })
    },
    // 前往创作图文消息
    jumpToEdit(row) {
      this.$router.push({
        name: 'home/edit',
        query: {
          data: row,
          isEdit: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  @import '~@/styles/theme-base.scss';
</style>
