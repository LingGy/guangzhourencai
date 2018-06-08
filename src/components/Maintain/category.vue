<template>
  <div id="category">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 系统维护 > 类别管理</p>
    <div class="typeBox">
      <div class="box">
        <div class="box_l">
          <p class="title">国家:</p>
          <input type="text" class="content_inp" placeholder="请输入名称" v-model='country'>
        </div>
        <div class="box_c">
          <span @click="addOrdel(1,'/setcountrytype')">添加</span>
          <span @click="addOrdel(2,'/setcountrytype')">修改</span>
          <span @click="delList('/deletecountrytype')">删除</span>
        </div>
        <ul class="box_r">
          <li v-for='(list,index) in countrytypes' :key='index' @click='setcountry(list.Name,list.Id)' :class="{act:list.Id == countryId?true:false}">{{list.Name}}</li>
        </ul>
      </div>
      <div class="box">
        <div class="box_l">
          <p class="title">学校:</p>
          <input type="text" class="content_inp" placeholder="请输入名称" v-model='college'>
        </div>
        <div class="box_c">
          <span @click="addOrdel(1,'/setcollegetype')">添加</span>
          <span @click="addOrdel(2,'/setcollegetype')">修改</span>
          <span @click="delList('/deletecollegetype')">删除</span>
        </div>
        <ul class="box_r">
          <li v-for='(list,index) in collegetypes' :key='index' @click='setcollege(list.Name,list.Id)' :class="{act:list.Id == collegeId?true:false}">{{list.Name}}</li>
        </ul>
      </div>
      <div class="box">
        <div class="box_l">
          <p class="title">行业:</p>
          <input type="text" class="content_inp" placeholder="请输入名称" v-model='major'>
        </div>
        <div class="box_c">
          <span @click="addOrdel(1,'/setmajortype')">添加</span>
          <span @click="addOrdel(2,'/setmajortype')">修改</span>
          <span @click="delList('/deletemajortype')">删除</span>
        </div>
        <ul class="box_r">
          <li v-for='(list,index) in majortypes' :key='index' @click='setmajor(list.Name,list.Id)' :class="{act:list.Id == collegeId?true:false}">{{list.Name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"category",
    data:function () {
      return{
        countrytypes:[],
        collegetypes:[],
        majortypes:[],
        country:'',
        college:'',
        major:'',
        countryId:'',
        collegeId:'',
        majorId:'',
      }
    },
    mounted: function () {
      this.getData('/countrytypes');
      this.getData('/collegetypes');
      this.getData('/majortypes');
    },
    methods:{
      //获取各类别数据函数
      getData: function (api) {
        let vm = this;
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+api,
        })
           .then(function(res){
             if(res.data.code == 0 ){
               if(api == '/collegetypes'){
                  vm.collegetypes = res.data.result;
               }else if(api == '/majortypes'){
                  vm.majortypes = res.data.result;
               }else if(api == '/countrytypes'){
                 vm.countrytypes = res.data.result;
               }
             }else {
               console.log(res.data.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //增加或者修改数据
      addOrdel: function (operate,api) {
        let vm = this;
        let name,id;
        switch (api) {
          case '/setcountrytype':name=vm.country,id=vm.countryId;
            break;
          case '/setcollegetype':name=vm.college,id=vm.collegeId;
            break;
          case '/setmajortype':name=vm.major,id=vm.majorId;
            break;
        }
        if(operate == 1){
          id = 0;
          if(!name){
            vm.$message.error('新增名称不能为空');
            return false;
          }
        }else if(operate == 2){
          if(!id){
            vm.$message.warning('请先从右侧列表中选择需要修改的项');
            return false;
          }
        }
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl + api+'?operate=' + operate + '&id=' + id + '&name=' + name,
        })
           .then(function(res){
             if(res.data.code == 0){
               if(operate == 1){
                 vm.$message.success('添加成功!');
               }else {
                 vm.$message.success('修改成功!');
               }
               if(api == '/setcountrytype'){
                 vm.getData('/countrytypes');
               }else if(api == '/setcollegetype'){
                 vm.getData('/collegetypes');
               }else if(api == '/setmajortype'){
                 vm.getData('/majortypes');
               }
             }else {
               vm.$message.error(res.data.message);
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //删除项
      delList: function (api) {
        let vm = this;
        let id;
        switch (api) {
          case '/deletecountrytype':id=vm.countryId;
            break;
          case '/deletecollegetype':id=vm.collegeId;
            break;
          case '/deletemajortype':id=vm.majorId;
            break;
        };
        if(!id){
          vm.$message.warning('请先从右侧列表中选择需要删除的项');
          return false;
        }
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+ api + '?id=' + id,
        })
           .then(function(res){
             if(res.data.code == 0){
               vm.$message.success('删除成功');
               if(api == '/deletecountrytype'){
                 vm.getData('/countrytypes');
               }else if(api == '/deletecollegetype'){
                 vm.getData('/collegetypes');
               }else if(api == '/deletemajortype'){
                 vm.getData('/majortypes');
               }
             }
           })
           .catch(function(err){
             console.log(err);
           });
      },
      //点击某个子选项获取其id并将其name渲染到对象输入框;
      setcountry: function (name,id) {
        let vm = this;
        vm.country = name;
        vm.countryId = id;
      },
      setcollege: function (name,id) {
        let vm = this;
        vm.college = name;
        vm.collegeId = id;
      },
      setmajor: function (name,id) {
        let vm = this;
        vm.major = name;
        vm.majorId = id;
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#category{
  .typeBox{
    width: 530px;
    .box{
      width: 100%;
      height: 126px;
      margin-bottom: 50px;
      display: flex;
      justify-content: space-between;
      .box_l{
        width: 230px;
        display: flex;
        justify-content: space-between;
        .title{
          font-size: 16px;
          color: #454545;
          letter-spacing: 10px;
        }
        .content_inp{
          width: 148px;
          height: 22px;
          border: solid 1px #53b1dc;
          padding-left: 3px;
        }
      }
      .box_c{
        width: 48px;
        height: 90px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        span{
          display: block;
          width: 48px;
          height: 20px;
          border: solid 1px #999999;
          color: #545454;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          &:hover{
            cursor: pointer;
            background-color: #4ac0f6;
            border:none;
            color: #ffffff;
          }
        }
      }
      .box_r{
        width: 166px;
        height: 132px;
        border: solid 1px #53b1dc;
        overflow: scroll;
        li{
          height: 24px;
          font-size: 14px;
          color: #666666;
          white-space:nowrap;
          overflow: visible;
          padding-left: 3px;
          &:hover{
            cursor: pointer;
            background-color: rgba(204,204,204,0.4);
          }
        }
        .act{
          background-color: rgba(204,204,204,0.4);
        }
      }
    }
  }
}
</style>

