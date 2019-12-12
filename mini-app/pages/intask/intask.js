// pages/intask/intask.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tosubmit_image: "/images/arrow-up.png",
    checking_image: "/images/arrow-down.png",
    complete_image: "/images/arrow-down.png",
    showtosubmit: true,
    showchecking: false,
    showcomplete: false,
    //待提交的任务，按截止日期排序，从后端获取
    tosubmit: [
      { taskid: "1", taskname: "任务1", taskowner: "发起人1", deadline: "截止日期1" },
      { taskid: "2", taskname: "任务2", taskowner: "发起人2", deadline: "截止日期2" },
      { taskid: "3", taskname: "任务3", taskowner: "发起人3", deadline: "截止日期3" }
    ],
    //已提交等待审核的任务
    checking: [
      { taskid: "id", taskname: "任务名称", taskowner: "发起人", deadline: "截止日期" },
      { taskid: "id", taskname: "任务名称", taskowner: "发起人", deadline: "截止日期" },
      { taskid: "id", taskname: "任务名称", taskowner: "发起人", deadline: "截止日期" }
    ],
    //已完成的任务
    complete: [
      { taskid: "id", taskname: "任务名称", taskowner: "发起人", deadline: "截止日期" },
      { taskid: "id", taskname: "任务名称", taskowner: "发起人", deadline: "截止日期" },
      { taskid: "id", taskname: "任务名称", taskowner: "发起人", deadline: "截止日期" }
    ]
  },

  onclick: function(e){
    console.log(e.currentTarget.dataset.taskid)
    //获取任务id后传值跳转到文件上传页面
  },

  clicktosubmit: function(e){
    console.log(e)
    if (this.data.showtosubmit){
      this.setData({
        showtosubmit: false,
        tosubmit_image: "/images/arrow-down.png"
      })
    }else{
      this.setData({
         showtosubmit: true,
        tosubmit_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showtosubmit)
  },

  clickchecking: function(e){
    console.log(e)
    if (this.data.showchecking) {
      this.setData({
        showchecking: false,
        checking_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showchecking: true,
        checking_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showchecking)
  },

  clickcomplete: function(e){
    console.log(e)
    if (this.data.showcomplete) {
      this.setData({
        showcomplete: false,
        complete_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showcomplete: true,
        complete_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showcomplete)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //重新刷新页面
    this.setData({
      tosubmit_image: "/images/arrow-up.png",
      checking_image: "/images/arrow-down.png",
      complete_image: "/images/arrow-down.png",
      showtosubmit: true,
      showchecking: false,
      showcomplete: false
    })
    //从后端获取任务信息，然后赋值给data
    let masterInfo = app.globalData.masterInfo
    //获取发布的任务列表
    wx.request({
      url: 'http://148.70.157.68:8080/task/getAllReleaseTask/' + masterInfo.userID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        
      }
    })
    //获取参加的任务列表
    wx.request({
      url: 'http://148.70.157.68:8080/task/getAllTask/' + masterInfo.userID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)

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