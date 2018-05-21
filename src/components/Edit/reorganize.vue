<template>
  <div id="reorganize">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 合并数据 > 人才数据</p>
    <div class="top">
      <div class="top_left">
        <div class="bule"></div>
        <p>人才数据</p>
      </div>
    </div>
    <table class="re_infoLists" v-loading="loading">
      <thead>
        <tr>
          <th>中文名</th>
          <th>英文名</th>
          <th>整合项</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(list,index) in reorganizeList' :key='index'>
          <td>{{list.ChineseName}}</td>
          <td>{{list.EnglishName}}</td>
          <td>
            <span @click='toInfo(list.UserId)'>人才信息</span>
            <span @click='toResume(list.UserId)'>个人简历</span>
            <span @click='toAchieve(list.UserId)'>个人成就</span>
            <span @click='toStudy(list.UserId)'>学习经历</span>
            <span @click='toWork(list.UserId)'>工作经历</span>
            <span @click='toJob(list.UserId)'>求职意向</span>
            <span @click='toProject(list.UserId)'>个人项目</span>
          </td>
          <td>
            <button class="del" @click='del(list.UserId)'>删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="console_box">
      <div class="console">
        <button :class="['console','c1',isA?'console1':'console2']" @click="lastPage()" :disabled="bt1">上一页</button>
        <button :class="['console','c2',isB?'console1':'console2']" @click="nextPage()" :disabled="bt2">下一页</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"reorganize",
  data: function () {
    return {
      reorganizeList:[],
      page:0,
      loading:true,
      bt1:true,
      bt2:false,
      isA:true,
      isB:false,
    }
  },
  created: function () {
    if(this.$route.path == "/Edit/reorganize"){
      this.$parent.fg1 = false;
      this.$parent.fg3 = false;
    }
    this.getNewLists(this.page);
  },
  methods:{
    //获取整理项列表
    getNewLists: function (page) {
      let vm = this;
      vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/duplicates',
          data:'page='+vm.page+'&count=20'
      })
         .then(function(res){
           vm.loading = false;
           let data = res.data;
           if (data.code == 0) {
             if(data.result){
               vm.reorganizeList = data.result;
             }else {
               if(page>0){
                 vm.isB = true;
                 vm.bt2 = true;
               }
             }
             if(page>0){
               vm.bt1 = false;
               vm.isA = false;
             }else if(page == 0){
               vm.bt1 = true;
               vm.isA = true;
             }
           } else {
             if(page>0){
               vm.isB = true;
               vm.bt2 = true;
             }
           };
         })
         .catch(function(err){
           console.log(err);
         });
    },
    toInfo: function (rgId) {
      sessionStorage.setItem('rgId',rgId);
      this.$router.push('/Edit/reorganize/rg_Info');
    },
    toAchieve: function (rgId) {
      sessionStorage.setItem('rgId',rgId);
      this.$router.push('/Edit/reorganize/rg_Achieve');
    },
    toJob:function (rgId) {
      sessionStorage.setItem('rgId',rgId);
      this.$router.push('/Edit/reorganize/rg_Job');
    },
    toProject:function (rgId) {
      sessionStorage.setItem('rgId',rgId);
      this.$router.push('/Edit/reorganize/rg_Project');
    },
    toResume:function (rgId) {
      sessionStorage.setItem('rgId',rgId);
      this.$router.push('/Edit/reorganize/rg_Resume');
    },
    toStudy:function (rgId) {
      sessionStorage.setItem('rgId',rgId);
      this.$router.push('/Edit/reorganize/rg_Study');
    },
    toWork:function (rgId) {
      sessionStorage.setItem('rgId',rgId);
      this.$router.push('/Edit/reorganize/rg_Work');
    },
    //删除
    del: function (rgId) {
      let vm = this;
      vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/deleteduplicate',
          data:'userid='+rgId
      })
         .then(function(res){
           if(res.data.code == 0){
             vm.$message.success('删除成功!');
             this.getNewLists(this.page);
           }else {
             vm.$message.error("删除失败!"+res.data.message);
             this.getNewLists(this.page);
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
      vm.getNewLists(vm.page);
    },
    //下一页
    nextPage: function () {
      let vm = this;
      vm.page = vm.page+1;
      vm.getNewLists(vm.page);
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  table,table tr th, table tr td {
    border:1px solid #cccccc;
  }
  .re_infoLists{
    border-collapse:collapse;
    min-width: 988px;
    text-align: center;
    margin-top: 20px;
    thead{
      background-color: rgba(238, 246, 255, 0.8);
      font-size: 16px;
      color: #454545;
      tr{
        height: 32px;
      }
    }
    tbody{
      color: #666666;
      font-size: 14px;
      tr{
        height: 32px;
        td{
          span{
            margin: 0px 14px;
            text-decoration: underline;
            color: #169bd8;
            &:hover{
              cursor:pointer;
            }
          }
          .del{
            width: 45px;
            height: 22px;
            line-height: 22px;
            background-color: #6ecffa;
            font-size: 14px;
            color: #ffffff;
            border: none;
            text-align: center;
          }
        }
      }
    }
  }
  .console_box{
    min-width: 988px;
  }
</style>

