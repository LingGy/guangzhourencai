<template>
  <div id="relationInfo">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 关系分析 > 关系详情</p>
    <button class="return" @click='goBack()'>返回</button>
    <!--校友-->
    <el-checkbox-group v-model="checkedIdArr" @change="handleCheckedCitiesChange">
      <table>
        <caption>校友关系</caption>
        <thead>
        <tr>
          <th>序号</th>
          <th>中文名</th>
          <th>英文名</th>
          <th>人才ID</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(list,index) in college" :key="index">
          <td>
            <el-checkbox :label="list.Id">{{index+1}}</el-checkbox>
          </td>
          <td>{{list.name}}</td>
          <td>{{list.EnglishName}}</td>
          <td>{{list.Id}}</td>
          <td>
            <button class="info" @click="toInfo(list.Id)">人才详情</button>
          </td>
        </tr>
        </tbody>
      </table>
    <!--同事-->
      <table>
        <caption>同事关系</caption>
        <thead>
        <tr>
          <th>序号</th>
          <th>中文名</th>
          <th>英文名</th>
          <th>人才ID</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(list,index) in institution" :key="index">
          <td>
            <el-checkbox :label="list.Id">{{index+1}}</el-checkbox>
          </td>
          <td>{{list.name}}</td>
          <td>{{list.EnglishName}}</td>
          <td>{{list.Id}}</td>
          <td>
            <button class="info" @click="toInfo(list.Id)">人才详情</button>
          </td>
        </tr>
        </tbody>
      </table>
    <!--同行-->
      <table>
        <caption>同行关系</caption>
        <thead>
        <tr>
          <th>序号</th>
          <th>中文名</th>
          <th>英文名</th>
          <th>人才ID</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(list,index) in industry" :key="index">
          <td>
            <el-checkbox :label="list.Id">{{index+1}}</el-checkbox>
          </td>
          <td>{{list.name}}</td>
          <td>{{list.EnglishName}}</td>
          <td>{{list.Id}}</td>
          <td>
            <button class="info" @click="toInfo(list.Id)">人才详情</button>
          </td>
        </tr>
        </tbody>
      </table>
    <!--同国籍-->
      <table>
      <caption>同国籍关系</caption>
      <thead>
      <tr>
        <th>序号</th>
        <th>中文名</th>
        <th>英文名</th>
        <th>人才ID</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,index) in nationality" :key="index">
        <td><el-checkbox :label="list.Id">{{index+1}}</el-checkbox></td>
        <td>{{list.name}}</td>
        <td>{{list.EnglishName}}</td>
        <td>{{list.Id}}</td>
        <td>
          <button class="info" @click="toInfo(list.Id)">人才详情</button>
        </td>
      </tr>
      </tbody>
    </table>
    <!--同项目-->
    <table>
      <caption>同项目关系</caption>
      <thead>
      <tr>
        <th>序号</th>
        <th>中文名</th>
        <th>英文名</th>
        <th>人才ID</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,index) in project" :key="index">
        <td><el-checkbox :label="list.Id">{{index+1}}</el-checkbox></td>
        <td>{{list.name}}</td>
        <td>{{list.EnglishName}}</td>
        <td>{{list.Id}}</td>
        <td>
          <button class="info" @click="toInfo(list.Id)">人才详情</button>
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
        <button class="saveTeamName" @click='saveTeamName(checkedIdArr,teamName)'>保存</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "relationInfo",
    data: function () {
      return {
        college: [],
        institution: [],
        industry: [],
        nationality: [],
        project: [],
        checkedIdArr: [],
        teamName:null,
        checkAll: false,
        isIndeterminate: true,
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
      }
    },
    created: function () {
      this.getCollege();
      this.getInstitution();
      this.getIndustry();
      this.getNationality();
      this.getProject();
    },
    methods: {
      //获取数据
      getNewDatas: function (relation) {
        let vm = this;
        let userid = sessionStorage.getItem("relationUserId");
        vm.$axios({
          method: 'post',
          url: window.$g_url.ApiUrl + '/relationdetail?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:"userid="+userid+"&type="+relation
        })
          .then(function (res) {
            let resdatas = res.data;
            if (resdatas.code == 0) {
              if (resdatas.result) {
                if (resdatas.result.length > 8) {

                }
                switch (relation) {
                  case 'college':
                    vm.college = resdatas.result;
                    break;
                  case 'institution':
                    vm.institution = resdatas.result;
                    break;
                  case 'industry':
                    vm.industry = resdatas.result;
                    break;
                  case 'nationality':
                    vm.nationality = resdatas.result;
                    break;
                  case 'project':
                    vm.project = resdatas.result;
                    break;
                  default:
                    false;
                }
              }
            } else {
              vm.$message.error(resdatas.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      //获取校友关系数据
      getCollege: function () {
        this.getNewDatas('college');
      },
      //获取同事关系数据
      getInstitution: function () {
        this.getNewDatas('institution');
      },
      //获取同行关系数据
      getIndustry: function () {
        this.getNewDatas('industry');
      },
      //获取同国籍关系数据
      getNationality: function () {
        this.getNewDatas('nationality');
      },
      //获取同项目关系数据
      getProject: function () {
        this.getNewDatas('project');
      },
      //人才详情
      toInfo: function (userid) {
        sessionStorage.setItem("userId", userid);
        this.$router.push('/Edit/personnelInfo');
      },
      //返回
      goBack: function () {
        this.$router.go(-1);
      },
      //全选
      handleCheckAllChange(val) {
        let leng = this.college.length + this.institution.length + this.industry.length + this.nationality.length + this.project.length
        let arr = (((this.college.concat(this.institution)).concat(this.industry)).concat(this.nationality)).concat(this.project);
        let idArr = [];
        for (let i = 0, len = arr.length; i < len; i++) {
          idArr.push(arr[i].Id);
        }
        this.checkedIdArr = val ? idArr : [];
        this.isIndeterminate1 = false;
      },
      //多选
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        console.log(value);
        this.checkAll1 = checkedCount === this.checkedIdArr.length;
        this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.checkedIdArr.length;
      },
      //保存小组
      saveTeamName: function (arr, teamName) {
        let vm = this;
        if (arr.length < 1) {
          vm.$message.warning("请选择一项或多项添加到组");
          return false;
        }
        vm.$axios({
          method: 'post',
          url: window.$g_url.ApiUrl + '/setgroupname?name=' + teamName+ "&outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data: JSON.stringify(arr)
        })
          .then(function (res) {
            let resdata = res.data;
            if (resdata.code == 0) {
              vm.$message.success("保存小组成功!");
            } else {
              vm.$message.warning(resdata.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #relationInfo {
    .return {
      display: block;
      width: 50px;
      height: 24px;
      color: #ffffff;
      background-color: #169bd8;
      text-align: center;
      &:hover {
        background-color: #6ecffa;
      }
    }
    table, table tr th, table tr td {
      border: 1px solid #cccccc;
    }
    table {
      min-width: 800px;
      text-align: center;
      border-collapse: collapse;
      margin-top: 35px;
      caption {
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        font-weight: 600;
      }
      thead {
        background-color: #f1f8ff;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        tr {
          th {
            font-weight: 400;
          }
        }
      }
      tbody {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        color: #454545;
        tr {
          &:hover {
            background-color: rgba(204, 204, 204, 0.2);
          }
        }
        .info {
          color: #4ac0f6;
          background-color: transparent;
          text-decoration: underline;
        }
      }
    }
    .end_box {
      width: 800px;
      .end {
        width: 266px;
        margin: 0 auto;
        /*margin-top: 42px;*/
        .name_box {
          float: left;
          .name {
            height: 22px;
            line-height: 22px;
            font-size: 16px;
            color: #454545;
            float: left;
            margin-bottom: 60px;
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
  }
</style>

