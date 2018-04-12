<template>
  <div id="taskManagement">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 爬虫管理 > 任务管理</p>
    <p class="crawlerName">意大利中国学生学者联谊会爬虫</p>
    <p class="connect">连接状态&nbsp;:<span>断开</span></p>
    <p class="running">运行状态&nbsp;:<span>运行中</span></p>
    <!--<p class='time'>启动时间&nbsp;:<span class='start_time'>2018-03-04 00:00:00</span><button type='button' class='btn_set'>设置</button></p>-->
    <p class='time'>启动时间&nbsp;:
      <el-date-picker v-model="startTime" type="datetime" placeholder="选择日期时间">
      </el-date-picker>
      <button type='button' class='btn_set' @click='setTime()'>设置</button></p>
    <div class="log_box">
      <p class="log">运行日志&nbsp;:</p>
      <textarea name="logInfo" readonly>{{resData.message}}</textarea>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../assets/js/bus.js'
  export default {
    name:'taskManagement',
    data: function () {
      return {
        name:'',
        resData:[],
        startTime:''
      }
    },
    mounted: function () {
      var vm = this;
      // 用$on事件来接收参数
      Bus.$on('val', (data) => {
        vm.name = data;
        vm.$axios.get(vm.$api + '/crawler',{
          params:{
            name:vm.name
          }
        })
          .then((response) => {
            vm.resData = response.data;
            console.log(response.data);
          })
          .catch(function (err) {
            alert(err)
            console.log(err);
          })
      });
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

        /*vm.$axios.post(this.$api + '/controler',{
          params:{
            name:vm.name,
            command:vm.startTime
          }
        })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (err) {
            alert(err);
            console.log(err);
          })*/
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
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
    width: 667px;
    .log{
      float: left;
    }
    textarea{
      float: right;
      width: 570px;
      height: 450px;
      border:1px solid #53b1dc;
      margin-top: 5px;
      padding: 10px;
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
</style>

