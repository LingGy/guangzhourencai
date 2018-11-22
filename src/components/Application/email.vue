<template>
<div id="email">
  <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 邮件管理</p>
  <div class="emailBox">
    <div class="e_option">
      <div class="e_option_l">
        <el-select v-model="sendType" placeholder="选择邮件类型" class="e_type" @change="change(sendType)">
          <el-option
            v-for="item in options1"
            :key="item.vaule"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          v-model="targetName"
          filterable
          allow-create
           placeholder="选择联系人"
          class="e_target"
          :disabled='tp' >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
     <div class="e_option_r">
       <!--<button type='button'>发送</button>-->
       <el-button type="primary" size="small" @click='Sendmail()'>发送</el-button>
     </div>
    </div>
    <div class="subject"><input type="text" placeholder="邮件标题" v-model='subject'></div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
      class="e_text_box">
    </quill-editor>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'email',
    data: function () {
      return {
        content:null,
        editorOption:{

        },
        options1:[
          {value:1,label:'单封邮件'},
          {value:2,label:'群组邮件'},
          {value:3,label:'发送给所有人'},
        ],
        options2:[],
        targetName:null,
        targetId:null,
        sendType:null,
        tp:false,
        subject:null,
        outerid:sessionStorage.getItem('loginOuterid'),
        accesstoken:sessionStorage.getItem('loginAccesstoken'),
      }
    },
    mounted: function () {
      let vm = this;
      let ifdata = sessionStorage.getItem("EmailId");
      if(!ifdata){
        return false;
      }
      let data = JSON.parse(ifdata);
      if(data.type == 1){
        vm.type = vm.options1[0];
      }else if(data.type == 2){
        vm.type = vm.options1[1];
      }
      vm.targetId = data.userid;
      vm.targetName = data.name;
      vm.sendType = data.type;
    },
    methods:{
      //初始化
      getData: function () {

      },
      //发送邮件
      Sendmail: function () {
        let vm = this;
        if(!vm.content || !vm.subject){
          vm.$message.warning("邮件内容或标题不能为空!");
          return false;
        }
        if(!vm.sendType || !vm.targetId){
          vm.$message.warning("未选择邮件类型或联系人!");
          return false;
        }
        vm.$axios({
            method:'post',
            url:window.$g_url.ApiUrl+'/sendmail',
            data:'mailtype=2'+'&content='+vm.content+'&targettype='+vm.sendType+'&targetid='+vm.targetId+'&subject='+vm.subject+ "&outerid=" + vm.outerid
              + "&accesstoken=" + vm.accesstoken
        })
           .then(function(res){
             if(res.data.code == 0){
               [vm.content,vm.subject,vm.targetId,vm.targetName]=[null,null,null,null];
               vm.$message.success(res.data.message);
             }
           })
           .catch(function(err){});
      },
      //类型改变
      change: function (val) {
        let vm = this;
        vm.targetId = '';
        if(val==3){
          vm.tp = true;
          vm.targetId = 0
          vm.targetName = '所有人'
        }else {
          vm.tp = false;
        }
      },
      //获取对应联系人
      getContacts: function (type) {
        let vm = this;
        if(type == 1){
          vm.$axios({
              method:'',
              url:'',
              data:{}
          })
             .then(function(res){})
             .catch(function(err){});
        }
      },
      onEditorBlur(){//失去焦点事件
      },
      onEditorFocus(){//获得焦点事件
      },
      onEditorChange(){//内容改变事件
      },

    }
  }
</script>

<style lang="scss" type="text/scss">
#email{
  .emailBox{
    width: 1000px;
    .e_option{
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .e_option_l{
        width: 450px;
        display: flex;
        justify-content: space-between;
        .el-input__inner{
          height: 30px !important;
        }
      }
    }
    .subject{
      input{
        width: 450px;
        height: 32px;
        padding: 0px 15px;
        border:1px solid #e9e9e9;
        margin-bottom: 30px;
      }
    }
    .ql-container{
      height: 500px !important;
    }
    .e_text_box{
      .ql-editor.ql-blank{
        height: 500px;
      }
    }
  }
}
</style>

