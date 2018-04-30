<template>
  <div id="relationpic">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 关系分析(图)</p>
    <div class="operation">
      <button class="return" @click='goBack()'>返回</button>
      <button class="moreInof" type='button' @click="toMoreInof()">查看完整关系详情</button>
    </div>
    <div id="myChart" class="myChart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"relationpic",
  data: function () {
    return {
      datas:{
        name:'人才名字',
        children:[]
      }
    }
  },
  mounted: function () {
    this.drawLine();
  },
  methods:{
    //初始化画布
    drawLine: function () {
      let vm = this;
      let userid = sessionStorage.getItem("relationUserId");
      vm.$axios({
          method:'post',
          url:vm.$api +'/relation?userid='+userid,
      })
         .then(function(res){
           let resDatas = res.data;
           if(resDatas.code == 0){
             if(resDatas.result){
               vm.datas.children = resDatas.result;
               // 基于准备好的dom，初始化echarts实例
               let myChart = vm.$echarts.init(document.getElementById('myChart'));
               myChart.setOption({
                 tooltip: {
                   trigger: 'item',
                   triggerOn: 'mousemove'
                 },
                 series: [
                   {
                     type: 'tree',
                     data: [vm.datas],
                     top: '1%',
                     left: '7%',
                     bottom: '1%',
                     right: '20%',
                     symbolSize: 7,
                     label: {
                       normal: {
                         position: 'top',
                         verticalAlign: 'middle',
                         align: 'right',
                         fontSize: 14
                       }
                     },

                     leaves: {
                       label: {
                         normal: {
                           position: 'right',
                           verticalAlign: 'middle',
                           align: 'left'
                         }
                       }
                     },

                     expandAndCollapse: true,
                     animationDuration: 550,
                     animationDurationUpdate: 750
                   }
                 ]
               });
             }else {
               vm.$message.warning("未找到该人才有关系的其余人才");
               return false;
             }
           }else {
             vm.$message.error(resDatas.message);
           }
         })
         .catch(function(err){
           console.log(err);
         });
    },
    //查看完整关系列表
    toMoreInof: function () {
      this.$router.push('/application/relationInfo');
    },
    //返回
    goBack: function () {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
#relationpic{
  .operation{
    width: 800px;
    height: 24px;
    .return{
      display: block;
      width: 50px;
      height: 24px;
      float: left;
      color: #ffffff;
      background-color: #169bd8;
      text-align: center;
      &:hover{
        background-color: #6ecffa;
      }
    }
    .moreInof{
      display: block;
      background-color: #169bd8;
      color: #ffffff;
      height: 24px;
      width: 120px;
      text-align: center;
      float: right;
      &:hover{
        background-color: #6ecffa;
      }
    }
  }
  .myChart{
    min-width: 800px;
    min-height: 600px;
  }
}
</style>

