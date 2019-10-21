// pages/deliverer/company-jobs/company-jobs.js
const app = getApp()
const faceUrl = require('../../public/common/faceUrl');
const { Toast, Loading } = require("../../public/common/Toast");
const { Request } = require("../../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionDetail: null,
  },
  Release: function(e){
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.page || e.target.dataset.page, 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let obj = {
      path: faceUrl.path + faceUrl.delivererGetResume,
      data: {
        wxid: app.globalData.wxid,
      }
    }
    Request(obj, (res) => {
      if (res.code == 0) {
        console.log(res.data);
        this.setData({
          positionList: res.data,
          dataList: res.data,
        });
      }
      if (res.code == 1) {//参数非法
        Toast(res.msg, 'none', 1000);
      }
      if (res.code == -1) {//没有投递记录

      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})