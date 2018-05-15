<template>
  <div id="rg_Achieve">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 合并数据 > 个人简历</p>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"rg_Achieve",
  data: function () {
    return {
      original:{},
      duplicate:[],
      date:'',
    }
  },
  mounted: function () {
    let rgid = sessionStorage.getItem('rgId');
    this.getData(rgid);
  },
  methods: {
    getData: function (rgId) {
      let vm = this;
      vm.$axios({
        method:'post',
        url:window.$g_url.ApiUrl+'/achievementdup',
        data:'userid='+rgId
      })
        .then(function(res){
          let resData = res.data;
          if(resData.code == 0){

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

<style lang="scss" type="text/scss" scoped>

</style>

