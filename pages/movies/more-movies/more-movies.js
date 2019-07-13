// pages/movies/more-movies/more-movies.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    navigationBarTitle: "",
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
    var category = options.category
    this.setData({
      navigationBarTitle: category
    })
  var dataUrl=""
    switch (category){
      case "正在热映":
        dataUrl = app.globalData.g_doubanBase + "/v2/movie/in_theaters";
      break;
      case "即将上映":
        dataUrl = app.globalData.g_doubanBase + "/v2/movie/coming_soon";
      break;
      case "top250":
        dataUrl = app.globalData.g_doubanBase + "/v2/movie/top250"; 
      break;
    }
    this.data.requestUrl = dataUrl
    util.http(dataUrl, this.processDoubanData)
  },
  // onScrollLower: function (event) {
  //   var nextUrl = this.data.requestUrl +"?start="+this.data.totalCount+"&count=20"
  //   util.http(nextUrl, this.processDoubanData)
  //   wx.showNavigationBarLoading()
  // },
  onReachBottom:function(){
   var nextUrl = this.data.requestUrl +"?start="+this.data.totalCount+"&count=20"
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  onPullDownRefresh:function(){
    var refreshUrl = this.data.requestUrl + "?start=0&count=20"
    util.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
    this.data.movies={}
    this.data.isEmpty = true
  
  },
  processDoubanData: function (moviesDouban) {
    var movies = []
    for (let i in moviesDouban.subjects) {
      var subjects = moviesDouban.subjects[i]
      var title = subjects.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: util.convertToStarsArray(subjects.rating.stars),
        title: title,
        average: subjects.rating.average,
        coverageUrl: subjects.images.large,
        movieId: subjects.id
      }
      movies.push(temp)
    }
   
    var totalMovies = {}
     //如果要上拉加载更多。需要跟旧数据合并在一起
    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies=movies
      this.data.isEmpty = false
    }
   
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
 
  onReady: function() {
    wx: wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
