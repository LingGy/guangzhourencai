<template>
  <div id="app">
    <div class="b-header-box">
      <h1 class="header-text">海外人才数据库</h1>
      <div class="nav-box">
        <ul>
          <!--<li v-for='(list,index) in navlists' :class='{active:index == flag}' v-on:click='tabChange(index),toLink(list.path)'>{{list.text}}</li>-->
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
          'path':'/Use'
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

<style lang="scss" type="text/scss" scoped>
  #app{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    border: none;
    //头部
    .b-header-box{
      min-width: 1300px;
      height: 87px;
      background:url("./assets/images/header.png") no-repeat center;
      margin: 0 auto;
      .header-text{
        width: 224px;
        font-size: 30px;
        color: #ffffff;
        margin: 30px 0px 0px 35px;
        float: left;
      }
      .nav-box{
        height: 100%;
        position: relative;
        float: left;
        ul{
          width: 968px;
          height: 38px;
          position: absolute;
          bottom: 0;
          float: left;
          li{
            display: block;
            float: left;
            width: 152px;
            height: 38px;
            background-color: #169bd8;
            text-align: center;
            line-height: 38px;
            color: #ffffff;
            font-size: 20px;
            font-weight: 600;
            margin: 0px 45px;
            a{
              display: block;
              width: 100%;
              height: 100%;
              color: #ffffff;
            }
          }
          :hover{
            cursor: pointer;
            background-color: #ffffff;
            color: #000;
          }
          .active{
            color: #000;
            background-color: #fff;
          }
          li:nth-child(4){
            margin-right: 0px;
          }
        }
      }
    }
    //头部底线
    .line{
      width: 100%;
      height: 16px;
      background-color: #fff;
    }
    .line2{
      width: 100%;
      height: 20px;
      background-color: #f2f3f7;
    }
  }
</style>
