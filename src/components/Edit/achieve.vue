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
          <!--<select name="" id="" class="main_name" v-model="resData.Type">-->
            <!--<option v-for="(option,index) in options" :value="option.value" :key="index">{{option.value}}</option>-->
          <!--</select>-->
          <el-select
            v-model="resData.Type"
            filterable
            class="main_name">
            <el-option
              v-for="(option,index) in options"
              :key="index"
              :label="option.value"
              :value="option.value">
            </el-option>
          </el-select>
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
      <button type=button class='btn_toEN' @click='toCh()'>英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '../../assets/js/date.js';
  import commonApi from '../../assets/js/common'

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
          Type:'',
          Date:'',
          Description:'',
        },
        userid:'',
        infoid:''
      }
    },
    mounted: function () {
      let vm = this;
      vm.userid = sessionStorage.getItem('userId');
      if(this.$route.path == "/Edit/achieve"){
        this.$parent.fg1 = true;
        this.$parent.fg2 = true;
        this.$parent.fg3 = false;
      }
      this.getNewData(vm.userid);
    },
    methods:{
      //获取数据
      getNewData: function (userid) {
        let vm = this;
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
        let data = JSON.parse(JSON.stringify(vm.resData));
        data.Date = data.Date/1000;
        data.UserId = vm.userid;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl +'/setachievement?operate='+type+'&id='+infoid,
          data:JSON.stringify(data)
        })
          .then(function(res){
            if(res.data.code == 0){
              vm.$message.success(type == 1?"新增并保存成功!":'保存成功!');
              vm.infoid = res.data.result.id;
              vm.getNewData(vm.userid);
            }else {
              vm.$message.error(res.data.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //新增并保存个人成就信息
      addDate: function () {
        this.fun(1);
      },
      //保存上传个人成就数据
      saveDate: function () {
        this.fun(2);
      },
      //点击查看单个成就详情
      choiceId: function (id) {
        let vm = this;
        vm.infoid = id
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/achievement?id=' + vm.infoid,
        })
           .then(function(res){
             let resDatas = res.data;
             if(resDatas.code == 0){
               vm.resData = resDatas.result;
               vm.resData.Date = vm.resData.Date * 1000;
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
               vm.getNewData(vm.userid);
             }else {
               vm.$message.error(resDatas.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //英译中
      toCh: function () {
        let vm = this;
        commonApi.toZh(vm,vm.resData);
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
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
          font-size: 14px;
          color: #29a9f5;
          letter-spacing: 1px;
          line-height: 20px;
          .el-input__inner{
            width: 310px;
            height: 22px;
            border: solid 1px #53b1dc;
            border-radius: 0px;
          }
        }
      }
      .ch_time{
        width: 378px;
        height: 22px;
        float: left;
        color: #454545;
        .el-input__inner{
        }
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

