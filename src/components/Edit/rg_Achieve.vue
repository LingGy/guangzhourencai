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
            <textarea class='text' v-model="originallist.description"></textarea>
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
            <p>{{list.Date}}</p>
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">描述:</div>
          <div class="list_r">
            <p class="typeBox">{{list.description}}</p>
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
  name:"rg_Achieve",
  data: function () {
    return {
      original:[],
      type:0,
      options:[],
      originallist:{},
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
    //保存
    subData: function (id) {
      let vm = this;
      let userid = sessionStorage.getItem('rgId');
      let data = JSON.parse(JSON.stringify(vm.originallist));
      data.Date = data.Date/1000;
      vm.$axios({
        method:"post",
        url:window.$g_url.ApiUrl + "/setachievement?operate=2&userid="+id,
        data:JSON.stringify(data)
      })
        .then(function (res) {
          let data = res.data;
          if(data.code == 0){
            vm.$message.success("保存成功!");
            vm.getData(id);
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
        url:window.$g_url.ApiUrl + '/deleteachievementdup',
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
}
</style>

