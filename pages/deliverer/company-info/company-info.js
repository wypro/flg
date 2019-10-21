// pages/resume/resume.js

const faceUrl = require('../../public/common/faceUrl');
const { Toast, Loading } = require("../../public/common/Toast");
const { Request } = require("../../../utils/request.js");

let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    arraytype: ['移动互联网', '教育', '计算机', '医疗', '服务', '其他'],
    companyAdress: null,
    type: null,
    images: "../../public/images/icon/user.png",
    companyFullName: null,
    companyName: null,
    tel: null,
    email: null,
    qq: null,
    wx: null,
    files: [],
  },
  //绑定选择框
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    console.log(e);
    switch (e.target.id) {
      case 'companyAdress':
        this.setData({
          companyAdress: e.detail.value[0],
        });
        break;
      case 'type':
        this.setData({
          type: this.data.arraytype[e.detail.value],
        });
        break;
    }
  },
  previewImage: function (e) {
    if (this.data.files.length <= 0) {
      Toast('未选择图片！', 'none', 1000)
      return;
    }
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  chooseImage: function (e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      count: 1,
      success: res => {
        this.setData({
          images: res.tempFilePaths[0],
          files: res.tempFilePaths
        });
        this.upload(res);
      }
    })
  },
  upload: function (res) {//上传文件
    wx.showLoading({
      title: '上传中....',
      mask: true,
    })
    var that = this;
    const uploadTask = wx.uploadFile({
      url: faceUrl.path + faceUrl.uploadimages,
      filePath: res.tempFilePaths[0],
      name: 'file',
      formData: {
        wxid: getApp().globalData.wxid,
        sign: 'companylogo' ,
      },
      success: function (res) {
        let data = JSON.parse(res.data)
        if (data.code == 0) {
          var url = data.data.url      
          that.setData({
            images: url,
          })
          console.log("上传成功")
          console.log(data)
          wx.hideLoading()
        }
      },
      fail: function (e) {
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
  //提交表单
  submitForm: function () {
    wx.showLoading({
      title: 'Loading',
      mask: true,
    })
    console.log(this.data.images)
    let form = {
      wxid: getApp().globalData.wxid || "oUpPI5fUE-VhyzT-3VxIT1roz5zI",
      images: this.data.images,
      companyFullName: this.data.companyFullName,
      companyName: this.data.companyName,
      companyAdress: this.data.companyAdress,
      type: this.data.type,
      tel: this.data.tel,
      email: this.data.email,
      qq: this.data.qq == null || this.data.qq == "" ? '-1' : this.data.qq,
      wx: this.data.wx == null || this.data.wx == "" ? '-1' : this.data.wx,
    }
    // let form = {
    //   wxid: "oUpPI5fUE-VhyzT-3VxIT1roz5zI",
    //   images: this.data.images,
    //   companyFullName: "湖南草花互动网络科技有限公司",
    //   companyName: "草花互动",
    //   companyAdress: "湖南省",
    //   type: "移动互联网",
    //   tel: '15173266049',
    //   email: '1214742155@qq.com',
    //   qq: '1214742155',
    //   wx: 'wy1214742155',
    // }
    // console.log(form);
    for (var item in form) {
      if (item == 'qq' || item == 'wx') {
        continue;
      }
      if (form[item] == null || form[item] == '') {
        console.log(item)
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
      path: faceUrl.path + faceUrl.setCompanyInfo,
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
        Toast('公司信息已上传', 'none', 1000);
      }
    })
    wx.hideLoading();
  },
  //信息改变绑定 
  changeLoginInfo: function (e) {
    let type = e.target.dataset.type || e.currentTarget.dataset.type;
    switch (type) {
      case '1':
        this.setData({
          companyFullName: e.detail.value
        })
        break;
      case '2':
        this.setData({
          companyName: e.detail.value
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
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading...',
      mask: true,
    });
    let that = this;
    
    let obj = {
      path: faceUrl.path + faceUrl.getCompanyInfo,
      data: {
        wxid: getApp().globalData.wxid
      }
    }

    Request(obj, (res) => {
      if (res.code == -1) {

      }
      if (res.code == 1) {
        Toast("获取失败！", 'none', 2000);
        return;
      }
      if (res.code == 0) {
        this.setData({
          images: res.data.images,
          companyFullName: res.data.companyFullName,
          companyName: res.data.companyName,
          companyAdress: res.data.companyAdress,
          type: res.data.type,
          tel: res.data.tel,
          email: res.data.email,
          qq: res.data.qq == '-1' ? '' : res.data.qq,
          wx: res.data.wx == '-1' ? '' : res.data.wx,
        });
      }
      wx.hideLoading();
    })
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
    if (!app.globalData.isShow) {
      wx.navigateBack({
        delta: 1,
      })
    }
    // return;
    app.globalData.isRefresh = false; //返回任意页面不刷新
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