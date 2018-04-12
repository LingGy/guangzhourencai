<template>
  <div id="project">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 个人项目</p>
    <table class="projectLists_box">
      <thead>
      <tr>
        <th>项目名称</th>
        <th>是否取得专利</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>XXXXXX</td>
        <td>是</td>
        <td>
          <button type=button>删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="project_main_box">
      <div class="main_box">
        <p class="name">项目名称&nbsp;:</p>
        <div class="main">
          <input type="text" class="project_name" placeholder="请输入项目名称">
        </div>
      </div>
      <div class="main_box">
        <p class="name">项目类型&nbsp;:</p>
        <div class="main">
          <el-radio-group v-model="radio1">
            <el-radio :label="0">创业项目</el-radio>
            <el-radio :label="1">合作项目</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="main_box">
        <p class="name">所属行业&nbsp;:</p>
        <div class="main">
          <div class="choice_box">
            <p class="chocie">选择/修改 <i class="el-icon-caret-right"></i></p>
          </div>
        </div>
      </div>
      <div class="main_box">
        <p class="name">成果持有人&nbsp;:</p>
        <div class="main">
          <input type="text" class="project_name" placeholder="请输入持有人姓名">
        </div>
      </div>
      <div class="main_box">
        <p class="name">是否取得专利&nbsp;:</p>
        <div class="main">
          <el-radio-group v-model="radio2">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
            <el-radio :label="2">正在申请</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="main_box info_box">
        <p class="name">专利情况&nbsp;:</p>
        <div class="main">
          <textarea name="info" id="info" cols="30" rows="10" placeholder="请输入专利情况"></textarea>
        </div>
      </div>
      <div class="main_box info_box">
        <p class="name">更多资料&nbsp;:</p>
        <div class="main">
          <textarea name="more" id="more" cols="30" rows="10" placeholder="请输入更多资料"></textarea>
        </div>
      </div>
      <div class="main_box">
        <p class="name">项目所处状态&nbsp;:</p>
        <div class="main">
          <input type="text" class="project_name" placeholder="请输入项目所处状态">
        </div>
      </div>
      <div class="main_box">
        <p class="name">项目关键字&nbsp;:</p>
        <div class="main">
          <input type="text" class="project_name" placeholder="请输入项目关键字">
        </div>
      </div>
      <div class="main_box need">
        <p class="name">项目需求&nbsp;:</p>
        <div class="main">
          <textarea name="need" id="need" cols="30" rows="10" placeholder="请输入项目需求，例如找资金、找技术合作伙伴、招人才、
找落地园区；资金、城市"></textarea>
        </div>
      </div>
    </div>
    <div class="submit_box">
      <button class="btn_save">保存</button>
      <button class="toEn">英译中</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"Project",
    data () {
      return {
        radio1: 0,
        radio2: 0
      };
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#project{
  table,table tr th, table tr td {
    border:1px solid #cccccc;
  }
  .projectLists_box{
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
  .project_main_box{
    width: 566px;
    .main_box{
      width: 100%;
      height: 22px;
      color: #454545;
      margin-bottom: 16px;
      p.name{
        font-size: 16px;
        width: 180px;
        float: left;
      }
      .main{
        float: left;
        font-size: 14px;
        .project_name{
          width: 310px;
          height: 22px;
          border: solid 1px #53b1dc;
          padding-left: 6px;
        }
        .choice_box{
          width: 148px;
          height: 22px;
          border: solid 1px #53b1dc;
          text-align: center;
          color: #29a9f5;
          i{
            float: right;
            margin-right: 10px;
            line-height: 20px;
          }
        }
        #info,#more,#need{
          width: 378px;
          height: 114px;
          border: solid 1px #53b1dc;
          padding: 6px;
        }
        #need{
          height: 64px;
        }
      }
    }

    .info_box{
      height: 114px;
    }
    .need{
      height: 64px;
    }
  }
  .submit_box{
    width: 140px;
    height: 24px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 60px;
    .btn_save{
      width: 50px;
      height: 24px;
      background-color: #169bd8;
      font-size: 16px;
      text-align: center;
      line-height: 24px;
      color: #fff;
      float: left;
    }
    .toEn{
      width: 66px;
      height: 24px;
      border: solid 1px #999999;
      font-size: 16px;
      color: #545454;
      line-height: 24px;
      background-color: #fff;
      float: right;
    }
  }
}
</style>

