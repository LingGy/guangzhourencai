<template>
  <div id="jobIntention">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 求职意向</p>
    <div class="job_box">
      <div class="job_main">
        <p class="name">落户城市&nbsp;:</p>
        <div class="job_main_r_box">
          <div class="sheng_box">
            <p class="sheng">广东省<i class="el-icon-caret-right"></i></p>
          </div>
          <div class="shi_box">
            <p class="shi">深圳市<i class="el-icon-caret-right"></i></p>
          </div>
        </div>
      </div>
      <div class="job_main">
        <p class="name">求职行业&nbsp;:</p>
        <div class="job_main_r_box">
          <div class="profession">
            <p class="choice_name">选择/修改<i class="el-icon-caret-right"></i></p>
          </div>
        </div>
      </div>
      <div class="job_main">
        <p class="name">就职岗位&nbsp;:</p>
        <div class="job_main_r_box">
          <input type="text" placeholder="请输入就职岗位" class="jobTo">
        </div>
      </div>
      <div class="job_main workTime">
        <p class="name">可在中国工作时间&nbsp;:</p>
        <div class="job_main_r_box">
          <el-radio-group v-model="radio">
            <el-radio :label="1">全职回国</el-radio>
            <br>
            <el-radio :label="2">每年不少于6个月</el-radio>
            <br>
            <el-radio :label="3">每年不少于3个月</el-radio>
            <br>
            <el-radio :label="4">备选项</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="job_main">
        <p class="name">渴望年薪&nbsp;:</p>
        <div class="job_main_r_box">
          <div class="profession">
            <p class="choice_name">面议<i class="el-icon-caret-right"></i></p>
          </div>
        </div>
      </div>
      <div class="job_main">
        <p class="name">期望福利&nbsp;:</p>
        <div class="job_main_r_box">
          <input type="text" placeholder="请输入期望福利" class="jobTo">
        </div>
      </div>
      <div class="job_main more">
        <p class="name">更多资料&nbsp;:</p>
        <div class="job_main_r_box">
          <textarea name="more" id="more" cols="30" rows="10" placeholder="请输入回国工作设想、其他要求"></textarea>
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
    name:"JobIntention",
    data () {
      return {
        radio:1
      };
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
#jobIntention{
  .job_box{
    width: 564px;
    color: #454545;
    .job_main{
      width: 100%;
      height: 22px;
      margin-bottom: 16px;
      p.name{
        width: 180px;
        font-size: 16px;
        float: left;
      }
      .job_main_r_box{
        width: 378px;
        font-size: 14px;
        float: left;
        .sheng_box,.shi_box{
          width: 82px;
          height: 22px;
          border: solid 1px #53b1dc;
          padding-left: 6px;
          color: #29a9f5;
          line-height: 20px;
          i{
            float: right;
            line-height: 20px;
            margin-right: 10px;
          }
        }
        .sheng_box{
          float: left;
          margin-right: 10px;
        }
        .shi_box{
          float: left;
        }
        .profession{
          width: 148px;
          height: 22px;
          border: solid 1px #53b1dc;
          color: #29a9f5;
          text-align: center;
          i{
            float: right;
            line-height: 20px;
            margin-right: 22px;
          }
        }
        .jobTo{
          width: 310px;
          height: 22px;
          border: solid 1px #53b1dc;
          padding-left: 6px;
        }
        label{
          margin-bottom: 8px;
        }
        #more{
          width: 378px;
          height: 78px;
          border: solid 1px #53b1dc;
          padding: 6px;
        }
      }
    }
    .workTime{
      height: 92px;
    }
    .more{
      height: 78px;
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

