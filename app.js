//app.js
App({
  onLaunch: function () {
    // console.log();
   let that = this;
   wx.getStorage({
     key: 'userinfo',
     success: function(res) {
      //  console.log(res.data)
       that.globalData.isShow = (res.data == '')?false:true;
     },
   })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              this.globalData.isRefresh = true;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          });
        }
      }
    })
    this.globalData.primarystart=true;
  },
  globalData: {
    cd: 0,
    wxid: null,//微信openid
    sessionid: null,//微信会话id
    sendCode: null,//客户端生成的验证码
    sendTel: null,//发送验证码时所用手机
    isRefresh: true,//控制页面数据是否允许刷新
    params: "Java",//设置默认加载职业
    userInfo: {},
    isBtnLogin: true,//控制登录窗口
    isShow: false,
    primarystart: false,//初始化完成唯一标识 
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  }, 
  
})