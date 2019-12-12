// pages/index/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    avatarurl: "",
    releaseTaskCount: 0,
    joinTaskCount: 0
  },

  tosearch: function(e){
    //跳转到搜索任务界面
    console.log("搜索任务")
  },

  tobuild: function(e){
    //跳转到发布任务界面
    console.log("发布任务")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let masterInfo = app.globalData.masterInfo
    this.setData({
      username: masterInfo.userName,
      avatarurl: masterInfo.avatarUrl
    })
    console.log(masterInfo)
    //获取已发布任务数量
    wx.request({
      url: 'http://148.70.157.68:8080/task/getReleaseTaskCount/'+masterInfo.userID, 
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        this.setData({
          releaseTaskCount: res.data
        })
      }
    })
    //获取已参加任务数量
    wx.request({
      url: 'http://148.70.157.68:8080/task/getJoinTaskCount/' + masterInfo.userID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        this.setData({
          joinTaskCount: res.data
        })
      }
    })
    
    //获取任务列表
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
    //隐藏返回第一个页面按钮
    wx.hideHomeButton()
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