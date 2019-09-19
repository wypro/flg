// pages/components/loginModule/loginModule.js
  const app = getApp();
  const { Toast } = require('../../public/common/Toast.js');
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    isRefresh: {
      type: Boolean ,
      value: true
    },
  },
  data: {
    loginModeArr: [{
      path: '../components/login-other/login-other',
      type: 'other'
    }, {
      path: '../components/login-wx/login-wx',
      type: 'wx'
    }, {
      path: '../components/login-tel/login-tel',
      type: 'tel'
    }],
    isBtnLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  methods: {
 //微信快速登录
    getUserInfo: function (e) {
      let that = this;
      console.log(e)
      if (e.detail.userInfo == null) {
        Toast('取消授权', 'none', 1500);
        app.globalData.isBtnLogin = true;
        this.setData({
          isBtnLogin: true
        })
        return;
      }
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
          console.log(that.data.isRefresh+"123456");
          if (that.data.isRefresh){
            wx.switchTab({
              url: '/pages/index/index'
            });
          }
           
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
    loginModule: function (e) {
      this.setData({
        isBtnLogin: true
      });
    },
    // 跳转到各个登录页面
    loginPage: function (e) {
      let page = e.target.dataset.page || e.currentTarget.dataset.page;

      for (let i = 0; i < 3; i++) {
        if (this.data.loginModeArr[i].type.includes(page)) {
          wx.navigateTo({
            url: this.data.loginModeArr[i].path,
          })
          this.setData({
            isBtnLogin: true
          });
        }
      }
    },
  },
})