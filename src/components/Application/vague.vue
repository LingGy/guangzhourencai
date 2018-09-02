<template>
  <div id="vague">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 分组管理 > 模糊搜索</p>
    <div class="search_options_box">
      <div class="search_main_left">
        <div class="options_box">
          <div class="opstions">
            <p class="op_name">国籍&nbsp;:</p>
            <el-select
              v-model="nationality"
              filterable
              allow-create
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
            <p class="op_name">留学国家&nbsp;:</p>
            <el-select
              v-model="studyregion"
              filterable
              allow-create
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
            <p class="op_name">学校&nbsp;:</p>
            <el-select
              v-model="college"
              filterable
              allow-create
              class="select_box">
              <el-option
                v-for="(option,index) in colleges"
                :key="index"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="options_box mg_top">
          <div class="opstions">
            <p class="op_name">学历&nbsp;:</p>
            <el-select
              v-model="degree"
              filterable
              allow-create
              class="select_box">
              <el-option
                v-for="(option,index) in degrees"
                :key="index"
                :label="option"
                :value="option">
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
    <div class="search_box">
      <div class="sbox">
        <input type="text" class="search" placeholder="搜索人才" v-model='personnel'>
        <i class="el-icon-search" @click='search()'></i>
      </div>
    </div>
    <el-checkbox-group v-model="checkedUserId" @change="handleCheckedCitiesChange" class='checkbox_box'>
      <table class="lists_table_box" v-loading="loading">
        <thead>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>邮箱</th>
          <th>性别</th>
          <th>最高学历</th>
          <th>现工作单位</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(list,index) in dataLists" :key="index">
          <td class="tac">
            <el-checkbox :label="list.UserId">{{index+1}}</el-checkbox>
          </td>
          <td class='bl' @click="toInfo(list.UserId)">{{list.ChineseName}}</td>
          <td>{{list.Email}}</td>
          <td>{{list.IsMale | getSex()}}</td>
          <td>{{list.HighestDegree}}</td>
          <td>{{list.WorkUnit}}</td>
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
  import commonApi from '../../assets/js/common'
  export default {
    name:"accurate",
    data: function () {
      return{
        countrys:[],
        colleges:[],
        majors:[],
        degrees:[],
        checkAll: false,
        isIndeterminate: true,
        checkedUserId: [],
        userids:[],
        dataLists: [],
        nationality: '',
        studyregion: '',
        college: '',
        degree: '',
        teamName:'',
        loading:false,
        personnel:null,
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
      }
    },
    created: function () {
      if(this.$route.path == "/application/vague"){
        this.$parent.fg1 = true;
      }
      commonApi.getAuxiliarydata(this,'college');
      commonApi.getAuxiliarydata(this,'major');
      commonApi.getAuxiliarydata(this,'degree');
      commonApi.getAuxiliarydata(this,'country');
    },
    methods:{
      //搜索发送请求获取结果
      searchDatas: function () {
        let vm = this;
        vm.loading = true;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/fuzzysearch?'+ "outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
          data:"nationality="+vm.nationality
          + "&studyregion="+vm.studyregion
          + "&college="+vm.college
          + "&degree="+vm.degree
        })
          .then(function(res){
            vm.loading = false;
            let resDatas = res.data;
            if(resDatas.code == 0){
              if(resDatas.result){
                vm.dataLists = resDatas.result;
                let arr = [];
                for (let i = 0, len = vm.dataLists.length; i < len; i++) {
                  arr.push(vm.dataLists[i].UserId);
                }
                vm.userids = arr;
              }else {
                vm.dataLists = [];
                vm.$message.warning('未搜索到满足条件人才');
              }
            }else {
              vm.$message.warning(resDatas.message);
            }
          })
          .catch(function(err){
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
          url:window.$g_url.ApiUrl + '/setgroupname?name=' + vm.teamName+ "&outerid=" + vm.outerid + "&accesstoken=" + vm.accesstoken,
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
      },
      //搜索
      search: function () {
        let vm = this;
        if(!vm.personnel){vm.$message.warning('人才姓名不能为空!'); return false;}
        const newArr = vm.dataLists.filter(function (key) {
          if(key.ChineseName == vm.personnel){
            return (key.ChineseName == vm.personnel);
          }
        })
        newArr.length >=1 ? vm.dataLists = newArr : vm.$message.warning('未找到该人才!');
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
</style>

