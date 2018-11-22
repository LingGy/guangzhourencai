<template>
  <div id="assnInfo">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 社团管理 > 编辑社团</p>
    <div class="list_box">
      <div class="list">
        <span class="title">中文名:</span>
        <input type="text" placeholder="请输入中文名" v-model='Data.ChineseName'>
      </div>
      <div class="list">
        <span class="title">英文名:</span>
        <input type="text" placeholder="请输入英文名" v-model="Data.EnglishName">
      </div>
      <div class="list">
        <span class="title">主要分布国家(地区):</span>
        <el-select
          v-model="Data.Area"
          allow-create
          filterable
          class='select_box'>
          <el-option
            v-for="(item,index) in countrys"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="list">
        <span class="title">推荐参会使(领)馆:</span>
        <input type="text" placeholder="请输入推荐参会使(领)馆" v-model="Data.Embassy">
      </div>
      <div class="list">
        <span class="title">主团主要负责人:</span>
        <input type="text" placeholder="请输入主团主要负责人" v-model="Data.Chief">
      </div>
      <div class="list">
        <span class="title">负责人联系方式:</span>
        <input type="text" placeholder="请输入负责人联系方式" v-model="Data.ChiefContact">
      </div>
      <div class="list">
        <span class="title">主要专业分布:</span>
        <el-select
          v-model="Data.Major"
          allow-create
          filterable
          class='select_box'>
          <el-option
            v-for="(item,index) in majors"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <!--<div class="list">-->
        <!--<span class="title">社团会员人数:</span>-->
        <!--<input type="text" placeholder="请输入社团会员人数" v-model="Data.MemberCount">-->
      <!--</div>-->
      <div class="list">
        <span class="title">网站:</span>
        <input type="text" placeholder="请输入网站" v-model="Data.WebSite">
      </div>
      <div class="list list_s">
        <span class="title">更多资料:</span>
        <textarea class="moreText" placeholder="请输入中文简介" v-model="Data.Info"></textarea>
      </div>
    </div>
    <div class="console_box">
      <div class="c_box">
        <button class="save" @click="btnToEmail(Data.Id,Data.ChineseName)">发送邮件</button>
        <button class="save" @click="saveAssn()">保存</button>
        <button class="save" @click="addAssn()">新增</button>
        <!--<button class="toCh"></button>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import commonApi from '../../assets/js/common'
  export default{
    name:'assnInfo',
    data: function () {
      return {
        countrys:[],
        majors:[],
        Data:{
          ChineseName:'',
          EnglishName:'',
          Area:'',
          Embassy:'',
          Chief:'',
          ChiefContact:'',
          Major:'',
          // MemberCount:0,
          WebSite:'',
          Info:'',
          Status:0
        },
        assnId:'',
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
      }
    },
    created: function () {
      let vm = this;
      if(vm.$route.path == "/Edit/assnInfo"){
        vm.$parent.fg1 = false;
        vm.$parent.fg3 = true;
        vm.$parent.isA = false;
      }
      commonApi.getAuxiliarydata(vm,'major');
      commonApi.getAuxiliarydata(vm,'country');
      vm.assnId = sessionStorage.getItem('assnId')
      if(vm.assnId){
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/organization?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:'id='+vm.assnId,
        })
          .then(function(res){
            if(res.data.code == 0){
              vm.Data = res.data.result;
            }else {
              vm.$message.error(res.data.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      }
    },
    methods:{
      //设置社团信息
      setInfo: function (operate) {
        let vm = this;
        let id;
        if(operate == 1){
          id = 0;
          vm.Data.UserId = 0;
        }else if(operate == 2){
          if(vm.assnId){
            id = vm.assnId;
            vm.Data.UserId = vm.assnId;
          }else {
            vm.$message.warning('请先从社团列表中选择需修改的社团进行修改保存!');
            return false;
          }
        }
        let req = JSON.parse(JSON.stringify(vm.Data))
        // req.MemberCount=req.MemberCount?req.MemberCount:0;
        req.Status=req.Status?req.Status:0;
        delete req.Id;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+'/setorganization?operate='+operate+'&id='+id+ "&outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
            data:JSON.stringify(req)
        })
           .then(function(res){
             if(res.data.code == 0){
               let message;
               operate == 1?message='新增社团信息成功!':message='保存社团信息成功!';
               vm.assnId = res.data.result.id;
               vm.$message.success(message);
             }else {
               vm.$message.error(res.data.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //保存修改
      saveAssn: function () {
        this.setInfo(2);
      },
      //新增社团
      addAssn: function () {
        this.setInfo(1);
      },
      //跳转发送邮件功能
      btnToEmail: function (userid,name) {
        let vm = this;
        if(!userid){
          vm.$notify({
            title: '提示信息',
            message: '未检测到社团联系人ID',
            position: 'top-left',
            type: 'warning'
          });
          return false;
        }
        let EmailId = JSON.stringify({userid:userid,name:name,type:1})
        sessionStorage.setItem("EmailId",EmailId);
        this.$router.push('/application/email');
      },
    }
  }
</script>

<style lang="scss" type="text/scss">
#assnInfo{
  .list_box{
    width: 510px;
    .list{
      height: 22px;
      display: flex;
      justify-content: start;
      margin-bottom: 16px;
    }
    .list_s{
      height:145px;
    }
    .title{
      display: block;
      width: 200px;
      font-size: 16px;
      color: #454545;
    }
    input{
      width: 310px;
      height: 22px;
      border: solid 1px #53b1dc;
      padding-left: 6px;
      color: #666666;
    }
    .select_box{
      width: 148px;
      height: 22px;
      font-size: 14px;
      color: #29a9f5;
      .el-input__inner{
        width: 148px;
        color: #666666;
      }
    }
    .moreText{
      width: 309px;
      height: 145px;
      border: solid 1px #53b1dc;
      padding: 6px;
    }
  }
  .console_box{
    height: 24px;
    .c_box{
      width: 510px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      padding: 0px 100px;
      .save{
        height: 24px;
        background-color: #169bd8;
        font-size: 16px;
        color: #ffffff;
        padding: 0px 10px;
        line-height: 24px;
        text-align: center;
      }
      .toCh{
        width: 66px;
        height: 24px;
        border: solid 1px #999999;
        font-size: 16px;
        color: #545454;
      }
    }
  }
}
</style>

