const API_PROXY = 'https://bird.ioliu.cn/v1/?url=';//目录
export default {
  getAuxiliarydata: (vm, apiName) => {
    vm.$axios({
      method: 'get',
      url: window.$g_url.ApiUrl + '/' + apiName+'?outerid='+sessionStorage.getItem('loginOuterid')+'&accesstoken='+sessionStorage.getItem('loginAccesstoken'),
    })
      .then(function (res) {
        let resDatas = res.data;
        if (resDatas.code == 0) {
          switch (apiName) {
            case 'college' :
              vm.colleges = resDatas.result;
              break;
            case 'major' :
              vm.majors = resDatas.result;
              break;
            case 'degree' :
              vm.degrees = resDatas.result;
              break;
            case 'country' :
              vm.countrys = resDatas.result;
              break;
          }
        } else {
          console.log(resDatas.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  toZh:(vm,obj)=>{
    for (var key in obj) {
      if(obj[key] && /^[a-zA-Z]/.test(obj[key])){
        // dataArr.push(vm.allData[key]);
        // dataName.push(key);
        let salt = Math.random();
        let data = obj[key];
        let name = key;
        let sign = vm.$md5('20180706000183194' + data + salt + 'B8CBABcPj2yScVITdXs9')
        vm.$axios({
          method: 'post',
          url: API_PROXY+'https://fanyi-api.baidu.com/api/trans/vip/translate',
          data: 'q=' + data + '&from=en&to=zh&appid=20180706000183194&salt=' + salt + '&sign=' + sign
        })
          .then(function (res) {
            if(res.data){
              let trans = res.data.trans_result[0].dst;
              obj[name] = trans;
            }
          })
          .catch(function (err) {
          });
      }
      // dataArr.push(vm.allData[key]);
      // dataName.push(key);
    }
  }
}


