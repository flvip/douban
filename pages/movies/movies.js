// pages/movies/movies.js
var util =require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.g_doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"
    // console.log(inTheatersUrl)
    var comingSoonUrl = app.globalData.g_doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250Url = app.globalData.g_doubanBase + "/v2/movie/top250" + "?start=0&count=3"

    this.getMovieListData(inTheatersUrl,'inTheaters','正在热映')
    this.getMovieListData(comingSoonUrl,'comingSoon','即将上映')
    this.getMovieListData(top250Url,'top250','top250')
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that =this
    wx.request({
      url: url,
      method: 'get',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
        console.log(res)
      },
      fail: function(error) {
        console.log(error)
      }
    })
 
  },
  //过滤数据的方法
  processDoubanData: function (moviesDouban, settedKey ,categoryTitle){
    var movies=[]
    for(let i in moviesDouban.subjects){
      var subjects = moviesDouban.subjects[i]
      var title = subjects.title
      if(title.length>=6){
        title=title.substring(0,6)+"..."
      }
      var temp={
        stars: util.convertToStarsArray(subjects.rating.stars),
        title:title,
        average: subjects.rating.average,
        coverageUrl: subjects.images.large,
        movieId: subjects.id
      }
      movies.push(temp)
    }
    var readyData={}
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies:movies
    }
  
    this.setData(readyData)
  },
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category
    console.log(category)
    wx.navigateTo({
      url: 'more-movies/more-movies?category=' + category,
    })
  }
 
})