<template>
  <div id="edit">
    <div class="sub_nav_box">
      <ul class="sub_nav">
        <router-link tag="li" class='sub_nav_li' to="/Edit/personnelLists" active-class="active1">
          <p>
            <i class='iconfont'>&#xe63c;</i>人才浏览<i class='iconfont'>&#xe735;</i>
          </p>
        </router-link>
        <router-link tag="li" class='sub_nav_li' to="/Edit/personnelInfo" active-class="active1" :class="{active1:fg1}">
          <p @click="toBj">
            <i class='iconfont'>&#xe624;</i>编辑数据<i class='iconfont'>&#xe735;</i>
          </p>
        </router-link>
        <li class="edit_sub" :class="{edit_sub1:fg2}">
          <ul class='edit_sub_ul'>
            <router-link tag="li" v-for='(list,index) in navList' :to='list.path' class='edit_sub_ul_li' active-class='active2'
                         :key='index'>
              <p>{{list.text}}</p>
            </router-link>
          </ul>
        </li>
        <router-link tag="li" class='sub_nav_li' to="/Edit/reorganize" active-class="active1">
          <p>
            <i class='iconfont'>&#xe65b;</i>合并数据<i class='iconfont'>&#xe735;</i>
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
        fg1: false,
        fg2: false,
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

