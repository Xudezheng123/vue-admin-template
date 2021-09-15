<template>
  <div class="p-page-container">
    <p-card title="查询">
      <div slot="body">
        <el-form ref="form" :model="form" inline>
          <el-form-item label="标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="form.content" />
          </el-form-item>
          <el-form-item label="摘要">
            <el-input v-model="form.digest" />
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.author" />
          </el-form-item>
          <el-form-item label="消息类型" prop="type">
            <TypeSelect v-model="form.type" />
          </el-form-item>

          <el-form-item>
            <el-button @click="fetchData" icon="el-icon-search">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </p-card>

    <p-card title="小程序动态" :bodyStyle="{ padding: '10px' }">
        <div slot="header-right">

		<el-date-picker
		    size="mini"
		    v-model="value1"
			unlink-panels
		    type="daterange"
		    range-separator="至"
		    start-placeholder="开始日期"
		    end-placeholder="结束日期"
			style="margin-right: 40px;">
		</el-date-picker>

		<el-button
		  size="mini"
		  type="primary"
		  @click="pull"
		  v-loading='pullLoading'
		>
		  获取历史图文
		</el-button>
      </div>


      <div slot="body">
        <el-table v-loading="loading" :data="data" stripe style="width: 100%">
          <el-table-column prop="taskTitle" label="任务标题">
            <template v-slot="props">
              <div flex="main:left cross:center">
                <el-image
                  :src="props.row.thumb_url"
                  style="width:128px;height:68px;margin-right:10px;flex-shrink: 0;"
                />
                <p style="width:280px;">
                  {{ props.row.taskTitle }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="图文消息标题" />
          <el-table-column prop="type" label="分类">
            <template v-slot="scope">
              <Tag :value="scope.row.type" :map="articleCategory" />
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" />
          <el-table-column prop="status" label="编辑状态">
            <template v-slot="scope">
              <Tag :value="scope.row.status" :map="status" />
            </template>
          </el-table-column>

          <el-table-column label="操作" width="">
            <template v-slot="scope">

              <el-button
                type="info"
                size="mini"
                @click="preview(scope.row)"
              >
                预览
              </el-button>

              <el-button
                type="danger"
                size="mini"
                plain
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
  </div>
</template>

<script>
import { paginationMixin } from '@/utils/mixins/pagination'
import { mapMixin } from '@/utils/mixins/map'

import Tag from '../../components/tag'

import TypeSelect from '../../components/type.select'
import { getMiniList, pullList,Listmini } from '@/api/server.mini'
import { deleteArticleMessage,getArticleMessage} from '@/api/server.article'

export default {
  components: { Tag, TypeSelect },
  mixins: [paginationMixin, mapMixin],
  data() {
    return {
      form: {
        author: '',
        content: '',
        digest: '',
        title: '',
        type: ''
      },
      data: [],
      selectedCell: {},
      newVisible: false,
      isEdit: false,
      pullLoading: false,
	  value1:''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.fetchData()
  },

  methods: {
    // fetchData 封装的内部调用
    getData() {
      return getMiniList(
        Object.assign(
          {
            pageSize: this.pagination.pageSize,
            pageNum: this.pagination.currentPage
          },
          this.form
        )
      ).then((res) => {
        const { data }
        this.data = data.list;
		//this.data=this.data.concat(this.data)
        this.pagination.total = data.total;
      })
    },

    pull() {
	    if(!!this.value1){
			let v1=this.timezh(this.value1[0]);
			let v2=this.timezh(this.value1[1]);

			console.log(v1,v2);
			this.pullLoading = true;
			pullList(Object.assign({ beginDate:v1,endDate:v2})).then(() => {
			  this.$message.success('操作成功');
			  this.pullLoading = false;
			  this.fetchData();

			//  let arr1=[];
			//  getArticleMessage({pageSize:100,pageNum: 1}).then(res=>{
			//  	this.data.map(a=>{
				// 	for(let x=0;x<res.list.length;x++){
				// 		if(res.list[x].title==a.title){
				// 			a.thumb_url=res.list[x].thumb_url;
				// 		}
				// 	}
				// 	return a
				// })
			//  })
			}).catch(() => {
			  this.pullLoading = false;
			})
		}else{
			this.$message({
				type:"error",
				message:"请选择时间段",
				duration:1500
			})
		}
    },

	timezh(timestamp){
		let date = new Date(timestamp);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
		let D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate());
		//let h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
		//let m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
	    //let s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
	    //return Y+M+D+h+m+s;
		return Y+M+D;
	},

    preview(row) {
        window.open(row.url)
    },

    deleteRow(row) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          deleteArticleMessage({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData({ needInit: false })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
$theme-bg-color: #f4f5f7;
.p-page-container {
          padding: 0px 50px;
          .p-search-bar {
            margin: 0 10px;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            -webkit-transition: 0.3s;
            transition: 0.3s;

            .el-col {
              height: 50px;
            }

            .p-border-r {
              border-right: 2px solid $theme-bg-color;
            }

            .p-search-btn {
              height: 100%;
              width: 100%;

              .el-button {
                width: 100%;
                text-align: center;
                margin: 5px 0 0 0;
              }
            }

            .el-form-item {
              margin-top: 5px;
              width: 100%;

              .el-form-item__content {
                width: 100%;
              }

              .el-select {
                width: 100%;
              }
            }

            .el-input-group__prepend {
              border: none;
              background-color: transparent;
              padding: 0 10px 0 40px;
            }

            .el-input-group__append {
              border: none;
              background-color: transparent;
            }

            .el-input__inner {
              height: 40px;
              line-height: 40px;
              border: none;
              background-color: transparent;
              font-weight: bold;
              color: #484d5e;
              font-size: 14px;
            }

            .el-select__caret {
              font-size: 16px !important;
            }

            .line {
              width: 1px;
              height: 26px;
              background-color: #c5c5c5;
              margin-left: 14px;
            }
          }

          .el-card {
            margin: 0 0 20px 0;

            .card-header {
              clear: both;
              height: 17px;

              .card-header__left {
                float: left;
              }

              .card-header__right {
                float: right;

                .el-button {
                  margin-top: -3px !important;
                  font-weight: bold;
                }
              }
            }

            .el-card__body {
              padding: 0 !important;
            }

            .card-body {
              margin: 0 10px;
              min-height: 300px;

              .el-table-column--selection {
                .cell {
                  padding-left: 14px !important;
                }
              }

              .el-table {
                font-size: 12px;
              }
            }

            .card-footer {
              margin: 20px 0;
            }
          }
        }
</style>
