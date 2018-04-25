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
  getSex: function (sex) {
    if(sex){
      return sex == 1 ? "男":"女";
    }else{
      return "";
    }
  },
  getLevel: function (level) {//判断等级
    if(level){
      return level == 1? "高级":"基本";
    }else {
      return "";
    }
  },
  getType: function (type) {//判断类型
    if(type){
      return type == 1?"海外人士":"机构";
    }else {
      return "";
    }
  },
  ifHome: function (value) {
    if(value){
      return value==1? "国内":"国外";
    }else {
      return "";
    }
  }
};
export default vfilter;
