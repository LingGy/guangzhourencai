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
            <!--<th>英文名</th>-->
            <th>国家</th>
            <th>负责人</th>
            <th>负责人联系方式</th>
            <!--<th>人数</th>-->
            <!--<th>详情</th>-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list,index) in lists" :key='index'>
            <td class='bl' @click="toInfo(list.Id)">{{list.ChineseName}}</td>
            <!--<td>{{list.EnglishName}}</td>-->
            <td>{{list.Area}}</td>
            <td>{{list.Chief}}</td>
            <td>{{list.ChiefContact}}</td>
            <!--<td>{{list.MemberCount}}</td>-->
            <!--<td><button type='button' class='toInfo' @click="toInfo(list.Id)">详情</button></td>-->
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
    name:'assn',
    data: function () {
      return {
        lists:[],
        total:0,
        loading:true,
        page:0,
        bt1:true,
        bt2:false,
        isA:true,
        isB:false,
        count:20,
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
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
            url:window.$g_url.ApiUrl+'/organizations?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
            data:'page='+(page-1)+'&count=20'
        })
           .then(function(res){
             vm.loading = false;
             let resData = res.data;
             if(resData.code == 0){
                 vm.lists = resData.result.datas;
                 vm.total = resData.result.total;
             }else {
               vm.$message.error(resData.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      handleSizeChange(val) {
        this.getNewData(val);
      },
      handleCurrentChange(val) {
        this.getNewData(val);
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
    table,thead,tbody,tr,th,td{
      border: 1px solid #dedede;
    }
    .box {
      min-height: 800px;
      min-width: 1010px;
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
            padding: 0 10px;
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
    min-width: 1010px;
    height: 30px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 100px;
  }

}
</style>

