<template>
  <div id="rg_Job">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 合并数据 > 求职意向</p>
    <div class="Info_div_box">
      <div class="info_box">
        <div class="list_box">
          <div class="list_l">落户城市:</div>
          <div class="list_r">
            <input type="text" class="inp" v-model='originallist.IntentArea'>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">求职行业:</div>
          <div class="list_r">
            <input type="text" class="inp" v-model='originallist.IntentIndustry'>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">就职岗位:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.IntentPosition">
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">在国时间:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.TimeWorkHome">
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">期望年薪:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.ExpectedSalary">
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">期待福利:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.ExpectedWelfare">
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">更多资料:</div>
          <div class="list_r">
            <textarea class='text' v-model="originallist.Info"></textarea>
          </div>
        </div>
      </div>
      <div class="info_box" v-for='(list,index) in duplicate' :key="index">
        <div class="list_box">
          <div class="list_l">落户城市:</div>
          <div class="list_r">
            <p>{{list.IntentArea}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">求职行业:</div>
          <div class="list_r">
            <p>{{list.IntentIndustry}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">就职岗位:</div>
          <div class="list_r">
            <p>{{list.IntentPosition}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">在国时间:</div>
          <div class="list_r">
            <p>{{list.TimeWorkHome}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">职位:</div>
          <div class="list_r">
            <p>{{list.Position}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">国内/外:</div>
          <div class="list_r">
            <p>{{list.IsHome | ifHome}}</p>
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">职位描述:</div>
          <div class="list_r">
            <p class='te'>{{list.Description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="control_wear">
      <button class="btn1" @click='subData(originallist.UserId)'>保存</button>
      <button class="btn2" @click='del(originallist.UserId)'>删除重复记录</button>
      <button class="btn3" @click='goBack()'>返回</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"rg_Job",
    data: function () {
      return {
        originallist:{},
        duplicate:[],
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
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
          url:window.$g_url.ApiUrl+'/jobapplydup?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:'userid='+rgId
        })
          .then(function(res){
            let resData = res.data;
            if(resData.code == 0){
              if(resData.result.original){
                vm.originallist = resData.result.original;
              }
              if(resData.result.duplicate){
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
      //保存或新增
      subData: function (id) {
        let vm = this;
        let reqdata = JSON.parse(JSON.stringify(vm.originallist));
        delete  reqdata.UserId;
        reqdata.IsHome = reqdata.IsHome == '国内'?1:0;
        vm.$axios({
          method:"post",
          url:window.$g_url.ApiUrl + "/setjobapply?userid="+id+ "&outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:JSON.stringify(reqdata)
        })
          .then(function (res) {
            let resdata = res.data;
            if(resdata.code == 0){
              vm.$message.success("设置成功!");
              vm.getData(id);
            }else {
              vm.$message.error(resdata.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      //删除重复记录
      del: function (userid) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/deletejobapplydup?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:'userid='+userid
        })
          .then(function(res){
            if(res.data.code == 0){
              vm.$message.success("删除重复记录成功!");
              vm.getData(userid);
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
  #rg_Job{
    .typeBox{
      height: 22px;
      width: 280px;
      .el-input__inner{
        height: 22px;
        width: 280px;
        border-radius:0px;
        line-height: 20px;
        border: solid 1px #53b1dc;
        color: #29a9f5;
      }
    }
    .descriptionBox{
      height: 80px;
      .list_l{
        line-height: 80px;
      }
      .text{
        width: 320px;
        height: 75px;
        border: solid 1px #53b1dc;
        padding: 6px;
      }
    }
    .list_r{
      .st_content_box{
        height: 22px;
        width: 280px;
        width: 280px;
        height: 22px;
        line-height: 20px;
        border: solid 1px #53b1dc;
        border-radius: 0px;
        .el-input__icon{
          height: 22px;
          line-height: 20px;
        }
        .el-range-separator{
          height: 22px;
          line-height: 20px;
        }
      }
    }
    .wear{
      padding: 0px 330px;
    }
  }
</style>


