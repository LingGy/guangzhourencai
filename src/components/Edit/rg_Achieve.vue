<template>
  <div id="rg_Achieve">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 合并数据 > 个人成就</p>
    <div class="Info_div_box">
      <div class="info_box">
        <div class="list_box">
          <div class="list_l">类型:</div>
          <div class="list_r">
            <el-select v-model="type" class="typeBox" @change='change()'>
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">注册时间:</div>
          <div class="list_r">
            <el-date-picker
              v-model='originallist.Date'
              type="date"
              class="onlybox"
              value-format='timestamp'>
            </el-date-picker>
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">描述:</div>
          <div class="list_r">
            <textarea class='text' v-model="originallist.Description"></textarea>
          </div>
        </div>
      </div>
      <div class="info_box" v-for='(list,index) in duplicate' :key="index">
        <div class="list_box">
          <div class="list_l">类型:</div>
          <div class="list_r">
            <p>{{list.Type}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">注册时间:</div>
          <div class="list_r">
            <p>{{list.Date | formatDate()}}</p>
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">描述:</div>
          <div class="list_r">
            <p class="typeBox">{{list.Description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="control_wear wear">
      <button class="btn1" @click='subData(originallist.Id)'>保存</button>
      <button class="btn1" @click='addData()'>新增</button>
      <button class="btn2" @click='del(originallist.UserId)'>删除重复记录</button>
      <button class="btn3" @click='goBack()'>返回</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"rg_Achieve",
  data: function () {
    return {
      original:[],
      type:0,
      options:[],
      originallist:{},
      duplicate:[],
      date:'',
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
        url:window.$g_url.ApiUrl+'/achievementdup?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
        data:'userid='+rgId
      })
        .then(function(res){
          let resData = res.data;
          if(resData.code == 0){
            if(resData.result.original){
              let newData = resData.result.original;
              for(let i = 0 ,len = newData.length ;  i< len; i++){
                newData[i].Date = newData[i].Date*1000;
                vm.options[i] = newData[i].Type;
              }
              vm.original = resData.result.original;
              vm.originallist = vm.original[0];
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
    //下拉选择事件
    change: function () {
      this.originallist = this.original[this.type];
    },
    //保存或新增
    or: function (id,type) {
      let vm = this;
      let userid;
      let reqdata = JSON.parse(JSON.stringify(vm.originallist));
      if(id == 0){
        reqdata.Id = 0 ;
      }
      reqdata.Date = reqdata.Date/1000;
      vm.$axios({
        method:"post",
        url:window.$g_url.ApiUrl + "/setachievement?operate="+type+"&id="+id+ "&outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
        data:JSON.stringify(reqdata)
      })
        .then(function (res) {
          let resdata = res.data;
          if(resdata.code == 0){
            vm.$message.success("设置成功!");
            vm.getData(reqdata.UserId);
          }else {
            vm.$message.error(resdata.message);
          }
        })
        .catch(function (err) {
          console.log(err);
        })
    },
    //保存
    subData: function (id) {
      this.or(id,2);
    },
    //新增
    addData: function () {
      this.or(0,1);
    },
    //删除重复记录
    del: function (userid) {
      let vm = this;
      vm.$axios({
        method:'post',
        url:window.$g_url.ApiUrl + '/deleteachievementdup?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
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
#rg_Achieve{
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
    }
  }
  .list_r{
    .iw{
      width: 280px;
    }
  }
  .wear{
    padding: 0px 330px;
  }
}
</style>

