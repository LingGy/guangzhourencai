<template>
  <div id="rg_Project">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 合并数据 > 个人项目</p>
    <div class="Info_div_box">
      <div class="info_box">
        <div class="list_box">
          <div class="list_l">项目名称:</div>
          <div class="list_r">
            <el-select v-model="type" class="typeBox" @change='change()' filterable>
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
          <div class="list_l">项目类型:</div>
          <div class="list_r">
            <input type="text" class="inp" v-model="originallist.Type">
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">所属行业:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.Industry">
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">成果持有人:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.Holder">
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">是否有专利:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.PatentStatus">
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">专利情况:</div>
          <div class="list_r">
            <textarea class='text' v-model="originallist.PatentSituation"></textarea>
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">更多资料:</div>
          <div class="list_r">
            <textarea class='text' v-model="originallist.Info"></textarea>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">关键字:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.Keyword">
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">项目状态:</div>
          <div class="list_r">
            <input type="text" class='inp' v-model="originallist.CurrentStatus">
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">项目需求:</div>
          <div class="list_r">
            <textarea class='text' v-model="originallist.Demand"></textarea>
          </div>
        </div>
      </div>
      <div class="info_box" v-for='(list,index) in duplicate' :key="index">
        <div class="list_box">
          <div class="list_l">项目名称:</div>
          <div class="list_r">
            <p>{{list.Name}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">项目类型:</div>
          <div class="list_r">
            <p>{{list.Type}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">所属行业:</div>
          <div class="list_r">
            <p>{{list.Industry}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">成果持有人:</div>
          <div class="list_r">
            <p>{{list.Holder}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">是否有专利:</div>
          <div class="list_r">
            <p>{{list.PatentStatus}}</p>
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">专利情况:</div>
          <div class="list_r">
            <p class='te'>{{list.PatentSituation}}</p>
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">更多资料:</div>
          <div class="list_r">
            <p class="te">{{list.Info}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">关键字:</div>
          <div class="list_r">
            <p>{{list.Keyword}}</p>
          </div>
        </div>
        <div class="list_box">
          <div class="list_l">项目状态:</div>
          <div class="list_r">
            <p>{{list.CurrentStatus}}</p>
          </div>
        </div>
        <div class="list_box descriptionBox">
          <div class="list_l">项目需求:</div>
          <div class="list_r">
            <p class="te">{{list.Demand}}</p>
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
    name:"rg_Project",
    data: function () {
      return {
        original:[],
        type:0,
        options:[],
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
          url:window.$g_url.ApiUrl+'/projectdup?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:'userid='+rgId
        })
          .then(function(res){
            let resData = res.data;
            if(resData.code == 0){
              if(resData.result.original){
                let newData = resData.result.original;
                for(let i = 0 ,len = newData.length ;  i< len; i++){
                  vm.options[i] = newData[i].Name;
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
        this.alldate = [this.originallist.BeginDate,this.originallist.EndDate]
      },
      //保存或新增
      or: function (id,type) {
        let vm = this;
        let reqdata = JSON.parse(JSON.stringify(vm.originallist));
        delete reqdata.Status;
        delete reqdata.Id;
        if(type == 1){
          id = 0;
        }
        vm.$axios({
          method:"post",
          url:window.$g_url.ApiUrl + "/setproject?operate="+type+"&id="+id+ "&outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
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
      //保存修改
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
          url:window.$g_url.ApiUrl + '/deleteprojectdup?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
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
  #rg_Project{
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



