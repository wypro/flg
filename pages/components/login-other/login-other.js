// pages/components/login-other/login-other.js

const faceUrl = require('../../public/common/faceUrl.js');
const { Toast } = require('../../public/common/Toast.js');
const { Request } = require('../../../utils/request.js');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
        userName:null,
        userPassWord:null
  },
  //改变登录信息状态
  changeLoginInfo:function(e){
    let type = e.target.dataset.type || e.currentTarget.dataset.type;
    if(type == '1'){
      this.setData({
        userName:e.detail.value
      })
    } else {
      this.setData({
        userPassWord:e.detail.value
      })
    }
  },
  //用户登录
  login:function(e){
    let that = this;
    if(!this.data.userName){
      Toast('手机号码不能为空','none',2000);
      return;
    }
    if(!this.data.userPassWord){
      Toast('密码内容不能为空','none',2000);
      return;
    }

    let obj = {
      path:faceUrl.path+faceUrl.login,
      data:{
        tel: that.data.userName,
        userPassWord: that.data.userPassWord
      }
    }

    Request(obj,(res)=>{
      if(res.code == 1){
        Toast(res.msg,'none',2000);
        return;
      }
      if(res.code == 2){
        Toast("没有此用户，请注册",'none',2000);
        return;
      }
      
      if(res.code == 0){
        let data = {
          userID: res.data.userID,
          userName: "用户" + res.data.tel.substring(7, 11),
          userImg: res.data.userImg,
          description: res.data.description == null ? "这个人很懒什么都没有留下..." : res.data.description,
        };
        wx.setStorage({
          key: 'userinfo',
          data: JSON.stringify(data),
          success:function(res){
            
            wx.switchTab({
              url: '/pages/index/index'
            })
            getApp().globalData.isShow = true;
            getApp().globalData.isRefresh = true;//允许刷新
            Toast('登录成功', 'success', 1500);
          }
        })
      }
    })
  },
  togglelogin: function () {
    Toast('正在开发中...', 'none', 1500);
  },
})