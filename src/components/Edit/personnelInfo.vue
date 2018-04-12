<template>
  <div id="personnelInfo">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 人才信息</p>
    <div class="info_box">
      <div class="pic">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <p><span class='name'>中文名<i>:</i></span><input type="text" class='ipt'></p>
      <p><span class='name'>英文名<i>:</i></span><input type="text" class='ipt'></p>
      <p><span class='name'>邮箱<i>:</i></span><input type="text" class='ipt'></p>
      <p><span class='name'>注册时间<i>:</i></span><input type="text" class='ipt'></p>
      <p>
        <span class='name'>人才等级<i>:</i></span><select name="grade" id="" class="grade">
          <option value="1">高级</option>
          <option value="2">普通</option>
        </select>
      </p>
      <p><button class="btn_save" type='button'>保存</button></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"personnelInfo",
    data: function () {
      return {
        imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522841763993&di=660188059fa03a9c487954eeadd6e53e&imgtype=0&src=http%3A%2F%2Fi.17173cdn.com%2F2fhnvk%2FYWxqaGBf%2Fcms3%2FBXzqQBblmmwtplw.png'
      }
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
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
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .info_box{
    width: 400px;
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
    p{
      height: 22px;
      line-height: 22px;
      margin-bottom: 15px;
      font-size: 16px;
      .name{
        display: inline-block;
        width: 95px;
        color: #454545;
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
      .btn_save{
        display: block;
        width: 50px;
        height: 22px;
        line-height: 22px;
        background-color: #169bd8;
        font-size: 16px;
        text-align: center;
        margin: 0 auto;
        color: #ffffff;
        margin-top: 30px;
      }
    }
  }
</style>

