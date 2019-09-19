// pages/detail/detail.js

const faceUrl = require("../public/common/faceUrl.js");
const { Toast, Loading } = require("../public/common/Toast.js");
const { Request } = require("../../utils/request.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
    similar:null,
    similarInfo:null,
    positionID: null,
    jobsID: null,
    td: false,
    isBtnLogin: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.isRefresh = false;
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    //职位详情请求
    let detailObj = {
      path: faceUrl.path + faceUrl.positionDetail,
      data:{
        positionID: options.positionID,
        jobsID: options.jobsID
      }
    }
    this.setData({
      positionID: options.positionID,
      jobsID: options.jobsID
    });

    Request(detailObj,(res)=>{
      if (res.code == 1) {  //后台代码错误
        Toast(res.msg, 'none', 2000);
        return;
      }
      if (res.code == 2) { //数据为空
        Toast(res.msg, 'none', 2000);
        return;
      }
      if (res.code == 3) { //请求参数为空
        Toast(res.msg, 'none', 2000);
        return;
      }
      if (res.code == 0) { //请求成功，并返回参数
        // console.log(res.data[0])
        wx.hideLoading();
        that.setData({
          detail: res.data[0],
          similar:res.data[0].positionName
        })

        //发起请求--相似职位
        let obj = {
          path: faceUrl.path + faceUrl.positionSearch,
          data: { 
            pageNo: 5,
            params: that.data.similar,
          }
        };
        // console.log(obj, 'ojb')
        
        Request(obj, (res) => {
          // console.log(that.data.similar, 'sim')
          if (res.code == 1) {  //后台代码错误
            Toast(res.msg, 'none', 2000);
            return;
          }
          if (res.code == 2) { //数据为空
            Toast(res.msg, 'none', 2000);
            return;
          }
          if (res.code == 3) { //请求参数为空
            Toast(res.msg, 'none', 2000);
            return;
          }
          if (res.code == 0) { //请求成功，并返回参数
            let redata = res.data;
            for (var i=0;i<res.data.length;i++){
              if (redata[i].jobsID == this.data.jobsID && redata[i].positionID == this.data.positionID){
                redata.splice(i,1);
              }
            }
            that.setData({
              similarInfo: res.data
            })
      }
    })
      }

    })
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

  },
  //投递简历
  submitResume:function(){
    console.log(app.globalData.isShow + "-" + this.data.isBtnLogin);
    if (!app.globalData.isShow) {
      this.setData({
        isBtnLogin: true
      })
      this.setData({
        isBtnLogin: false
      })
      return;
    }
    let obj = {
      path: faceUrl.path + faceUrl.getResume, 
      data: {
        wxid: getApp().globalData.wxid,
      },
    };
    Request(obj , (res) => {
      let that = this;
      if (res.code == 0){
        let data = res.data;
        data.jobsID = this.data.jobsID;
        wx.showModal({
          title: '确认投递',
          content: '确认投递该职位？',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              
              let td = {
                path: faceUrl.path + faceUrl.deliveryResume,
                data: data
              }

              Request(td, (res) => {
                if (res.code == 0) {
                  
                }
              });
            } else {
              console.log('用户点击取消');
              let td = {
                path: faceUrl.path + faceUrl.recruiterGetResume,
                data: {
                  jobsID: that.data.jobsID,
                }
              }
              Request(td, (res) => {
                if (res.code == 0) {
                  
                }
              });
            }
          }
        });
      }
      if (res.code == 1) {
        Toast('投递失败','none',1000);
      }
      if (res.code == -1) {
        wx.showModal({
          title: '简历未填写',
          content: '是否前往填写简历？',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.navigateTo({
                url: '../resume/resume',
              });
            } else {
              console.log('用户点击取消');
            }
          }
        });
      }
    });
    
  },
  Loading: function(){
    let td = this.data.td;

    this.setData({
      td: !td,
    });
    
    Toast("Building...","none",2000);
  }
})