<template>
  <div id="taskManagement">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 爬虫管理 > 任务管理</p>
    <div class="t_box">
      <table class="title_box">
        <thead>
        <tr>
          <th colspan='4'>{{Base.name_ch | Hname()}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class='t_name'>爬虫名称</td>
          <td>{{Base.name}}</td>
          <td class='t_name'>程序名</td>
          <td>{{Base.app_name}}</td>
        </tr>
        <tr>
          <td class='t_name'>机器名</td>
          <td>{{Base.machine_name}}</td>
          <td class='t_name'>目标网址</td>
          <td>{{Base.target_url}}</td>
        </tr>
        <tr>
          <td class='t_name'>运行状态</td>
          <td>{{Run.status | statusInfo()}}</td>
          <td class='t_name'>机器IP</td>
          <td>{{Base.machine_ip}}</td>
        </tr>
        <tr>
          <td class='t_name'>启动时间</td>
          <td>{{Run.start_time | tohsm}}</td>
          <td class='t_name'>结束时间</td>
          <td>{{Run.end_time | tohsm}}</td>
        </tr>
        </tbody>
      </table>
      <div class="status_control_box" v-if="ifdata">
        <button @click="orders('start')">启动</button>
        <button @click="orders('pause')">暂停</button>
        <button @click="orders('resume')">恢复运行</button>
        <button @click="orders('stop')">停止</button>
      </div>
    </div>
    <div class="log_box">
      <div class="t_box">
        <table class="tbox" v-loading="loading">
          <thead>
          <tr class='t_name1'>
            <th colspan='4'>
              <p>爬虫日志<button type='button' @click='refresh()'>刷新</button></p>
            </th>
          </tr>
          <tr class='t_name2'>
            <th>日期</th>
            <th>系统名</th>
            <th>进程名</th>
            <th>日志信息</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(list,index) in loginfo" :key="index" :class="{warn:list.Level== 1 ? true:false,error:list.Level == 2?true:false}">
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
  </div>
</template>
<script type="text/ecmascript-6">
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
        count:20,
        total:0,
        loading:true,
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
            vm.loading = false;
            if(res.data.code == 0){
              if(res.data.result){
                vm.loginfo = res.data.result.datas;
                vm.total = res.data.result.total;
              }
            }
          })
          .catch(function(err){
            console.log(err);
          });
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
              if(resData.result){
                vm.loginfo = resData.result.datas;
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
      //操作命令
      orders: function (order) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl_1+'/controller?name='+vm.testcrawler+'&command='+order,
        })
           .then(function(res){
             if(res.data.code == 0){
               vm.$message.success(res.data.message);
               vm.getdata(vm.testcrawler);
             }
           })
           .catch(function(err){});
      },
      //刷新
      refresh: function () {
        let vm = this;
        vm.loading = true;
        setTimeout(function () {
          vm.getLogLists(1);
        },500)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #taskManagement{
    table,thead,tbody,tr,th,td{
      border: 1px solid #dedede;
    }
    table{
      border-collapse: collapse;
    }
    .t_box{
      min-width: 610px;
      .title_box{
        width: 100%;
        thead{
          tr{
            th{
              color: #169bd8;
              font-size: 18px;
              font-weight: 600;
              text-align: left;
              height: 33px;
              line-height: 32px;
              padding:0px 10px;
            }
          }
        }
        tbody{
          tr{
            td{
              height: 32px;
              line-height: 32px;
              padding-left: 6px;
              color: #545454;
              padding:0px 10px;
            }
            .t_name{
              width: 100px;
              color: #000000;
              background-color: #eef6ff;
            }
          }
        }
      }
      .status_control_box{
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        button{
          height: 32px;
          font-size: 18px;
          color: #ffffff;
          background-color: #169bd8;
          padding: 0px 15px;
          margin-right: 20px;
        }
      }
    }
    .log_box{
      margin-top: 50px;
      .t_box{
        min-height: 750px;
        .tbox{
          min-width: 987px;
          color: #454545;
          line-height: 32px;
          text-align: center;
          thead{
            .t_name1,.t_name2{
              height: 32px;
              font-size: 16px;
            }
            .t_name1{
              background-color: #ffffff;
              th{
                font-size: 18px;
                button{
                  margin-left: 15px;
                  height: 22px;
                  width: 40px;
                  background-color: #169bd8;
                  color: #ffffff;
                  font-size: 16px;
                }
              }
            }
            .t_name2{
              background-color: #eef6ff;
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
  }
</style>

