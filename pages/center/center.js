// pages/center/center.js
const app = getApp();
const { Toast } = require('../public/common/Toast.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutArr:[{
      txt:'简历',
      img:'../public/images/icon/jianli.png'
      },{
        txt: '投递记录',
        img: '../public/images/icon/jilu.png'
      }, {
        txt: '职位收藏',
        img: '../public/images/icon/shoucang.png'
      }, {
        txt: '意见反馈',
        img: '../public/images/icon/fankui.png'
    }],
    isBtnLogin:true,
    loginModeArr:[{
      path:'../components/login-other/login-other',
      type:'other'
    },{
        path: '../components/login-wx/login-wx',
        type: 'wx'
    },{
        path: '../components/login-tel/login-tel',
        type: 'tel'
    }],
    isUser: false,
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 微信快速登录
   */
  
  getUserInfo: function(e){
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: {
        userName: app.globalData.userInfo.nickName,
        userImg: app.globalData.userInfo.avatarUrl,
      }
    });
    wx.setStorage({
      key: 'userinfo',
      data: JSON.stringify({
        userName: app.globalData.userInfo.nickName,
        userImg: app.globalData.userInfo.avatarUrl,
      }),
      success: function (res) {
        wx.switchTab({
          url: '/pages/index/index'
        })
        getApp().globalData.isShow = true;
        getApp().globalData.isRefresh = true;
        Toast('登录成功', 'success', 1500);
      }
    })
    this.setData({
      isBtnLogin: true
    })
  },
  /**
   * 自定义事件
   */
  // 是否显示登录选择弹窗
  loginModule:function(e){
    if (app.globalData.isShow){ 
      Toast('正在开发中...','none',2000);
      return;
    };
    let show = e.target.dataset.isshow || e.currentTarget.dataset.isshow;
    this.setData({
      isBtnLogin: show
    })
  },
  // 跳转到各个登录页面
  loginPage:function(e){
    let page = e.target.dataset.page || e.currentTarget.dataset.page;

    for(let i = 0; i < 3; i++){
      if (this.data.loginModeArr[i].type.includes(page)) {
        wx.navigateTo({
          url: this.data.loginModeArr[i].path,
        })
        this.setData({
          isBtnLogin:true
        });
      }
    }
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
        })
      }
    })
  },
  toggleRole: function(){
    Toast('正在开发中...','none',1500);
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
        })
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