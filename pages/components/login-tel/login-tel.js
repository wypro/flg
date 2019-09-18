// pages/components/login-tel/login-tel.js
const faceUrl = require('../../public/common/faceUrl.js');
const { Toast } = require('../../public/common/Toast.js');
const { Request } = require('../../../utils/request.js');

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTel: null,
    userCode: null,
    cd: 0,
    isSend: false,
    cdTest: '获取验证码',
    dsq: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.cd > 0){
      this.setData({
        dsq: setInterval(this.setCD,1000),
        cd: app.globalData.cd,
        isSend: true,
      });
    }
  },
  //改变登录信息状态
  changeLoginInfo: function (e) {
    let type = e.target.dataset.type || e.currentTarget.dataset.type;
    if (type == '1') {
      this.setData({
        userTel: e.detail.value
      })
    } else {
      this.setData({
        userCode: e.detail.value
      })
    }
  },
  //用户登录
  login: function (e) {
    let that = this;
    if (!this.data.userTel) {
      Toast('手机号码不能为空', 'none', 2000);
      return;
    }
    if (!this.data.userCode) {
      Toast('验证码不能为空', 'none', 2000);
      return;
    }
    if (!app.globalData.sendCode || app.globalData.sendTel != this.data.userTel) {
      Toast('验证码无效！', 'none', 2000);
      return;
    }
    if (this.data.userCode != app.globalData.sendCode){
      Toast('验证码不一致','none',1500);  
      return;
    }
    /* 检索数据库判断手机号是否注册，是-则提示是否登录，否-则注册并登录
    wx.showModal({
       title: '提示',
       content: '手机号已注册是否使用该手机号登录？',
       success: function (res) {
         if (res.confirm) {
           console.log('用户点击确定')
         } else {
           console.log('用户点击取消')
         }
       }
    });*/
    console.log(app.globalData.userInfo);
    let data = {
      userID: "1001",
      userName: "程序测试员",
      userImg: 'https://c-ssl.duitang.com/uploads/item/201809/26/20180926162125_vjbwi.jpg',
      description: "这个人很懒什么都没有留下...",
      // 'https://c-ssl.duitang.com/uploads/item/201809/26/20180926162125_vjbwi.jpg' 测试用美女图片
    };
    let obj = {
      path: faceUrl.path + faceUrl.register ,
      data:{
        tel: app.globalData.sendTel,
        wxid: app.globalData.wxid,
      },
      
    }
    // 登录/注册
    Request(obj, (res) => {
      if (res.code == -1){
        let returnValue = res;
        wx.showModal({
          title: '手机号码已注册',
          content: returnValue.msg,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.loginSuccess(data);
            } else {
              console.log('用户点击取消');
            }
          }
        });
      } else if (res.code == 1) {
        Toast(res.msg, 'none', 2000);
        
      } else if (res.code == 0) {// 登录/注册成功
        that.loginSuccess(data);
      } else {//出现意外情况
        Toast(res.msg, 'none', 2000);
      }
    });
    
  },
  loginSuccess: function(data){
    let that = this;
    wx.setStorage({
      key: 'userinfo',
      data: JSON.stringify(data),
      success: function (res) {
        clearInterval(that.data.dsq);
        app.globalData.isShow = true;
        app.globalData.isRefresh = true;
        app.globalData.sendTel = null;
        app.globalData.sendCode = null;
        app.globalData.cd = 0;
        wx.switchTab({
          url: '/pages/index/index',
        })
        Toast('登录成功', 'success', 1500);
      }
    });
  }
  ,
  togglelogin: function(){
    Toast('正在开发中...','none',1500);
  },
  details: function () {
    Toast('正在开发中...', 'none', 1500);
  },
  getCode: function () {
    let that=this;
    if (this.data.cd != 0 || this.data.dsq != null) {
      Toast('冷却时间未到无法重新发送', 'none', 2000);
      return;
    }
    if (!this.data.userTel) {
      Toast('电话号码不能为空', 'none', 2000);
      return;
    }
    
    
    let Code = parseInt(Math.random() * 899999 + 100000);
    
    let obj = {
      path: faceUrl.path + faceUrl.getCode,
      data: {          
        param: Code,
        mobile: this.data.userTel,
        wxappid: wx.getAccountInfoSync().miniProgram.appId,
      }
    }
    if (this.data.dsq != null) return;
    // 获取验证码
    Request(obj, (res) => {
        if(res.code == 1) {
          Toast(res.msg, 'none', 2000);
      }
      if (res.code == 0) {//发送成功
        this.setData({
          cd: 60,
          isSend: true,
        });
        app.globalData.sendCode = obj.data.param;
        app.globalData.sendTel = obj.data.mobile;
        this.setData({
          dsq: setInterval(this.setCD, 1000),
        });
        Toast(res.msg, 'success', 1000);
        return;
      } else {//出现意外情况
        Toast(res.msg, 'none', 2000);
      }
    });
  },
  setCD: function () {
    if (this.data.cd == 0 && this.data.isSend) {
      clearInterval(this.data.dsq);
      this.setData({
        isSend: false,
        cdTest: '重新发送',
        dsq: null,
      });
      app.globalData.sendCode = null;
      app.globalData.sendTel = null;
      return;
    }
    this.setData({
      cdTest: this.data.cd - 1,
      cd: this.data.cd - 1,
    });
    app.globalData.cd = this.data.cd - 1;
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