  <template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.title" placeholder="所属系统" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        </div>
        <el-table
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%">
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
        </el-table>        
    </div>
  </template>

  <script>
  /* eslint-disable */
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
          }]
        }
      }
    }
  </script>