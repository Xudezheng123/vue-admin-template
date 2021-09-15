<!--
 * @Descripttion:
 * @version:
 * @Author: silva.yanhui
 * @Date: 2020-12-30 11:31:25
 * @LastEditors: silva.yanhui
 * @LastEditTime: 2021-01-18 09:46:48
-->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    custom-class="media-content"
    width="950px"
    @opened="dialogOpen"
    @closed="dialogClose"
  >
    <template v-slot:title>
      <div>
        <span class="el-dialog__title">
          {{ isEdit ? '编辑' : '创建' }} 图文消息
        </span>
        <el-tag size="mini" :type="isEdit ? 'primary' : 'success'">
          {{ isEdit ? '编辑' : '新增' }}
        </el-tag>
      </div>
    </template>
    <el-container>
      <el-aside width="350px">
        <el-scrollbar style="height: 600px">
          <el-alert
            v-if="!multipleSelection.length"
            title="内容为空，请从右边勾选图文素材"
            type="warning"
            :closable="false"
            center
            show-icon
          />

          <ul v-else class="left-content">
            <li
              v-if="multipleSelection.length"
              class="top"
              flex="main:left cross:center"
            >
              <img src="logo-icon@1x.png" alt="" />
              <span class="top-title">{{ title }}</span>
            </li>
            <li
              v-for="(item, index) in multipleSelection"
              :key="item.id"
              :class="`item-content ${active.id === item.id ? 'active' : ''}`"
              @click="handleClick(item)"
            >
              <div v-if="index == 0" class="first-floor">
                <el-image :src="item.thumb_url" class="thumb" />
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
              <div v-else class="floor-item" flex="main:justify cross:center">
                <p style="width:220px">
                  {{ item.title }}
                </p>
                <el-avatar :src="item.thumb_url" shape="square" :size="48" />
              </div>
              <div
                v-if="active.id === item.id"
                class="action-bar"
                flex="dir:top main:justify cross:center"
              >
                <i
                  class="el-icon-top"
                  :disabled="index === 0"
                  @click="up(multipleSelection, index)"
                />
                <i
                  class="el-icon-bottom"
                  :disabled="index === multipleSelection.length - 1"
                  @click="down(multipleSelection, index)"
                />
                <i class="el-icon-delete" @click="deleteItem(item, index)" />
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </el-aside>
      <el-main width="600px">
        <div flex="main:justify cross:center">
          <span style="color:#ccc;">最多选择{{ maxSelect }}条，已选：{{multipleSelection.length }}条</span>
          <p-icon-btn
            class="p-mr-5"
            icon="p-refresh"
            tip="重置"
            @click="toggleSelection"
          />

          <!-- <el-input v-model="searchForm.title" style="" clearable size="mini">
            <el-button
              size="mini"
              slot="append"
              icon="el-icon-search"
              @click="fetchData"
            ></el-button>
          </el-input> -->

        </div>

        <el-scrollbar style="height: 550px">
          <el-table
            ref="multipleTable"
            :data="data"
            stripe
            style="width: 100%"
            :show-header="false"
            @selection-change="handleSelectionChange"
			v-loading="loadings"
          >
            <el-table-column
              type="selection"
              width="55"
              :selectable="
                (row) =>
                  multipleSelection.length < maxSelect ||
                  multipleSelection.findIndex((item) => item.id === row.id) >= 0
              "
            />
            <el-table-column prop="title" />
          </el-table>
        </el-scrollbar>

		<el-pagination
		  flex="main:left"
		  :layout="pagination.layout"
		  :total="pagination.total"
		  :page-size="pagination.pageSize"
		  :current-page="pagination.currentPage"
		  @current-change="paginationCurrentChange"
		/>
      </el-main>
    </el-container>
    <template slot="footer">
      <div flex="main:justify cross:center">
        <span class="tip"> 您今天还可以群发{{ maxSendTime }}次 </span>
        <div>
          <el-button :loading="loading" size="small" @click="save(true)">
            {{ isEdit ? '更新' : '保存' }}
          </el-button>
          <el-button
            size="small"
            :loading="loading"
            @click="save(false, 'send')"
          >
            预览
          </el-button>
          <el-button
            size="small"
            type="primary"
            :loading="loading"
            @click="saveAndShare"
          >
            {{ isEdit ? '更新' : '保存' }}并群发
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import * as API from '@/api/server.media';
import { getArticleMessage } from '@/api/server.article';
import { paginationMixin } from '@/utils/mixins/pagination';
import { pIconBtn } from '@/components/p-icon-btn'
export default {
  companyName: 'EditForm',
  mixins: [paginationMixin],
  components:{'p-icon-btn': pIconBtn},
  props: {
    selected: {
      type: Object,
      default() {}
    },
    maxSendTime: {
      type: Number,
      default: 4
    },
    value: Boolean,
    isEdit: Boolean
  },
  data() {
    return {
      searchForm: {
        title: ''
      },
      loading: false,
      dialogVisible: false,
      maxSelect: 5,
      title: '内伶仃福田自然保护区',
      active: {},
      data: [],
      multipleSelection: [],
	  loadings:true
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    dialogOpen() {
	    this.pagination.pageSize=50;
        this.fetchData();
    },

    getData() {                               //图文消息数据
        return getArticleMessage({
            pageSize: this.pagination.pageSize,
            pageNum: this.pagination.currentPage,
        }).then((res) => {
            const { data } = res
            this.data = data.list;
			//this.pagination.total = res.total
			this.pagination.total=50
	      	this.loadings=false;

			setTimeout(() => {
			    if (this.isEdit) {
			        const { id, mediaId, articleId } = this.selected
			        const articleIds = articleId.length ? JSON.parse(articleId) : []
			        const selectedRows = []
			        // 勾选并按原顺序排序
			        if (articleIds.length) {
			            articleIds.forEach((item) => {
			                const index = this.data.findIndex((d) => d.id === item)
			                index >= 0 && selectedRows.push(this.data[index])
			            })
			        }
			        console.log("编辑数据：",selectedRows);


			        this.toggleSelection(selectedRows)
			        this.handleSelectionChange(selectedRows)

			        this.form = {
			          id,
			          mediaId,
			          articleIds
			        }
			    } else {
			        this.form = {
			            articleIds: []
			        }
			    }
			});
        }).catch(()=>{
		    this.loadings=false;
	    })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick(item) {
      this.active = item
    },
    up(arr, index) {
      if (index !== 0) {
        arr[index] = arr.splice(index - 1, 1, arr[index])[0]
      } else {
        arr.push(arr.shift())
      }
    },
    down(arr, index) {
      if (index !== arr.length - 1) {
        arr[index] = arr.splice(index + 1, 1, arr[index])[0]
      } else {
        arr.unshift(arr.splice(index, 1)[0])
      }
    },
    deleteItem(row, index) {
      this.multipleSelection.splice(index, 1)
      const tableIndex = this.data.findIndex((item) => item.id === row.id)
      this.toggleSelection([this.data[tableIndex]])
    },
    save(onlySave, type) {
      if (!this.multipleSelection.length) {
        this.$message.warning('请至少选择一条图文')
        return
      }
      this.loading = true
      this.form.articleIds = this.multipleSelection.map((item) => item.id)
      API.saveMedia(this.form)
        .then((res) => {
          if (onlySave) {
            this.$message.success(this.isEdit ? '更新成功' : '创建成功')
            this.closeAndFresh()
          } else {
            this.loading = false
            this.showPreview(res.data.mediaId)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 预览提示输入微信号
    showPreview(id) {
      if (!id) return false
      this.$prompt('请输入微信号', '预览', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\w+$/,
        inputErrorMessage: '格式不正确,'
      })
        .then(({ value }) => {
          API.previewMedia({
            id,
            wxName: value
          }).then((res) => {
            this.$message.success('操作成功')
            this.closeAndFresh()
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    saveAndShare() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请至少选择一条图文')
        return
      }
      this.loading = true
      this.form.articleIds = this.multipleSelection.map((item) => item.id)
      API.mediaSaveAndSend(this.form)
        .then((res) => {
          this.$message.success('已群发')
          this.closeAndFresh()
        })
        .catch(() => {
          this.loading = false
        })
    },
    dialogClose() {
      this.dialogVisible = false
      this.loading = false
    },
    closeAndFresh() {
      this.dialogClose()
      this.$emit('closed')
    }
  }
}
</script>
<style lang="scss" type="text/css">
.media-content {
  .el-dialog__body {
    min-height: 400px;
    padding: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
  }
  .left-content {
    padding: 20px 23px;
    list-style-type: none;
    font-size: 16px;

    font-family: PingFangSC-Medium;
    .top {
      background: #f5f5fa;
      padding: 5px 12px;
      width: 310px;
      height: 44px;
      box-sizing: border-box;
      img {
        height: 100%;
        margin-right: 12px;
      }
      .top-title {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #232253;
        letter-spacing: 0;
      }
    }
    .item-content {
      position: relative;
      &.active > div {
      }
      .action-bar {
        position: absolute;
        cursor: pointer;
        /* width: 30px;
        height: 110px;
        right: -25px;
        top: 0;
        bottom: 0;
        padding: 15px 10px; */
        width: 20px;
        height: 80px;
        right: -22px;
        top: 0;
        bottom: 0;
        margin: auto;
        padding: 8px 14px;
        box-sizing: border-box;
        background: rgba(35, 34, 83, 0.8);
        border-radius: 15px;
        border-radius: 15px;
        color: #fff;
        transition: all linear 1s;
        & i:hover {
          background: #dddddd;
        }
      }
    }
    .first-floor {
      position: relative;
      width: 310px;
      height: 160px;
      .el-image__inner {
        background: #000;
        width: 310px;
        height: 160px;
      }
      .title {
        position: absolute;
        padding: 0 10px;
        left: 0px;
        right: 0px;
        bottom: 10px;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .floor-item {
      height: 59px;

      width: 290px;

      color: #232253;
      background: #f5f5fa;
      padding: 10px;
      border-bottom: 1px solid #dae0f2;
      p {
        margin: 0;

        font-family: PingFangSC-Regular;

        font-size: 16px;
        color: #232253;
        letter-spacing: 0;
        text-align: justify;
      }
    }
  }
  .el-main {
    padding: 10px 5px;
  }
  .el-dialog__footer {
    border-top: 1px solid #e6e6e6;
    padding: 10px 23px;
  }
  .tip {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #71a0fe;
    letter-spacing: 0;
    text-align: justify;
  }
}
</style>
