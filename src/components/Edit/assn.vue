<template>
  <div id="assn">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 社团管理 > 社团列表</p>
    <div class="proLists_title">
      <p class="shu"></p>
      <p class="text">社团列表</p>
    </div>
    <div class="t_box">
      <table class='box' v-loading="loading">
        <thead>
          <tr>
            <th>中文名</th>
            <th>英文名</th>
            <th>国家</th>
            <th>负责人</th>
            <th>负责人联系方式</th>
            <th>人数</th>
            <th>详情</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list,index) in lists" :key='index'>
            <td>{{list.ChineseName}}</td>
            <td>{{list.EnglishName}}</td>
            <td>{{list.Area}}</td>
            <td>{{list.Chief}}</td>
            <td>{{list.ChiefContact}}</td>
            <td>{{list.MemberCount}}</td>
            <td><button type='button' class='toInfo' @click="toInfo(list.Id)">详情</button></td>
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name:'assn',
    data: function () {
      return {
        lists:[],
        loading:true,
        page:0,
        bt1:true,
        bt2:false,
        isA:true,
        isB:false,
      }
    },
    created: function () {
      if(this.$route.path == "/Edit/assn"){
        this.$parent.fg1 = false;
        this.$parent.fg3 = true;
        this.$parent.isA = false;
      }
      this.getNewData(this.page);
    },
    methods:{
      getNewData: function (page) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+'/organizations',
            data:'page='+page+'&count=20'
        })
           .then(function(res){
             vm.loading = false;
             let resData = res.data;
             if(resData.code == 0){
               if(resData.result){
                 vm.lists = resData.result;
               }else {
                 if(page>0){
                   vm.page = page - 1;
                   vm.isB = true;
                   vm.bt2 = true;
                 }
               }
               if(page>0){
                 vm.bt1 = false;
                 vm.isA = false;
               }else if(page <= 0){
                 vm.page = 0;
                 vm.bt1 = true;
                 vm.isA = true;
               }
             }else {
               vm.$message.error(resData.message);
               if(page>0){
                 vm.page = page - 1;
                 vm.isB = true;
                 vm.bt2 = true;
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
        vm.getNewData(vm.page);
      },
      //下一页
      nextPage: function () {
        let vm = this;
        vm.page = vm.page+1;
        vm.getNewData(vm.page);
      },
      //详情
      toInfo: function (assnId) {
        sessionStorage.setItem('assnId',assnId);
        this.$router.push('/Edit/assnInfo');
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#assn{
  .proLists_title{
    height: 28px;
    margin-top: 20px;
    margin-bottom: 20px;
    .shu{
      width: 4px;
      height: 100%;
      background-color: #169bd8;
      float: left;
    }
    .text{
      font-size: 18px;
      color: #454545;
      line-height: 28px;
      float: left;
      margin-left: 4px;
    }
  }
  .t_box{
    min-height: 800px;
    .box {
      min-width: 1010px;
      border-collapse: collapse;
      margin-top: 14px;
      thead {
        width: 100%;
        background-color: #f1f8ff;
        tr {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #454545;
          background-color: #f1f8ff;
          letter-spacing: 1px;
          text-align: center;
        }
      }
      tbody {
        tr {
          height: 38px;
          line-height: 38px;
          color: #666666;
          font-size: 14px;
          letter-spacing: 1px;
          text-align: center;
          .toInfo {
            width: 45px;
            height: 24px;
            line-height: 24px;
            background-color: #6ecffa;
            font-size: 14px;
            color: #fff;
            border: none;
            text-align: center;
          }
        }
      }
    }
    .console_box{
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

}
</style>

