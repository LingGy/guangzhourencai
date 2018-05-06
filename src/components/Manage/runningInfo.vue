<template>
  <div id="runningInfo">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 爬虫管理 > 运行情况</p>
    <div class="info_box">
      <table>
        <thead>
          <tr>
            <th>ip地址</th>
            <th>爬虫名称</th>
            <th>目标网址</th>
            <th>连接状态</th>
            <th>运行状态</th>
            <th>上次活动时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list,index) in lists" :key="index">
            <td>{{list.machine_ip}}</td>
            <td>{{list.name_ch}}</td>
            <td>{{list.target_url}}</td>
            <td>已连接</td>
            <td>{{list.status}}</td>
            <td>{{list.end_time | formatDate()}}</td>
            <td>
              <button type='button' @click="getName(index)" disabled='disabled'>详情</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import Bus from '../../assets/js/bus.js';
  export default {
    name:'runningInfo',
    data:function () {
      return {
        lists:[],
        page:1
      }
    },
    filters:{
      status: function (s) {
        return s == 0?"正常":'';
      }
    },
    created: function () {
      this.getLogLists('',this.page)
    },
    methods:{
      //获取日志列表
      getLogLists: function (name,page) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl_1 + '/crawlerlist',
        })
          .then(function (res) {
            let resDatas = res.data;
            if(resDatas.code == 0){
              if(resDatas.result){
                vm.lists = resDatas.result;
              }
            }else {
              vm.$message.error(resDatas.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      getName: function (index) {
        sessionStorage.setItem("CrawlerId",index);
        this.$router.push('/Manage/taskManagement');
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
table,table tr th, table tr td {
  border:1px solid #cccccc;
}
.info_box{
  min-width: 988px;
  table{
    width: 100%;
    border-collapse:collapse;
    text-align: center;
    thead{
      tr{
        height: 32px;
        line-height: 32px;
        background-color: #f1f8ff;
      }
    }
    tbody{
      font-size: 14px;
      color: #666666;
      tr{
        height: 42px;
        line-height: 42px;
        button{
          width: 67px;
          height: 26px;
          background-color: #4ac0f6;
          text-align: center;
          color: #fefefe;
          line-height: 26px;
        }
      }
    }
  }
}
</style>

