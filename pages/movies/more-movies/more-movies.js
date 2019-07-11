// pages/movies/more-movies/more-movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitle:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category
    this.setData({
      navigationBarTitle : category
    })
    console.log(category)
  },
  onReady:function(){
    wx:wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})