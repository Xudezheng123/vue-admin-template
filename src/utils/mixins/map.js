import { natureCategory, articleCategory } from '@/api/config'
export const mapMixin = {
  data() {
    return {
      articleCategory: [], // 文章分类
      taskType: [ // 任务类型
        { value: '公众号文章', key: 0, type: 'default' }
      ],
      ntrType: [ // 是否自然教育类型
        { value: '是', key: 0, type: 'default' },
        { value: '否', key: 0, type: 'default' }
      ],
      taskStatus: [
        { value: '未完结', key: 1, type: 'warning' },
        { value: '进行中', key: 11, type: 'warning' },
        { value: '完成', key: 2, type: 'warning' },
        { value: '已过期', key: 3, type: 'warning' },
        { value: '取消', key: 4, type: 'primary' },
        { value: '打回', key: 5, type: 'success' }
      ],
      status: [
        { value: '待办', key: 0, type: 'warning' },
        { value: '编辑中', key: 1, type: 'primary' },
        { value: '完成', key: 3, type: 'success' }
      ],

      natrueStatus: [
        { value: '未开始', key: 0, type: 'primary' },
        { value: '报名中', key: 1, type: 'warning' },
        { value: '直播中', key: 2, type: 'success' },
        { value: '已结束', key: 3, type: 'info' }
      ],
      natureCategory: [] // 自然教育类型 线上或线下

    }
  },
  mounted() {
    this.initNatureCategory()
    this.initarticleCategory()
  },
  methods: {
    initNatureCategory() {
      natureCategory().then(res => {
        const { data } = res
        this.natureCategory = data
      })
    },
    initarticleCategory() {
      articleCategory().then(res => {
        const { data } = res
        this.articleCategory = data
      })
    }
  }
}
