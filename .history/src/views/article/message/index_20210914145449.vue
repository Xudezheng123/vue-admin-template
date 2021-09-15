<!--eslint-disable-->
<template>
  <div class="app-container">
    <p-card
      shadow="never"
      title='查询'>

      <div slot="body">
        <el-form
          ref="form"
          :model="form"
          inline>

          <el-form-item label="任务标题">
            <el-input
              v-model="form.taskTitle"
              clearable />
          </el-form-item>
          <el-form-item label="图文消息标题">
            <el-input
              v-model="form.title"
              clearable />
          </el-form-item>
          <el-form-item
            label="图文类型"
            prop="type">
            <TypeSelect v-model="form.type" />
          </el-form-item>
          <el-form-item
            label="编辑状态"
            prop="status">
            <el-select v-model="form.status">
              <el-option
                :value="0"
                label="未编辑" />
              <el-option
                :value="1"
                label="编辑中" />
              <el-option :value="3"
                label="已完成" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="fetchData"
              icon='el-icon-search'>
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </p-card>

    <p-card title='图文素材'
      :bodyStyle='{padding:"10px"}'>
      <div slot="header-right">
		<!--<el-date-picker
		    size="mini"
		    v-model="value1"
			unlink-panels
		    type="daterange"
		    range-separator="至"
		    start-placeholder="开始日期"
		    end-placeholder="结束日期"
			style="margin-right: 40px;">
		</el-date-picker>-->

    <el-button
		  size="mini"
		  type="primary"
		  @click="pull"
		  v-loading='pullLoading'
      v-if="false"
		>
		  获取素材
		</el-button>

		<el-button
		  style="margin-left: 40px;"
      v-if= false
		  size="mini "
		  icon='el-icon-plus'
		  type='primary'
		  @click="newMessage">
		  新建图文
		</el-button>
      </div>

      <div slot="body">
        <el-table v-loading="loading"
          :data="data"
          stripe
          style="width: 100%">
          <el-table-column type='index'
            label='序号' :index="(this.pagination.currentPage - 1) * this.pagination.pageSize + 1"></el-table-column>
          <el-table-column prop="taskTitle"
            label="封面/任务标题">
            <template v-slot="props">
              <div flex="main:left cross:center">
                <el-image :src="props.row.thumb_url"
                  style="width:128px;height:68px;flex-shrink: 0;" />

                <p style="width:280px;flex-shrink: 0;margin-left: 5px;">
                  {{ props.row.taskTitle || '' }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title"
            label="图文素材标题" />
          <el-table-column prop="type"
            label="分类">
            <template v-slot="scope">
              <Tag :value="scope.row.type"
                :map="articleCategory" />
            </template>
          </el-table-column>
          <el-table-column prop="updateTime"
            label="更新时间" />
          <el-table-column prop="status"
            label="编辑状态">
            <template v-slot="scope">
              <Tag :value="scope.row.status"
                :map="status" />
            </template>
          </el-table-column>

          <el-table-column label="操作"
            width="300px">
            <template v-slot="scope">
              <el-button v-if="scope.row.url"
                type="default"
                size="mini"
                title="预览图文消息"
                @click="handlerPreview(scope.row)">
                预览
              </el-button>

              <el-button v-show="scope.row.taskId"
                type="info"
                size="mini"
                title="任务详情"
                @click="jumpToDetail(scope.row)">
                详情
              </el-button>

              <el-button v-show="scope.row.taskId"
                v-if="false"
                type="warning"
                size="mini"
                title="编辑任务"
                @click="editTask(scope.row)">
                编辑任务
              </el-button>

              <el-button
                v-if="false"
                type="primary"
                size="mini"
                title="编辑图文详情"
                @click="editMessage(scope.row)">
                编辑图文
              </el-button>

              <!--<el-button v-if="canDeleteDetail(scope.row) || canDeleteTask"
                type="danger"
                size="mini"
                plain
                :disabled="scope.row.status!==1 "
                @click="deleteRow(scope.row)">
                删除
              </el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-pagination flex="main:left"
          :layout="pagination.layout"
          :total="pagination.total"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
          @current-change="paginationCurrentChange" />
      </div>
    </p-card>
  </div>
</template>

<script>
/* eslint-disable */
import { paginationMixin } from '@/utils/mixins/pagination'
import { mapMixin } from '@/utils/mixins/map'
import Tag from '../../components/tag'
import pCard from '@/components/p-card'
import TypeSelect from '../../components/type.select'
import { getArticleMessage, deleteArticleMessage,pullSuCai} from '@/api/server.article'
export default {
  components: { Tag, TypeSelect, 'p-card':pCard },
  mixins: [paginationMixin, mapMixin],
  data() {
    return {
      form: {
        type: null,
        status: ''
      },
      data: [],
      selectedCell: {},
      newVisible: false,
      isEdit: false,
	  pullLoading:false,
	  value1:''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.fetchData()
    console.log('this:',this)
  },

  methods: {
    // fetchData 封装的内部调用
    canDeleteDetail(row) {
      return !row.taskId
    },
    getData() {
      return getArticleMessage({
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.currentPage,
        ...this.form
      }).then((res) => {
        const {data} = res;
        this.data = data.list
        this.pagination.total = data.total
      })
    },
    // 编辑任务
    editTask(row) {
      console.log(row)
      this.$router.push({
        name: 'home/add',
        query: {
          data: { id: row.taskId },
          isEdit: 1
        }
      })
    },
    // 小编编辑图文小心
    editMessage(row) {
      this.$router.push({
        name: 'education/article/editTask',
        query: {
          id: row.id,
          isEdit: 1
        }
      })
    },
    // 创作图文消息
    newMessage(row) {
      this.$router.push({
        name: 'article/edit',
        query: {
          id: row.id,
          isEdit: 0
        }
      })
    },
    // 删除
    deleteRow(row) {
      deleteArticleMessage({ id: row.id }).then(() => {
        this.fetchData({ needInit: false })
      })
    },
    // 任务详情
    jumpToDetail(row) {
      this.$router.push({
        name: 'home/taskDetail',
        query: {
          taskId: row.taskId
        }
      })
    },

    handlerPreview(row) {
      window.open(row.url, 'newWindow')
    },

	//拉取素材
	pull(){
		this.pullLoading=true;
		pullSuCai().then(res=>{
			this.pullLoading=false;
			this.fetchData();
		})
		.catch(()=>{
			this.pullLoading=false;
		})
	}
  }
}
</script>

<style lang='scss' scoped type='text/css'>
</style>
