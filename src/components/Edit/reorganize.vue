<template>
  <div id="reorganize">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 合并数据 > 人才数据</p>
    <div class="top">
      <div class="top_left">
        <div class="bule"></div>
        <p>人才数据</p>
      </div>
      <div class="top_right">
        <input type="text" class='name' placeholder='请输入搜索人姓名'>
        <button type='button' class='btn_search'>搜索</button>
      </div>
    </div>
    <table class="re_infoLists">
      <thead>
        <tr>
          <th>姓名</th>
          <th>数量</th>
          <th>整合项</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>XXX</td>
          <td>2</td>
          <td>
            <span>人才信息</span>
            <span>个人简历</span>
            <span>个人成就</span>
            <span>学习经历</span>
            <span>工作经历</span>
            <span>求职意向</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"reorganize",
  data: function () {
    return {}
  },
  created: function () {
    if(this.$route.path == "/Edit/reorganize"){
      this.$parent.fg1 = false;
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  table,table tr th, table tr td {
    border:1px solid #cccccc;
  }
  .top{
    width: 948px;
    height: 28px;
    .top_left{
      float: left;
      height: 100%;
      .bule{
        width: 4px;
        height: 100%;
        background-color:#169bd8;
        float: left;
      }
      p{
        font-size: 18px;
        color: #454545;
        margin-left: 5px;
        float: left;
        line-height: 28px;
      }
    }
    .top_right{
      float: right;
      .name{
        float: left;
        width: 134px;
        height: 28px;
        font-size: 12px;
        color: #999;
        padding-left: 4px;
        margin-right: 14px;
      }
      .btn_search{
        float: right;
        width: 90px;
        height: 28px;
        background-color: #169bd8;
        border: none;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        color: #fff;
      }
    }
  }
  .re_infoLists{
    border-collapse:collapse;
    width: 988px;
    text-align: center;
    thead{
      height: 32px;
      background-color: rgba(238, 246, 255, 0.8);
      font-size: 16px;
      color: #454545;
    }
    tbody{
      tr{
        td{
          span{
            margin: 0px 20px;
          }
        }
      }
    }
  }
</style>

