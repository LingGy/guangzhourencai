<template>
<div id="rg_Inof">
  <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 合并数据 > 人才信息</p>
  <div class="Info_div_box">
    <div class="info_box">
      <div class="list_box list_l2">
        <div class="list_l">头像:</div>
        <img :src="original.FaceURL" alt="" class='touxiang'>
      </div>
      <div class="list_box">
        <div class="list_l">中文名:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.ChineseName">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">英文名:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.EnglishName">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">邮箱:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.Email">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">注册时间:</div>
        <div class="list_r">
          <!--<input type="text">-->
          <el-date-picker
            v-model='original.RegisterDate'
            type="date"
            class="onlybox"
            value-format='timestamp'>
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="info_box" v-for='(list,index) in duplicate' :key="index">
      <div class="list_box pic">
        <div class="list_l">头像:</div>
        <img :src="list.FaceURL" alt="" >
      </div>
      <div class="list_box">
        <div class="list_l">中文名:</div>
        <div class="list_r">
          <p>{{list.ChineseName}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">英文名:</div>
        <div class="list_r">
          <p>{{list.EnglishName}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">邮箱:</div>
        <div class="list_r">
          <p>{{list.Email}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">注册时间:</div>
        <div class="list_r">
          <p>{{list.RegisterDate | formatDate()}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="control_wear">
    <button class="btn1" @click='subData(original.Id)'>保存</button>
    <button class="btn2" @click='del(original.Id)'>删除重复记录</button>
    <button class="btn3" @click='goBack()'>返回</button>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"rg_Info",
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
    methods:{
      getData: function (rgId) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+'/baseinfodup',
            data:'userid='+rgId
        })
           .then(function(res){
             let resData = res.data;
             if(resData.code == 0){
               if(resData.result.original){
                 resData.result.original.RegisterDate = resData.result.original.RegisterDate*1000;
                 vm.original = resData.result.original;
               }
               if(resData.result.duplicate){
                 let length = resData.result.duplicate.length;
                 for(let i = 0 ,len = length ; i < len; i++){
                   resData.result.duplicate[i].RegisterDate = resData.result.duplicate[i].RegisterDate*1000;
                 };
                 vm.duplicate = resData.result.duplicate;
               }

             }else {
               vm.$message.error(resData.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //保存
      subData: function (id) {
        let vm = this;
        let userid = sessionStorage.getItem('rgId');
        let data = JSON.parse(JSON.stringify(vm.original));
        data.RegisterDate = data.RegisterDate/1000;
        vm.$axios({
            method:"post",
            url:window.$g_url.ApiUrl + "/setbaseinfo?operate=2&userid="+id,
            data:JSON.stringify(data)
          })
          .then(function (res) {
              let data = res.data;
              if(data.code == 0){
                vm.$message.success("保存成功!");
                vm.getNewData();
              }else {
                vm.$message.error(data.message);
              }
            })
          .catch(function (err) {
            console.log(err);
          })
      },
      //删除重复记录
      del: function (id) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/deletebaseinfodup',
            data:'userid='+id
        })
           .then(function(res){
             if(res.data.code == 0){
               vm.$message.success("删除重复记录成功!");
             }else {
               vm.$message.error(res.data.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //返回
      goBack: function () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  #rg_Inof{

  }
</style>

