<template>
  <div id="app">
    <div class="b-header-box">
      <h1 class="header-text">海外人才数据库</h1>
      <div class="nav-box">
        <ul>
          <router-link tag="li" v-for='(list,index) in navlists' :to='list.path' :key='list.id' active-class='active'>{{list.text}}</router-link>
        </ul>
      </div>
    </div>
    <!--底线-->
    <div class="line"></div>
    <div class="line2"></div>
    <router-view></router-view>
  </div>
</template>
<script>
import router from './router'

export default {
  router,
  name: 'App',
  data: function () {
    return {
      navlists:[
        {
          'text':'数据加工',
          'path':'/Edit'
        },
        {
          'text':'数据应用',
          'path':'/application'
        },
        {
          'text':'爬虫管理',
          'path':'/Manage'
        },
        {
          'text':'系统维护',
          'path':'/Maintain'
        },
      ],
        flag:-1
    }
  },
  methods:{
    tabChange: function (index) {
      this.flag = index
    },
    toLink: function (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  input{
    color: #666666;
  }
  .el-input__inner {
    height: 33px;
    font-size: 13px;
    box-shadow: none;
    border: 1px solid #e9e9e9;
  }

  .el-input__inner:hover {
    border-color: #e9e9e9;
  }

  .el-input__inner:focus {
    border-color: #42a5f5;
    box-shadow: none;
    transition-duration: .5s;
  }

  .el-input__inner::-webkit-input-placeholder {
    line-height: 20px;
    color: #666666;
  }

  .el-input__inner, .el-checkbox__inner, .el-textarea__inner, .el-button {
    border-radius: 0;
  }
</style>
