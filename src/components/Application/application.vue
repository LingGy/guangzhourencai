<template>
  <div id="use">
    <div class="sub_nav_box">
      <ul class="sub_nav">
        <!--<li class='sub_nav_li' @click="toAccurate()">-->
          <!--<p :class="{active1:f1 == 1}">-->
            <!--<i class='iconfont'>&#xe675;</i>分组管理<i class='iconfont'>&#xe735;</i>-->
          <!--</p>-->
        <!--</li>-->
        <!--<li :class="[{'subson':true},{'subsonH':f2}]">-->
          <!--<router-link tag="span" v-for="(list,index) in navList" :to="list.path" :key='index' active-class="sp_active">{{list.text}}</router-link>-->
        <!--</li>-->
        <!--<li class='sub_nav_li' @click="toRelation()">-->
          <!--<p :class="{active1:f1 == 2}">-->
            <!--<i class='iconfont'>&#xe706;</i>关系分析<i class='iconfont'>&#xe735;</i>-->
          <!--</p>-->
        <!--</li>-->
        <router-link tag="li" class='sub_nav_li' to="/application/accurate" active-class="active1" :class="{active1:fg1}">
          <p @click="toBj()">
            <i class='iconfont'>&#xe675;</i>分组管理<i class='el-icon-arrow-right'></i>
          </p>
        </router-link>
        <li :class='{subson:true,subsonH:fg2}'>
          <router-link tag="span" v-for="(list,index) in navList" :to="list.path" :key='index' active-class="sp_active">{{list.text}}</router-link>
        </li>
        <router-link tag="li" class='sub_nav_li' to="/application/relation" active-class="active1">
          <p>
            <i class='iconfont'>&#xe706;</i>关系分析<i class='el-icon-arrow-right'></i>
          </p>
        </router-link>
        <router-link tag="li" class='sub_nav_li' to="/application/email" active-class="active1">
          <p>
            <i class='el-icon-message'></i>邮件管理<i class='el-icon-arrow-right'></i>
          </p>
        </router-link>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
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
        fg1:false,
        fg2:false,
      }
    },
    methods: {
      toBj: function () {
        this.fg2 == true ? this.fg2 = false : this.fg2 = true;
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>

