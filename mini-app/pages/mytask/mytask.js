// pages/mytask/mytask.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active_image: "/images/arrow-up.png",
    over_image: "/images/arrow-down.png",
    showactive: true,
    showover: false,
    //进行中的任务
    activetasks: [],
    //已截止的任务
    overtasks: []
  },

  onclick: function (e) {
    console.log(e.currentTarget.dataset.taskid)
    let taskid = e.currentTarget.dataset.taskid
    //获取任务id后传值跳转收集情况页
    wx.navigateTo({
      url: '../mytaskinfo/mytaskinfo?taskID='+taskid,
    })
  },

  clickactive: function (e) {
    console.log(e)
    if (this.data.showactive) {
      this.setData({
        showactive: false,
        active_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showactive: true,
        active_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showactive)
  },

  clickover: function (e) {
    console.log(e)
    if (this.data.showover) {
      this.setData({
        showover: false,
        over_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showover: true,
        over_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showover)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    //从后端获取任务信息，然后赋值给mytask
    let masterInfo = app.globalData.masterInfo
    //获取发布的任务列表
    wx.request({
      url: 'https://diaosudev.cn/task/getAllReleaseTask/' + masterInfo.userID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        let mytasks = res.data
        let activeTasks = []
        let overTasks = []
        this.setData({
          activetasks: [],
          overtasks: []
        })
        //将任务分成两类，进行中和已截止
        for(let i = 0;i < mytasks.length;i++){
          if(mytasks[i].taskStatus == 1){
            activeTasks.push(mytasks[i])
            this.setData({
              activetasks: activeTasks
            })
          }else {
            overTasks.push(mytasks[i])
            this.setData({
              overtasks: overTasks
            })
          }
        }
      }
    })
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