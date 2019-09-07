
const { Toast, Loading } = require("../pages/public/common/Toast");

export function Request(obj,callback){
  // Loading("小马达正在矿磁矿磁......")
  // console.log(obj,'请求数据')
  obj.data.wxappid = wx.getAccountInfoSync().miniProgram.appId;
  console.log(obj);
  wx.request({
    url: obj.path,
    method: 'POST',
    data: obj.data,
    success: function(res) {
      // wx.hideLoading();  //结束loading加载
      console.log(res.data);
      callback(res.data);
    },
    fail: function(res) {
      Toast('请检查您的网络', 'none', 1500);
    },
  })
}