//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerList:[],
    themeList:[],
    recipeList:[],
    refresh:true
  },

  onLoad: function () {
    this.loadMore();
  },

  loadMore:function(){
    if (!this.data.refresh) return;
    var bannerTemp = [];
    var themeTemp = [];
    app.netFetch._post("/rest/cks/api/theme/list/get",null).then(res=>{
      console.log(res.items)
        for (let i = 0; i < res.items.length; i++) {
          if (res.items[i].topFlag === 1) {
             bannerTemp.push(res.items[i]);
           } else {
             if (themeTemp.length < 2) {
               themeTemp.push(res.items[i]);
             }
          }
        }
    }).catch(e=>{
      console.log(e)
    })

    app.netFetch._post('/rest/api/cookbook/recommend/app/get', { "userId": 2021391419}).then(res=>{
      console.log(res)
        this.setData({
           bannerList: bannerTemp,
           themeList: themeTemp,
           recipeList:res.cookbooks,
           refresh: false
        })
    }).catch(e=>{
      console.log(e)
    })
  },

  goRecipeDetail:function(event){
    console.log(event);
      var recipeId = event.currentTarget.dataset.id;
      var title = event.currentTarget.dataset.name;
      wx.navigateTo({
        url: '/pages/detailView/detailView?id=' + recipeId + '&title=' + title,
      })
  },

  gothemeShow:function(event){
    console.log(event);
    var themeId = event.currentTarget.dataset.cookbookidlist;
    var name = event.currentTarget.dataset.name;
    var desc = event.currentTarget.dataset.desc;
    wx.navigateTo({
      url: '/pages/themeShowView/themeShowView?cookbookIdList='+themeId+"&name="+name+"&desc="+desc
    })
  },

  //查看更多菜谱
  goMoreRecipe:function(){
    wx.navigateTo({
      url: '/pages/moreRecipe/moreRecipe'
    })
  },

  //查看更多主题

  onPullDownRefresh: function () {
    console.log("下拉事件");
    // 下拉刷新页面
    // 3.1 把数据先设置回默认值
    this.setData({
      bannerList: [],
      themeList: [],
      recipeList: [],
      refresh: true
    });

    this.loadMore();
    
    wx.stopPullDownRefresh();
  },


})
