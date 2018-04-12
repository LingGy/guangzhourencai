<template>
  <div id="achieve">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 个人成就</p>
    <table class="achieveLists_box">
      <thead>
        <tr>
          <th>标题</th>
          <th>时间 </th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>主要成就</td>
          <td>2016/8---2017/8</td>
          <td>
            <button type=button>删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="achieveList_box">
      <div class="ac_title">
        <p class="ac_name">标&nbsp;&nbsp;&nbsp;&nbsp;题&nbsp;:</p>
        <div class="main_name_box">
          <p class="main_name">主要成就(包括成果、专利情况)<i class="el-icon-caret-bottom"></i></p>
        </div>
      </div>
      <div class="ac_title ac_a2">
        <p class="ac_name">内&nbsp;&nbsp;&nbsp;&nbsp;容&nbsp;:</p>
        <textarea name="achieveInfo" id="achieveInfo" cols="30" rows="10"></textarea>
      </div>
      <div class="ac_title">
        <p class="ac_name">时&nbsp;&nbsp;&nbsp;&nbsp;间&nbsp;:</p>
        <div class="ch_time">
          <span class="y">1999</span>
          <i>年</i>
          <span class="m">5</span>
          <i>月</i>
          <i>至</i>
          <span class="y">1999</span>
          <i>年</i>
          <span class="m">5</span>
          <i>月</i>
        </div>
      </div>
    </div>
    <div class="ac_save_box">
      <button type=button class='save_1'>保存并新增个人成就</button>
      <button type=button class='save_2'>保存</button>
      <button type=button class='btn_toEN'>英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="scss" type="text/scss" scoped>
  table,table tr th, table tr td {
    border:1px solid #cccccc;
  }
  .achieveLists_box{
    width: 846px;
    border-collapse:collapse;
    text-align: center;
    color: #454545;
    margin-bottom: 34px;
    thead{
      background-color: #eef6ff;
      font-size: 16px;
      tr{
        height: 34px;
        line-height: 34px;
      }
    }
    tbody{
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      button{
        color: #169bd8;
        background-color: #fff;
      }
    }
  }
  .achieveList_box{
    width: 846px;
    .ac_title{
      width: 100%;
      height: 22px;
      margin-bottom: 16px;
      p.ac_name{
        font-size: 16px;
        color: #454545;
        float: left;
        margin-right: 24px;
      }
      .main_name_box{
        width: 310px;
        height: 22px;
        border: solid 1px #53b1dc;
        float: left;
        .main_name{
          width: 100%;
          height: 100%;
          padding-left: 5px;
          font-size: 14px;
          color: #29a9f5;
          letter-spacing: 1px;
          line-height: 20px;
        }
        i{
          line-height: 20px;
          float: right;
          margin-right: 30px;
        }
      }
      .ch_time{
        width: 378px;
        height: 22px;
        float: left;
        color: #454545;
        span{
          display: inline-block;
          height: 22px;
          border: solid 1px #53b1dc;
          line-height: 20px;
          text-align: center;
          cursor: pointer;
        }
        .y{
          width: 56px;
        }
        .m{
          width: 48px;
        }
        i{
          margin: 0px 3px;
        }
      }
    }
    .ac_a2{
      height: 164px;
    }
    #achieveInfo{
      width: 378px;
      height: 164px;
      border: solid 1px #53b1dc;
      padding: 5px;
      color: #454545;
    }
  }
  .ac_save_box{
    width: 846px;
    height: 24px;
    padding-left: 75px;
    margin-top: 44px;
    button{
      margin-left: 25px;
      height: 24px;
      font-size: 16px;
      line-height: 22px;
      padding:0px 6px;
    }
    .save_1{
      background-color: #169bd8;
      color: #fff;
    }
    .save_2,.btn_toEN{
      border: solid 1px #999999;
      color: #545454;
      background-color: #fff;
    }
  }
</style>

