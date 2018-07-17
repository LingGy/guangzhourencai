<template>
  <div id="thesis">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 学术论文</p>
    <div class="th_box" v-for='(list,index) in resultData' :key='index'>
      <div class="th_content">
        <h4 class='h1h'>{{list.Title}}</h4>
        <p class='h2h'>{{list.TitleCH}}</p>
        <p class="original">{{list.Abstract}}</p>
        <p class="result">{{list.AbstractCH}}</p>
        <div class="th_bt_box">
          <button class="th_bt" @click='toCh(list.Title +"\n"+ list.Abstract,index)'>英译中</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'thesis',
  data: function () {
    return {
      resultData:[],
      userId:null,
    }
  },
  mounted: function () {
    this.userId = sessionStorage.getItem("userId");
    if(this.$route.path == "/Edit/thesis"){
      this.$parent.fg1 = true;
      this.$parent.fg2 = true;
      this.$parent.fg3 = false;
    }
    this.getData(this.userId);
  },
  methods:{
    getData: function (userId) {
      let vm = this;
      if(userId){
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/papers?userid='+userId,
        })
          .then(function(res){
            let resDatas = res.data;
            if(resDatas.code == 0){
              vm.resultData = resDatas.result;
            }else {
              vm.$message.error(resDatas.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      }
    },
    //英译中
    toCh: function (val,index) {
      let vm = this;
      let salt = Math.random();
      let q = encodeURIComponent (val);
      let sign = vm.$md5('20180706000183194' + val + salt + 'B8CBABcPj2yScVITdXs9')
      vm.$axios({
        method: 'post',
        url: 'https://bird.ioliu.cn/v1/?url=https://fanyi-api.baidu.com/api/trans/vip/translate',
        data: 'q=' + q + '&from=en&to=zh&appid=20180706000183194&salt=' + salt + '&sign=' + sign
      })
        .then(function (res) {
          if(res.data){
            vm.resultData[index].TitleCH = res.data.trans_result[0].dst;
            vm.resultData[index].AbstractCH = res.data.trans_result[1].dst;
          }
        })
        .catch(function (err) {
        });
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
#thesis{
  .th_box{
    .th_content{
      border-bottom: 1px solid #000000;
      padding: 10px;
      .h1h{
        color: #40aff5;
        text-decoration: underline;
      }
      .h2h{
        color: #666666;
        margin-top: 3px;
      }
      .original,.result{
        width: 800px;
        margin-top: 10px;
      }
      .result{
        color: #666666;
      }
      .th_bt_box{
        width: 100%;
        height: 24px;
        margin-top: 8px;
        .th_bt{
          height: 24px;
          font-size: 16px;
          color: #ffffff;
          line-height: 22px;
          padding: 0px 5px;
          background-color: #40aff5;
          float: right;
        }
      }
    }
  }
}
</style>

