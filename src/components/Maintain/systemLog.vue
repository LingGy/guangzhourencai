<template>
  <div id="systemLog">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 系统维护 > 系统日志</p>
    <table class="tbox">
      <thead>
        <tr>
          <th>日期</th>
          <th>系统名</th>
          <th>进程名</th>
          <th>日志信息</th>
        </tr>
      </thead>
    </table>
    <div class="console_box">
      <div class="console">
        <button class="console1">上一页</button>
        <button class="console2">下一页</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name:'systemLog',
    data: function () {
      return {}
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #systemLog{
    min-width: 987px;
    table,thead,tbody,tr,th,td{
      border: 1px solid #dedede;
    }
    .tbox{
      min-width: 987px;
      border-collapse: collapse;
      color: #454545;
      line-height: 32px;
      thead{
       tr{
         height: 32px;
         background-color: #eef6ff;
         font-size: 16px;
       }
      }
      tbody{
        tr{
          height: 32px;
          font-size: 14px;
        }
      }
    }
    .console_box{
      min-width: 987px;
      height: 30px;
      .console{
        width: 212px;
        margin: 0 auto;
        margin-top: 44px;
        .console1,.console2{
          width: 82px;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
        .console1{
          border: solid 1px #999999;
          float: left;
          background-color: transparent;
        }
        .console2{
          background-color: #169bd8;
          color: #ffffff;
          float: right;
        }
      }
    }
  }
</style>

