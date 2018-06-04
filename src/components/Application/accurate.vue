<template>
  <div id="accurate">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 分组管理 > 精确搜索</p>
    <div class="search_options_box">
      <div class="search_main_left">
        <div class="options_box">
          <div class="opstions">
            <p class="op_name">国籍&nbsp;:</p>
            <el-select
              v-model="nationality"
              filterable
              class="select_box">
              <el-option
                v-for="(option,index) in countrys"
                :key="index"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
          </div>
          <div class="opstions">
            <p class="op_name">行业&nbsp;:</p>
            <el-select
              v-model="major"
              filterable
              class="select_box">
              <el-option
                v-for="(option,index) in majors"
                :key="index"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
          </div>
          <!--<div class="opstions">-->
            <!--<p class="op_name">人才等级&nbsp;:</p>-->
            <!--<select class="select_box" v-model="level">-->
              <!--<option v-for="(list,index) in levelLists" :value="list.value" :key="index">{{list.text}}</option>-->
            <!--</select>-->
          <!--</div>-->
          <div class="opstions">
            <p class="op_name">留学国家&nbsp;:</p>
            <el-select
              v-model="studyregion"
              filterable
              class="select_box">
              <el-option
                v-for="(option,index) in countrys"
                :key="index"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="options_box mg_top">
          <div class="opstions">
            <p class="op_name">学校&nbsp;:</p>
            <el-select
              v-model="college"
              filterable
              class="select_box">
              <el-option
                v-for="(option,index) in colleges"
                :key="index"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
          </div>
          <div class="opstions">
            <p class="op_name">学历&nbsp;:</p>
            <el-select
              v-model="degree"
              filterable
              class="select_box">
              <el-option
                v-for="(option,index) in degreeList"
                :key="index"
                :label="option.value"
                :value="option.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <button type=button class="search_btn" @click="searchDatas()">搜索</button>
    </div>
    <div class="proLists_title">
      <p class="shu"></p>
      <p class="text">人才列表</p>
    </div>
    <el-checkbox-group v-model="checkedUserId" @change="handleCheckedCitiesChange" class='checkbox_box'>
    <table class="lists_table_box" v-loading="loading">
      <thead>
      <tr>
        <td>序号</td>
        <td>中文名</td>
        <td>英文名</td>
        <td>邮箱</td>
        <td>性别</td>
        <!--<td>人才等级</td>-->
        <td>最高学历</td>
        <td>现工作单位</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,index) in dataLists" :key="index">
        <td class="tac">
          <el-checkbox :label="list.UserId">{{index+1}}</el-checkbox>
        </td>
        <td>{{list.ChineseName}}</td>
        <td>{{list.EnglishName}}</td>
        <td>{{list.Email}}</td>
        <td>{{list.IsMale | getSex()}}</td>
        <!--<td>{{list.Level | getLevel()}}</td>-->
        <td>{{list.HighestDegree}}</td>
        <td>{{list.WorkUnit}}</td>
        <td>
          <button class="info" @click="toInfo(list.UserId)">详情</button>
        </td>
      </tr>
      </tbody>
    </table>
    </el-checkbox-group>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div class="end_box">
      <div class="end">
        <div class="name_box">
          <p class="name">组名&nbsp;:&nbsp;</p>
          <input type="text" class="int_name" placeholder="请输入组名" v-model='teamName' maxlength='24'>
        </div>
        <button class="saveTeamName" @click='saveTeamName()'>保存</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "accurate",
    data: function () {
      return {
        countrys: [],
        colleges: [],
        majors: [],
        degreeList: [
          {value: ""},
          {value: "博士"},
          {value: "硕士"},
          {value: "学士"},
          {value: "其它"},
        ],
        levelLists: [
          {value: '', text: ""},
          {value: '1', text: "高级"},
          {value: '2', text: "基本"}
        ],
        checkAll: false,
        isIndeterminate: true,
        checkedUserId: [],
        userids:[],
        dataLists: [],
        nationality: '',
        studyregion: '',
        college: '',
        major: '',
        degree: '',
        // level: '',
        teamName:'',
        loading:false
      }
    },
    created: function () {
      if(this.$route.path == "/application/accurate"){
        this.$parent.fg1 = true;
      }
      let _this = this;
      _this.$axios({
        method: 'get',
        url: window.$g_url.ApiUrl + '/college',
      })
        .then(function (res) {
          let resDatas = res.data;
          if (resDatas.code == 0) {
            _this.colleges = resDatas.result;
          } else {
            console.log(resDatas.message);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
      _this.$axios({
        method: 'get',
        url: window.$g_url.ApiUrl + '/major',
      })
        .then(function (res) {
          let resDatas = res.data;
          if (resDatas.code == 0) {
            _this.majors = resDatas.result;
          } else {
            console.log(resDatas.message);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
      _this.$axios({
        method: 'get',
        url: window.$g_url.ApiUrl + '/country',
      })
        .then(function (res) {
          let resDatas = res.data;
          if (resDatas.code == 0) {
            _this.countrys = resDatas.result;
          } else {
            console.log(resDatas.message);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    methods: {
      //搜索发送请求获取结果
      searchDatas: function () {
        let vm = this;
        vm.loading = true;
        vm.$axios({
          method: 'post',
          url: window.$g_url.ApiUrl + '/search?',
          data: "nationality=" + vm.nationality
          + "&studyregion=" + vm.studyregion
          + "&college=" + vm.college
          + "&major=" + vm.major
          + "&degree=" + vm.degree
        })
          .then(function (res) {
            vm.loading = false;
            let resDatas = res.data;
            if (resDatas.code == 0) {
              if (resDatas.result) {
                vm.dataLists = resDatas.result;
                let arr = [];
                for (let i = 0, len = vm.dataLists.length; i < len; i++) {
                  arr.push(vm.dataLists[i].UserId);
                }
                vm.userids = arr;
              } else {
                vm.dataLists = [];
                vm.$message.warning('未搜索到满足条件人才');
              }
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      //全选
      handleCheckAllChange(val) {
        let vm = this;
        let arr = [];
        for (let i = 0, len = vm.dataLists.length; i < len; i++) {
          arr.push(vm.dataLists[i].UserId);
        }
        this.checkedUserId = val ? arr : [];
        this.isIndeterminate = false;
      },
      //多选
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.userids.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.userids.length;
      },
      //保存小组
      saveTeamName: function () {
        let vm = this;
        if(vm.checkedUserId.length < 1){
          vm.$message.warning("请选择一项或多项添加到组");
          return false;
        }
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/setgroupname?name=' + vm.teamName,
            data:JSON.stringify(vm.checkedUserId)
        })
           .then(function(res){
             let resdata = res.data;
             if(resdata.code == 0){
               vm.$message.success("保存小组成功!");
             }else {
               vm.$message.warning(resdata.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //人才详情
      toInfo: function (id) {
        sessionStorage.setItem("userId",id);
        this.$router.push("/Edit/personnelInfo");
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  #accurate {
    .search_options_box {
      min-width: 1010px;
      height: 150px;
      background-color: #f1f2f6;
      padding-top: 28px;
      .search_main_left {
        float: left;
        .options_box {
          height: 22px;
          .opstions {
            margin-left: 20px;
            float: left;
            .op_name {
              float: left;
              color: #454545;
              font-size: 16px;
            }
            .select_box {
              width: 148px;
              height: 22px;
              float: left;
              color: #29a9f5;
              font-size: 14px;
              margin-left: 10px;
              background-color: #f1f2f6;
              .el-input__inner{
                width: 148px;
                height: 22px;
                border: solid 1px #53b1dc;
                border-radius:0px;
              }
            }
          }
        }
        .mg_top {
          margin-top: 28px;
        }
      }
      .search_btn {
        float: left;
        width: 62px;
        height: 26px;
        background-color: #169bd8;
        line-height: 26px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        margin-left: 170px;
      }
    }
    .proLists_title {
      height: 28px;
      margin-top: 20px;
      margin-bottom: 20px;
      .shu {
        width: 4px;
        height: 100%;
        background-color: #169bd8;
        float: left;
      }
      .text {
        font-size: 18px;
        color: #454545;
        line-height: 28px;
        float: left;
        margin-left: 4px;
      }
    }
    .lists_table_box {
      text-align: center;
      width: 1010px;
      color: #454545;
      border-collapse: collapse;
      thead {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        background-color: #f1f8ff;
        .tal {
          text-align: left;
        }
      }
      tbody {
        tr {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          .info {
            width: 45px;
            height: 24px;
            background-color: #6ecffa;
            color: #ffffff;
            margin-top: 3px;
            line-height: 24px;
            text-align: center;
          }
        }
      }
    }
    .end_box {
      width: 1010px;
      .end {
        width: 266px;
        margin: 0 auto;
        margin-top: 42px;
        .name_box {
          float: left;
          .name {
            height: 22px;
            line-height: 22px;
            font-size: 16px;
            color: #454545;
            float: left;
          }
          .int_name {
            width: 118px;
            height: 22px;
            border: solid 1px #53b1dc;
            line-height: 20px;
            padding-left: 6px;
          }
        }
        .saveTeamName {
          display: block;
          float: left;
          width: 50px;
          height: 24px;
          background-color: #169bd8;
          text-align: center;
          line-height: 24px;
          font-size: 16px;
          color: #ffffff;
          margin-left: 34px;
        }
      }
    }
    .tac {
      text-align: left;
    }
  }
</style>

