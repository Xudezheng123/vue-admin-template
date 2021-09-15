<template>
  <div class="p-page-container">
    <el-card shadow="never">
      <div slot="header">
        <div class="card-header">
          <div class="card-header__left">
            <span class="p-tab-item p-tab-selected"> 任务详情</span>
          </div>
          <div
            class="card-header__right"
            flex
          >
            <icon-tip-btn
              icon="el-icon-back"
              placement="top"
              content="返回"
              @click="$router.go(-1)"
            />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div
          v-if="noData"
          class="noData"
        >
          <p-noData />
        </div>
        <ul v-else>
          <li
            v-for="(item, index) in detailMap"
            v-show="detail[item.value]&& detail[item.value].length"
            :key="index"
            class="left-item"
          >
            <div class="label">
              {{ item.label }}
            </div>
            <div
              v-if="item.value==='mediaList' "
              class="value"
              flex="cross:center"
            >
              <el-image
                v-for="(img, i) in detail.mediaList"
                v-show="item"
                :key="i"
                style="width:80px;margin-right:10px"
                :src="img.mediaUrl"
              >
                {{ img }}
              </el-image>
              <el-button
                size="small"
                @click="filesToRar(srcList,detail.title)"
              >
                下载素材
              </el-button>
            </div>
            <div
              v-else
              class="value"
            >
              {{ detail[item.value] }}
            </div>
          </li>
          <p />
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTaskDetail } from '@/api/server.home.js'
import { FileSave } from '@/plugin/mixins/fileSave'
export default {

  components: {},
  mixins: [FileSave],
  data() {
    return {
      detail: {},
      noData: false,
      detailMap: [
        { label: '任务标题', value: 'title' },
        { label: '任务类型', value: 'type' },
        { label: '完成时间', value: 'finishTime' },
        { label: '开始时间', value: 'startTime' },
        { label: '结束时间', value: 'endTime' },
        { label: '主讲嘉宾', value: 'speakers' },
        { label: '原文链接', value: 'newUrl' },
        { label: '内容详情', value: 'content' },
        { label: '图片素材', value: 'mediaList' }
      ]
    }
  },

  computed: {
    srcList() {
      return this.detail.mediaList.map(item => {
        return { filename: item.mediaName, url: item.mediaUrl }
      }
      ) || []
    }
  },

  watch: {},

  mounted() {
    this.initPage()
  },

  methods: {
    initPage() {
      const { query } = this.$route
      if (!query.taskId) {
        this.$router.push({
          name: 'home'
        })
      }
      this.noData = false
      getTaskDetail({
        id: query.taskId
      }).then(res => {
        if (res) { this.detail = res } else {
          this.noData = true
        }
      }).catch(err => {
        console.log('getTaskDetail faild :' + err)
      })
    }
  }
}

</script>
<style lang='scss' scoped type='text/css'>
ul {
  margin: 0;
  padding: 20px 0;
}
.left-item {
  display: block;
  margin-bottom: 20px;
  &::after,
  &::before {
    display: table;
    content: '';
  }
  .label {
    box-sizing: content-box;
    width: 64px;
    float: left;
    padding-left: 24px;
    padding-right: 12px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #6a74a5;
    letter-spacing: 0;
    line-height: 20px;
  }
  .value {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    margin-left: 100px;
    color: #3a3f63;
    letter-spacing: 0;
    text-align: justify;
    line-height: 20px;
  }
}
</style>

