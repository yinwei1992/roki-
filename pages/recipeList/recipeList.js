// pages/recipeList/recipeList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dc:"",
      postdata:[],
      paged:-10,
      pagedsize:10,
      recipedate:[],
      hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title,
      });
    }
    this.setData({
      dc:options.dc
    })
    this.loadMore();
  },

  loadMore:function(){
    if (!this.data.hasMore) return;
    app.netFetch._post("/rest/api/device/get-detail-desc", { "dc": this.data.dc}).then(res=>{
      this.setData({
        postdata: res
      })
    }).catch(e=>{
      console.log(e)
    })
    
    app.netFetch._post("/rest/api/cookbook/grounding/get-by-dc", {
        "dc": this.data.dc,
        "cookbookType": "all",
        "start": this.data.paged += this.data.pagedsize,
        "limit": this.data.pagedsize}).then(res=>{
          if (res.cookbooks.length == 0) {
            this.data.hasMore = false;
            return;
          }
          var newList = this.data.recipedate.concat(res.cookbooks);
          this.setData({
            recipedate: newList,
          })
        }).catch(e=>{
          console.log(e)
        })
    // wx.request({
    //   url:'https://api.myroki.com/rest/api/device/get-detail-desc',
    //   method: 'POST',
    //   data: {
    //     "dc": this.data.dc
    //   },
    //   success: (res) => {
    //     console.log(res.data);
    //     this.setData({
    //       postdata:res.data
    //     })
    //     console.log(this.data.postdata);
    //   }
    // })

    // wx.request({
    //   url: 'https://api.myroki.com/rest/api/cookbook/grounding/get-by-dc',
    //   method: 'POST',
    //   data: {
    //     "dc": this.data.dc,
    //     "cookbookType": "all",
    //     "start": this.data.paged += this.data.pagedsize,
    //     "limit": this.data.pagedsize
    //   },
    //   success: (res) => {
    //     console.log(res.data);
    //     if(res.data.cookbooks.length==0){
    //       this.data.hasMore = false;
    //       return;
    //     }
    //     var newList = this.data.recipedate.concat(res.data.cookbooks);
    //     this.setData({
    //       recipedate:newList,
    //     })
    //   }
    // })
  },

  goRecipeDetail: function (event) {
    console.log(event);
    var recipeId = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/detailView/detailView?id=' + recipeId + '&title=' + title,
    })
  },

onPullDownRefresh: function () {
    console.log("下拉事件");
    // 下拉刷新页面
    // 3.1 把数据先设置回默认值
    this.setData({
      postdata: [],
      paged: -10,
      pagedsize: 10,
      recipedate: [],
      hasMore: true
    });
    // 3.2 再重新请求数据
    this.loadMore();
    // 3.3 记得停止，否则在手机端一直存在
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉触底");
    // 1.5. 触底再调用加载数据的函数
    this.loadMore();
  }



})