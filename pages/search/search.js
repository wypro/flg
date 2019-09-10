// pages/search/search.js

const faceUrl = require('../public/common/faceUrl');
const { Toast, Loading } = require("../public/common/Toast");
const { Request } = require("../../utils/request.js");
const xq = require("../index/index.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noSearchArr:['产品经理','java','数据分析','web前端','html5','web前端开发助理','javascript','移动前端'],
    salary: ['2k以下', '2k-5k', '5k-10k', '10k-15k', '15k-25k', '25k-20k', '50k以上'],
    fullTime: ['今天发布', '三天内', '一周内', '两周内'],
    workExp: ['应届毕业生', '3年及以下', '3-5年', '5-10年', '10年以上'],
    edution:['大专','本科','硕士','博士'],
    nature:['全职','兼职','实习'],
    search: null,
    searchList:null,
    conditionType: null,
    endTips: false,
    allowRequest: true,
  },
  changeValue:function(e){ //清空搜索条件
    let that = this;
    let thatValue = e.detail.cursor;
    that.setData({
      searchList:null
    });
  },
  getSearchValue: function(e){  //获取搜索条件
    let that = this;
    let thatValue = e.detail.cursor;
    that.setData({
      search: e.detail.value,
      searchList: (e.detail.value) ? this.data.searchList : null,
    })
    // that.getSimilar((res) => {//获取职位列表
    //   that.setData({
    //     similarList: res
    //   })
    // });
    if (thatValue != 1) {
      that.setData({
        similarList: null
      })
    }
  },
  getSearchList: function(e){
    let that = this;
    let type = e.target.dataset.type || e.currentTarget.dataset.type;
    
    if(type == 1){  //执行搜索职位操作
        if (!this.data.search) {
          Toast("搜索条件不能为空", 'none', 3000)
        }
      console.log(that.data.search);
        //请求参数
        let obj = {
          path: faceUrl.path+faceUrl.positionSearch,
          data:{
            params: that.data.search,
            pageNo: 15
          }
        }

        //发起请求
        Request(obj,(res)=>{
          if (res.code == 1) {
            Toast("大批攻城师正在骑马赶来的路上", 'none', 2000);
            return;
          }
          if (res.code == 2) {
            Toast(res.msg, 'none', 2000);
            return;
          }
          if (res.code == 0) {
            that.setData({
              searchList: res.data,
              similarList:null
            })
            // console.log(that.data.searchList)
          }
        })

    } else { //执行返回上一页操作
      wx.navigateBack({
        delta: 1
      })
    }

  },
  setSearchValue:function(e){
    let that = this;
    // console.log(e)
    let search = e.target.dataset.item || e.currentTarget.dataset.item;
    that.setData({
      search:search
    });
    let obj = {
      path: faceUrl.path+faceUrl.positionSearch,
      data: {
        params: search,
        pageNo: 15
      }
    }

    Request(obj,(res)=>{
      // console.log(res)
      if (res.code == 1) {
        Toast("大批攻城师正在骑马赶来的路上", 'none', 2000);
        return;
      }
      if (res.code == 2) {
        Toast(res.msg, 'none', 2000);
        return;
      }
      if(res.code == 0){
        that.setData({
          searchList:res.data
        })
        // console.log(that.data.searchList)
      }
    })
  },
  getSimilar:function(callback){
    let that = this;

    let obj ={
      path:faceUrl.path+faceUrl.similar,
      data:{
        params:that.data.search
      }
    }

    Request(obj,(res)=>{
      // console.log(res)
      if(res.code == 0){
        callback(res.data);
      }
    })
  },
  showCondition:function(e){
    // console.log(e)
    let type = e.target.dataset.type || e.currentTarget.dataset.type;
    if (this.data.conditionType == type) {
      this.setData({
        conditionType: null
      })
    }else{
      this.setData({
        conditionType: type
      })
    }
    // console.log(this.data.conditionType)
  },
  positionDetail: function (event) {
    let condition = {
      positionID: event.target.dataset.condition || event.currentTarget.dataset.condition,
      jobsID: event.target.dataset.jobsid || event.currentTarget.dataset.jobsid
    }
    wx.navigateTo({
      url: '/pages/detail/detail?positionID=' + condition.positionID + "&jobsID=" + condition.jobsID,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    that.setData({
      endTips: true
    })
    setTimeout(function () {
      that.getPositionList();
    }, 1000)
  },
  getPositionList: function () {
    if (!this.data.allowRequest) {//数据全部请求到本地页面，请求拦截。
      Toast('没有更多数据咯~~~', 'none', 1500);
      this.setData({
        endTips: false,
      });
      return;
    }
    let that = this;
    let obj = {
      path: faceUrl.path + faceUrl.positionSearch,
      data: {
        pageNo: that.data.searchList ? that.data.searchList.length + 15 : 15,
        params: this.data.search
      }
    }
    // 职位列表
    Request(obj, (res) => {
      if (res.code == 1) {
        Toast(res.msg, 'success', 2000);
        return;
      }
      if (res.code == 0) {
        // Toast('成功', 'success', 1500);
        if (this.data.searchList != null && res.data.length == this.data.searchList.length) {
          Toast('没有更多数据咯~~~', 'none', 1500);
          that.setData({
            allowRequest: false,
          });
        }
        that.setData({
          searchList: res.data,
          endTips: false,
        });

      }
    });
  },
  onShow:function(){
    getApp().globalData.isRefresh = false;
  },
})