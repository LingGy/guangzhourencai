<template>
  <div id="resume">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 编辑数据 > 个人简历</p>
    <div class="resumeInfo_box">
      <div class="op">
        <p class='name'>性别:</p>
        <!--<label for="man" style='margin-right: 10px;'><input type="radio" name='sex' class='man' id='man'>男</label>-->
        <!--<label for="woman"><input type="radio" name='sex' class='man' id='woman'>女</label>-->
        <div class="val">
          <!--<el-radio v-model="radio" label="1">男</el-radio>-->
          <!--<el-radio v-model="radio" label="2">女</el-radio>-->
          <el-radio-group v-model="radios.radio1">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="op">
        <p class="name">出生日期:</p>
        <div class="val"></div>
      </div>

      <div class="op">
        <p class="name">国籍:</p>
        <div class="val">
          <p class="s1">中国大陆<i class="el-icon-caret-bottom"></i></p>
        </div>
      </div>

      <div class="op">
        <p class="name">出生地:</p>
        <div class="val">
          <p class="s2">广东省<i class="el-icon-caret-right"></i></p>
          <p class="s3">深圳市<i class="el-icon-caret-right"></i></p>
        </div>
      </div>

      <div class="op">
        <p class="name">现居地址:</p>
        <div class="val">
          <input type="text" placeholder="请输入现居住地址">
        </div>
      </div>

      <div class="op">
        <p class="name">留学国家:</p>
        <div class="val">
          <p class="s1">美国<i class="el-icon-caret-bottom"></i></p>
        </div>
      </div>

      <div class="op">
        <p class="name">毕业院校:</p>
        <div class="val">
          <input type="text" placeholder="请输入毕业院校">
        </div>
      </div>

      <div class="op">
        <p class="name">最高学历:</p>
        <div class="val">
          <p class="s1">本科<i class="el-icon-caret-bottom"></i></p>
        </div>
      </div>

      <div class="op">
        <p class="name">现工作单位:</p>
        <div class="val">
          <input type="text" placeholder="请输入现工作单位">
        </div>
      </div>

      <div class="op">
        <p class="name">职务:</p>
        <div class="val">
          <input type="text" placeholder="请输入职务">
        </div>
      </div>

      <div class="op">
        <p class="name">通讯地址:</p>
        <div class="val">
          <input type="text" placeholder="请输入地址">
        </div>
      </div>

      <div class="op">
        <p class="name">邮政编码:</p>
        <div class="val">
          <input type="text" placeholder="请输入邮政编码">
        </div>
      </div>

      <div class="op">
        <p class="name">联系电话:</p>
        <div class="val">
          <input type="text" placeholder="请输入联系电话">
        </div>
      </div>

      <div class="op ex">
        <p class="name">海外工作经验:</p>
        <div class="val">
          <el-radio-group v-model="radios.radio2" class='ex'>
            <el-radio :label="3" class='mb'>刚毕业</el-radio>
            <br>
            <el-radio :label="6" class='mb'>在海外工作1-5年(不含求学阶段)</el-radio>
            <br>
            <el-radio :label="9" class='mb'>在海外工作5年以上(不含求学阶段)</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="op ex">
        <p class="name">是否已经回国工作:</p>
        <div class="val">
          <el-radio-group v-model="radios.radio3" class='ex'>
            <el-radio :label="3" class='mb'>长期在国外</el-radio>
            <br>
            <el-radio :label="6" class='mb'>两地往返</el-radio>
            <br>
            <el-radio :label="9" class='mb'>长期在中国</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="op">
        <p class="name">是否海外创业经历:</p>
        <div class="val">
          <el-radio-group v-model="radios.radio4">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="op ex">
        <p class="name">专长优势:</p>
        <div class="val ex">
          <textarea type="text" placeholder='请输入专长优势' class='good'></textarea>
        </div>
      </div>

      <div class="op te">
        <p class="name">学位证书:</p>
        <div class="val">
          <p class="file_box">
            <span class="choice_box">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-remove="handleRemove"
                :multiple="upFile.fg"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="getfilename1"
                :before-upload="beforeAvatarUpload"
                :auto-upload="upFile.fg">
                <el-button size="small" type="primary" class="btn_choice">选择上传文件</el-button>
              </el-upload>
            </span>
            <span slot="tip" class="el-upload__tip file_name">
              {{fileName[0].name}}
            </span>
          </p>
        </div>
      </div>

      <div class="op te">
        <p class="name">个人近照:</p>
        <div class="val">
          <p class="file_box">
            <span class="choice_box">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-remove="handleRemove"
                :multiple="upFile.fg"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="getfilename2"
                :auto-upload="upFile.fg">
                <el-button size="small" type="primary" class="btn_choice">选择上传文件</el-button>
              </el-upload>
            </span>
            <span slot="tip" class="el-upload__tip file_name">
              {{fileName[1].name}}
            </span>
          </p>
        </div>
      </div>

      <div class="op te">
        <p class="name">小一寸照:</p>
        <div class="val">
          <p class="file_box">
            <span class="choice_box">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-remove="handleRemove"
                :multiple="upFile.fg"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="getfilename3"
                :auto-upload="upFile.fg">
                <el-button size="small" type="primary" class="btn_choice">选择上传文件</el-button>
              </el-upload>
            </span>
            <span slot="tip" class="el-upload__tip file_name">
              {{fileName[2].name}}
            </span>
          </p>
        </div>
      </div>

      <div class="submit_box">
        <button class="btn_save">保存</button>
        <button class="toEn">英译中</button>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Resume',
    data: function () {
      return {
        radios:{
          radio1: 1,
          radio2: 3,
          radio3: 3,
          radio4: 1,
        },
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
        ],
        value: '',
        upFile:{
          fg:false,
        },
        fileName:[
          {
            name:"只能上传jpg/png文件"
          }, {
            name:"只能上传jpg/png文件"
          }, {
            name:"只能上传jpg/png文件"
          }
        ]
      }
    },
    methods: {
      beforeAvatarUpload: function (file) {//限制上传文件类型
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 2
        if(!extension && !extension2) {
          this.$message({
            message: '上传文件只能是 xls、xlsx格式!',
            type: 'warning'
          });
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 2MB!',
            type: 'warning'
          });
        }
        return extension || extension2 && isLt2M
      },
      handleRemove:function (file, fileList) {
        console.log(file, fileList);
        this.fileName[0].name =  "只能上传jpg/png文件";
      },
      handleExceed:function (files, fileList) {//限制上传文件数
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      getfilename1: function (file,fileList,) {//获取上传文件名称
        console.log(file.raw.type);
        if(file.raw.type != "image/jpeg"){
          console.log(file.raw.type);
          this.$message.warning("只能上传jpg/png文件")
          return false
        }
        this.fileName[0].name =  file.name;
      },
      getfilename2: function (file,fileList,) {//获取上传文件名称
        this.fileName[1].name =  file.name;
      },
      getfilename3: function (file,fileList,) {//获取上传文件名称
        this.fileName[2].name =  file.name;
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .resumeInfo_box {
    width: 582px;
    div.op {
      height: 22px;
      width: 100%;
      margin-bottom: 15px;
      p.name {
        width: 196px;
        letter-spacing: 3px;
        font-size: 16px;
        color: #454545;
        float: left;
      }
      div.val {
        width: 310px;
        font-size: 14px;
        float: left;
        p {
          border: solid 1px #53b1dc;
          color: #29a9f5;
          height: 22px;
          line-height: 20px;
          i {
            line-height: 20px;
            float: right;
            margin-right: 10px;
          }
        }
        input {
          width: 310px;
          border: solid 1px #53b1dc;
          padding-left: 10px;
          height: 22px;
          line-height: 20px;
        }
        .s1 {
          width: 148px;
          padding-left: 20px;
        }
        .s2,.s3 {
          width: 82px;
          padding-left: 8px;
          float: left;
        }
        .s2{
          margin-right: 15px;
        }
      }
      label {
        input {
          margin-right: 5px;
          color: #53b1dc;
        }
      }
    }
  }

  .ex {
    height: 70px !important;
  }

  .mb {
    margin-bottom: 5px;
    padding-top: 5px;
  }
  .te{
    margin-bottom: 40px !important;
  }
  .good {
    display: block;
    width: 378px;
    height: 70px !important;
    border: solid 1px #53b1dc;
    padding: 5px 0px 0px 5px;
    font-size: 14px;
    color: #454545;
  }

  .file_box {
    width: 278px;
    height: 22px;
    border: solid 1px #53b1dc;
    padding: 0;
    .choice_box{
      display: block;
      width: 100px;
      height: 20px;
      float: left;
      .btn_choice{
        display: block;
        width: 100px;
        height: 20px;
        border: none;
        border-radius:0px;
        padding: 0;
        color: #53b1dc;
        background-color: #f1f2f6;
        border-right: solid 1px #53b1dc;
        line-height: 22px;
      }
    }
    .file_name{
      display: block;
      width: 174px;
      height: 20px;
      float: right;
      margin: 0px;
      overflow: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
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
</style>

