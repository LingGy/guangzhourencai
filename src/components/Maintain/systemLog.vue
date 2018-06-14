<template>
  <div id="systemLog">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 系统维护 > 系统日志</p>
    <div class="t_box">
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
      }
    },
    mounted: function () {
      this.getLogLists(this.page);
    },
    methods:{
      //获取日志列表
      getLogLists: function (page) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+'/log',
            data:'name=' + '' + '&page=' + page + '&count=20'
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
        this.getLogLists(val);
      },
      handleCurrentChange(val) {
        this.getLogLists(val);
      },
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

