//init.js
const faceUrl = require('../public/common/faceUrl');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    
  },
  //页面加载事件
  onLoad: function () {
    setTimeout(function () {
      wx.showLoading({
        title: '请稍等...',
        mask: true,
      })      
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发起网络请求
            wx.request({
              url: faceUrl.path + faceUrl.getwxid,
              method: 'POST',
              data: {
                code: res.code,
                wxappid: wx.getAccountInfoSync().miniProgram.appId,
              },
              success: function (res) {
                console.log(res.data);
                app.globalData.wxid = res.data.data.openid;
                app.globalData.sessionid = res.data.data.session_key;
              },
              fail: function(){

              },
            })
          } else {
            console.log('登录失败！' + res.errMsg);
          }
        }
      });//login end
      wx.hideLoading();
    }, 1000)//等待程序初始化
    if (app.globalData.primarystart) {
      wx.switchTab({
        url: '../index/index',
      })
      wx.hideLoading();
    }
  },
  //页面渲染事件
  onShow: function(){
    
  },
})