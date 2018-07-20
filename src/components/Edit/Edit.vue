<template>
  <div id="edit">
    <div class="sub_nav_box">
      <ul class="sub_nav">
        <router-link tag="li" class='sub_nav_li' to="/Edit/personnelLists" active-class="active1">
          <p>
            <i class='iconfont'>&#xe63c;</i>人才浏览<i class='el-icon-arrow-right'></i>
          </p>
        </router-link>
        <router-link tag="li" to="/Edit/personnelInfo" active-class="active1" :class="{sub_nav_li:true,active1:fg1}">
          <p @click="toBj1">
            <i class='iconfont'>&#xe624;</i>编辑数据<i class='el-icon-arrow-right'></i>
          </p>
        </router-link>
        <li :class="{edit_sub:true,edit_sub1:fg2}">
          <ul class='edit_sub_ul'>
            <router-link tag="li" v-for='(list,index) in navList' :to='list.path' class='edit_sub_ul_li' active-class='active2'
                         :key='index'>
              <p>{{list.text}}</p>
            </router-link>
          </ul>
        </li>
        <router-link tag="li" class='sub_nav_li' to="/Edit/reorganize" active-class="active1">
          <p>
            <i class='iconfont'>&#xe65b;</i>合并数据<i class='el-icon-arrow-right'></i>
          </p>
        </router-link>
        <router-link tag="li" to="/Edit/assn" active-class="active1" :class="{sub_nav_li:true,active1:fg3}">
          <p @click="toBj2">
            <i class='iconfont'>&#xe61f;</i>社团管理<i class='el-icon-arrow-right'></i>
          </p>
        </router-link>
        <li :class="{lite:true,isA:isA}">
          <router-link tag='p' to="/Edit/assn" active-class="h">社团列表</router-link>
          <router-link tag='p' to="/Edit/assnInfo" active-class="h">编辑社团</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
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
          {'text': '学术论文', 'path': '/Edit/thesis'},
        ],
        navList1: [
          {"path": "/Edit/personnelLists"},
          {"path": "/Edit/reorganize"},
        ],
        fg1: false,
        fg2: false,
        fg3: false,
        isA:true,
      }
    },
    methods: {
      toBj1: function () {
        this.fg2 == true ? this.fg2 = false : this.fg2 = true;
      },
      toBj2: function () {
        this.isA == true ? this.isA = false : this.isA = true;
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#edit{
  .lite{
    width: 172px;
    padding-left: 45px;
    p{
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #545454;
      font-size: 18px;
      background-color: #f5f6f9;
      &:hover{
        color: #40aff5;
      }
    }
    .h{
      color: #40aff5;
    }
  }
  .isA{
    display: none;
  }
}
</style>

