/*eslint-disable*/
export const paginationMixin = {
  data() {
    return {
      loading: false,
      data: [],
      currSelectedRows: [], // 选中项
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        layout: '->, prev, pager, next, total',
		    pageNum:1
      }

    }
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading
    },
    fetchData(option) {
      option = Object.assign({ needInit: true, needLoading: true, callback: undefined }, option)
      const { needInit, needLoading, callback } = option
      needLoading && this.toggleLoading()
      needInit && this.initCurrentPage()
      if (this.getData) {
        this.getData()
          .then(() => {
            needLoading && this.toggleLoading()
            callback && callback()
          })
          .catch(() => {
            needLoading && this.toggleLoading()
          })
      } else {
        needLoading && this.toggleLoading()
      }
    },

    handleSearchFormReset(formName, callback) {
      this.$refs[formName].resetFields()
      for (const key in this[formName]) {
        switch (typeof this[formName][key]) {
          case 'string':
            this[formName][key] = ''
            break
          case 'number':
            this[formName][key] = 0
            break
          case 'object':
            if (Array.isArray(this[formName][key])) {
              this[formName][key] = []
            } else {
              this[formName][key] = {}
            }
            break
          default:
            break
        }
      }
      callback && callback()
    },

    handleSortChange(val) {
      this.sort.prop = val.prop
      this.sort.order = val.order
      this.fetchData({
        needInit: false
      })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.fetchData({
        needInit: false
      })
    },
    initCurrentPage() {
      this.pagination.currentPage = 1
    },
    paginationCurrentChange(val) {
      this.pagination.currentPage = val
      this.fetchData({ needInit: false })
    },
    handleSelectionChange(val) {
      this.currSelectedRows = val
    }

  }
}
