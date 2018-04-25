<template>
  <div id="jobIntention">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 求职意向</p>
    <div class="job_box">
      <div class="job_main">
        <p class="name">落户城市&nbsp;:</p>
        <div class="job_main_r_box">
          <div class="sheng_box">
              <select name="" id="" class="sheng" v-model="sheng">
                <option v-for="(option,index) in options1" :value="option.value" :key="index">{{option.value}}</option>
              </select>
          </div>
          <div class="shi_box">
            <select name="" id="" class="sheng" v-model="shi">
              <option v-for="(option,index) in options2" :value="option.value" :key="index">{{option.value}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="job_main">
        <p class="name">求职行业&nbsp;:</p>
        <div class="job_main_r_box">
          <div class="profession">
            <select name="" id="" class="industry" v-model="Datas.IntentIndustry">
              <option v-for="(option,index) in options3" :value="option.value" :key="index">{{option.value}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="job_main">
        <p class="name">就职岗位&nbsp;:</p>
        <div class="job_main_r_box">
          <input type="text" placeholder="请输入就职岗位" class="jobTo" v-model="Datas.IntentPosition">
        </div>
      </div>
      <div class="job_main workTime">
        <p class="name">可在中国工作时间&nbsp;:</p>
        <div class="job_main_r_box">
          <el-radio-group v-model="Datas.TimeWorkHome">
            <el-radio v-for="(list,index) in options4" :label="list.value" :key="index">{{list.value}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="job_main">
        <p class="name">渴望年薪&nbsp;:</p>
        <div class="job_main_r_box">
          <div class="profession">
            <select name="" id="" class="industry" v-model="Datas.ExpectedSalary">
              <option v-for="(option,index) in options5" :value="option.value" :key="index">{{option.value}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="job_main">
        <p class="name">期望福利&nbsp;:</p>
        <div class="job_main_r_box">
          <input type="text" placeholder="请输入期望福利" class="jobTo" v-model="Datas.ExpectedWelfare">
        </div>
      </div>
      <div class="job_main more">
        <p class="name">更多资料&nbsp;:</p>
        <div class="job_main_r_box">
          <textarea name="more" id="more" cols="30" rows="10" placeholder="请输入回国工作设想、其他要求" v-model="Datas.Info"></textarea>
        </div>
      </div>
    </div>
    <div class="submit_box">
      <button class="btn_save" @click="saveJobInfo()">保存</button>
      <button class="del" @click="delJobInfo()">删除</button>
      <button class="toEn">英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"JobIntention",
    data:function () {
      return {
        options1:[
          {value:"广东省"},
          {value:"福建省"},
          {value:"海南省"}
        ],
        options2:[
          {value:"深圳市"},
          {value:"广州市"},
          {value:"汕头市"}
        ],
        options3:[
          {value:"金融业"},
          {value:"IT行业"},
          {value:"证券投资"}
        ],
        options4:[
          {value:"全职回国"},
          {value:"每年不少于6个月"},
          {value:"每年不少于3个月"},
          {value:"短期兼职"}
        ],
        options5:[
          {value:"面议"},
          {value:"6-10万"},
          {value:"10-15万"},
          {value:"15-20万"},
          {value:"20-30万"},
          {value:"30万以上"},
        ],
        sheng:'',
        shi:'',
        Datas:{
          IntentArea:'',
          IntentIndustry:'',
          IntentPosition:'',
          TimeWorkHome:'',
          ExpectedSalary:'',
          ExpectedWelfare:'',
          Info:'',
        }
      };
    },
    created: function () {
        this.getNewData();
    },
    methods:{
      //获取初始化数据
      getNewData: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if(userid && userid != 0) {
          vm.$axios({
            method:'post',
            url:vm.$api + '/jobapply?userid=' + userid,
          })
            .then(function(res){
              let resDates = res.data;
              if(resDates.code == 0){
                if(!resDates.result) return false;
                vm.Datas = resDates.result;
                let arr = vm.Datas.IntentArea.split('省');
                vm.sheng = arr[0]+"省";
                vm.shi = arr[1];
              }else {
                vm.$message.error(resDates.message);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        };
      },
      //保存求职意向
      saveJobInfo: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if (userid && userid != 0) {
          let data = JSON.parse(JSON.stringify(vm.Datas));
          data.IntentArea = vm.sheng + vm.shi;
          data.UserId = userid;
          vm.$axios({
            method:'post',
            url:vm.$api + '/setjobapply?userid='+ userid,
            data:JSON.stringify(data)
          })
            .then(function(res){
              let resDates = res.data;
              if(resDates.code == 0){
                vm.$message.success("修改并保存求职意向成功!");
                vm.getNewData();
              }else {
                vm.$message.error(resDates.message);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        }else {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
        }
      },
      //删除求职意向
      delJobInfo: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if (userid && userid != 0) {
          vm.$axios({
            method:'post',
            url:vm.$api+'/deletejobapply?userid='+userid,
          })
            .then(function(res){
              let resDates = res.data;
              if(resDates.code == 0 ){
                vm.$message.success('删除成功!');
                vm.getNewData();
              }else {
                vm.$message.error(resDates.message);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        }else {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
        }

      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#jobIntention{
  .job_box{
    width: 564px;
    color: #454545;
    .job_main{
      width: 100%;
      height: 22px;
      margin-bottom: 16px;
      p.name{
        width: 180px;
        font-size: 16px;
        float: left;
      }
      .job_main_r_box{
        width: 378px;
        font-size: 14px;
        float: left;
        .sheng_box,.shi_box{
          width: 82px;
          height: 22px;
          .sheng{
            width: 100%;
            height: 100%;
            border: solid 1px #53b1dc;
            color: #29a9f5;
            line-height: 20px;
            padding-left: 6px;
          }
        }
        .sheng_box{
          float: left;
          margin-right: 10px;
        }
        .shi_box{
          float: left;
        }
        .profession{
          width: 148px;
          height: 22px;
          .industry{
            width: 100%;
            height: 100%;
            border: solid 1px #53b1dc;
            color: #29a9f5;
            padding-left: 6px;
          }
        }
        .jobTo{
          width: 310px;
          height: 22px;
          border: solid 1px #53b1dc;
          padding-left: 6px;
        }
        label{
          display: block;
          margin-bottom: 8px;
          margin-left: 0px;
        }
        #more{
          width: 378px;
          height: 78px;
          border: solid 1px #53b1dc;
          padding: 6px;
        }
      }
    }
    .workTime{
      height: 92px;
    }
    .more{
      height: 78px;
    }
  }
  .submit_box{
    width: 300px;
    height: 24px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 60px;
    .btn_save,.del{
      width: 50px;
      height: 24px;
      background-color: #169bd8;
      font-size: 16px;
      text-align: center;
      line-height: 24px;
      color: #fff;
      float: left;
    }
    .del{
      margin-left: 30px;
    }
    .toEn{
      width: 66px;
      height: 24px;
      border: solid 1px #999999;
      font-size: 16px;
      color: #545454;
      line-height: 24px;
      background-color: #fff;
      float: left;
      margin-left: 30px;
    }
  }
}
</style>

