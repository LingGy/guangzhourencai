<template>
  <div>
    201811010932
    <div class="login-btn">
      <el-button type="primary" @click="submitForm()">登录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {}
    },
    methods: {
      submitForm() {
        let vm = this;
        vm.$axios({
          method: 'post',
          url: window.$g_url.ApiUrl + '/entry',
          data: 'outerid=test&sign=e62f1206793e951d362910767ba2b548'
        })
          .then(function (res) {
            if (res.data.code == 0) {
              sessionStorage.setItem('loginInfo', res.data.result);
              sessionStorage.setItem('loginAccesstoken', res.data.result.accesstoken);
              sessionStorage.setItem('loginOuterid', res.data.result.outerid);
              vm.$router.push('/');
            } else {
              vm.$router.push('/error');
            }
          })
          .catch(function (err) {
            vm.$router.push('/error');
          });
      }
    }
  }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  }
  .ms-title{
    position: absolute;
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;

  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:160px;
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn button{
    height:36px;
  }
</style>
