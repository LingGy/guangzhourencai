<template>
  <div id="project">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 个人项目</p>
    <table class="projectLists_box">
      <thead>
      <tr>
        <th>项目名称</th>
        <th>是否取得专利</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,index) in DataLists" :key="index" @click="getInfo(list.Id)">
        <td>{{list.Name}}</td>
        <td>{{list.PatentStatus}}</td>
        <td>
          <button type=button @click.stop="delProject(list.Id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="project_main_box">
      <div class="main_box">
        <p class="name">项目名称&nbsp;:</p>
        <div class="main">
          <input type="text" class="project_name" placeholder="请输入项目名称" v-model="viewData.Name" maxlength="50">
        </div>
      </div>
      <div class="main_box">
        <p class="name">项目类型&nbsp;:</p>
        <div class="main">
          <el-radio-group v-model="viewData.Type">
            <el-radio v-for="(list,index) in options1" :label="list.value" :key="index">{{list.text}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="main_box">
        <p class="name">所属行业&nbsp;:</p>
        <div class="main">
          <el-select
            v-model="viewData.Industry"
            filterable
            class="choice_box">
            <el-option
              v-for="(option,index) in options"
              :key="index"
              :label="option"
              :value="option">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="main_box">
        <p class="name">成果持有人&nbsp;:</p>
        <div class="main">
          <input type="text" class="project_name" placeholder="请输入持有人姓名" v-model="viewData.Holder">
        </div>
      </div>
      <div class="main_box">
        <p class="name">是否取得专利&nbsp;:</p>
        <div class="main">
          <el-radio-group v-model="viewData.PatentStatus">
            <el-radio v-for="(list,index) in options2" :label="list.value" :key="index">{{list.value}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="main_box info_box">
        <p class="name">专利情况&nbsp;:</p>
        <div class="main">
          <textarea name="info" id="info" cols="30" rows="10" placeholder="专利注册地、专利（申请）号、专利查询网站" v-model="viewData.PatentSituation"></textarea>
        </div>
      </div>
      <div class="main_box info_box">
        <p class="name">更多资料&nbsp;:</p>
        <div class="main">
          <textarea name="more" id="more" cols="30" rows="10" placeholder="请输入更多资料" v-model="viewData.Info"></textarea>
        </div>
      </div>
      <div class="main_box">
        <p class="name">项目所处状态&nbsp;:</p>
        <div class="main">
          <input type="text" class="project_name" placeholder="请输入项目所处状态" v-model="viewData.CurrentStatus">
        </div>
      </div>
      <div class="main_box">
        <p class="name">项目关键字&nbsp;:</p>
        <div class="main">
          <input type="text" class="project_name" placeholder="请输入项目关键字" v-model="viewData.Keyword">
        </div>
      </div>
      <div class="main_box need">
        <p class="name">项目需求&nbsp;:</p>
        <div class="main">
          <textarea name="need" id="need" cols="30" rows="10" placeholder="请输入项目需求，例如找资金、找技术合作伙伴、招人才、
找落地园区；资金、城市" v-model="viewData.Demand"></textarea>
        </div>
      </div>
    </div>
    <div class="submit_box">
      <button class="btn_add" @click="addNewProject()">保存并新增个人项目</button>
      <button class="btn_save" @click="saveProject()">保存</button>
      <button class="toEn">英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"Project",
    data:function() {
      return {
        options:[],
        options1:[
          {value:"1",text:"创业项目"},
          {value:"2",text:"合作项目"},
        ],
        options2:[
          {value:"是"},
          {value:"否"},
          {value:"正在申请"},
        ],
        DataLists:[],
        viewData:{
          UserId:'',
          Name:'',
          Type:'',
          Industry:'',
          Holder:'',
          PatentStatus:'',
          PatentSituation:'',
          Info:'',
          Keyword:'',
          CurrentStatus:'',
          Demand:'',
        },
        userid:'',
        infoid:''
      }
    },
    created: function () {
      let vm = this;
      vm.userid = sessionStorage.getItem("userId");
      if(vm.$route.path == "/Edit/project"){
        vm.$parent.fg1 = true;
        vm.$parent.fg2 = true;
        vm.$parent.fg3 = false;
      }
      vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/major',
      })
         .then(function(res){
            vm.options = res.data.result;
         })
         .catch(function(err){});
      vm.getNewData(vm.userid);
    },
    methods:{
      //获取数据列表
      getNewData: function (userid) {
        let vm = this;
        if(userid && userid != 0) {
          vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + '/projects?userid=' + userid,
          })
            .then(function(res){
              let data = res.data;
              if(data.code == 0){
                if(data.result){
                  vm.DataLists = data.result;
                }
              }else {
                vm.$message.error(data.message);
              }
            })
            .catch(function(err){
              console.log(err);
            });
        };
      },
      //新增或保存
      fun: function (type) {
        let vm = this;
        let infoid;
        if(!vm.userid){
          vm.$message.warning("未检测到人才id,请先到人才浏览中选择单个人才进行操作!");
          return false;
        }
        if(type == 1){
          infoid = 0;
        }else if(type == 2){
          if(!vm.infoid){
            vm.$message.warning("请先选择列表中单个选项进行修改!");
            return false;
          };
          infoid = vm.infoid;
        };
        let data = JSON.parse(JSON.stringify(vm.viewData));
        data.UserId = vm.userid;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/setproject?operate='+type+'&id='+infoid,
          data:JSON.stringify(data)
        })
          .then(function(res){
            let resdata = res.data;
            if(resdata.code == 0){
              vm.$message.success(type == 1?"新增并保存成功!":'保存成功!');
              vm.infoid = res.data.result.id;
              vm.getNewData(vm.userid);
            }else {
              vm.$message.error(resdata.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //保存并新增学习经历
      addNewProject: function () {
        this.fun(1);
      },
      //保存修改学习经历
      saveProject: function () {
        this.fun(2);
      },
      //获取单项详情
      getInfo: function (id) {
        let vm = this;
        vm.infoid = id
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/project?id=' + vm.infoid,
        })
          .then(function(res){
            let resdata = res.data;
            if(resdata.code == 0){
              vm.viewData = resdata.result;
            }else {
              vm.$message.error(resdata.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //删除学习经历
      delProject: function (id) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/deleteproject?id='+id,
        })
          .then(function(res){
            let resdata = res.data;
            if(resdata.code == 0 ){
              vm.$message.success('删除成功!');
              vm.getNewData(vm.userid);
            }else {
              vm.$message.error(resdata.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
#project{
  table,table tr th, table tr td {
    border:1px solid #cccccc;
  }
  .projectLists_box{
    min-width: 846px;
    border-collapse:collapse;
    text-align: center;
    color: #454545;
    margin-bottom: 34px;
    thead{
      background-color: #eef6ff;
      font-size: 16px;
      font-stretch: normal;
      line-height: 62px;
      letter-spacing: 1px;
      color: #454545;
      tr{
        height: 34px;
        line-height: 34px;
        th{
          font-weight: normal;
        }
      }
    }
    tbody{
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      tr{
        &:hover{
          background-color: #f1f1f1;
        }
      }
      button{
        color: #169bd8;
        background-color: transparent;
      }
    }
  }
  .project_main_box{
    width: 566px;
    .main_box{
      width: 100%;
      height: 22px;
      color: #454545;
      margin-bottom: 16px;
      p.name{
        font-size: 16px;
        width: 180px;
        float: left;
      }
      .main{
        float: left;
        font-size: 14px;
        .project_name{
          width: 310px;
          height: 22px;
          border: solid 1px #53b1dc;
          padding-left: 6px;
        }
        .choice_box{
          width: 148px;
          height: 22px;
          color: #29a9f5;
          .el-input__inner{
            width: 148px;
            height: 22px;
            border: solid 1px #53b1dc;
            border-radius: 0px;
          }
        }
        #info,#more,#need{
          width: 378px;
          height: 114px;
          border: solid 1px #53b1dc;
          padding: 6px;
        }
        #need{
          height: 64px;
        }
      }
    }

    .info_box{
      height: 114px;
    }
    .need{
      height: 64px;
    }
  }
  .submit_box{
    width: 100%;
    height: 24px;
    margin-top: 50px;
    margin-bottom: 60px;
    padding-left: 180px;
    .btn_save,.btn_add{
      width: 50px;
      height: 24px;
      background-color: #169bd8;
      font-size: 16px;
      text-align: center;
      line-height: 24px;
      color: #fff;
      float: left;
      margin-right: 30px;
    }
    .btn_add{
      width: 156px;
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
    }
  }
}
</style>

