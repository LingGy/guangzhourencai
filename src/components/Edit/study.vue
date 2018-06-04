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
              v-for="(option,index) in options2"
              :key="index"
              :label="option.value"
              :value="option.value">
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
  export default {
    name:"Study",
    data:function () {
      return {
        majors:[],
        options2:[
          {value:""},
          {value:"博士"},
          {value:"硕士"},
          {value:"学士"},
          {value:"其他"},
        ],
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
      };
    },
    created: function () {
      if(this.$route.path == "/Edit/study"){
        this.$parent.fg1 = true;
        this.$parent.fg2 = true;
        this.$parent.fg3 = false;
      }
      this.getAssistData('/major');
      this.getNewData();
    },
    methods:{
      //获取数据列表
      getNewData: function () {
        let _this = this;
        let userId = sessionStorage.getItem("userId");
        if(userId && userId != 0) {
          _this.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/educations?userid=' + userId,
          })
            .then(function(res){
              let resDatas = res.data;
              if(resDatas.code == 0){
                _this.DataLists = resDatas.result;
              }else {
                _this.$message.error(resDatas.message);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        };
      },
      //保存并新增学习经历
      addNewStudy: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if(userid && userid !=0) {
          let data = JSON.parse(JSON.stringify(vm.viewData));
          data.BeginDate = vm.time[0]/1000;
          data.EndDate = vm.time[1]/1000;
          data.Id = "0";
          data.UserId = userid;
          vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/seteducation?operate=1&id=0',
            data:JSON.stringify(data)
          })
            .then(function(res){
              let resDatas = res.data;
              if(resDatas.code == 0){
                vm.$message.success("新增并保存学习经历成功!");
                vm.getNewData();
              }else {
                vm.$message.error(resDatas.message);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        }else {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
        }
      },
      //保存修改学习经历
      saveStudy: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if (userid && userid != 0) {
          let data = JSON.parse(JSON.stringify(vm.viewData));
          data.BeginDate = vm.time[0]/1000;
          data.EndDate = vm.time[1]/1000;
          vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/seteducation?operate=2&id='+ userid,
            data:JSON.stringify(data)
          })
            .then(function(res){
              let resDatas = res.data;
              if(resDatas.code == 0){
                vm.$message.success("修改并保存学习经历成功!");
                vm.getNewData();
              }else {
                vm.$message.error(resDatas.message);
              }
            })
            .catch(function(err){
              alert(err);
            });
        }else {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
        }
      },
      //获取单项详情
      getInfo: function (id) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/education?id=' + id,
        })
           .then(function(res){
             let resDatas = res.data;
             if(resDatas.code == 0){
               vm.viewData = resDatas.result;
               vm.viewData.Id = id;
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
          url:window.$g_url.ApiUrl+'/deleteeducation?id='+id,
        })
          .then(function(res){
            let resDatas = res.data;
            if(resDatas.code == 0 ){
              vm.$message.success('删除成功!');
              vm.getNewData();
            }else {
              vm.$message.error(resDatas.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //获取国籍选项数据
      getAssistData: function (api) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+api,
        })
          .then(function(res){
            let resData = res.data;
            if(resData.code == 0){
              if(api == '/country'){
                vm.countrys = resData.result;
              }else if(api == '/major'){
                vm.majors = resData.result;
              }else if(api == '/college'){
                vm.colleges = resData.result;
              }
            }else {
              vm.$message.error(resData.message);
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

