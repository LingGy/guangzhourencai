<template>
  <div id="taskManagement">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 爬虫管理 > 任务管理</p>
    <p class="crawlerName">{{Base.name_ch | Hname()}}</p>
    <p class="connect">爬虫名称&nbsp;:<span>{{Base.name}}</span></p>
    <p class="connect">程序名&nbsp;:<span>{{Base.app_name}}</span></p>
    <p class="connect">目标网址&nbsp;:<span>{{Base.target_url}}</span></p>
    <p class="connect">机器名&nbsp;:<span>{{Base.machine_name}}</span></p>
    <p class="connect">机器ID&nbsp;:<span>{{Base.machine_ip}}</span></p>
    <p class="connect">运行状态&nbsp;:<span>{{Run.status | statusInfo()}}</span></p>
    <!--<p class="connect">上次运行时间&nbsp;:<span>{{Run.end_time}}</span></p>-->
    <!--<p class="running">运行状态&nbsp;:<span>运行中</span></p>-->
    <!--<p class='time'>启动时间&nbsp;:<span class='start_time'>2018-03-04 00:00:00</span><button type='button' class='btn_set'>设置</button></p>-->
    <!--<p class='time'>启动时间&nbsp;:-->
      <!--<el-date-picker v-model="startTime" type="datetime" placeholder="选择日期时间">-->
      <!--</el-date-picker>-->
      <!--<button type='button' class='btn_set' @click='setTime()'>设置</button>-->
    <!--</p>-->
    <div class="log_box">
      <p class="log">运行日志&nbsp;:</p>
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
        startTime:''
      }
    },
    filters:{
      Hname: function (chname) {
        return chname != ''? chname : this.Base.name;
      },
    },
    mounted: function () {
      let vm = this;
      let testcrawler = sessionStorage.getItem("CrawlerId");
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
            }else {
              vm.$message.error(resDatas.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
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
      }
    },
    methods:{
      setTime: function () {
        var vm = this;
        var strTime = new Date(this.startTime).getTime()/1000;
        this.$notify({
          title:"操作提示",
          message: '设置成功',
          type: 'success',
          position: 'top-left',
          offset:200
        });
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #taskManagement{
    p{
      font-size: 16px;
      color: #545454;
      margin-bottom: 10px;
      span{
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .crawlerName{
      color: #169bd8;
      font-size: 18px;
      font-weight: 600;
    }
    .log_box{
      .log{
        float: left;
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

