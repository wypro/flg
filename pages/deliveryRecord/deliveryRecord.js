// pages/deliveryRecord/deliveryRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    positionList: null,
  },
  onItemTap: function(e){
    let index = e.detail.currentTarget.dataset.index;
    this.setData({
      index: index,
    });
  },
  positionDetail: function(e){
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = [{
      city: "北京",
      companyFullName: "北京市商汤科技开发有限公司",
      companyID: 40459,
      companyLogo: "i/image2/M00/1B/63/CgotOVoCv-eAPNQcAARRTfkzqqo936.png",
      companyName: "商汤科技",
      createTime: "今天 14:25",
      education: 0,
      jobsID: 3,
      positionID: 5778046,
      positionName: "高级java开发工程师",
      salary: "30k-45k",
      workExperience: 0,
    }];
    console.log(data);
    this.setData({
      positionList: data,
    });
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