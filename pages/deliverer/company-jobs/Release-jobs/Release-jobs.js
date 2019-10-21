// pages/deliverer/company-jobs/Release-jobs/Release-jobs.js

const faceUrl = require('../../../public/common/faceUrl');
const { Toast, Loading } = require("../../../public/common/Toast");
const { Request } = require("../../../../utils/request.js");

let app = getApp();

var arrS0 = [];
var arrS1 = [];
var arrExp0 = [];
var arrExp1 = [];

for (var i=0;i < 100;i++){
  arrS0[i] = (i + 1) + "k"
  arrS1[i] = (i + 1) + "k"
}
for (var i = 0; i < 10; i++) {
  arrExp0[i] = (i + 1)
  arrExp1[i] = (i + 1);
}
arrS0[99] = "100以上";
arrExp0[9] = "10以上";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayEdu: ['高中/职高/技校', '专科', '本科', '硕士', '博士'],
    arraySalary: [arrS0, arrS1.slice(1, 2)],
    arrayExp: [arrExp0, arrExp1.slice(1, 2)],
    areaValue: null,
    isEject: false,
    select: [0,0],
    salary: null,
    edu: null,
    workExperience: null,
    companyInfo: {},
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
        wxid: getApp().globalData.wxid || "oUpPI5fUE-VhyzT-3VxIT1roz5zI"
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
          companyInfo: res.data,
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
  //绑定选择框
  bindPickerChange: function (e) {
    let index = e.detail.value
    console.log('picker发送选择改变，携带值为', index);
    // if (salary[0]>salary[1]){
    //   Toast('选择不正确请重新选择！','none',1000)
    //   return;
    // }
    switch (e.target.id) {
      case 'edu':
        this.setData({
          edu: this.data.arrayEdu[e.detail.value],
        });
        break;
      case 'salary':
        var salaryValue = index[0] != arrS0.length - 1 ? 
          this.data.arraySalary[0][index[0]] + "-" + this.data.arraySalary[1][index[1] == null ? 0 : index[1]] : '100k以上';
        this.setData({
          salary: salaryValue,
        });
        break;
      case 'exp':
        var expValue = index[0] != arrExp0.length - 1 ?
          this.data.arrayExp[0][index[0]] + "-" + this.data.arrayExp[1][index[1] == null ? 0 : index[1]] + "年" : '10年以上';
        this.setData({
          workExperience: expValue,
        });
        break;
      
    }
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column==1) return;
    var start = e.detail.value + 1;
    var end = e.detail.value==0 ? 2 : start + e.detail.value + 1;
    switch(e.target.id){
      case 'exp':
        end = end > arrExp1.length ? arrExp1.length : end;
        var arr = start != end ? arrExp1.slice(start, end) : ['--'] ; 
        this.setData({
          arrayExp: [arrExp0, arr]
        })
        break;
      case 'salary':
        end = end > arrS1.length ? arrS1.length : end;
        var arr = start != end ? arrS1.slice(start, end) : ['--']; 
        this.setData({
          arraySalary: [arrS0, arr]
        })
        break;
      case '*':
        break;
    }
    //左切换右下标重置为0
    this.setData({
      select: [e.detail.value, 0],
    })
  },
  popup: function(){
    this.setData({
      isEject: true,
    })
  },
  popdown: function(){
    this.setData({
      isEject: false,
      // areaValue: '11111',
    })
  },
  textAreaBlur: function(e){
    console.log(e)
    this.setData({
      areaValue: e.detail.value,
    })
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