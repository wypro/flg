// pages/deliveryRecord/deliveryRecord.js
//获取应用实例
const app = getApp()
const faceUrl = require('../public/common/faceUrl');
const { Toast, Loading } = require("../public/common/Toast");
const { Request } = require("../../utils/request.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    positionList: null,
    dataList: null,
  },
  onItemTap: function(e){
    let index = e.detail.currentTarget.dataset.index;
    let list = this.data.positionList;
    this.setData({
      index: index,
    });
    let data = [];
    for (var i in list){
      if (list[i].state==index){
        data.push(list[i]);
      }
    }
    this.setData({
      dataList: data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = {
      path: faceUrl.path + faceUrl.delivererGetResume,
      data: {
        wxid: app.globalData.wxid,
      }
    }
    Request(obj, (res) => {
      if (res.code == 0){
        console.log(res.data);
        this.setData({
          positionList: res.data,
          dataList: res.data,
        });
      }
      if (res.code == 1) {//参数非法
        Toast(res.msg,'none',1000);
      }
      if (res.code == -1) {//没有投递记录

      }
    });
    // let data = [{
    //   city: "北京",
    //   companyFullName: "北京市商汤科技开发有限公司",
    //   companyID: 40459,
    //   companyLogo: "i/image2/M00/1B/63/CgotOVoCv-eAPNQcAARRTfkzqqo936.png",
    //   companyName: "商汤科技",
    //   createTime: "今天 14:25",
    //   education: 0,
    //   jobsID: 3,
    //   positionID: 5778046,
    //   positionName: "高级java开发工程师",
    //   salary: "30k-45k",
    //   workExperience: 0,
    // }];
    
  },
  positionDetail: function (event) {
    let condition = {
      positionID: event.target.dataset.condition || event.currentTarget.dataset.condition,
      jobsID: event.target.dataset.jobsid || event.currentTarget.dataset.jobsid
    }
    wx.navigateTo({
      url: '/pages/detail/detail?positionID=' + condition.positionID + "&jobsID=" + condition.jobsID,
    })
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