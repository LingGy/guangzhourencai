<template>
  <div id="study">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 学习经历</p>
    <table class="studyLists_box">
      <thead>
      <tr>
        <th>国内/国外</th>
        <th>学校名称</th>
        <th>时间</th>
        <th>学历/学位</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>国内</td>
        <td>罗格斯暨新泽西州立大学</td>
        <td>2015/9---2018/6</td>
        <td>本科</td>
        <td>
          <button type=button>删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="study_main_box">

      <div class="study_main">
        <p class="name">国内/国外&nbsp;:</p>
        <div class="st_content_box">
          <el-radio-group v-model="radio">
            <el-radio :label="0">国内</el-radio>
            <el-radio :label="1">国外</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="study_main">
        <p class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间&nbsp;:</p>
        <div class="st_content_box st_time">
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

      <div class="study_main">
        <p class="name">学校名称&nbsp;:</p>
        <div class="st_content_box">
          <input type="text" class="st_schoolName" placeholder="请输入学校名称">
        </div>
      </div>

      <div class="study_main">
        <p class="name">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业&nbsp;:</p>
        <div class="st_content_box st_faculty_box">
          <p class="st_faculty">计算机系<i class="el-icon-caret-right"></i></p>
        </div>
      </div>

      <div class="study_main">
        <p class="name">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历&nbsp;:</p>
        <div class="st_content_box st_faculty_box">
          <p class="st_faculty">计算机系<i class="el-icon-caret-bottom"></i></p>
        </div>
      </div>

      <div class="btn_box">
        <button class="save_add" type='button'>保存并新增学习经历</button>
        <button class="save" type='button'>保存</button>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"Study",
    data () {
      return {
        radio: 0
      };
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #study{
    table,table tr th, table tr td {
      border:1px solid #cccccc;
    }
    .studyLists_box{
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
    .study_main_box{
      width: 846px;
      .study_main{
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
        .st_content_box{
          float: left;
        }
        .st_time{
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
        .st_schoolName{
          width: 310px;
          height: 22px;
          border: solid 1px #53b1dc;
          padding-left: 6px;
          line-height: 20px;
        }
        .st_faculty_box{
          width: 148px;
          height: 22px;
          border: solid 1px #53b1dc;
          .st_faculty{
            width: 100%;
            height: 20px;
            line-height: 20px;
            padding-left: 6px;
            color: #29a9f5;
            font-size: 14px;
            i{
              float: right;
              line-height: 20px;
              margin-right: 20px;
            }
          }
        }
      }
      .btn_box{
        width: 100%;
        height: 24px;
        padding-left: 104px;
        margin-top: 40px;
        font-size: 16px;
        line-height: 24px;
        .save_add{
          width: 175px;
          height: 24px;
          background-color: #169bd8;
          color: #fff;
          margin-right: 20px;
        }
        .save{
          width: 50px;
          height: 24px;
          border: solid 1px #999999;
          color: #545454;
          background-color: #fff;
        }
      }
    }
  }
</style>

