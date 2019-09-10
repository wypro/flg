//index.js
//获取应用实例
const app = getApp()
const faceUrl = require('../public/common/faceUrl');
const { Toast, Loading } = require("../public/common/Toast");
const { Request } = require("../../utils/request.js");

Page({
  data: {
    userInfo:null,
    isLogin:false,
    isShow: false,
    pageNo:1,
    positionList:null,
    endTips:false,
    searchValue:null,
    allowRequest: true,
  },
  changeIsShow: function (e) {
    this.setData({
      isShow: e.detail.val,
      positionList: e.detail.value,
      searchValue: e.detail.searchValue
    })
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  positionDetail: function (event) {
    let condition = {
      positionID: event.target.dataset.condition || event.currentTarget.dataset.condition,
      jobsID: event.target.dataset.jobsid || event.currentTarget.dataset.jobsid
    }
    wx.navigateTo({
      url: '/pages/detail/detail?positionID='+condition.positionID+"&jobsID="+condition.jobsID,
    })
  },
  onIsLogin(){
   this.getPositionList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    that.setData({
      endTips:true
    })
    setTimeout(function(){
      that.getPositionList();
    },1000)
  },
  onSearch:function(e){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  onShow:function(){
    console.log(app.globalData.isRefresh + "/" + this.data.isShow + "/" + app.globalData.isShow);
    if (!app.globalData.isRefresh) {//页面切换，控制是否刷新数据
      app.globalData.isRefresh = true;
      return;
    }
    this.setData({//页面切换，未下拉操作，重置搜索项，数据
      searchValue: null,
      positionList: null,
    });
    if (this.data.isShow){//loding
      wx.showLoading({
        title: '加载中',
      })
    }
    let that = this;
    this.setData({
      isShow: app.globalData.isShow
    })
    
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        wx.hideLoading();//完成隐藏加载界面
        that.setData({
          isLogin: (res.data == '') ? false : true,
          userInfo: (res.data == '') ? null : JSON.parse(res.data),
          allowRequest: true
        })
        if (that.data.isLogin) {
          that.onIsLogin();
        }
        // app.globalData.isShow = true;
        
      }
    });
  },
  getPositionList: function(){
    if (!this.data.allowRequest) {//数据全部请求到本地页面，请求拦截。
      Toast('没有更多数据咯~~~', 'none', 1500);
      this.setData({
        endTips: false,
      });
      return;
    }
    let that = this;
    let obj = {
      path: faceUrl.path + faceUrl.positionSearch ,
      data: { 
        pageNo: that.data.positionList ? that.data.positionList.length+15:15 ,
        params: this.data.searchValue ? this.data.searchValue : app.globalData.params ,
      }
    }
    // 职位列表
    Request(obj, (res) => {
      if (res.code == 1) {
        Toast(res.msg, 'none', 2000);
        return;
      }
      if (res.code == 0) {
        // Toast('成功', 'success', 1500);
        if (this.data.positionList!=null && res.data.length == this.data.positionList.length) {
          Toast('没有更多数据咯~~~', 'none', 1500);
          that.setData({
            allowRequest: false,
          });
        }
        that.setData({
          positionList: res.data,
          endTips: false,
        });
        
      }
    });
  },
  //页面加载事件
  onLoad:function(){
    
  },
})
