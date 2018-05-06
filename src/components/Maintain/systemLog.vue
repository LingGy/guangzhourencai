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
        <tr v-for="(list,index) in logs" :key="index">
          <td>{{list.T | formatDate1()}}</td>
          <td>{{list.ProcessName}}</td>
          <td>{{list.SystemName}}</td>
          <td class="ov"><p class="ov1">{{list.Log}}</p></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="console_box">
      <div class="console">
        <button :class="['console','c1',isA?'console1':'console2']" @click="lastPage()" :disabled="bt1">上一页</button>
        <button :class="['console','c2',isB?'console1':'console2']" @click="nextPage()" :disabled="bt2">下一页</button>
      </div>
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
            data:'name' + '' + '&page=' + page + '&count=20'
        })
           .then(function(res){
             vm.loading = false;
             let resData = res.data;
             if(resData.code == 0){
               if(resData.result){
                 vm.logs = resData.result;
               }else {
                 if(page>1){
                   vm.page = page - 1;
                   vm.isB = true;
                   vm.bt2 = true;
                 }
               }
               if(page>1){
                 vm.bt1 = false;
                 vm.isA = false;
               }else if(page == 1){
                 vm.bt1 = true;
                 vm.isA = true;
               }
             }else {
               vm.$message.error(resData.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //上一页
      lastPage: function () {
        let vm = this;
        vm.bt2 = false;
        vm.isB = false;
        vm.page = vm.page-1;
        vm.getLogLists(vm.page);
      },
      //下一页
      nextPage: function () {
        let vm = this;
        vm.page = vm.page+1;
        vm.getLogLists(vm.page);
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
        }
      }
    }
    .console_box{
      min-width: 987px;
      height: 30px;
      .console{
        width: 212px;
        margin: 0 auto;
        margin-top: 30px;
        .console{
          width: 82px;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
        .c1{
          float: left;
        }
        .c2{
          float: right;
        }
        .console1{
          border: solid 1px #999999;
          background-color: transparent;
        }
        .console2{
          background-color: #169bd8;
          color: #ffffff;
        }
      }
    }
  }
</style>

