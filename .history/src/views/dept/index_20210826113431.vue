<template>
    <div class="app-container">
        <!-- 工具栏 -->
        <div class="head-container">
            <div>
                <!-- 搜索 -->
                <el-input v-model="query.name" ></el-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Dept',
    components:{},
    mixins:[],
    data(){
        return{
            depts:[],
            rules:
        }
    }
}
</script>