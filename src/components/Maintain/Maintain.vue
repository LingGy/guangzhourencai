<template>
  <div id="maintain">
    <div class="sub_nav_box">
      <ul class="sub_nav">
        <router-link tag="li" :to='navLists[0].path' class='sub_nav_li' active-class='active1'><p><i class='iconfont'>&#xe61d;</i>系统日志<i class='el-icon-arrow-right'></i></p></router-link>
        <router-link tag="li" :to='navLists[1].path' class='sub_nav_li' active-class='active1'><p><i class='iconfont'>&#xe640;</i>类别管理<i class='el-icon-arrow-right'></i></p></router-link>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'Maintain',
    data: function () {
      return{
        navLists:[
          {"path": "/Maintain/systemLog"},
          {"path": "/Maintain/category"},
        ]
      }
    },
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>

