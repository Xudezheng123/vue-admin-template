<template>
  <div class="p-page-container">
    <div class="content">
      <div class="title">
        {{ isEdit?"编辑任务":'新增任务' }}
      </div>
      <el-form ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        size="small"
        label-position="left">
        <el-form-item label="任务类型"
          prop="type">
          <el-select v-model="form.type">
            <el-option :value="0"
              label="公众号文章" />
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间"
          prop="finishTime">
          <el-date-picker v-model="form.finishTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00" />
        </el-form-item>
        <el-form-item label="标题"
          prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="素材图片"
          prop="medias">
          <!-- <el-input v-model='form.medias'></el-input> -->
          <iconUpload v-model="form.medias" />
        </el-form-item>
        <el-form-item :label="csz"
          prop="ntrType">
          <el-radio-group v-model="form.ntrType" @change="form.ntrType === 1? getGuestList(): ''">
            <el-radio :label="1">
              是
            </el-radio>
            <el-radio :label="0">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.ntrType"
          label="举行方式"
          prop="onLine">
          <el-radio-group v-model="form.onLine">
            <el-radio :label="1">
              线上直播
            </el-radio>
            <el-radio :label="0">
              线下活动
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.ntrType"
          label="嘉宾名称"
          prop="speaker"
          :rule="[{require:form.ntrType,message:&quot;必填&quot;}]">
          <el-col :span="4">
            <el-input v-model="form.speaker" placeholder="选择嘉宾名称" clearable></el-input>
          </el-col>
          <el-button icon="el-icon-search" size="small" type="primary" style="margin-left: 30px;" @click="dialogVisible = true">嘉宾名称</el-button>
          <!--<el-select v-model="form.speaker">
            <el-option v-for="(item,index ) in speaker"
              :key="index"
              :value="item.value"
              :label="item.label" />
          </el-select>-->
        </el-form-item>
        <el-form-item v-if="form.ntrType"
          label="嘉宾信息"
          prop="speakerIntro"
          :rule="[{require:true,message:&quot;必填&quot;}]">
          <el-input v-model="form.speakerIntro"
            type="speakerIntro"
            :rows="2" />
        </el-form-item>
        <el-form-item v-if="form.ntrType"
          label="活动时间"
          prop="dateRange"
          :rule="[{require:form.ntrType,message:&quot;必填&quot;}]">
          <el-date-picker v-model="form.dateRange"
            type="datetimerange"
            :default-time="['08:00:00', '22:00:00']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item v-if="form.ntrType"
          label="活动人数"
          prop="peopNum"
          :rule="[{require:form.ntrType,message:&quot;必填&quot;}]">
          <el-input-number v-model="form.peopNum" />
        </el-form-item>
        <el-form-item label="详情"
          prop="content">
          <el-input v-model="form.content"
            type="textarea"
            :rows="4" />
        </el-form-item>
        <el-button size="small"
          @click="resetForm('form')">
          取 消
        </el-button>
        <el-button type="primary"
          size="small"
          @click="submitForm('form')">
          确 定
        </el-button>
      </el-form>
    </div>
    <show-guest-list :visible.sync="dialogVisible" :guestList="speaker" @selectName="name => {form.speaker = name}"></show-guest-list>
  </div>
</template>

<script>
import { saveTask, updateTask, getTaskDetail } from '@/api/server.home.js'
import { getGuestsInfo } from '@/api/guest.pool'
import iconUpload from '../../components/icon.upload.list'
import showGuestList from "./showGuestList"
import { paginationMixin } from '@/plugin/mixins/pagination'
import util from '@/libs/util.js'
import dayjs from 'dayjs'
export default {
  components: { iconUpload, showGuestList },
  // props: ['value', 'isEdit', 'selected'],
  mixins: [paginationMixin],
  data() {
    return {
      isEdit: false,
      form: {
        title: '',
        medias: [],
        type: 0, // 任务类型
        ntrType: 0, // 自然类型：0非1是
        onLine: '',
        finishTime: '',
        speaker: '', // 自然类型时，演讲嘉宾
        speakerIntro: '', // 自然类型时，嘉宾介绍
        dateRange: [],
        content: '', // 详情内容
        peopNum: 1,
        status: 0 // 状态时，0为待办。1为编辑中，3为完成
      },
      dialogWidth: '800px',
      dialogVisible: false, //嘉宾对话框，默认隐藏
      dialogFormVisible: false,
      rules1: {
        title: [{ required: true, message: '必填' }],
        type: [{ required: true, message: '必选' }],
        ntrType: [{ required: true, message: '必选' }],
        onLine: [{ required: true, message: '必选' }],
        content: [{ required: true, message: '必填' }]
      },
      rules2: {
        title: [{ required: true, message: '必填' }],
        ntrType: [{ required: true, message: '必选' }],
        type: [{ required: true, message: '必选' }],
        content: [{ required: true, message: '必填' }]
      },
      speaker: {}, // 演讲嘉宾列表
      csz:"自然教育素材"
    }
  },

  computed: {
    dialogTitle() {
      return this.isEdit ? '编辑' : '新建任务'
    },
    rules() {
      return this.form.ntrType ? this.rules1 : this.rules2
    }
  },

  watch: {
    value(val) {
      this.dialogFormVisible = val
    },
    dialogFormVisible(val) {
      this.$emit('input', val)
    }
  },

  mounted() {
	if(this.$route.query.id){
		this.csz="活动素材";
		console.log("路由",this.$router)
	}

    this.initPage();
  },

  methods: {
    initPage() {
      this.isEdit = false
      const { query } = this.$route
      if (query && query.isEdit) {
        this.isEdit = true
        const { data } = query
        const { id } = data
        getTaskDetail({ id }).then((data) => {
          if (data) {
            this.initEditForm(data)
          }
        })
      }
    },

    initEditForm(data) {
      this.isEdit = true
      this.form = Object.assign(this.form, data)
      if (data.type) {
        const { startTime, endTime } = data
        this.form.dateRange = [startTime, endTime]
      }
      // 将图片资源转换
      this.form.medias = data.mediaList.map((item) => {
        return item.mediaName
      })
      delete this.form.mediaList
      delete this.form.createTime
    },
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
        this.$refs[formName].clearValidate()
        util.cookies.remove('editTask')
      } else {
        console.log('the form is not exists.' + formName)
      }
      console.log(this.$route)
      this.$router.go(-1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const form = { ...this.form }
        if (form.dateRange.length) {
          form.startTime = dayjs(form.dateRange[0]).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          form.endTime = dayjs(form.dateRange[1]).format('YYYY-MM-DD HH:mm:ss')
        }

        form.finishTime = dayjs(form.finishTime).format('YYYY-MM-DD HH:mm:ss')
        delete form.dateRange
        if (valid) {
          if (this.isEdit) {
            updateTask({
              ...form
            })
              .then(() => {
                this.$message.success(this.isEdit ? '编辑成功' : '新增成功')
                this.resetForm(formName)
              })
              .catch((err) => {
                console.log('err', err)
              })
          } else {
            saveTask({
              ...form
            })
              .then(() => {
                this.$message.success(this.isEdit ? '编辑成功' : '新增成功')
                this.resetForm(formName)
              })
              .catch((err) => {
                console.log('err', err)
              })
          }

          this.$emit('closed')
        } else {
          console.log(valid)
          return false
        }
      })
    },
    //获取嘉宾库中的信息
    getGuestList(){
        return new Promise((resolve) => {
          // console.log(this.pagination.currentPage, this.pagination.pageSize)
          getGuestsInfo({
            nickName:'',
            status:'',
            name:'',
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize
          }).then(res => {
            res.length === 0? this.speaker = {}: this.speaker = res
          })
          resolve()
        })
    }
  }
}
</script>

<style lang='scss' scoped type='text/css'>
.content {
  background: #fff;
  padding: 20px;
  .title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
}
</style>
