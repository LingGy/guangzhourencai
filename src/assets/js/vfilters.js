import {formatDate}  from "./date.js";
const vfilter = {
  formatDate: function (time) { //时间戳转日期
    if(time){
      let date = new Date(time * 1000);
      return formatDate(date, 'yyyy-MM-dd');
    }else {
      return "";
    }
  },
  formatDate1: function (time) { //时间戳转日期
    if(time){
      let date = new Date(time * 1000);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }else {
      return "";
    }
  },
  getSex: function (sex) {
      return sex == 1 ? "男":"女";
  },
  getLevel: function (level) {//判断等级
      return level == 1? "高级":"基本";
  },
  getType: function (type) {//判断类型
      return type == 1?"海外人士":"机构";
  },
  ifHome: function (value) {
      return value==1? "国内":"国外";
  },
  ifAbroa: function (value) {
      return value== 1 ? "有":"无";
  }
};
export default vfilter;
