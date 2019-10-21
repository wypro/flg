const check = require('../../../utils/check.js');
const faceUrl = require('../../public/common/faceUrl.js');
const { Toast, Loading } = require("../../public/common/Toast.js");
const { Request } = require("../../../utils/request.js");

var app = getApp();

Page({
  data: {
    array: ['请选择反馈类型', '界面相关', '功能异常', '优化建议', '其他'],
    index: 0,
    content: '',
    contentLength: 0,
    mobile: '',
    hasPicture: false,
    picUrls: [],
    files: []
  },
  chooseImage: function(e) {
    if (this.data.files.length >= 5) {
      util.showErrorToast('只能上传五张图片')
      return false;
    }

    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        that.upload(res);
      }
    })
  },
  upload: function(res) {
    var that = this;
    const uploadTask = wx.uploadFile({
      url: api.StorageUpload,
      filePath: res.tempFilePaths[0],
      name: 'file',
      success: function(res) {
        var _res = JSON.parse(res.data);
        if (_res.errno === 0) {
          var url = _res.data.url
          that.data.picUrls.push(url)
          that.setData({
            hasPicture: true,
            picUrls: that.data.picUrls
          })
        }
      },
      fail: function(e) {
        wx.showModal({
          title: '错误',
          content: '上传失败',
          showCancel: false
        })
      },
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })

  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    });
  },
  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    });
  },
  contentInput: function(e) {
    this.setData({
      contentLength: e.detail.cursor,
      content: e.detail.value,
    });
  },
  clearMobile: function(e) {
    this.setData({
      mobile: ''
    });
  },
  submitFeedback: function(e) {
    
    let that = this;
    if (that.data.index == 0) {
      Toast('请选择反馈类型');
      return false;
    }

    if (that.data.content == '') {
      Toast('请输入反馈内容');
      return false;
    }

    if (that.data.mobile == '') {
      Toast('请输入手机号码');
      return false;
    }

    if (!check.isValidPhone(this.data.mobile)) {
      this.setData({
        mobile: ''
      });
      Toast('请输入正确的手机号码');
      return false;
    }

    wx.showLoading({
      title: '提交中...',
      mask: true,
      success: function() {

      }
    });
    let obj = {
      path: faceUrl.path + faceUrl.feedback,
      data: {
        wxid: app.globalData.wxid,
        username: app.globalData.userInfo.nickName,
        tel: that.data.mobile,
        type: that.data.array[that.data.index],
        content: that.data.content,
        hasPicture: that.data.hasPicture,
        picUrls: that.data.picUrls
      }
    }
    Request(obj, (res) => {
      wx.hideLoading();
      if (res.code === 0) {
        wx.showToast({
          title: '感谢您的反馈！',
          icon: 'success',
          duration: 2000,
          complete: function() {
            that.setData({
              index: 0,
              content: '',
              contentLength: 0,
              mobile: '',
              hasPicture: false,
              picUrls: [],
              files: []
            });
          }
        });
      } else {
        Toast(res.msg);
      }

    });
  },
  onLoad: function(options) {

  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  }
})