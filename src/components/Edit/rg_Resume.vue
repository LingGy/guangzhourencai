<template>
<div id="rg_Resume">
  <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据加工 > 合并数据 > 个人简历</p>
  <div class="Info_div_box">
    <div class="info_box">
      <div class="list_box">
        <div class="list_l">性别:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.IsMale">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">出生日期:</div>
        <div class="list_r">
          <!--<input type="text">-->
          <el-date-picker
            v-model='original.Birthday'
            type="date"
            class="onlybox"
            value-format='timestamp'>
          </el-date-picker>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">国籍:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.Nationality">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">现居地址:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.Residence">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">留学国家:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.StudyRegion">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">毕业院校:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.GraduateSchool">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">最高学历:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.HighestDegree">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">现工作单位:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.WorkUnit">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">职务:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.Position">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">通讯地址:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.Address">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">邮政编码:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.Postcode">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">联系电话:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.Phone">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">海外工作经验:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.AbroadWorkExp">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">是否回国工作:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.WorkHomeStat">
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">海外创业经验:</div>
        <div class="list_r">
          <input type="text" class='inp' v-model="original.EverStarupAbroad">
        </div>
      </div>
      <div class="list_box imgbox">
        <div class="list_l">专长优势:</div>
        <div class="list_r">
          <textarea class='zhuangctext' v-model="original.Advantage"></textarea>
        </div>
      </div>
      <div class="list_box imgbox">
        <div class="list_l">学位证书:</div>
        <div class="list_r">
          <img :src="original.Img_HighestDegree" alt="" class='pic1'>
        </div>
      </div>
      <div class="list_box imgbox">
        <div class="list_l">个人近照:</div>
        <div class="list_r">
          <img :src="original.Img_Photo" alt="" class='pic'>
        </div>
      </div>
      <div class="list_box imgbox">
        <div class="list_l">小一寸照片:</div>
        <div class="list_r">
          <img :src="original.Img_OneInche" alt="" class='pic'>
        </div>
      </div>
    </div>
    <div class="info_box" v-for='(list,index) in duplicate' :key="index">
      <div class="list_box">
        <div class="list_l">性别:</div>
        <div class="list_r">
          <p>{{list.IsMale | getSex()}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">出生日期:</div>
        <div class="list_r">
          <p>{{list.Birthday | formatDate()}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">国籍:</div>
        <div class="list_r">
          <p>{{list.Nationality}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">现居地址:</div>
        <div class="list_r">
          <p>{{list.Residence}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">留学国家:</div>
        <div class="list_r">
          <p>{{list.StudyRegion}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">毕业院校:</div>
        <div class="list_r">
          <p>{{list.GraduateSchool}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">最高学历:</div>
        <div class="list_r">
          <p>{{list.HighestDegree}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">现工作单位:</div>
        <div class="list_r">
          <p>{{list.WorkUnit}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">职务:</div>
        <div class="list_r">
          <p>{{list.Position}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">通讯地址:</div>
        <div class="list_r">
          <p>{{list.Address}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">邮政编码:</div>
        <div class="list_r">
          <p>{{list.Postcode}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">联系电话:</div>
        <div class="list_r">
          <p>{{list.Phone}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">海外工作经验:</div>
        <div class="list_r">
          <p>{{list.AbroadWorkExp}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">是否回国工作:</div>
        <div class="list_r">
          <p>{{list.WorkHomeStat}}</p>
        </div>
      </div>
      <div class="list_box">
        <div class="list_l">海外创业经验:</div>
        <div class="list_r">
          <p>{{list.EverStarupAbroad | ifAbroa()}}</p>
        </div>
      </div>
      <div class="list_box imgbox">
        <div class="list_l">专长优势:</div>
        <div class="list_r">
          <p class='te'>{{list.Advantage}}</p>
        </div>
      </div>
      <div class="list_box imgbox">
        <div class="list_l">学位证书:</div>
        <div class="list_r">
          <img :src="original.Img_HighestDegree" alt="" class='pic1'>
        </div>
      </div>
      <div class="list_box imgbox">
        <div class="list_l">个人近照:</div>
        <div class="list_r">
          <img :src="original.Img_Photo" alt="" class='pic'>
        </div>
      </div>
      <div class="list_box imgbox">
        <div class="list_l">小一寸照片:</div>
        <div class="list_r">
          <img :src="original.Img_OneInche" alt="" class='pic'>
        </div>
      </div>
    </div>
  </div>
  <div class="control_wear">
    <button class="btn1" @click='subData(original.UserId)'>保存</button>
    <button class="btn2" @click='del(original.UserId)'>删除重复记录</button>
    <button class="btn3" @click='goBack()'>返回</button>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:"rg_Resume",
    data: function () {
      return {
        original:{},
        duplicate:[],
        date:'',
      }
    },
    mounted: function () {
      let rgid = sessionStorage.getItem('rgId');
      this.getData(rgid);
    },
    methods:{
      getData: function (rgId) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl+'/resumeup',
          data:'userid='+rgId
        })
          .then(function(res){
            let resData = res.data;
            if(resData.code == 0){
              if(resData.result.original){
                resData.result.original.Birthday = resData.result.original.Birthday*1000;
                resData.result.original.IsMale = resData.result.original.IsMale == 1? "男":"女";
                resData.result.original.EverStarupAbroad = resData.result.original.EverStarupAbroad == 1? "有":"无";
                vm.original = resData.result.original;
              }
              if(resData.result.duplicate){
                // let length = resData.result.duplicate.length;
                // for(let i = 0 ,len = length ; i < len; i++){
                //   resData.result.duplicate[i].Birthday = resData.result.duplicate[i].Birthday*1000;
                // };
                vm.duplicate = resData.result.duplicate;
              }

            }else {
              vm.$message.error(resData.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //保存
      subData: function (id) {
        let vm = this;
        let data = JSON.parse(JSON.stringify(vm.original));
        data.EverStarupAbroad = data.EverStarupAbroad == '有'? 1:0;
        data.IsMale = data.IsMale == '男'? 1:0;
        data.Birthday = data.Birthday/1000;
        console.log(JSON.stringify(data));
        vm.$axios({
          method:"post",
          url:window.$g_url.ApiUrl + "/setresume?userid="+id,
          data:JSON.stringify(data)
        })
          .then(function (res) {
            let data = res.data;
            if(data.code == 0){
              vm.$message.success("保存成功!");
              vm.getData(id);
            }else {
              vm.$message.error(data.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      //删除重复记录
      del: function (id) {
        let vm = this;
        vm.$axios({
          method:'post',
          url:window.$g_url.ApiUrl + '/deleteresumedup',
          data:'userid='+id
        })
          .then(function(res){
            if(res.data.code == 0){
              vm.$message.success("删除重复记录成功!");
              vm.getData(id);
            }else {
              vm.$message.error(res.data.message);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //返回
      goBack: function () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
#rg_Resume{
  .Info_div_box{
    .info_box{
      .list_box{
        .list_l{
          width: 112px;
        }
      }
    }
  }

}
</style>

