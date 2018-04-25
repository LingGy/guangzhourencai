<template>
  <div id="relationpic">
    <p class="position"><i class='iconfont'>&#xe8e6;</i>您现在的位置 : 数据应用 > 关系分析(图)</p>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"relationpic",
  data: function () {
    return {}
  },
  mounted: function () {
    this.drawLine();
  },
  methods:{
    //初始化画布
    drawLine: function () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',

            data: [
              {
                "name":"张三",
                "children":[
                  {
                    "name":'公司',
                    "children":[
                      {
                        "name":"李四",
                        "name":"王五",
                      }
                    ],
                  }
                ]
              },
            ],

            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',

            symbolSize: 7,

            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9
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
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
#relationpic{
  #myChart{
    width: 800px;
    height: 1000px;
  }
}
</style>

