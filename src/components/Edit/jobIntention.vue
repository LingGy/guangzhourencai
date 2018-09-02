<template>
  <div id="jobIntention">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 求职意向</p>
    <div class="job_box">
      <div class="job_main">
        <p class="name">落户城市&nbsp;:</p>
        <div class="job_main_r_box">
          <input type="text" placeholder="请输入落户城市" class="jobTo" v-model="Datas.IntentArea">
        </div>
      </div>
      <div class="job_main">
        <p class="name">求职行业&nbsp;:</p>
        <div class="job_main_r_box">
          <div class="profession">
            <el-select
              v-model="Datas.IntentIndustry"
              filterable
              allow-create
              class="sg">
              <el-option
                v-for="(option,index ) in majors"
                :key="index"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
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
            <el-select
              v-model="Datas.ExpectedSalary"
              filterable
              allow-create
              class="sg">
              <el-option
                v-for="(option,index ) in options5"
                :key="index"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
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
          <textarea name="more" id="more" cols="30" rows="10" placeholder="请输入回国工作设想、其他要求"
                    v-model="Datas.Info"></textarea>
        </div>
      </div>
    </div>
    <div class="submit_box">
      <button class="btn_save" @click="saveJobInfo()">保存</button>
      <button class="del" @click="delJobInfo()">删除</button>
      <button class="toEn" @click='toCh()'>英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import commonApi from '../../assets/js/common'
  export default {
    name: "JobIntention",
    data: function () {
      return {
        options2: [],
        options4: [
          {value: "全职回国"},
          {value: "每年不少于6个月"},
          {value: "每年不少于3个月"},
          {value: "短期兼职"}
        ],
        options5: [
          "面议",
          "6-10万 RMB/年薪",
          "10-15万 RMB/年薪",
          "15-20万 RMB/年薪",
          "20-30万 RMB/年薪",
          "30万以上 RMB/年薪",
        ],
        sheng: '',
        shi: '',
        majors: [],
        Datas: {
          // IntentArea:'',
          // IntentIndustry:'',
          // IntentPosition:'',
          // TimeWorkHome:'',
          // ExpectedSalary:100000,
          // ExpectedWelfare:'',
          // Info:'',
        },
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
      };
    },
    mounted: function () {
      this.getNewData();
      this.getAssistData("/major");
      if (this.$route.path == "/Edit/jobIntention") {
        this.$parent.fg1 = true;
        this.$parent.fg2 = true;
        this.$parent.fg3 = false;
      }
    },
    methods: {
      //获取初始化数据
      getNewData: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if (userid && userid != 0) {
          vm.$axios({
            method: 'post',
            url: window.$g_url.ApiUrl + '/jobapply?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
            data:'userid='+userid
          })
            .then(function (res) {
              let resDates = res.data;
              if (resDates.code == 0) {
                if (!resDates.result) return false;
                vm.Datas = resDates.result;
                let h = vm.majors.indexOf(vm.Datas.IntentIndustry);
                let c = vm.options5.indexOf(vm.Datas.ExpectedSalary);
                if(h == -1){
                  vm.majors.push(vm.Datas.IntentIndustry);
                }
                if(c == -1){
                  vm.options5.push(vm.Datas.ExpectedSalary);
                }
                // let arr = vm.Datas.IntentArea.split('省');
                // vm.sheng = arr[0]+"省";
                // vm.shi = arr[1];
              } else {
                vm.$message.error(resDates.message);
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        }
        ;
      },
      //保存求职意向
      saveJobInfo: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if (userid && userid != 0) {
          let data = JSON.parse(JSON.stringify(vm.Datas));
          // data.IntentArea = vm.sheng + vm.shi;
          data.UserId = userid;
          vm.$axios({
            method: 'post',
            url: window.$g_url.ApiUrl + '/setjobapply?userid=' + userid+ "&outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
            data: JSON.stringify(data)
          })
            .then(function (res) {
              let resDates = res.data;
              if (resDates.code == 0) {
                vm.$message.success("修改并保存求职意向成功!");
                vm.getNewData();
              } else {
                vm.$message.error(resDates.message);
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
        }
      },
      //删除求职意向
      delJobInfo: function () {
        let vm = this;
        let userid = sessionStorage.getItem("userId");
        if (userid && userid != 0) {
          vm.$axios({
            method: 'post',
            url: window.$g_url.ApiUrl + '/deletejobapply?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
            data:'userid='+userid
          })
            .then(function (res) {
              let resDates = res.data;
              if (resDates.code == 0) {
                vm.$message.success('删除成功!');
                vm.getNewData();
              } else {
                vm.$message.error(resDates.message);
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          vm.$message.warning("请先填写人才信息并保存或到人才列表选择单个人才查看!");
        }

      },
      //获取国籍选项数据
      getAssistData: function (api) {
        let vm = this;
        vm.$axios({
          method: 'post',
          url: window.$g_url.ApiUrl + api+ "?outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
        })
          .then(function (res) {
            let resData = res.data;
            if (resData.code == 0) {
              if (api == '/country') {
                vm.countrys = resData.result;
              } else if (api == '/major') {
                vm.majors = resData.result;
              } else if (api == '/college') {
                vm.colleges = resData.result;
              }
            } else {
              vm.$message.error(resData.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      //英译中
      toCh: function () {
        let vm = this;
        commonApi.toZh(vm,vm.Datas);
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  #jobIntention {
    .el-input__inner {
      height: 22px;
      border-radius: 0px;
      line-height: 20px;
      border: solid 1px #53b1dc;
      color: #29a9f5;
    }
    .job_box {
      width: 564px;
      color: #454545;
      .job_main {
        width: 100%;
        height: 22px;
        margin-bottom: 16px;
        p.name {
          width: 180px;
          font-size: 16px;
          float: left;
        }
        .job_main_r_box {
          width: 378px;
          font-size: 14px;
          float: left;
          .s2, .s3 {
            width: 100px;
            float: left;
            .el-input__inner {
              width: 100px;
            }
          }
          .s2 {
            margin-right: 15px;
          }
          .profession {
            width: 310px;
            height: 22px;
            .sg {
              width: 310px;
              .el-input__inner {
                width: 310px;
              }
            }
            .industry {
              width: 100%;
              height: 100%;
              border: solid 1px #53b1dc;
              color: #29a9f5;
              padding-left: 6px;
            }
          }
          .jobTo {
            width: 310px;
            height: 22px;
            border: solid 1px #53b1dc;
            padding-left: 6px;
          }
          label {
            display: block;
            margin-bottom: 8px;
            margin-left: 0px;
          }
          #more {
            width: 378px;
            height: 78px;
            border: solid 1px #53b1dc;
            padding: 6px;
          }
        }
      }
      .workTime {
        height: 92px;
      }
      .more {
        height: 78px;
      }
    }
    .submit_box {
      width: 300px;
      height: 24px;
      margin: 0 auto;
      margin-top: 50px;
      margin-bottom: 60px;
      .btn_save, .del {
        width: 50px;
        height: 24px;
        background-color: #169bd8;
        font-size: 16px;
        text-align: center;
        line-height: 24px;
        color: #fff;
        float: left;
      }
      .del {
        margin-left: 30px;
      }
      .toEn {
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

