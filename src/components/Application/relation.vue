<template>
  <div id="relation">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 关系分析(表)</p>
    <div class="proLists_title">
      <p class="shu"></p>
      <p class="text">人才列表</p>
    </div>
    <div class="search_box">
      <div class="sbox">
        <input type="text" class="search" placeholder="搜索人才" v-model='name'>
        <i class="el-icon-search" @click='search()'></i>
      </div>
    </div>
    <div class="t_box">
      <table class="box" v-loading="loading">
        <thead>
        <tr>
          <th>姓名</th>
          <th>邮箱</th>
          <th>学校</th>
          <th>学历</th>
          <th>专业</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(result,index) in results" :key="index">
          <td class='bl' @click="toRelationPic(result.UserId,result.Name)">{{result.Name}}</td>
          <td>{{result.Email}}</td>
          <td>{{result.GraduateSchool}}</td>
          <td>{{result.HighestDegree}}</td>
          <td>{{result.Major}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="console_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="count"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name:"relation",
    data: function () {
      return {
        name: '',
        page: 1,
        count: 20,
        results: [],
        total:0,
        loading:true,
        bt1:true,
        bt2:false,
        isA:true,
        isB:false,
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
      }
    },
    created: function () {//获取人才列表
      if(this.$route.path == "/application/relation"){
        this.$parent.fg1 = false;
      }
      this.getNewLists(this.page);
    },
    methods:{
      //获取初始数据
      getNewLists: function (page) {
        let vm = this;
        vm.$axios({
          method: 'post',
          url: window.$g_url.ApiUrl + "/talents?"+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data: "name=" + vm.name + "&page=" + page + "&count=" + vm.count
        })
          .then(function (response) {
            vm.loading = false;
            let data = response.data;
                vm.results = data.result.datas;
                vm.total = data.result.total;
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      //搜索人才姓名
      search: function () {
        this.getNewLists(1);
      },
      toRelationPic: function (userid,username) {
        sessionStorage.setItem("relationUserId",userid);
        sessionStorage.setItem("relationUserName",username);
        this.$router.push('/application/relationpic');
      },
      handleSizeChange(val) {
        this.getNewLists(val);
      },
      handleCurrentChange(val) {
        this.getNewLists(val);
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#relation{
  table,thead,tbody,tr,th,td{
    border: 1px solid #dedede;
  }
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
  .search_box{
    width: 100%;
    height: 26px;
    text-align: right;
    margin-bottom: 10px;
    .sbox{
      width: 140px;
      float: right;
      display: flex;
      justify-content: flex-start;
      border: 1px solid #cccccc;
      .search{
        width: 116px;
        height: 24px;
        border:none;
        padding: 0px 6px;
        outline:none;
      }
      i{
        font-size: 24px;
        color: #6ecffa;
      }
    }
  }
  .t_box{
    min-height: 800px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
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
  }
  .console_box{
    min-width: 948px;
    margin-top: 20px;
    text-align: center;
    margin-bottom: 100px;
  }
}
</style>

