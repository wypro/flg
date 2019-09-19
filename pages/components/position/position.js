// pages/components/position/position.js
Component({
  data:{
    
  },
  properties:{
    item:Object
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
        pageNo: that.data.positionList ? that.data.positionList.length + 15 : 15,
        params: this.data.searchValue ? this.data.searchValue : app.globalData.params,
      }
    }
    // 职位列表
    Request(obj, (res) => {
      if (res.code == 1) {
        Toast(res.msg, 'none', 2000);
        return;
      }
      if (res.code == 0) {
        // Toast('成功', 'success', 1500);
        if (this.data.positionList != null && res.data.length == this.data.positionList.length) {
          Toast('没有更多数据咯~~~', 'none', 1500);
          that.setData({
            allowRequest: false,
          });
        }
        that.setData({
          positionList: res.data,
          endTips: false,
        });
      }
    });
  },
})