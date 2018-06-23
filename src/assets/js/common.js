export default {
  getAuxiliarydata: (vm, apiName) => {
    vm.$axios({
      method: 'get',
      url: window.$g_url.ApiUrl + '/' + apiName,
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
  }
}


