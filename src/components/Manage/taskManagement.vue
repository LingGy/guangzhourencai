<template>
  <div id="taskManagement">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 爬虫管理 > 任务管理</p>
    <p class="crawlerName">{{Base.name_ch | Hname()}}</p>
    <p class="connect"><i>爬虫名称</i>:<span>{{Base.name}}</span></p>
    <p class="connect"><i>程序名</i>:<span>{{Base.app_name}}</span></p>
    <p class="connect"><i>目标网址</i>:<span>{{Base.target_url}}</span></p>
    <p class="connect"><i>机器名</i>:<span>{{Base.machine_name}}</span></p>
    <p class="connect"><i>机器ID</i>:<span>{{Base.machine_ip}}</span></p>
    <p class="connect"><i>运行状态</i>:<span>{{Run.status | statusInfo()}}</span></p>
    <p class="connect"><i>操作命令</i>:<span v-if=ifdata><button type='button' @click="orders('start')">启动</button><button type='button' @click="orders('pause')">暂停</button><button type='button' @click="orders('resume')">恢复运行</button><button type='button' @click="orders('stop')">停止</button></span></p>
    <!--<p class="connect">上次运行时间&nbsp;:<span>{{Run.end_time}}</span></p>-->
    <!--<p class="running">运行状态&nbsp;:<span>运行中</span></p>-->
    <!--<p class='time'>启动时间&nbsp;:<span class='start_time'>2018-03-04 00:00:00</span><button type='button' class='btn_set'>设置</button></p>-->
    <!--<p class='time'>启动时间&nbsp;:-->
      <!--<el-date-picker v-model="startTime" type="datetime" placeholder="选择日期时间">-->
      <!--</el-date-picker>-->
      <!--<button type='button' class='btn_set' @click='setTime()'>设置</button>-->
    <!--</p>-->
    <div class="log_box">
      <p class="log">运行日志</p>:
      <div class="t_box">
        <table class="tbox">
          <thead>
          <tr>
            <th>日期</th>
            <th>系统名</th>
            <th>进程名</th>
            <th>日志信息</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(list,index) in loginfo" :key="index">
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
  </div>
</template>

<script type="text/ecmascript-6">
  // import Bus from '../../assets/js/bus.js'
  export default {
    name:'taskManagement',
    data: function () {
      return {
        Base:{},
        Run:{},
        loginfo:[],
        startTime:'',
        page:1,
        bt1:true,
        bt2:false,
        isA:true,
        isB:false,
        testcrawler:'',
        ifdata:false,
      }
    },
    filters:{
      Hname: function (chname) {
        return chname != ''? chname : this.Base.name;
      },
    },
    mounted: function () {
      let vm = this;
      vm.testcrawler = sessionStorage.getItem("CrawlerId");
      vm.getdata(vm.testcrawler);
      vm.getlog(vm.testcrawler);
    },
    methods:{
      //初始
      getdata: function (testcrawler) {
        let vm = this;
        if(testcrawler){
          vm.$axios({
            method:'get',
            url:window.$g_url.ApiUrl_1+"/crawler?name=" + testcrawler,
          })
            .then(function(res){
              let resDatas = res.data;
              if(resDatas.code == 0){
                vm.Base = resDatas.result.Base;
                vm.Run = resDatas.result.Run;
                vm.ifdata = true;
              }else {
                vm.$message.error(resDatas.message);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        }
      },
      //初始log
      getlog: function (testcrawler) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/log?name='+testcrawler,
        })
          .then(function(res){
            if(res.data.code == 0){
              if(res.data.result){
                vm.loginfo = res.data.result;
              }
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
      },
      //获取日志列表
      getLogLists: function (page) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/log',
          data:'name=' + vm.testcrawler + '&page=' + page + '&count=20'
        })
          .then(function(res){
            vm.loading = false;
            let resData = res.data;
            if(resData.code == 0){
              if(resData.result){
                vm.loginfo = resData.result;
              }else {
                if(page>1){
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
      //操作命令
      orders: function (order) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl_1+'/controler?name='+vm.testcrawler+'&command='+order,
        })
           .then(function(res){
             if(res.data.code == 0){
               vm.getdata(vm.testcrawler);
             }
           })
           .catch(function(err){});
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #taskManagement{
    p.connect{
      margin-bottom: 10px;
      display: flex;
      justify-content: start;
      i{
        display: inline-block;
        width: 80px;
        font-size: 16px;
        color: #545454;
      }
      span{
        font-size: 14px;
        margin-left: 10px;
        display: flex;
        justify-content: start;
        button{
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          padding: 0px 6px;
          background-color: #169bd8;
          color: #ffffff;
          margin-right: 8px;
        }
      }
    }
    .crawlerName{
      color: #169bd8;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .log_box{
      .log{
        float: left;
        width: 80px;
        font-size: 16px;
        color: #545454;
        margin-bottom: 10px;
      }
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
    .btn_set{
      font-size: 16px;
      color: #169bd8;
      background-color: transparent;
      margin-left: 10px;
    }
    .start_time{
      display: inline-block;
      width: 184px;
      height: 22px;
      border: solid 1px #53b1dc;
      font-size: 14px;
      color: #454545;
      text-align: center;
    }
  }
</style>

