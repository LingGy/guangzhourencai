<template>
  <div id="study">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 学习经历</p>
    <table class="studyLists_box">
      <thead>
      <tr>
        <th>国内/国外</th>
        <th>学校名称</th>
        <th>时间</th>
        <th>学历/学位</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,index) in DataLists" :key="index" @click="getInfo(list.Id)">
        <td>{{list.IsHome | ifHome}}</td>
        <td>{{list.College}}</td>
        <td>{{list.BeginDate | formatDate}}--{{list.EndDate | formatDate}}</td>
        <td>{{list.Degree}}</td>
        <td>
          <button type=button @click.stop="delStudy(list.Id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="study_main_box">

      <div class="study_main">
        <p class="name">国内/国外&nbsp;:</p>
        <div class="st_content_box">
          <el-radio-group v-model="viewData.IsHome">
            <el-radio :label="1">国内</el-radio>
            <el-radio :label="0">国外</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="study_main">
        <p class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间&nbsp;:</p>
        <div class="st_content_box">
          <el-date-picker
            type="daterange"
            v-model='time'
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
        </div>
      </div>

      <div class="study_main">
        <p class="name">学校名称&nbsp;:</p>
        <div class="st_content_box">
          <input type="text" class="st_schoolName" v-model="viewData.College" maxlength='30'>
        </div>
      </div>

      <div class="study_main">
        <p class="name">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业&nbsp;:</p>
        <div class="st_content_box st_faculty_box">
          <el-select
            v-model="viewData.Major"
            filterable
            class="st_faculty">
            <el-option
              v-for="(option,index) in majors"
              :key="index"
              :label="option"
              :value="option">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="study_main">
        <p class="name">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历&nbsp;:</p>
        <div class="st_content_box st_faculty_box">
          <el-select
            v-model="viewData.Degree"
            filterable
            class="st_faculty">
            <el-option
              v-for="(option,index) in degrees"
              :key="index"
              :label="option"
              :value="option">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btn_box">
        <button class="save_add" type='button' @click="addNewStudy()">新增并保存学习经历</button>
        <button class="save" type='button' @click="saveStudy()">保存</button>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import commonApi from '../../assets/js/common'
  export default {
    name:"Study",
    data:function () {
      return {
        userid:'',
        infoid:'',
        majors:[],
        degrees:[],
        time:[],
        DataLists:[],
        viewData:{
          Id:'',
          IsHome:'',
          BeginDate:'',
          EndDate:'',
          College:'',
          Major:'',
          Degree:'',
        },
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
      };
    },
    created: function () {
      this.userid = sessionStorage.getItem("userId");
      if(this.$route.path == "/Edit/study"){
        this.$parent.fg1 = true;
        this.$parent.fg2 = true;
        this.$parent.fg3 = false;
      }
      commonApi.getAuxiliarydata(this,'major');
      commonApi.getAuxiliarydata(this,'degree');
      this.getNewData(this.userid);
    },
    methods:{
      //获取数据列表
      getNewData: function (userid) {
        let vm = this;
        if(userid && userid != 0) {
          vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/educations?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
            data:'userid='+userid
          })
            .then(function(res){
              let resDatas = res.data;
              if(resDatas.code == 0){
                vm.DataLists = resDatas.result;
              }else {
                vm.$message.error(resDatas.message);
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
        }
        let data = JSON.parse(JSON.stringify(vm.viewData));
        data.BeginDate = vm.time[0]/1000;
        data.EndDate = vm.time[1]/1000;
        data.UserId = vm.userid;
        delete data.Id;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/seteducation?operate='+type+'&id='+infoid+ "&outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:JSON.stringify(data)
        })
          .then(function(res){
            let resDatas = res.data;
            if(resDatas.code == 0){
              vm.$message.success(type == 1?"新增并保存成功!":'保存成功!');
              vm.infoid = res.data.result.id;
              vm.getNewData(vm.userid);
            }else {
              vm.$message.error(resDatas.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //保存并新增学习经历
      addNewStudy: function () {
        this.fun(1);
      },
      //保存修改学习经历
      saveStudy: function () {
        this.fun(2);
      },
      //获取单项详情
      getInfo: function (id) {
        let vm = this;
        vm.infoid = id
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/education?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
            data:'id='+vm.infoid
        })
           .then(function(res){
             let resDatas = res.data;
             if(resDatas.code == 0){
               vm.viewData = resDatas.result;
               vm.time = [vm.viewData.BeginDate*1000,vm.viewData.EndDate*1000];
             }else {
               vm.$message.error(resDatas.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //删除学习经历
      delStudy: function (id) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/deleteeducation?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:'id='+id
        })
          .then(function(res){
            let resDatas = res.data;
            if(resDatas.code == 0 ){
              vm.$message.success('删除成功!');
              vm.getNewData(vm.userid);
            }else {
              vm.$message.error(resDatas.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
    }
  }
</script>

<style lang="scss" type="text/scss">
  #study{
    table,table tr th, table tr td {
      border:1px solid #cccccc;
    }
    .studyLists_box{
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
        cursor: pointer;
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
    .study_main_box{
      width: 846px;
      .study_main{
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
        .st_content_box{
          height: 22px;
          float: left;
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
        .st_schoolName{
          width: 310px;
          height: 22px;
          border: solid 1px #53b1dc;
          padding-left: 6px;
          line-height: 20px;
        }
        .st_faculty_box{
          width: 148px;
          height: 22px;
          .st_faculty{
            width: 100%;
            height: 22px;
            line-height: 22px;
            color: #29a9f5;
            font-size: 14px;
            .el-input__inner{
              width: 100%;
              height: 22px;
              border: solid 1px #53b1dc;
            }
          }
        }
      }
      .btn_box{
        width: 100%;
        height: 24px;
        padding-left: 104px;
        margin-top: 40px;
        font-size: 16px;
        line-height: 24px;
        .save_add{
          width: 175px;
          height: 24px;
          background-color: #169bd8;
          color: #fff;
          margin-right: 20px;
        }
        .save{
          width: 50px;
          height: 24px;
          border: solid 1px #999999;
          color: #545454;
          background-color: #fff;
        }
      }
    }
  }
</style>

