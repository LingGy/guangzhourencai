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
        <el-button icon="el-icon-search" class='btnsearch' @click="search()" circle></el-button>
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
          <td class='bl' @click="btnToInfo(result.UserId)">{{result.Name}}</td>
          <td class='bl' @click="btnToEmail(result.UserId,result.Name)">{{result.Email}}</td>
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
  export default {
    name: 'personnelLists',
    data: function () {
      return {
        name: '',
        page: 1,
        count: 20,
        results: [],
        loading:true,
        total:0,
        UserId:null
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
              vm.results = data.result.datas;
              vm.total = data.result.total;
            }else {
              vm.$message.error(data.message);
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
      //跳转发送邮件功能
      btnToEmail: function (userid,name) {
        let EmailId = JSON.stringify({userid:userid,name:name,type:1})
        sessionStorage.setItem("EmailId",EmailId);
        this.$router.push('/application/email');
      },
      //搜索
      search: function () {
        this.getNewLists(this.name,0);
      },
      handleSizeChange(val) {
        this.getNewLists(this.name,val);
      },
      handleCurrentChange(val) {
        this.getNewLists(this.name,val);
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #personnelLists{
    .top {
      min-width: 948px;
      height: 28px;
      display: flex;
      justify-content: space-between;
      .top_left {
        width: 82px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        .bule {
          width: 4px;
          height: 100%;
          background-color: #169bd8;
        }
        p {
          font-size: 18px;
          color: #454545;
          margin-left: 5px;
          line-height: 28px;
        }
      }
      .top_right {
        .name {
          float: left;
          width: 134px;
          height: 28px;
          font-size: 12px;
          color: #999999;
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
          color: #ffffff;
        }
        .btnsearch{
          padding: 8px;
        }
      }
    }
    .t_box{
      min-height: 800px;
      table,thead,tbody,tr,th,td{
        border: 1px solid #dedede;
      }
      .box {
        min-width: 948px;
        border-collapse: collapse;
        margin-top: 14px;
        word-break:keep-all;/* 不换行 */
        white-space:nowrap;/* 不换行 */
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
    }
    .console_box{
      min-width: 948px;
      margin-top: 20px;
      text-align: center;
      margin-bottom: 100px;
    }
  }

</style>

