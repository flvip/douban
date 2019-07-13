// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:false,
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id
    this.data.currentPostId=postid
    var postData = postsData.postList[postid]
    this.setData({
      postData: postData
    })
  
    var postsColletcted = wx.getStorageSync("posts_Collected")
    if (postsColletcted){
      var postCollected = postsColletcted[postid]
      this.setData({
        collected: postCollected
      })
    }else{
      var postsColletcted = {}
      postsColletcted[postid] = false
      wx.setStorageSync("posts_Collected", postsColletcted)
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postid){
      this.setData({
        isPlayingMusic:true
      })
    }
  this.setMusicPlay()

  },
  setMusicPlay:function(){
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic =true
      app.globalData.g_currentMusicPostId = that.data.currentPostId
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_currentMusicPostId = null
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_currentMusicPostId = null
    })
  },

  onCollectionTap:function(event){
    var postsCollected = wx.getStorageSync("posts_Collected")
    var postCollected = postsCollected[this.data.currentPostId]
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    wx.setStorageSync("posts_Collected", postsCollected)
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏成功',
      icon: 'success',
      duration: 1200
    })

  },
  onMusicTap:function(event){
    var currentId = this.data.currentPostId
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic){
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postsData.postList[currentId].music.url,
        title: postsData.postList[currentId].music.title,
        coverImg: postsData.postList[currentId].music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})