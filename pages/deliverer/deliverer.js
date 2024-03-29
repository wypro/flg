// pages/center/center.js
const app = getApp();
const { Toast } = require('../public/common/Toast.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutArr:[{
      txt:'公司信息',
      img:'../public/images/icon/jianli.png'
      },{
        txt: '公司职位',
        img: '../public/images/icon/shoucang.png'
      }, {
        txt: '投递记录',
        img: '../public/images/icon/jilu.png'
      }, {
        txt: '意见反馈',
        img: '../public/images/icon/fankui.png'
      }],
    isBtnLogin: true,
    isUser: false,
    userInfo: null,
  },
  // 是否显示登录选择弹窗
  loginModule: function () {
    Toast('正在开发中...', 'none', 2000);
    return;
  },
  //退出登录
  loginOut:function(e){
    let that = this;
    wx.setStorage({
      key: 'userinfo',
      data: '',
      success:function(res){
        that.setData({
          userInfo:null,
          isUser:false
        });
        getApp().globalData.isShow = false;
        getApp().globalData.isRefresh = true;
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    })
  },
  toggleRole: function(){
    wx.reLaunch({
      url: '../center/center',
    })
  },
  togglePage: function(e){
    // console.log(e);
    if (!app.globalData.isShow){
      this.setData({
        isBtnLogin: true
      })
      this.setData({
        isBtnLogin: false
      })
      return;
    }
    switch (e.currentTarget.id){
      case '0': 
        wx.navigateTo({//公司信息
          url: './company-info/company-info',
        })
        break;
      case '1':
        wx.navigateTo({//公司职位
          url: './company-jobs/company-jobs',
        })
        break;
      case '2':
        Toast('正在开发中...', 'none', 1500);
        return;
        wx.navigateTo({//投递记录
          url: '../center/collection/collection',
        })
        break;   
      case '3':
        wx.navigateTo({
          url: '../center/feedback/feedback',
        })
        break;      
      default:
        Toast('建设中...', 'none', 1000);
        break;
    }
    
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
    app.globalData.isRefresh = false;//防止首页多次刷新
    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        // console.log(res.data,'ross')
        let info = (res.data == '') ? null : JSON.parse(res.data)
        that.setData({
          isUser: (res.data == '') ? false : true,
          userInfo: info
        });
      }
    })
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