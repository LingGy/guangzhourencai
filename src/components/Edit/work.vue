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
            <el-radio :label="0">国内</el-radio>
            <el-radio :label="1">国外</el-radio>
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
      <button type=button class='btn_toEN'>英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '../../assets/js/date.js';
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
      };
    },
    //过滤器
    filters: {
      formatDate: function (time) { //时间戳转日期
        let date = new Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd');
      },
      ifHome: function (value) {
        return value==1? "国内":"国外";
      }
    },
    mounted: function () {
      this.getNewData();
    },
    methods:{
      //获取数据列表
      getNewData: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if(!userid || userid == 0) return false;
        vm.$axios({
          method:'post',
          url:vm.$api + '/workexperiences?userid=' + userid,
        })
          .then(function(res){
            var res = res.data;
            if(res.code == 0){
              vm.DataLists = res.result;
            }else {
              vm.$message.error(res.message);
            }
          })
          .catch(function(err){
            alert(err);
          });
      },
      //保存并新增学习经历
      addNewWork: function () {
        let vm = this;
        var userid = sessionStorage.getItem("userId");
        if(!userid || userid ==0) {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
          return false;
        }
        let data = JSON.parse(JSON.stringify(vm.viewData));
        data.BeginDate = vm.time[0]/1000;
        data.EndDate = vm.time[1]/1000;
        data.UserId = userid;
        vm.$axios({
          method:'post',
          url:vm.$api + '/setworkexprience?operate=1&id=0',
          data:JSON.stringify(data)
        })
          .then(function(res){
            var res = res.data;
            if(res.code == 0){
              vm.$message.success("新增并保存工作经历成功!");
              vm.getNewData();
            }else {
              vm.$message.error(res.message);
            }
          })
          .catch(function(err){
            alert(err);
          });
      },
      //保存修改学习经历
      saveWork: function () {
        let vm = this;
        var userid = sessionStorage.getItem("userId");
        if (!userid || userid == 0) {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
          return false;
        };
        let data = JSON.parse(JSON.stringify(vm.viewData));
        if(!data.Id){
          vm.$message.warning("请先从列表中选择需要修改的项!");
          return false;
        }
        data.BeginDate = vm.time[0]/1000;
        data.EndDate = vm.time[1]/1000;
        vm.$axios({
          method:'post',
          url:vm.$api + '/seteducation?operate=2&id='+ data.Id,
          data:JSON.stringify(data)
        })
          .then(function(res){
            var res = res.data;
            if(res.code == 0){
              vm.$message.success("修改并保存工作经历成功!");
              vm.getNewData();
            }else {
              vm.$message.error(res.message);
            }
          })
          .catch(function(err){
            alert(err);
          });
      },
      //获取单项详情
      getInfo: function (id) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:vm.$api + '/workexperience?id=' + id,
        })
          .then(function(res){
            var res = res.data;
            if(res.code == 0){
              vm.viewData = res.result;
              vm.time = [vm.viewData.BeginDate*1000,vm.EndDate*1000];
            }else {
              vm.$message.error(res.message);
            }
          })
          .catch(function(err){
            alert(err);
          });
      },
      //删除学习经历
      delWork: function (id) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:vm.$api+'/deleteworkexprience?id='+id,
        })
          .then(function(res){
            var res = res.data;
            if(res.code == 0 ){
              vm.$message.success('删除成功!');
              vm.getNewData();
            }else {
              vm.$message.error(res.message);
            }
          })
          .catch(function(err){
            alert(err);
          });
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
      width: 846px;
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
        button{
          color: #169bd8;
          background-color: #fff;
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

