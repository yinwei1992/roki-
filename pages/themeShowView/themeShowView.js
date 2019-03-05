// pages/themeShowView/themeShowView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    desc:"",
    cookbookidlist:"",
    cookbookData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.cookbookIdList);
    var cookTemp = options.cookbookIdList.split(",");
    this.setData({
      cookbookidlist: cookTemp,
      title: options.name,
      desc:options.desc
    });
    this.loadData();
  },

  loadData:function(){
    wx.request({
      url: 'https://api.myroki.com:443/rest/api/cookbook/get-by-ids',
      method: 'POST',
      data: {
        "CookbookIdList": this.data.cookbookidlist
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data.cookbooks);
        this.setData({
          cookbookData: res.data.cookbooks
        })
      },
    })
  },

  goRecipeDetail:function(event){
    var recipeId = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/detailView/detailView?id=' + recipeId + '&title=' + title,
    })
  },
 
  onShareAppMessage: function () {

  }
})