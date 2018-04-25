<template>
  <div id="personnelLists">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 人才浏览</p>
    <div class="top">
      <div class="top_left">
        <div class="bule"></div>
        <p>人才列表</p>
      </div>
      <div class="top_right">
        <input type="text" class='name' placeholder='请输入搜索人姓名'>
        <button type='button' class='btn_search'>搜索</button>
      </div>
    </div>
    <table class="box">
        <thead>
        <tr>
          <th>中午名</th>
          <th>英文名</th>
          <th>邮箱</th>
          <th>注册时间</th>
          <th>人才等级</th>
          <th>用户类型</th>
          <th>详情</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(result,index) in results" :key="index">
          <th>{{result.ChineseName}}</th>
          <th>{{result.EnglishName}}</th>
          <th>{{result.Email}}</th>
          <th>{{result.RegisterDate | formatDate()}}</th>
          <th>{{result.Level | getLevel}}</th>
          <th>{{result.Type | getType}}</th>
          <th>
            <button type='button' class='toInfo' @click="btnToInfo(result.UserId)">详情</button>
          </th>
        </tr>
        </tbody>
      </table>
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
      }
    },
    created: function () {//获取人才列表
      let vm = this;
      vm.$axios({
        method: 'post',
        url: vm.$api + "/talents",
        data: "name=" + vm.name + "&page=" + vm.page + "&count=" + vm.count
      })
        .then(function (response) {
          let data = response.data;
          if (data.code == 0) {
            if(data.result){
              return vm.results = data.result;
            }else {
              return vm.results = [];
            }
          } else {
            vm.$message.error(data.message);
          };
        })
        .catch(function (err) {
          console.log(err);
        })
    },
    methods: {
      btnToInfo: function (userid) {//获取点击对应人才的userid并传值给中间件
        sessionStorage.setItem("userId", userid);
        this.$router.push('/Edit/personnelInfo');
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

</style>

