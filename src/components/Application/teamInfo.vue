<template>
  <div id="teamInfo">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 分组管理 > 分组列表 > 详情</p>
    <div class="proLists_title">
      <p class="shu"></p>
      <p class="text">分组详情</p>
      <button class="back" @click="goBack()">返回分组</button>
    </div>
    <table class="box" v-loading="loading">
      <thead>
      <tr>
        <th>中午名</th>
        <th>英文名</th>
        <th>邮箱</th>
        <th>性别</th>
        <!--<th>人才等级</th>-->
        <th>最高学历</th>
        <th>现工作单位</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(result,index) in resDatas" :key="index">
        <td class='bl' @click="toInfo(result.UserId)">{{result.ChineseName}}</td>
        <td>{{result.EnglishName}}</td>
        <td>{{result.Email}}</td>
        <td>{{result.IsMale | getSex()}}</td>
        <td>{{result.HighestDegree}}</td>
        <td>{{result.WorkUnit}}</td>
      </tr>
      </tbody>
    </table>
    <button class="sendemail" @click='btnToEmail(teamId,teamName,2)'>发送群组邮件</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"teamInfo",
    data: function () {
      return {
        teamId:null,
        teamName:null,
        resDatas:[],
        loading:true
      }
    },
    created: function () {
      let vm = this;
      let teamInfo = JSON.parse(sessionStorage.getItem("teamInfo"));
      vm.teamId =teamInfo.teamId;
      vm.teamName =teamInfo.teamName;
      vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/group?id=' + vm.teamId,
      })
         .then(function(res){
           vm.loading = false;
           let resdata = res.data;
           if(resdata.code == 0){
             vm.resDatas = resdata.result;
           }else {
             vm.$message.warning(resdata.message);
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
      },
      //返回分组
      goBack: function () {
        this.$router.go(-1)
      },
      //跳转发送邮件功能
      btnToEmail: function (userid,name,type) {
        let EmailId = JSON.stringify({userid:userid,name:name,type:type});
        sessionStorage.setItem("EmailId",EmailId);
        this.$router.push('/application/email');
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#teamInfo{
  table,thead,tbody,tr,th,td{
    border: 1px solid #dedede;
  }
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
    .back{
      height: 28px;
      padding: 0px 10px;
      float: right;
      background-color: #169bd8;
      color: #ffffff;
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
        th{
          padding: 0px 10px;
        }
      }
    }
    tbody {
      tr {
        height: 38px;
        line-height: 38px;
        color: #666666;
        font-size: 14px;
        letter-spacing: 1px;
        text-align: left;
        td{
          padding: 0px 10px;
        }
      }
      .bl{
        color: #6ecffa;
        text-decoration: underline;
        &:hover{
          cursor:pointer;
        }
      }
    }
  }
  .sendemail{
    display: block;
    background-color: #169bd8;
    height: 28px;
    padding: 0px 10px;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>

