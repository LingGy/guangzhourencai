<template>
  <div id="manage">
    <div class="sub_nav_box">
      <ul class="sub_nav">
        <router-link tag='li' class='sub_nav_li' to='/Manage/runningInfo' active-class='active1'>
          <p>
            <i class='iconfont'>&#xe61c;</i>运行情况<i class='el-icon-arrow-right'></i>
          </p>
        </router-link>
        <router-link tag='li' class='sub_nav_li' to='/Manage/taskManagement' active-class='active1'>
          <p>
            <i class='iconfont'>&#xe643;</i>任务管理<i class='el-icon-arrow-right'></i>
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
    name:'Manage',
    data: function () {
      return {

      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>

