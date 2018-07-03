<template>
  <div id="personnelInfo">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 人才信息</p>
    <div class="info_box">
      <!--<div class="pic">-->
        <!--<el-upload-->
          <!--class="avatar-uploader "-->
          <!--action=""-->
          <!--:show-file-list="false"-->
          <!--:on-success="handleAvatarSuccess"-->
          <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
      <!--</div>-->
      <div class=perBox><span class='name'>中文名<i>:</i></span><input type="text" class='ipt' v-model="result.ChineseName"></div>
      <div class=perBox><span class='name'>英文名<i>:</i></span><input type="text" class='ipt' v-model="result.EnglishName"></div>
      <div class=perBox><span class='name'>邮箱<i>:</i></span><input type="text" class='ipt' v-model="result.Email"></div>
      <!--<div class="perBox datebox">-->
        <!--<span class='name'>注册时间<i>:</i></span>-->
        <!--<div class="dateInfo">-->
          <!--<el-date-picker-->
            <!--v-model="result.RegisterDate"-->
            <!--type="date"-->
            <!--class="onlybox"-->
            <!--value-format='timestamp'>-->
          <!--</el-date-picker>-->
        <!--</div>-->
      <!--</div>-->
      <p class='btnBox'>
        <button class="btn_save1" type='button' @click="toEmail(result.Id,result.ChineseName)">发送邮件</button>
        <button class="btn_save1" type='button' @click="subData()">保存</button>
        <button class="btn_save1" type='button' @click="addSave()">新增并保存</button>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../assets/js/bus';
  export default {
    name:"personnelInfo",
    data: function () {
      return {
        imageUrl: '',
        result:{},
        options: [
          { text: '高级', value: '1' },
          { text: '基本', value: '2' },
        ],
        editId:null
      }
    },
    mounted: function () {
      let vm = this;
      if(vm.$route.path == "/Edit/personnelInfo"){
        vm.$parent.fg1 = true;
        vm.$parent.fg2 = true;
        vm.$parent.fg3 = false;
      }
      vm.editId = sessionStorage.getItem('userId');
      if(!vm.editId) return false;
      vm.getNewData(vm.editId);
    },
    methods:{
      //获取初始化数据
      getNewData: function (userid) {
        let vm = this;
        if(!userid){
         return false;
        };
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + "/baseinfo",
          data:"userid="+userid
        })
          .then(function (res) {
            let resDatas = res.data
            if(resDatas.code == 0){
              vm.result = resDatas.result;
              vm.result.RegisterDate = resDatas.result.RegisterDate * 1000;
            }else {
              vm.$message.error(resDatas.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //上传头像图片设置
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //保存基本信息修改
      subData: function () {
        let vm = this;
        if(vm.editId && vm.editId !=0){
          let data = JSON.parse(JSON.stringify(vm.result));
          //该参数暂时取消
          // data.RegisterDate = data.RegisterDate/1000;
          vm.$axios({
            method:"post",
            url:window.$g_url.ApiUrl + "/setbaseinfo?operate=2&userid="+vm.editId,
            data:JSON.stringify(data)
          })
            .then(function (res) {
              let data = res.data;
              if(data.code == 0){
                vm.$message.success("保存成功!");
                vm.getNewData(vm.editId);
              }else {
                vm.$message.error(data.message);
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        }else {
          vm.$message.warning("未检测到人才id,如为新增人才请点击新增并保存!");
        }

      },
      //新增并保存基本信息
      addSave: function () {
        let vm = this;
        let userid = 0;
        let data = JSON.parse(JSON.stringify(vm.result));
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + "/setbaseinfo?operate=1&userid="+userid,
          data:JSON.stringify(data)
        })
          .then(function (res) {
            let resDatas = res.data;
           if(resDatas.code == 0){
             sessionStorage.setItem("userId",resDatas.result.id);
             vm.editId = resDatas.result.id
             vm.$message.success('新增并保存成功!');
             vm.getNewData(vm.editId);
           }else {
             vm.$message.error(resDatas.message);
           }
          })
          .catch(function (err) {
            vm.$message.error(err);
          })
      },
      //发送邮件
      toEmail: function (userid,name) {
        let vm = this;
        if(!userid){
          vm.$notify({
            title: '提示信息',
            message: '未检测到人才ID',
            position: 'top-left',
            type: 'warning'
          });
          return false;
        }
        let EmailId = JSON.stringify({userid:userid,name:name,type:1})
        sessionStorage.setItem("EmailId",EmailId);
        this.$router.push('/application/email');
      }
    },
  }
</script>

<style lang="scss" type="text/scss" scoped>
    .info_box {
      width: 400px;
      input {
        padding-left: 6px;
      }
    }
    .pic{
      width: 100px;
      height: 120px;
      margin: 0 auto;
      border: 1px dashed #d9d9d9;
      margin-bottom: 26px;
      .avatar-uploader .el-upload {
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 120px;
        line-height: 120px;
        text-align: center;
      }
      .avatar {
        display: block;
        width: 100px;
        height: 120px;
    }
    }
    .perBox{
      height: 22px;
      line-height: 22px;
      margin-bottom: 15px;
      font-size: 16px;
      .name{
        display: block;
        width: 95px;
        color: #454545;
        float: left;
        i{
          float: right;
          margin-right: 16px;
          font-style: normal;
        }
      }
      .ipt{
        width: 305px;
        height: 22px;
        border: 1px solid #53b1dc;
      }
      .grade{
        width: 140px;
        height: 22px;
        border: 1px solid #53b1dc;
        padding-left: 50px;
        color: #29a9f5;
      }
    }
    .datebox{
      height: 40px;
      .el-input__inner{
        border: 1px solid #53b1dc !important;
        border-radius: 0px !important;
      }
      .dateInfo{
        height: 40px;
      }
    }
    p.btnBox{
      width: 400px;
      margin-top: 30px;
      padding: 0px 60px;
      display: flex;
      justify-content: space-between;
      .btn_save1{
        display: inline-block;
        height: 22px;
        line-height: 22px;
        background-color: #169bd8;
        font-size: 16px;
        text-align: center;
        padding: 0px 10px;
        color: #ffffff;
      }
    }

</style>

