//init.js
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
      if (app.globalData.primarystart) {
        wx.switchTab({
          url: '../index/index',
        })
        wx.hideLoading();
      }
    }, 1000)//等待程序初始化
    
  },
  //页面渲染事件
  onShow: function(){
    
  },
})