<template>
  <div id="systemLog">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 系统维护 > 系统日志</p>
    <div class="t_box">
      <div class="top">
        <div class="top_left">
          <div class="bule"></div>
          <p>系统日志</p>
        </div>
        <div class="top_right">
          <input type="text" class='name' placeholder='系统名称' v-model="name">
          <el-button icon="el-icon-search" class='btnsearch' @click="search()" circle></el-button>
        </div>
      </div>
      <table class="tbox" v-loading="loading">
        <thead>
        <tr>
          <th>日期</th>
          <th>系统名</th>
          <th>进程名</th>
          <th>日志信息</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(list,index) in logs" :key="index" :class="{warn:list.Level== 1 ? true:false,error:list.Level == 2?true:false}">
          <td>{{list.T | formatDate1()}}</td>
          <td>{{list.ProcessName}}</td>
          <td>{{list.SystemName}}</td>
          <td class="ov"><p class="ov1">{{list.Log}}</p></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="console_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="count"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name:'systemLog',
    data: function () {
      return {
        logs:[],
        page:1,
        loading:true,
        bt1:true,
        bt2:false,
        isA:true,
        isB:false,
        count:20,
        total:0,
        name:'',
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
      }
    },
    mounted: function () {
      this.getLogLists(this.name,this.page);
    },
    methods:{
      //获取日志列表
      getLogLists: function (name,page) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+'/log?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
            data:'name=' + name + '&page=' + page + '&count=20'
        })
           .then(function(res){
             vm.loading = false;
             let resData = res.data;
             if(resData.code == 0){
                 vm.logs = resData.result.datas;
                 vm.total = resData.result.total;
             }else {
               vm.$message.error(resData.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      handleSizeChange(val) {
        this.getLogLists(this.name,val);
      },
      handleCurrentChange(val) {
        this.getLogLists(this.name,val);
      },
      //搜索
      search: function () {
        this.page = 1;
        this.getLogLists(this.name,this.page)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #systemLog{
    table,thead,tbody,tr,th,td{
      border: 1px solid #dedede;
    }
    .t_box{
      min-height: 700px;
      .top {
        width: 100%;
        height: 28px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        .top_left {
          width: 82px;
          height: 100%;
          display: flex;
          justify-content: space-between;
          .bule {
            width: 4px;
            height: 100%;
            background-color: #169bd8;
          }
          p {
            font-size: 18px;
            color: #454545;
            margin-left: 5px;
            line-height: 28px;
          }
        }
        .top_right {
          .name {
            float: left;
            width: 134px;
            height: 28px;
            font-size: 12px;
            color: #999999;
            padding-left: 4px;
            margin-right: 14px;
          }
          .btn_search {
            float: right;
            width: 90px;
            height: 28px;
            background-color: #169bd8;
            border: none;
            font-size: 18px;
            line-height: 28px;
            text-align: center;
            color: #ffffff;
          }
          .btnsearch{
            padding: 8px;
          }
        }
      }
      .tbox{
        min-width: 987px;
        border-collapse: collapse;
        color: #454545;
        line-height: 32px;
        text-align: center;
        thead{
          tr{
            height: 32px;
            background-color: #eef6ff;
            font-size: 16px;
          }
        }
        tbody{
          tr{
            height: 32px;
            font-size: 14px;
            .ov{
              text-align: left;
              .ov1{
                width: 400px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding-left: 20px;
              }
            }
          }
          .warn{
            color: #FF7F00;
          }
          .error{
            color: red;
          }
        }
      }
    }
    .console_box{
      min-width: 987px;
      height: 30px;
      text-align: center;
      margin-top: 40px;
      margin-bottom: 100px;
    }
  }
</style>

