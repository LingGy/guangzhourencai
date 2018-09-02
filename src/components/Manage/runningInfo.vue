<template>
  <div id="runningInfo">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 爬虫管理 > 运行情况</p>
    <div class="info_box">
      <table  v-loading="loading">
        <thead>
          <tr>
            <th>爬虫名称</th>
            <th>目标网址</th>
            <th>连接状态</th>
            <th>运行状态</th>
            <th>上次活动时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list,index) in lists" :key="index">
            <td class="p_name" @click="getName(list.name)">{{list.name_ch}}</td>
            <td>{{list.target_url}}</td>
            <td>已连接</td>
            <td>{{list.status | statusInfo()}}</td>
            <td>{{list.start_time | tohsm()}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'runningInfo',
    data:function () {
      return {
        lists:[],
        page:1,
        loading:true,
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
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
          url:window.$g_url.ApiUrl_1 + '/crawlerlist?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
        })
          .then(function (res) {
            vm.loading = false;
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
    thead{
      tr{
        height: 32px;
        line-height: 32px;
        background-color: #f1f8ff;
        text-align: center;
      }
    }
    tbody{
      font-size: 14px;
      color: #666666;
      tr{
        height: 42px;
        line-height: 42px;
        td{
          padding-left: 10px;
        }
        .p_name{
          color: #6ecffa;
          text-decoration: underline;
          &:hover{
            cursor:pointer;
          }
        }
      }

    }
  }
}
</style>

