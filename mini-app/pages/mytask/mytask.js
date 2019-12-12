// pages/mytask/mytask.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytask: ""
  },

  onclick: function (e) {
    console.log(e.currentTarget.dataset.taskid)
    //获取任务id后传值跳转收集情况页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从后端获取任务信息，然后赋值给mytask
    let masterInfo = app.globalData.masterInfo
    //获取发布的任务列表
    wx.request({
      url: 'http://148.70.157.68:8080/task/getAllReleaseTask/' + masterInfo.userID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        this.setData({
          mytask: res.data
        })
      }
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
    //隐藏返回第一个页面按钮
    wx.hideHomeButton()
    //返回后重新加载页面
    this.onLoad()
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