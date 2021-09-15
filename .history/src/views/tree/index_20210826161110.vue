<template>
<div class="fileDetails">
	 <el-form style="border-bottom: 1px solid lightgray;"  ref="from" >

          <div class="elFromdiv">
            <label  class="lanbel">产品：</label> 
            <el-select v-model="prpjecSelectid" placeholder="请选择" @change="selectproduct" >
                        <el-option
                                v-for="item in projectlist"
                                :key="item.product_id"
                                :label="item.pro_name"
                                :value="item.product_id">
                        </el-option>
             </el-select>
          </div>     
          <div class="elFromdiv">
             <label class="lanbel">Qbuild id：</label><el-input v-model="form.quildID"  @keyup.enter.native="keyEnter()"  placeholder="请输入内容" clearable></el-input>
          </div>
          <div class="elFromdiv">
              <label class="lanbel">Qbuild 项目：</label><el-input v-model="form.qbuildDemo" @keyup.enter.native="keyEnter()"  placeholder="请输入内容" clearable></el-input>
          </div>   
          <div class="elFromdiv">
          	   <label class="lanbel">Qbuild 任务：</label><el-input v-model="form.qbuildTask" @keyup.enter.native="keyEnter()"  placeholder="请输入内容" clearable></el-input>
          </div>
          <div class="elFromdiv">
          	   <label  class="lanbel">文件后缀：</label> 
                 <el-select v-model="extListTime" placeholder="请选择"  @change="selectproduct()" >
                                    <el-option
                                            v-for="item in extList"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                 </el-select>
          </div> 
           <div class="elFromdiv">
                <label class="lanbel">文件名称：</label><el-input v-model="form.filename" @keyup.enter.native="keyEnter()"  placeholder="请输入内容" clearable></el-input>
           </div>
          <div  class="elFromdiv">
            <label   class="lanbel">当前节点：</label> 
                 <el-select v-model="nodeid" placeholder="请选择"  @change="selectproduct()" >
                                    <el-option
                                            v-for="item in nodeList"
                                           
                                            :key="item.node"
                                            :label="item.nodeName"
                                            :value="item.node">
                                    </el-option>
                 </el-select>
          </div>
          <div style="display: inline-block;" >
             <label class="lanbel" >创建时间：</label>
                <el-date-picker
                  v-model="value2"
                  type="datetimerange" 
                  align="right"
                  unlink-panels
                  @change="selectproduct"
                  value-format='yyyy-MM-dd HH:mm:ss'
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00','23:59:59']">
                  :picker-options="pickerOptions">
                </el-date-picker>
          </div>
     <div class="elFromdiv">
                  <el-button
                    style="margin-left: 16px;"
                    class="btn-add"
                    @click="resetContent">重置</el-button>
                  <el-button
                    style="margin-left: 16px;"
                    type="primary"
                    class="btn-add"
                    @click="keyEnter()">查询</el-button>
      </div>
     </el-form>
     <div class="detail_middel">
 <template >
                  <el-button
                  style=""
                    class="btn-detial"
                    type="primary"
                    @click="">提测</el-button>
                    <el-button
                    class="btn-detial"
                    style="background:#7AB703;color: white;border: none;"
                    @click="">审计</el-button>
                    <el-button
                    class="btn-detial"
                    style="background:#0000FF;color: white;border: none;"
                    @click="">申请</el-button>
                    <el-button
                    class="btn-detial"
                    type="warning"
                    @click="">打包</el-button>
                    <el-button
                    class="btn-detial"
                    style="background:#8400FF;color: white;border: none;"
                    @click="">发布</el-button>
                    <el-button
                    class="btn-detial"
                    type="success"
                    style="background:#00BFBF;color: white;border: none;"
                    @click="">升级</el-button>
         </template>
     </div>
    <template>
      
       <div>
    <!--<el-button type="primary" @click="showData()">自定义列</el-button>-->
    <div id="table-content">
    	

      <el-table :data="tableData" class="tables"  
      	row-key="id" ref="multipleTable"  v-loading="loading"  tooltip-effect="dark" 
      	style="width: 100%" @selection-change="handleSelectionChange"
      	>
      	    <el-table-column
		      type="selection"
		      containment="parent"
		      fixed="left"
		      width="60">
		    </el-table-column>
		     <el-table-column
			      prop="childName"
			     containment="parent"
			     fixed="left"
			      label="标签"
			      width="90">
			    </el-table-column>
        <el-table-column 
        	v-for="(v,i) in cols" 
        	:label="v.label" 
        	:prop="dropCol[i].prop"
        	:key="`cols_${i}`"
        	class-name="allowDrag"
        	>
        	<template slot-scope="scope" >
			        <span type="text" size="small"
					 :class="[
					v.prop=='dexSizeDiff' && scope.row[v.prop]!='' && scope.row.differenceType=='DECREASE' ?'activeGreen':'',
					v.prop=='dexSizeDiff' && scope.row[v.prop]!='' && scope.row.dsDiffType=='UNCHANGE' ?'activeBlack':'',
					v.prop=='dexSizeDiff' && scope.row[v.prop]!='' && scope.row.mcDiffType=='INCREASE' ?'activeRed':'',
					v.prop=='methodCountDiff' && scope.row[v.prop]!='' && scope.row.differenceType=='DECREASE' ?'activeGreen':'',
					v.prop=='methodCountDiff' && scope.row[v.prop]!='' && scope.row.dsDiffType=='UNCHANGE' ?'activeBlack':'',
					v.prop=='methodCountDiff' && scope.row[v.prop]!='' && scope.row.mcDiffType=='INCREASE' ?'activeRed':'',
					 ]" >
					 <el-button type="text" v-if="dropCol[i].prop=='md5'" @click="handleCopy(scope.row[dropCol[i].prop])">复制</el-button>
			        	{{scope.row[dropCol[i].prop]?scope.row[dropCol[i].prop]:'-'}}
			        </span>
			    </template>
        </el-table-column>
       <el-table-column
      fixed="right"
      width="250">
      <template slot="header" >
       <span style="margin-right: 18px;">操作</span>
        <el-button 
          type="primary" 
         
           style="background:rgba(132,0,255);color: white;border: none;"
          @click="showData()">自定义列</el-button>
            <el-button 
          type="primary" 
           style="background:rgba(132,0,255);color: white;border: none;"
          @click="sortData()">排序列</el-button>
      </template>
      <template slot-scope="scope">
       
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        <el-button @click="handleJoinPeople(scope.row)" type="text" size="small">节点状态</el-button>
        <el-button type="text" size="small">去安审</el-button>
        <el-button type="text" size="small">催办</el-button>
      </template>
      

    </el-table-column>
    
   
    
      </el-table>
     
    </div>
    <el-dialog title="选择需要展示的字段" :visible.sync="dialogFormVisible" width="40%" center top='15vh'>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
	    <span style="margin-left: 1rem;cursor: pointer;" @click="restoreDefault()">恢复默认值</span>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox  style="margin: 12px 16px;" v-for="item in cities" :label="item.prop" :key="item.prop" > {{item.label}}</el-checkbox>
      </el-checkbox-group> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false" size='medium'>取 消</el-button>
        <el-button type="primary" @click="confirmShow" size='medium'>确定</el-button>
      </div>
    </el-dialog> 
  </div>


    <!--<el-table
      :data="tableData"  
      style="width: 100%;margin-left: 0.3rem;">
      <el-table-column prop="date"    label="日期" max-width=""></el-table-column>
      <el-table-column prop="name"    label="姓名" max-width="">
      	 <template slot-scope="scope" >
      	 	 <span @mouseover="drawer=true">{{ scope.row.name }}</span>
      	 </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" max-width=""></el-table-column>
     <el-table-column >
      <template slot="header" >
       <span>操作</span>
         <el-button
          class="btn-detial"
          type="success"
          style="background:#8080ff;color: white;margin-left:3rem;border: none;"
          @click="dialogVisible=true">自定义列</el-button>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>-->
     <div class="block" style="display: flex;align-items: center;justify-content: center;">
   <el-button-group>
  <el-button type="primary" icon="el-icon-arrow-left" @click="pageGo(1)">上一页</el-button>
  <el-button type="primary" @click="pageGo(-1)">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
</el-button-group>
  </div>
  </template>
  
			<el-drawer
			  title="我是标题"
			  :visible.sync="drawer"
			  :with-header="false">
			  <div class="block">
			    <div style="margin: 20px 0px;"> 文件流转 </div>
					  <el-timeline style="margin-top: 10px;">
					    <el-timeline-item
					      v-for="(activity, index) in activities"
					      :key="index"
					      :type="activity.type"
					      color="activity.color"
					      :size="activity.size"
					      :timestamp="activity.timestamp">
					      <p>{{activity.node}}</p>
					      <p>{{activity.nodeStatus}}</p>
					      <p>{{activity.time}}</p>
					    </el-timeline-item>
					  </el-timeline>
					</div>
			</el-drawer>
	<el-dialog
	  title="详情展示"
	  :visible.sync="dialogVisible"
	  width="41%"
	  :before-close="handleClose">
	
	  	 <p><span>产品名称：</span>{{detailProduct}}</p>
	     <p v-for="(v,i) in cities"> <span>{{v.label}} :</span> {{detailList[v.prop]}}</p>
	
	           
	        	<!--<p><span>文件名称：</span>{{detailList.fileName}}</p>
	            <p><span>版本：</span>{{detailList.version}}</p>
	            <p><span>qbuild项目Id：</span>{{detailList.qbuildPid}}</p>
	            <p><span>qbuild任务Id：</span>{{detailList.qbuildTid}}</p>
	            <p><span>qbuild编译任务Id：</span>{{detailList.qbuildCid}}</p>
	            <p><span>创建时间：</span>{{detailList.createTime}}</p>
	            <p><span>更改时间：</span>{{detailList.updateTime}}</p>
	            <p><span>当前节点：</span>{{detailList.currentNode}}</p>
	            <p><span>下一节点：</span>{{detailList.nextNode}}</p>
	            <p><span>md5：</span>{{detailList.md5?detailList.md5:'-'}}</p>
	            <p><span>包名：</span>{{detailList.packageName?detailList.packageName:'-'}}</p>
	            <p><span>操作人：</span>{{detailList.operator?detailList.operator:'-'}}</p>
	            <p><span>文件大小：</span>{{detailList.fileSize}}</p> 
	            <p><span>文件大小差异：</span>{{detailList.difference ? detailList.difference : "-" }}</p>
	            <p><span>dex大小：</span>{{detailList.dexSize ? detailList.dexSize : "-" }}</p>
	            <p><span>dex大小差异：</span>{{detailList.dexSizeDiff ? detailList.dexSizeDiff : "-" }}</p>
	            <p><span>方法数：</span>{{detailList.methodCount ? detailList.methodCount : "-" }}</p>
	            <p><span>方法数差异：</span>{{detailList.methodCountDiff ? detailList.methodCountDiff : "-" }}</p>-->
	  <span slot="footer" class="dialog-footer">
	    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
	    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
	  </span>
	</el-dialog>
	
	
	
			   
</div>
</template>
<script >
	import Cookies from 'js-cookie';
	 import {updatePageConfig ,getConfigration , getFiles } from '@/api/test'
	import { getProductList } from "@/api/index";
	import {getCurrentUser} from '@/api/user'
	import Sortable from 'sortablejs'
	 export default {
	 	name:'fileDetail',
	 	data(){
	 	  
	 		return{
	 			cityOptions : [], //自定义列所有的数据
	 		    checkAll: false,  //全选checkbox true false
                checkedCities: [], //填入自定义列默认数据
		        cities: [
		              
		        ],   //对象数组全部的数据
		         cols: [   //循环用户定义的列
		     
		        ],
		        dropCol:[],
		        extList:[], //文件后缀列表
		        loading:true,//表格加载等待
		        nodeList:[],//节点筛选
		        nodeid:'',//节点model
		        tempCols: [],  //临时的数据容器
		        isIndeterminate: false,   //默认全选
		        dialogFormVisible: false,
	 			checkList: ['选中且禁用','复选框 A'],
		 		transferFlag:false,
		 			 drawer: false,
		 		     tableData: [],
		 			 projectlist:[],
		 			  activities: [
			        ],
			     extListTime:'',
	 			 prpjecSelectid:0,
	 			 pickerOptions: {
		          shortcuts: [{
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		        },
        		value2: '',
        		currentPage4:4,
		        value: [],
		         dialogVisible: false,
		 		form:{
		 			quildID:'',
		 			qbuildDemo:'',
		 			qbuildTask:'',
		 			cruunTcode:'',
		 			filename:'',
		 			ext:''
		 		},
		 		page:{
		 			ps:0,
		 			pn:10
		 		},
		 		rst:{},
		 		multipleSelection: [],
		 		detailList:{},
		 		lastId:'',
		 		deal:1,
		 		detailProduct:''
	 		}
	 	},
	 	async mounted(){
	 	  this.columnDrop();
//        this.rowDrop()
	 	  let product=await getCurrentUser();
	 	  if(product.data.errno==2000){
         this.projectlist=product.data.data.products;
         this.projectlist.unshift({
           product_id:0,
           pro_name:'全部'
         })
//       await this.getFilesList();
         await this.qbuildlist();
	 	  }    
	 	},
	 	computed:{
	 	   mengment(){      //映射模块
	 	     
	 	   }
	 	},
	 	methods:{
	 		  rowDrop() {
			      const tbody = document.querySelector('.el-table__body-wrapper tbody')
			      const _this = this
			      Sortable.create(tbody, {
			        onEnd({ newIndex, oldIndex }) {
			          const currRow = _this.tableData.splice(oldIndex, 1)[0]
			          _this.tableData.splice(newIndex, 0, currRow)
			        }
			      })
			    },
		 	columnDrop() {
		          const wrapperTr = document.querySelector('.tables tr');
			      this.sortable = Sortable.create(wrapperTr, {
			      	handle:'.allowDrag',
			        animation: 180,
			        delay: 0,
			        onEnd: evt => {
			          const oldItem = this.dropCol[evt.oldIndex-2];
			          this.dropCol.splice(evt.oldIndex-2, 1)
			          this.dropCol.splice(evt.newIndex-2, 0, oldItem);
			        }
			      })
			      
		    },
		  GetQueryString(name)
		  {
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
			     if(r!=null)return  unescape(r[2]); return null;
		  },
		   handleCopy(row){
		      this.copyData = row
		      this.copy(this.copyData)
		    },
		   copy(data){
	        let url = data;
		        let oInput = document.createElement('input');
		        oInput.value = url;
		        document.body.appendChild(oInput);
		        oInput.select(); // 选择对象;
		        document.execCommand("Copy"); // 执行浏览器复制命令
		        this.$message({
		          message: '复制成功',
		          type: 'success'
		        });
		        oInput.remove()
	      },
	 	  qbuildlist(){
	        let qbuildCid=this.GetQueryString('qbuildCid')||"";
	 	  	let qbuildTid=this.GetQueryString('qbuildTid')||"";
	 	  	let qbuildPid=this.GetQueryString('qbuildPid')||"";
		      this.form.quildID=qbuildCid;
		      this.form.qbuildDemo=qbuildPid;
		      this.form.qbuildTask=qbuildTid;
              this.loading=true;
              this.lastId='';
              this.deal=1;
              this.getFilesList();
	 	  },
	 	  pageGo(v){
	 	    this.loading=true;
	 	    if(v==1){
	 	        this.deal=1;
	 	        this.lastId=this.tableData[0].id;
	 	        this.getFilesList();
	 	    }else{
	 	       if(this.tableData.length<10){
               this.$message({
                message: '已经是最后一页',
                type: 'warning'
           });
             this.loading=false;
             return;
            }else{
            this.deal=-1;
            this.lastId=this.tableData[this.tableData.length-1].id;
            this.getFilesList();
            }
	 	    }
	 	  },
	 	  selectTime(){
	 	    this.loading=true;
	 	    this.lastId='';
	 	    this.deal=1;
	 	    this.getFilesList();
	 	  },
	 	  selectproduct(){
	        this.loading=true;
	        this.lastId='';
	        this.deal=1;
	 	    this.getFilesList()
	 	  },
	 		handleJoinPeople(row,id){
	 				this.drawer=true;
	 				this.activities=row.pipeline;
	 		},
	    async handleSelectionChange(row){
		   },
	 	   //全选按钮
	      handleCheckAllChange(val) {
	          this.checkedCities = val ? this.cityOptions : [];
	          this.isIndeterminate = false;
	      },
		 
  //单个选中
	      handleCheckedCitiesChange(value) {
	      	
	        let checkedCount = value.length;
	        this.checkAll = checkedCount === this.cities.length;
	        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
	      },
	  async restoreDefault(){
        let prop=["fileName","version","fileSize",
        "productId","currentNode","nextNode","currentStatus",
        "createTime","updateTime"
        ];
        this.checkedCities=prop;
        this.checkAll=false
	  },
      showData(row) {
        this.dialogFormVisible = true;
      },
     
      async confirmShow() {
        this.tempCols = [];
        if (this.checkedCities.length < 1) {
          this.$message.warning("请至少选择一项数据");
          this.dialogFormVisible = true;
        } else {
          for (var i = 0; i < this.cities.length; i++) {
            for (var j = 0; j < this.checkedCities.length; j++) {
              if (this.cities[i].prop == this.checkedCities[j]) {
                this.tempCols.push(this.cities[i]);
              }
            }
          }
        
          let cities=this.cities;
          let pageProperty=[];
          let detailProperty=[];
          for(let i=0;i<cities.length;i++){
          	for(let j=0;j<this.checkedCities.length;j++){
          		if(cities[i].prop==this.checkedCities[j]){
          			cities[i].status=-1;
          		}
          	}
          }
          cities.forEach((v)=>{   //处理数据
          	if(v.status==-1){
          		pageProperty.push({
          			 property:v.prop,
                 	 propertyName:v.label
          		})
          	}else{
          		detailProperty.push({
          			 property:v.prop,
          			 propertyName:v.label
          		})
          	}
          });
          console.log(this.dropCol);
          console.log(pageProperty)
          const cookie = Cookies.get('userMd5');   //获取
          let list =await this.getConfigrations()
          let data={};
          data.productId=this.prpjecSelectid||0;
          data.configId=list.configId||'';
          data.userMd5=cookie;
          data.pageProperty=JSON.stringify(pageProperty);
          data.detailProperty=JSON.stringify(detailProperty);
          await updatePageConfig(data);
          this.cols = this.tempCols;
          this.dropCol= this.tempCols;
          this.dialogFormVisible = false;
        } 
      },
       async sortData(){
      	
      	
      },
      async getConfigrations(){  //获取产品页面配置
            const cookie = Cookies.get('userMd5');
            let data1={};
            data1.productId=this.prpjecSelectid;///file/getConfigration
            data1.userMd5=cookie;
            let listNode = await getConfigration(data1);
            if(listNode.data.errno==2000){
               const list =listNode.data.data;
                return list;
            }
           
      },
      async getFilesFun(){ //文件管理
            let data={};
            data.productId=this.prpjecSelectid;
            data.qbuildPid=this.form.qbuildDemo||'';
            data.qbuildTid=this.form.qbuildTask||'';
            data.qbuildCid=this.form.quildID||'';
            data.fileName=this.form.filename||"";
//          data.ext=this.form.ext||'';
            data.ext=this.extListTime||'';
            data.createTime=this.value2||"";
            data.updateTime="";
            data.currentNode=this.nodeid;
            data.lastId=this.lastId||'';
            data.ps=this.page.pn||'';
            data.deal=this.deal||'';
            let listFile= await getFiles(data);
            if(listFile.data.errno==2000){
            const fileList=listFile.data.data;
            return fileList;
            }
      },
	 		async getFilesList(){
	 			
  	 		let list =await this.getConfigrations();
  	 	  let fileList=await this.getFilesFun();
        let pageLength=fileList.fileList.length;
                this.loading=false;
                let cols=[],checkedCities=[],cityOptions=[],cities=[],extList=[],dropCol=[];
               	list.pageProperty.forEach((v,i)=>{
             		checkedCities.push(v.property);
             		cityOptions.push(v.property);
             		cols.push({
             			prop:v.property,
             			label:v.propertyName
             		});
             		dropCol.push({
             			prop:v.property,
             			label:v.propertyName
             		})
             		cities.push({
             			prop:v.property,
             			label:v.propertyName,
             			status:false
             		})
             	})
             	list.detailProperty.forEach((v)=>{
             		cityOptions.push(v.property);
             		cities.push({
             			prop:v.property,
             			label:v.propertyName,
             			status:false
             		})
               });
          	   this.tableData=fileList.fileList;
          	   this.nodeList=list.nodeList;
          	   this.extList=list.extList;
          	   this.cols=cols;
          	   this.dropCol=dropCol;
          	   this.checkedCities=checkedCities;
          	   this.cityOptions=cityOptions;
          	   this.cities=cities;
	 		},
	 		checkboxList(){
	 			
	 		},
	 		handleClose(done) {
	 		  this.dialogVisible=false;
		      },
	 		keyEnter(){
			    this.loading=true;
			    this.lastId='';
			    this.deal=1;
	 			this.getFilesList();
	 		},
	 		resetContent(){
            this.loading=true;
            this.prpjecSelectid=0;
            this.form.quildID='';
            this.form.qbuildTask='';
            this.form.qbuildDemo='';
            this.value2='';
            this.nodeid='';
            this.lastId='';
            this.deal=1;
            this.extListTime='';
            this.form.filename='';
            this.getFilesList();
	 		},
	 		handleClick(row){
//	 			console.log(row)
	 		      let productDetail=''
    	 			this.detailList=row;
    	 			this.dialogVisible=true;
    	 			this.projectlist.forEach((v)=>{
		             if(v.product_id ==row.productId){
		               productDetail=v.pro_name
		             }
		            });
		            
    	 			this.detailProduct=productDetail;
	 		},
		  handleEdit(index, row) {
		  },
		  handleDelete(index, row) {
		  }
	 	}
	 }
</script>
<style scoped>
.el-input{
  width: 193px;
}
.fileDetails{
	background: white;
	box-sizing: border-box;
	padding: 1rem 0rem;
}
.lanbel{
  margin-left: 16px;
  font-size: 14px;
}
.block{
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
}
.detail_middel{
	margin-top:1rem;
	margin-left: 1rem;
	margin-bottom: 1rem;
}
.fileDetails{
	
}
.elFromdiv{
  display: inline-block;
  margin-bottom: 12px;
}
.activeGreen{
	color: greenyellow
} 
.activeBlack{
	color: black;
}
.activeRed{
	color: red;
}
</style>