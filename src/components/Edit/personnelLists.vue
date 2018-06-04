<template>
  <div id="personnelLists">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 人才浏览</p>
    <div class="top">
      <div class="top_left">
        <div class="bule"></div>
        <p>人才列表</p>
      </div>
      <div class="top_right">
        <input type="text" class='name' placeholder='请输入搜索人姓名' v-model="name">
        <button type='button' class='btn_search' @click="search()">搜索</button>
      </div>
    </div>
    <div class="t_box">
      <table class="box" v-loading="loading">
        <thead>
        <tr>
          <th>中文名</th>
          <th>英文名</th>
          <th>邮箱</th>
          <!--<th>注册时间</th>-->
          <!--<th>人才等级</th>-->
          <th>用户类型</th>
          <th>详情</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(result,index) in results" :key="index">
          <th>{{result.ChineseName}}</th>
          <th>{{result.EnglishName}}</th>
          <th>{{result.Email}}</th>
          <!--<th>{{result.RegisterDate | formatDate()}}</th>-->
          <!--<th>{{result.Level | getLevel}}</th>-->
          <th>{{result.Type | getType}}</th>
          <th>
            <button type='button' class='toInfo' @click="btnToInfo(result.UserId)">详情</button>
          </th>
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
  export default {
    name: 'personnelLists',
    data: function () {
      return {
        name: '',
        page: 0,
        count: 20,
        results: [],
        loading:true,
        bt1:true,
        bt2:false,
        isA:true,
        isB:false,
      }
    },
    created: function () {//获取人才列表
      if(this.$route.path == "/Edit/personnelLists"){
        this.$parent.fg1 = false;
        this.$parent.fg3 = false;
      }
      this.getNewLists(this.name,this.page);
    },
    methods: {
      //获取列表
      getNewLists: function (name,page) {
        let vm = this;
        vm.$axios({
          method: 'post',
          url: window.$g_url.ApiUrl + "/talents",
          data: "name=" + name + "&page=" + page + "&count=" + vm.count
        })
          .then(function (response) {
            vm.loading = false;
            let data = response.data;
            if (data.code == 0) {
              if(data.result){
                vm.results = data.result;
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
          .catch(function (err) {
            console.log(toString(err));
            alert(err);
          })
      },
      //获取详情
      btnToInfo: function (userid) {//获取点击对应人才的userid并传值给中间件
        sessionStorage.setItem("userId", userid);
        this.$router.push('/Edit/personnelInfo');
      },
      //搜索
      search: function () {
        this.getNewLists(this.name,0);
      },
      //上一页
      lastPage: function () {
        let vm = this;
        vm.bt2 = false;
        vm.isB = false;
        vm.page = vm.page-1;
        vm.getNewLists(vm.name,vm.page);
      },
      //下一页
      nextPage: function () {
        let vm = this;
        vm.page = vm.page+1;
        vm.getNewLists(vm.name,vm.page);
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #personnelLists{
    .top {
      min-width: 948px;
      height: 28px;
      .top_left {
        float: left;
        height: 100%;
        .bule {
          width: 4px;
          height: 100%;
          background-color: #169bd8;
          float: left;
        }
        p {
          font-size: 18px;
          color: #454545;
          margin-left: 5px;
          float: left;
          line-height: 28px;
        }
      }
      .top_right {
        float: right;
        .name {
          float: left;
          width: 134px;
          height: 28px;
          font-size: 12px;
          color: #999;
          padding-left: 4px;
          margin-right: 14px;
        }
        .btn_search {
          float: right;
          width: 90px;
          height: 28px;
          background-color: #169bd8;
          border: none;
          font-size: 18px;
          line-height: 28px;
          text-align: center;
          color: #fff;
        }
      }
    }
    .t_box{
      min-height: 800px;
      .box {
        min-width: 948px;
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
    }
    .console_box{
      min-width: 948px;
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

