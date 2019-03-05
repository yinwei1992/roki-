// pages/moreRecipe/moreRecipe.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      recipeData:[],
      start:0,
      limit:10,
      refresh:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  loadData:function(){
    if(!this.data.refresh)return;
    app.netFetch._post('/rest/cks/api/cookbook/grounding/get', {
      "start": this.data.start,
      "limit": this.data.limit}).then(res=>{
        if (res.cookbooks.length == 0) {
          this.data.refresh = false;
          return;
        }
        var newList = this.data.recipeData.concat(res.cookbooks);
        this.setData({
          recipeData: newList,
        })
    }).catch(e=>{
      console.log(e)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      recipeData: [],
      start: 0,
      limit: 10,
      refresh: true
    });

    this.loadData();

    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var num=this.data.start+10;
    this.data.start=num;
    this.loadData();
  },

  goRecipeDetail:function(){
    var recipeId = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/detailView/detailView?id=' + recipeId + '&title=' + title,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})