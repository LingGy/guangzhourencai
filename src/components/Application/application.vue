<template>
  <div id="use">
    <div class="sub_nav_box">
      <ul class="sub_nav">
        <li class='sub_nav_li' @click="toAccurate()">
          <p :class="{active1:f1 == 1}">
            <i class='iconfont'>&#xe675;</i>分组管理<i class='iconfont'>&#xe735;</i>
          </p>
        </li>
        <li :class="[{'subson':true},{'subsonH':f2}]">
          <router-link tag="span" v-for="(list,index) in navList" :to="list.path" :key='index' active-class="sp_active">{{list.text}}</router-link>
        </li>
        <li class='sub_nav_li' @click="toRelation()">
          <p :class="{active1:f1 == 2}">
            <i class='iconfont'>&#xe706;</i>关系分析<i class='iconfont'>&#xe735;</i>
          </p>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router/index'
  export default {
    router,
    name: 'application',
    data: function () {
      return {
        navList: [
          {'text': '精确搜索', 'path': '/application/accurate'},
          {'text': '模糊搜索', 'path': '/application/vague'},
          {'text': '分组列表', 'path': '/application/packetList'},
        ],
        navList1: [
          {"path": "/application/relation"},
          {"path": "/application/relationpic"},
        ],
        f1:1,
        f2:false,
      }
    },
    methods: {
      //分组管理按钮
      toAccurate: function () {
        this.f1 = 1;
        this.f2 == true ? (this.f2=false):(this.f2=true);
      },
      //关系分析路由
      toRelation: function () {
        this.f1 = 2;
        this.$router.push(this.navList1[0].path);
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>

