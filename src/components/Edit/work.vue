<template>
  <div id="work">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 工作经历</p>
    <table class="workLists_box">
      <thead>
      <tr>
        <th>国内/国外</th>
        <th>公司名称</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>国内</td>
        <td>XXXXX公司</td>
        <td>2015/9---2018/6</td>
        <td>
          <button type=button>删除</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="work_main_box">

      <div class="work_main">
        <p class="name">国内/国外&nbsp;:</p>
        <div class="wo_content_box">
          <el-radio-group v-model="radio">
            <el-radio :label="0">国内</el-radio>
            <el-radio :label="1">国外</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="work_main">
        <p class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间&nbsp;:</p>
        <div class="wo_content_box wo_time">
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

      <div class="work_main">
        <p class="name">工作地点&nbsp;:</p>
        <div class="wo_content_box">
          <input type="text" class="wk_int" placeholder="请输入工作地点">
        </div>
      </div>

      <div class="work_main">
        <p class="name">公司名称&nbsp;:</p>
        <div class="wo_content_box">
          <input type="text" class="wk_int" placeholder="请输入公司名称">
        </div>
      </div>

      <div class="work_main">
        <p class="name">专业领域&nbsp;:</p>
        <div class="wo_content_box">
          <input type="text" class="wk_int" placeholder="请输入专业领域">
        </div>
      </div>

      <div class="work_main">
        <p class="name">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称&nbsp;:</p>
        <div class="wo_content_box">
          <input type="text" class="wk_int" placeholder="请输入职称">
        </div>
      </div>

      <div class="work_main wk_d_b">
        <p class="name">工作描述&nbsp;:</p>
        <div class="wo_content_box">
          <textarea name="describe" id="describe" cols="30" rows="10" placeholder="请输入内容"></textarea>
        </div>
      </div>

    </div>
    <div class="wk_save_box">
      <button type=button class='save_1'>保存并新增个人成就</button>
      <button type=button class='save_2'>保存</button>
      <button type=button class='btn_toEN'>英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"Work",
    data () {
      return {
        radio: 0
      };
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #work{
    table,table tr th, table tr td {
      border:1px solid #cccccc;
    }
    .workLists_box{
      width: 846px;
      border-collapse:collapse;
      text-align: center;
      color: #454545;
      margin-bottom: 34px;
      thead{
        background-color: #eef6ff;
        font-size: 16px;
        font-stretch: normal;
        line-height: 62px;
        letter-spacing: 1px;
        color: #454545;
        tr{
          height: 34px;
          line-height: 34px;
          th{
            font-weight: normal;
          }
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
    .work_main_box{
      width: 472px;
      .work_main{
        width: 100%;
        height: 22px;
        margin-bottom: 16px;
        p.name{
          width: 85px;
          float: left;
          font-size: 16px;
          color: #454545;
          margin-right: 8px;
        }
        .wo_content_box{
          float: left;
          .wk_int{
            width: 310px;
            height: 22px;
            border: solid 1px #53b1dc;
            padding-left: 6px;
            color: #454545;
          }
          #describe{
            width: 378px;
            height: 164px;
            border: solid 1px #53b1dc;
            padding: 6px;
            color: #454545;
          }
        }
        .wo_time{
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
      .wk_d_b{
        height: 164px;
      }
    }
    .wk_save_box{
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
  }
</style>

