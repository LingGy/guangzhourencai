<template>
  <div id="achieve">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 个人成就</p>
    <table class="achieveLists_box">
      <thead>
        <tr>
          <th>类别</th>
          <th>时间 </th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(list,index) in resDataLists' :key='index' :data-id="list.id" @click="choiceId(list.Id)">
          <td>{{list.Type}}</td>
          <td>{{list.Date | formatDate}}</td>
          <td>
            <button type="button" @click.stop="delAchieve(list.Id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="achieveList_box">
      <div class="ac_title">
        <p class="ac_name">类&nbsp;&nbsp;&nbsp;&nbsp;别&nbsp;:</p>
        <div class="main_name_box">
          <select name="" id="" class="main_name" v-model="resData.Type">
            <option v-for="(option,index) in options" :value="option.value" :key="index">{{option.value}}</option>
          </select>
        </div>
      </div>
      <div class="ac_title ac_a2">
        <p class="ac_name">内&nbsp;&nbsp;&nbsp;&nbsp;容&nbsp;:</p>
        <textarea name="achieveInfo" id="achieveInfo" cols="30" rows="10" v-model='resData.Description'></textarea>
      </div>
      <div class="ac_title ac_only">
        <p class="ac_name">时&nbsp;&nbsp;&nbsp;&nbsp;间&nbsp;:</p>
        <div class="ch_time">
          <el-date-picker
            v-model="resData.Date"
            type="date"
            value-format='timestamp'>
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="ac_save_box">
      <button type=button class='save_1' @click='addDate()'>保存并新增个人成就</button>
      <button type=button class='save_2' @click="saveDate()">保存</button>
      <button type=button class='btn_toEN'>英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '../../assets/js/date.js';
  export default {
    name:"Achieve",
    data: function () {
      return {
        options:[
          {value:'主要成就（包括成果、专利情况）'},
          {value:'获奖情况'},
          {value:'参与社会组织情况'},
        ],
        resDataLists:[],
        resData:{
          Id:'',
          Type:'',
          Date:'',
          Description:'',
        },
      }
    },
    mounted: function () {
      if(this.$route.path == "/Edit/achieve"){
        this.$parent.fg1 = true;
        this.$parent.fg2 = true;
        this.$parent.fg3 = false;
      }
        this.getNewData();
    },
    methods:{
      //新增并保存个人成就信息
      addDate: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if(userid && userid !=0) {
          let data = JSON.parse(JSON.stringify(vm.resData));
          data.Date = data.Date/1000;
          data.UserId = userid;
          data.Id = 0;
          vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl +'/setachievement?operate=1&id=0',
            data:JSON.stringify(data)
          })
            .then(function(res){
              if(res.data.code == 0){
                vm.$message.success('保存成功!');
                vm.getNewData();
              }else {
                vm.$message.error(res.data.message);
              }
            })
            .catch(function(err){});
        }else {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
        }
      },
      //保存上传个人成就数据
      saveDate: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if(userid && userid !=0) {
          let data = JSON.parse(JSON.stringify(vm.resData));
          data.Date = data.Date/1000;
          vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl +'/setachievement?operate=2&id='+data.Id,
            data:JSON.stringify(data)
          })
            .then(function(res){
              if(res.data.code == 0){
                vm.$message.success('保存成功!');
                vm.getNewData();
              }else {
                if(res.data.message == 'error:缺少必要字段'){
                  vm.$message.warning('请先选择要修改的项');
                }
              }
            })
            .catch(function(err){});
        }else {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
        }
      },
      //点击查看获奖详情
      choiceId: function (id) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/achievement?id=' + id,
        })
           .then(function(res){
             let resDatas = res.data;
             if(resDatas.code == 0){
               vm.resData = resDatas.result;
               vm.resData.Date = vm.resData.Date * 1000;
               vm.resData.Id = id;
             }else {
               vm.$message.error(resDatas.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //删除个人成绩
      delAchieve: function (id) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+'/deleteachivement?id='+id,
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
      //获取数据
      getNewData: function () {
        let vm = this;
        let userid = sessionStorage.getItem('userId');
        if(userid && userid != 0) {
          vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + "/achievements?userid=" + userid,
          })
            .then(function (res) {
              let resDatas = res.data;
              if(resDatas.code ==0){
                vm.resDataLists = resDatas.result;
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        };
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  table,table tr th, table tr td {
    border:1px solid #cccccc;
  }
  .achieveLists_box{
    min-width: 846px;
    border-collapse:collapse;
    text-align: center;
    color: #454545;
    margin-bottom: 34px;
    thead{
      background-color: #eef6ff;
      font-size: 16px;
      tr{
        height: 34px;
        line-height: 34px;
      }
    }
    tbody{
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      tr{
        cursor: pointer;
        &:hover{
          background-color: #f1f1f1;
        }
      }
      button{
        display: block;
        width: 100%;
        height: 100%;
        color: #169bd8;
        background-color: transparent;
      }
    }
  }
  .achieveList_box{
    width: 846px;
    .ac_title{
      width: 100%;
      height: 22px;
      margin-bottom: 16px;
      p.ac_name{
        font-size: 16px;
        color: #454545;
        float: left;
        margin-right: 24px;
      }
      .main_name_box{
        width: 310px;
        height: 22px;
        float: left;
        .main_name{
          width: 100%;
          height: 100%;
          border: solid 1px #53b1dc;
          padding-left: 5px;
          font-size: 14px;
          color: #29a9f5;
          letter-spacing: 1px;
          line-height: 20px;
        }
      }
      .ch_time{
        width: 378px;
        height: 22px;
        float: left;
        color: #454545;
      }
    }
    .ac_only{
      height: 40px;
      .el-input__inner{
        border: 1px solid #53b1dc !important;
        border-radius: 0px !important;
      }
    }
    .ac_a2{
      height: 164px;
    }
    #achieveInfo{
      width: 378px;
      height: 164px;
      border: solid 1px #53b1dc;
      padding: 5px;
      color: #454545;
    }
  }
  .ac_save_box{
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
</style>

