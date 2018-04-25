<template>
  <div id="edit">
    <div class="sub_nav_box">
      <ul class="sub_nav">
        <li class='sub_nav_li' @click="toLists()">
          <p :class="{active1:fg1 == 1}">
            <i class='iconfont'>&#xe63c;</i>人才浏览<i class='iconfont'>&#xe735;</i>
          </p>
        </li>
        <li class='sub_nav_li' @click="toBj()">
          <p :class="{active1:fg1 == 2}">
            <i class='iconfont'>&#xe624;</i>编辑数据<i class='iconfont'>&#xe735;</i>
          </p>
        </li>
        <div class="edit_sub" :class="{edit_sub1:fg2}">
          <ul class='edit_sub_ul'>
            <router-link tag="li" v-for='list in navList' :to='list.path' class='edit_sub_ul_li' active-class='active2'
                         :key='list.id'>
              <p>{{list.text}}</p>
            </router-link>
          </ul>
        </div>
        <li class='sub_nav_li' @click="toRg()">
          <p :class="{active1:fg1 == 3}">
            <i class='iconfont'>&#xe65b;</i>合并数据<i class='iconfont'>&#xe735;</i>
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
  import router from '../../router/index';
  export default {
    router,
    name: 'Edit',
    data: function () {
      return {
        navList: [
          {'text': '人才信息', 'path': '/Edit/personnelInfo'},
          {'text': '个人简历', 'path': '/Edit/resume'},
          {'text': '个人成就', 'path': '/Edit/achieve'},
          {'text': '学习经历', 'path': '/Edit/study'},
          {'text': '工作经历', 'path': '/Edit/work'},
          {'text': '求职意向', 'path': '/Edit/jobIntention'},
          {'text': '个人项目', 'path': '/Edit/project'},
        ],
        navList1: [
          {"path": "/Edit/personnelLists"},
          {"path": "/Edit/reorganize"},
        ],
        changeNb: -1,
        fg1: 1,
        fg2: false,
      }
    },
    methods: {
      tabChange: function (index) {
        this.changeNb = index;
      },
      toLists: function () {
        this.fg1 = 1;
        this.$router.push(this.navList1[0].path);
      },
      toBj: function () {
        this.fg1 = 2;
        if (this.fg2) {
          this.fg2 = false;
        } else {
          this.fg2 = true;
        }
      },
      toRg: function () {
        this.fg1 = 3;
        this.$router.push(this.navList1[1].path);
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>


</style>

