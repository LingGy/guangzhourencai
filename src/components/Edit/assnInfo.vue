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
        <select class="select_box" v-model="Data.Area">
          <option v-for="(list,index) in countrys" :value="list" :key='index'>{{list}}</option>
        </select>
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
        <select class="select_box" v-model="Data.Major">
          <option v-for="(list,index) in majors" :value="list" :key='index'>{{list}}</option>
        </select>
      </div>
      <div class="list">
        <span class="title">社团会员人数:</span>
        <input type="text" placeholder="请输入社团会员人数" v-model="Data.MemberCount">
      </div>
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
        <button class="save" @click="saveAssn()">保存</button>
        <button class="save" @click="addAssn()">新增</button>
        <!--<button class="toCh"></button>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name:'assnInfo',
    data: function () {
      return {
        countrys:[],
        majors:[],
        Data:{}
      }
    },
    created: function () {
      let vm = this;
      if(vm.$route.path == "/Edit/assnInfo"){
        vm.$parent.fg1 = false;
        vm.$parent.fg3 = true;
        vm.$parent.isA = false;
      }
      vm.getAssistData('/country');
      vm.getAssistData('/major');
      let assnId = sessionStorage.getItem('assnId')
      if(assnId){
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/organization?id='+assnId,
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
               }
             }else {
               vm.$message.error(resData.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //设置社团信息
      setInfo: function (operate) {
        let vm = this;
        let id;
        if(operate == 1){
          id = 0;
          vm.Data.UserId = 0;
        }else if(operate == 2){
          let assnId = sessionStorage.getItem('assnId');
          if(assnId){
            id = assnId;
            vm.Data.UserId = assnId;
          }else {
            vm.$message.warning('请先从社团列表中选择需修改的社团进行修改保存!');
            return false;
          }
        }
        let req = JSON.parse(JSON.stringify(vm.Data))
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+'/setorganization?operate='+operate+'&id='+id,
            data:JSON.stringify(req)
        })
           .then(function(res){
             if(res.data.code == 0){
               let message;
               operate == 1?message='新增社团信息成功!':message='保存社团信息成功!';
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
      }
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
    }
    .select_box{
      width: 148px;
      height: 22px;
      border: solid 1px #53b1dc;
      padding-left: 20px;
      font-size: 14px;
      color: #29a9f5;
    }
    .moreText{
      width: 309px;
      height: 145px;
      border: solid 1px #53b1dc;
      padding: 6px;
    }
  }
  .console_box{
    width: 510px;
    height: 24px;
    .c_box{
      width: 140px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      margin-top: 30px;
      .save{
        width: 50px;
        height: 24px;
        background-color: #169bd8;
        font-size: 16px;
        color: #ffffff;
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

