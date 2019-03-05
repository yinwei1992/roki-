// pages/desi/desi.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo:0,
    pageSize:10,
    videoList:[],
    hasMore:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
  },

  loadMore: function () {
    if (!this.data.hasMore) return;
    app.netFetch._post("/rest/ops/api/source/getSeriesInfoList", {
      "pageNo": this.data.pageNo,
      "pageSize": this.data.pageSize,}).then(res=>{
        if (res.datas.length == 0) {
          this.data.hasMore = false;
          return;
        }
        var newList = this.data.videoList.concat(res.datas);
        this.setData({
          videoList: newList,
        })
      }).catch(e=>{
        console.log(e)
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
    console.log("下拉事件");
    // 下拉刷新页面
    // 3.1 把数据先设置回默认值
    this.setData({
      paged: 0,
      pagedsize: 10,
      videoList: [],
      hasMore: true,
    });
    // 3.2 再重新请求数据
    this.loadMore();
    // 3.3 记得停止，否则在手机端一直存在
    wx.stopPullDownRefresh();
  },

  goVideoDetail:function(){
    wx.navigateTo({
      url: '/pages/video/videoshow'
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var num = this.data.pageNo + 1;
    this.data.pageNo = num;
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})