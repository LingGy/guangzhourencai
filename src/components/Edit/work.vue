<template>
  <div id="work">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 工作经历</p>
    <table class="workLists_box">
      <thead>
      <tr>
        <th>国内/国外</th>
        <th>公司名称</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,index) in DataLists" :key='index' @click="getInfo(list.Id)">
        <td>{{list.IsHome | ifHome}}</td>
        <td>{{list.InstitutionName}}</td>
        <td>{{list.BeginDate | formatDate}}--{{list.EndDate | formatDate}}</td>
        <td>
          <button type=button @click.stop="delWork(list.Id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="work_main_box">

      <div class="work_main">
        <p class="name">国内/国外&nbsp;:</p>
        <div class="wo_content_box">
          <el-radio-group v-model="viewData.IsHome">
            <el-radio :label="1">国内</el-radio>
            <el-radio :label="0">国外</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="work_main">
        <p class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间&nbsp;:</p>
        <div class="wo_content_box">
          <el-date-picker
            type="daterange"
            v-model='time'
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
        </div>
      </div>

      <div class="work_main">
        <p class="name">工作地点&nbsp;:</p>
        <div class="wo_content_box">
          <input type="text" class="wk_int" placeholder="请输入工作地点" maxlength='20' v-model="viewData.Address">
        </div>
      </div>

      <div class="work_main">
        <p class="name">公司名称&nbsp;:</p>
        <div class="wo_content_box">
          <input type="text" class="wk_int" placeholder="请输入公司名称" maxlength='20' v-model="viewData.InstitutionName">
        </div>
      </div>

      <div class="work_main">
        <p class="name">专业领域&nbsp;:</p>
        <div class="wo_content_box">
          <input type="text" class="wk_int" placeholder="请输入专业领域" v-model="viewData.Industry">
        </div>
      </div>

      <div class="work_main">
        <p class="name">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位&nbsp;:</p>
        <div class="wo_content_box">
          <input type="text" class="wk_int" placeholder="请输入职位" maxlength='20' v-model="viewData.Position">
        </div>
      </div>

      <div class="work_main wk_d_b">
        <p class="name">工作描述&nbsp;:</p>
        <div class="wo_content_box">
          <textarea name="describe" id="describe" cols="30" rows="10" placeholder="请输入内容,限字数100" maxlength='100' v-model="viewData.Description"></textarea>
        </div>
      </div>

    </div>
    <div class="wk_save_box">
      <button type=button class='save_1' @click='addNewWork()'>保存并新增个人成就</button>
      <button type=button class='save_2' @click='saveWork()'>保存</button>
      <button type=button class='btn_toEN' @click='toCh()'>英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import commonApi from '../../assets/js/common'
  export default {
    name:"Work",
    data:function () {
      return {
        time:[],
        DataLists:[],
        viewData:{
          UserId:'',
          IsHome:'',
          BeginDate:'',
          EndDate:'',
          Address:'',
          InstitutionName:'',
          Industry:'',
          Position:'',
          Description:'',
        },
        userid:'',
        infoid:'',
      };
    },
    created: function () {
      this.userid = sessionStorage.getItem("userId");
      if(this.$route.path == "/Edit/work"){
        this.$parent.fg1 = true;
        this.$parent.fg2 = true;
        this.$parent.fg3 = false;
      }
        this.getNewData(this.userid);
    },
    methods:{
      //获取数据列表
      getNewData: function (userid) {
        let vm = this;
        if(userid && userid != 0){
          vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/workexperiences?userid=' + userid,
          })
            .then(function(res){
              let data = res.data;
              if(data.code == 0){
                if(!data.result) return false;
                vm.DataLists = data.result;
              }else {
                vm.$message.error(data.message);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        };

      },
      //新增或保存
      fun: function (type) {
        let vm = this;
        let infoid;
        if(!vm.userid){
          vm.$message.warning("未检测到人才id,请先到人才浏览中选择单个人才进行操作!");
          return false;
        }
        if(type == 1){
          infoid = 0;
        }else if(type == 2){
          if(!vm.infoid){
            vm.$message.warning("请先选择列表中单个选项进行修改!");
            return false;
          };
          infoid = vm.infoid;
        };
        let data = JSON.parse(JSON.stringify(vm.viewData));
        data.BeginDate = vm.time[0]/1000;
        data.EndDate = vm.time[1]/1000;
        data.UserId = vm.userid;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/setworkexprience?operate='+type+'&id='+infoid,
          data:JSON.stringify(data)
        })
          .then(function(res){
            let resdata = res.data;
            if(resdata.code == 0){
              vm.$message.success(type == 1?"新增并保存成功!":'保存成功!');
              vm.infoid = res.data.result.id;
              vm.getNewData(vm.userid);
            }else {
              vm.$message.error(resdata.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //保存并新增学习经历
      addNewWork: function () {
        this.fun(1);
      },
      //保存修改学习经历
      saveWork: function () {
        this.fun(2);
      },
      //获取单项详情
      getInfo: function (id) {
        let vm = this;
        vm.infoid = id
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/workexperience?id=' + vm.infoid,
        })
          .then(function(res){
            let resdata = res.data;
            if(resdata.code == 0){
              vm.viewData = resdata.result;
              vm.time = [vm.viewData.BeginDate*1000,vm.viewData.EndDate*1000];
            }else {
              vm.$message.error(resdata.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //删除学习经历
      delWork: function (id) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/deleteworkexprience?id='+id,
        })
          .then(function(res){
            let data = res.data;
            if(data.code == 0 ){
              vm.$message.success('删除成功!');
              vm.getNewData(vm.userid);
            }else {
              vm.$message.error(data.message);
            }
          })
          .catch(function(err){
            alert(err);
          });
      },
      //英译中
      toCh: function () {
        let vm = this;
        commonApi.toZh(vm,vm.viewData);
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  #work{
    table,table tr th, table tr td {
      border:1px solid #cccccc;
    }
    .workLists_box{
      min-width: 846px;
      border-collapse:collapse;
      text-align: center;
      color: #454545;
      margin-bottom: 34px;
      thead{
        background-color: #eef6ff;
        font-size: 16px;
        font-stretch: normal;
        line-height: 62px;
        letter-spacing: 1px;
        color: #454545;
        tr{
          height: 34px;
          line-height: 34px;
          th{
            font-weight: normal;
          }
        }
      }
      tbody{
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        tr{
          &:hover{
            background-color: #f1f1f1;
          }
        }
        button{
          color: #169bd8;
          background-color: transparent;
        }
      }
    }
    .work_main_box{
      width: 472px;
      .work_main{
        width: 100%;
        height: 22px;
        margin-bottom: 16px;
        p.name{
          width: 85px;
          float: left;
          font-size: 16px;
          color: #454545;
          margin-right: 8px;
        }
        .wo_content_box{
          float: left;
          .wk_int{
            width: 310px;
            height: 22px;
            border: solid 1px #53b1dc;
            padding-left: 6px;
            color: #454545;
          }
          #describe{
            width: 378px;
            height: 164px;
            border: solid 1px #53b1dc;
            padding: 6px;
            color: #454545;
          }
          .el-input__inner{
            height: 22px;
            line-height: 20px;
            border: solid 1px #53b1dc;
            border-radius: 0px;
            .el-input__icon{
              height: 22px;
              line-height: 20px;
            }
            .el-range-separator{
              height: 22px;
              line-height: 20px;
            }
          }
        }
      }
      .wk_d_b{
        height: 164px;
      }
    }
    .wk_save_box{
      width: 846px;
      height: 24px;
      padding-left: 75px;
      margin-top: 44px;
      button{
        margin-left: 25px;
        height: 24px;
        font-size: 16px;
        line-height: 22px;
        padding:0px 6px;
      }
      .save_1{
        background-color: #169bd8;
        color: #fff;
      }
      .save_2,.btn_toEN{
        border: solid 1px #999999;
        color: #545454;
        background-color: #fff;
      }
    }
  }
</style>

