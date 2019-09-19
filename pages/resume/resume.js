// pages/resume/resume.js

const faceUrl = require('../public/common/faceUrl');
const { Toast, Loading } = require("../public/common/Toast");
const { Request } = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arraySex: ['男', '女'],
    arrayJob: ['学生党', '上班族'],
    arrayEdu: ['高中/职高/技校', '专科', '本科', '硕士', '博士'],
    Sex: null,
    Job: null,
    Edu: null,
    images: null,
    name: null,
    age: null,
    tel: null,
    email: null,
    qq: null,
    wx: null,
  },
  //绑定选择框
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    console.log(e);
    switch (e.target.id) {
      case 'sex':
        this.setData({
          Sex: this.data.arraySex[e.detail.value],
        });
        break;
      case 'job':
        this.setData({
          Job: this.data.arrayJob[e.detail.value],
        });
        break;
      case 'edu':
        this.setData({
          Edu: this.data.arrayEdu[e.detail.value],
        });
        break;
    }
  },
  chooseImage: function(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      count: 1,
      success: res => {
        this.setData({
          images: res.tempFilePaths[0],
        });
        wx.showToast({
          title: '上传头像功能暂时无法实现...',
          icon: 'none',
        })
      }
    })
  },
  //提交表单
  submitForm: function() {
    wx.showLoading({
      title: 'Loading',
      mask: true,
    })
    // let form = {
    //   wxid: getApp().globalData.wxid,
    //   name: this.data.name,
    //   Sex: this.data.Sex,
    //   age: this.data.age,
    //   Job: this.data.Job,
    //   Edu: this.data.Edu,
    //   tel: this.data.tel,
    //   email: this.data.email,
    //   qq: this.data.qq == null || this.data.qq == "" ? '-1' : this.data.qq  ,
    //   wx: this.data.wx == null || this.data.wx == "" ? '-1' : this.data.wx ,
    // }
    let form = {
      wxid: getApp().globalData.wxid,
      name: '王勇',
      Sex: '男',
      age: '18',
      Job: '上班族',
      Edu: '博士',
      tel: '15173266049',
      email: '1214742155@qq.com',
      qq: '1214742155',
      wx: 'wy1214742155',
    }
    // console.log(form);
    for (var item in form) {
      if (item == 'qq' || item == 'wx') {
        continue;
      }
      if (form[item] == null || form[item] == '') {
        wx.showToast({
          title: '必填信息不允许为空，请重新填写。',
          icon: 'none',
        })
        return;
      }
    }
    //中英文姓名验证(没有长度限制，考虑到少数名族和外国人名字很长) ：
    if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(form.name))) {
      wx.showToast({
        title: '姓名有误',
        duration: 2000,
        icon: 'none'
      });
      return;
    }
    //手机号验证
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(form.tel))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return;
    }
    //邮箱验证
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(form.email))) {
      wx.showToast({
        title: '邮箱输入有误',
        duration: 2000,
        icon: 'none'
      });
      return;
    }
    let obj = {
      path: faceUrl.path + faceUrl.uploadResume,
      data: form,
    }

    //发起请求
    Request(obj, (res) => {
      if (res.code == 1) {
        Toast("更改失败！", 'none', 2000);
        return;
      }
      if (res.code == 2) {
        Toast(res.msg, 'none', 2000);
        return;
      }
      if (res.code == 0) {
        wx.navigateBack({
          delta: 1,
        });
        Toast('简历已上传','none',1000);
      }
    })
    wx.hideLoading();
  },
  //信息改变绑定 
  changeLoginInfo: function(e) {
    let type = e.target.dataset.type || e.currentTarget.dataset.type;
    switch (type) {
      case '1':
        this.setData({
          name: e.detail.value
        })
        break;
      case '2':
        this.setData({
          age: e.detail.value
        })
        break;
      case '3':
        this.setData({
          tel: e.detail.value
        })
        break;
      case '4':
        this.setData({
          email: e.detail.value
        })
        break;
      case '5':
        this.setData({
          qq: e.detail.value
        })
        break;
      case '6':
        this.setData({
          wx: e.detail.value
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!getApp().globalData.isShow){
      wx.navigateBack({
        delta: 1,
      })
    }
    // return;
    getApp().globalData.isRefresh = false; //返回任意页面不刷新
    wx.showLoading({
      title: 'loading...',
      mask: true,
    });
    let obj = {
      path: faceUrl.path + faceUrl.getResume,
      data: {
        wxid: getApp().globalData.wxid
      } 
    }

    Request(obj ,(res) => {
      if (res.code == -1){
        wx.hideLoading();
      }
      if (res.code == 1) {
        wx.hideLoading();
        Toast("获取失败！", 'none', 2000);
        return;
      }
      if (res.code == 0) {
        this.setData({
          name: res.data.name,
          Sex: res.data.Sex,
          age: res.data.age,
          Job: res.data.Job,
          Edu: res.data.Edu,
          tel: res.data.tel,
          email: res.data.email,
          qq: res.data.qq == '-1' ? '' : res.data.qq,
          wx: res.data.wx == '-1' ? '' : res.data.wx,
        });
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})