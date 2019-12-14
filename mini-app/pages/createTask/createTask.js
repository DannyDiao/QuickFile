// pages/createTask/createTask.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOneButtonDialog: false,
    showOneButtonDialog1: false,
    oneButton: [{
      text: '确定'
    }],
    dialogmessage: '',
    dialogmessage1: '',
    fileTypeArray: ['无', 'doc', 'jpg', 'xls', 'pdf', 'ppt'],
    index: 0,
    filetype: "无",
    date: "2019-09-01",
    time: "12:00"
  },

  tapDialogButton: function(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },

  tapDialogButton1: function(e) {
    this.setData({
      showOneButtonDialog1: false
    })
    wx.navigateBack({
      
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      filetype: this.data.fileTypeArray[e.detail.value]
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },

  formSubmit: function(e) {
    let taskInfo = e.detail.value
    let deadLine = taskInfo.deadDate + " " + taskInfo.deadTime + ":00"
    let currentTimestamp = new Date().getTime()
    console.log(currentTimestamp)
    let deadTimestamp = new Date(deadLine).getTime()
    console.log(deadTimestamp)
    let fileType = this.data.fileTypeArray[taskInfo.fileTypeIndex]
    console.log(fileType)
    console.log('form发生了submit事件，携带数据为：', taskInfo)
    if (taskInfo.taskName == "") {
      this.setData({
        showOneButtonDialog: true,
        dialogmessage: '任务名称不能为空！'
      })
    } else if (deadTimestamp <= currentTimestamp) {
      this.setData({
        showOneButtonDialog: true,
        dialogmessage: '截止日期和截止时间错误！'
      })
    } else {
      wx.request({
        url: 'https://diaosudev.cn/task/createTask',
        data: {
          UserID: app.globalData.masterInfo.userID,
          TaskName: taskInfo.taskName,
          FileType: this.data.fileTypeArray[taskInfo.fileTypeIndex],
          DeadLine: deadLine,
          TaskDetails: taskInfo.taskDetails
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log(res)
          if(res.statusCode == 200){
            this.setData({
              showOneButtonDialog1: true,
              dialogmessage1: "任务发布成功！！！"
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})