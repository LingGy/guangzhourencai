<template>
<div id="relationInfo">
  <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 关系分析 > 关系详情</p>
  <!--<table class="college"></table>-->
  <!--<table class="institution"></table>-->
  <!--<table class="industry"></table>-->
  <!--<table class="nationality"></table>-->
  <!--<table class="project"></table>-->
  <button class="return" @click='goBack()'>返回</button>
  <table>
    <caption>校友关系</caption>
    <thead>
    <tr>
      <th>序号</th>
      <th>中文名</th>
      <th>英文名</th>
      <th>人才ID</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(list,index) in college" :key="index">
      <td>{{index+1}}</td>
      <td>{{list.name}}</td>
      <td>{{list.EnglishName}}</td>
      <td>{{list.Id}}</td>
      <td>
        <button class="info" @click="toInfo(list.Id)">人才详情</button>
      </td>
    </tr>
    </tbody>
  </table>
  <table>
    <caption>同事关系</caption>
    <thead>
    <tr>
      <th>序号</th>
      <th>中文名</th>
      <th>英文名</th>
      <th>人才ID</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(list,index) in institution" :key="index">
      <td>{{index+1}}</td>
      <td>{{list.name}}</td>
      <td>{{list.EnglishName}}</td>
      <td>{{list.Id}}</td>
      <td>
        <button class="info" @click="toInfo(list.Id)">人才详情</button>
      </td>
    </tr>
    </tbody>
  </table>
  <table>
    <caption>同行关系</caption>
    <thead>
    <tr>
      <th>序号</th>
      <th>中文名</th>
      <th>英文名</th>
      <th>人才ID</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(list,index) in industry" :key="index">
      <td>{{index+1}}</td>
      <td>{{list.name}}</td>
      <td>{{list.EnglishName}}</td>
      <td>{{list.Id}}</td>
      <td>
        <button class="info" @click="toInfo(list.Id)">人才详情</button>
      </td>
    </tr>
    </tbody>
  </table>
  <table>
    <caption>同国籍关系</caption>
    <thead>
      <tr>
        <th>序号</th>
        <th>中文名</th>
        <th>英文名</th>
        <th>人才ID</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(list,index) in nationality" :key="index">
        <td>{{index+1}}</td>
        <td>{{list.name}}</td>
        <td>{{list.EnglishName}}</td>
        <td>{{list.Id}}</td>
        <td>
          <button class="info" @click="toInfo(list.Id)">人才详情</button>
        </td>
      </tr>
    </tbody>
  </table>
  <table>
    <caption>同项目关系</caption>
    <thead>
    <tr>
      <th>序号</th>
      <th>中文名</th>
      <th>英文名</th>
      <th>人才ID</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(list,index) in project" :key="index">
      <td>{{index+1}}</td>
      <td>{{list.name}}</td>
      <td>{{list.EnglishName}}</td>
      <td>{{list.Id}}</td>
      <td>
        <button class="info" @click="toInfo(list.Id)">人才详情</button>
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"relationInfo",
    data: function () {
      return {
        college:[],
        institution:[],
        industry:[],
        nationality:[],
        project:[]
      }
    },
    created: function () {
      this.getCollege();
      this.getInstitution();
      this.getIndustry();
      this.getNationality();
      this.getProject();
    },
    methods:{
      //获取数据
      getNewDatas: function (relation) {
        let vm = this;
        let userid = sessionStorage.getItem("relationUserId");
        vm.$axios({
            method:'post',
            url:vm.$api + '/relationdetail?userid=' + userid +'&type='+relation,
        })
           .then(function(res){
             let resdatas = res.data;
             if(resdatas.code == 0){
               if(resdatas.result){
                 if(resdatas.result.length > 8){

                 }
                 switch (relation) {
                   case 'college':vm.college = resdatas.result;
                    break;
                   case 'institution':vm.institution = resdatas.result;
                     break;
                   case 'industry':vm.industry = resdatas.result;
                     break;
                   case 'nationality':vm.nationality = resdatas.result;
                     break;
                   case 'project':vm.project = resdatas.result;
                     break;
                   default:false;
                 }
               }
             }else {
               vm.$message.error(resdatas.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //获取校友关系数据
      getCollege: function () {
        this.getNewDatas('college');
      },
      //获取同事关系数据
      getInstitution: function () {
        this.getNewDatas('institution');
      },
      //获取同行关系数据
      getIndustry: function () {
        this.getNewDatas('industry');
      },
      //获取同国籍关系数据
      getNationality: function () {
        this.getNewDatas('nationality');
      },
      //获取同项目关系数据
      getProject: function () {
        this.getNewDatas('project');
      },
      //人才详情
      toInfo: function (userid) {
        sessionStorage.setItem("userId", userid);
        this.$router.push('/Edit/personnelInfo');
      },
      //返回
      goBack: function () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#relationInfo{
  .return{
    display: block;
    width: 50px;
    height: 24px;
    color: #ffffff;
    background-color: #169bd8;
    text-align: center;
    &:hover{
      background-color: #6ecffa;
    }
  }
  table,table tr th, table tr td {
    border:1px solid #cccccc;
  }
  table{
    min-width: 800px;
    text-align: center;
    border-collapse: collapse;
    margin-top: 35px;
    caption{
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      font-weight: 600;
    }
    thead{
      background-color: #f1f8ff;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      tr{
        th{
          font-weight: 400;
        }
      }
    }
    tbody{
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      color: #454545;
      tr{
        &:hover{
          background-color: rgba(204,204,204,0.2);
        }
      }
      .info{
        color: #4ac0f6;
        background-color: transparent;
        text-decoration: underline;
      }
    }
  }
}
</style>

