<template>
  <div id="teamInfo">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 分组管理 > 分组列表 > 详情</p>
    <div class="proLists_title">
      <p class="shu"></p>
      <p class="text">分组详情</p>
    </div>
    <table class="box">
      <thead>
      <tr>
        <th>中午名</th>
        <th>英文名</th>
        <th>邮箱</th>
        <th>性别</th>
        <th>人才等级</th>
        <th>最高学历</th>
        <th>现工作单位</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(result,index) in resDatas" :key="index">
        <th>{{result.ChineseName}}</th>
        <th>{{result.EnglishName}}</th>
        <th>{{result.Email}}</th>
        <th>{{result.IsMale | getSex()}}</th>
        <th>{{result.Level | getLevel}}</th>
        <th>{{result.HighestDegree}}</th>
        <th>{{result.WorkUnit}}</th>
        <th>
          <button type='button' class='toInfo' @click="toInfo(result.UserId)">详情</button>
        </th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"teamInfo",
    data: function () {
      return {
        resDatas:[]
      }
    },
    created: function () {
      let _this = this;
      let teamId = sessionStorage.getItem("teamId");
      _this.$axios({
          method:'post',
          url:_this.$api + '/group?id=' + teamId,
      })
         .then(function(res){
           let resdata = res.data;
           if(resdata.code == 0){
             _this.resDatas = resdata.result;
           }else {
             _this.$message.warning(resdata.message);
           }
         })
         .catch(function(err){
           console.log(err);
         });
    },
    methods:{
      //人才详情
      toInfo: function (id) {
        sessionStorage.setItem("userId",id);
        this.$router.push("/Edit/personnelInfo");
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#teamInfo{
  .proLists_title {
    height: 28px;
    margin-top: 20px;
    margin-bottom: 20px;
    .shu {
      width: 4px;
      height: 100%;
      background-color: #169bd8;
      float: left;
    }
    .text {
      font-size: 18px;
      color: #454545;
      line-height: 28px;
      float: left;
      margin-left: 4px;
    }
  }
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
}
</style>

