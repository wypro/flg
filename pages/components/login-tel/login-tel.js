// pages/components/login-tel/login-tel.js
const faceUrl = require('../../public/common/faceUrl.js');
const { Toast } = require('../../public/common/Toast.js');
const { Request } = require('../../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTel: null,
    userCode: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      Toast('提示：账号信息不能为空', 'none', 2000);
      return;
    }
    if (!this.data.userCode) {
      Toast('提示：密码内容不能为空', 'none', 2000);
      return;
    }

    let obj = {
      path: faceUrl.path + faceUrl.login,
      data: {
        userName: that.data.userTel,
        userPassWord: that.data.userCode
      }
    }

    Request(obj, (res) => {
      if (res.code == 1) {
        Toast("大批攻城师正在骑马赶来的路上", 'none', 2000);
        return;
      }
      if (res.code == 2) {
        Toast("没有此用户，请注册", 'none', 2000);
        return;
      }
      // console.log(res.data[0]);
      if (res.code == 0) {
        wx.setStorage({
          key: 'userinfo',
          data: JSON.stringify(res.data[0]),
          success: function (res) {
            wx.switchTab({
              url: '/pages/index/index'
            })
            getApp().globalData.isShow = true;
            Toast('登录成功', 'success', 1500);
            // app.global.isShow = true;
          }
        })
      }
    })
  },
  togglelogin: function(){
    Toast('正在开发中...','none',1500);
  },
  details: function () {
    Toast('正在开发中...', 'none', 1500);
  },
  getCode: function () {
    Toast('正在开发中...', 'none', 1500);
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