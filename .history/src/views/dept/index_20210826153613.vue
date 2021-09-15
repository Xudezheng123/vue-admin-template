<!--template>
    <div class="app-container">
        <!-- 工具栏 -->
        <div class="head-container">
            <div>
                <!-- 搜索 -->
                <el-input v-model="listQuery.name" clearable size="small" placeholder="输入部门名称搜索" 
                style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
                <!-- <date-range-picker v-model="listQuery.createTime" class="date-item"></date-range-picker> -->
                <el-select v-model="listQuery.enabled" clearable size="small" placeholder="状态" class="filter-item" style="width:90px" >
                    <el-option v-for="item in enabledTypeOption" :key="item.key" :label="item.display_name" :value="item.key" />
                </el-select>
                <rrOperation />
            </div>
        </div>
    </div>
</template-->

<!--script>
import{ fetchList } from '@/api/article'
export default {
    name:'Dept',
    components:{},
    mixins:[],
    data(){
        return{
            depts:[],
            total:0,
            list:null,
            listLoading:true,
            listQuery:{
                name:undefined,
                page:1,
            }
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList() {
            this.listLoading = true
            fetchList(this.listQuery).then(response => {
                this.list = response.data.items
                this.total = response.data.total
                // Just to simulate the time of the request
                setTimeout(() => {
                this.listLoading = false
                }, 1.5 * 1000)
            })
        },
        handleFilter() {
            this.listQuery.page = 1
            this.getList()
        },
    }
}
</script-->