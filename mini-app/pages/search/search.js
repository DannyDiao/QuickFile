// pages/search/search.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOneButtonDialog: false,
    oneButton: [{ text: '确定' }],
    dialogmessage: '',
    Tasks: "",
    inputShowed: false,
    inputVal: ""
  },

  tapDialogButton: function (e) {
    this.setData({
      showOneButtonDialog: false
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log(e)
    this.setData({
      inputVal: e.detail.value
    })
    let userID = e.detail.value
    if(userID.length == 13){
      wx.request({
        url: 'https://diaosudev.cn/task/getAllReleaseTask/' + userID,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res.data)
          if(res.data.length == 0){
            this.setData({
              Tasks: ""
            })
          }else{
            let tasks = []
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].taskStatus == 1) {
                tasks.push(res.data[i])
                this.setData({
                  Tasks: tasks
                })
              }
            }
          }
        }
      })
    }
  },
  onclick: function (e) {
    console.log(e.currentTarget.dataset.taskid)
    //获取任务id后传值跳转到文件上传页面
    let taskid = e.currentTarget.dataset.taskid
    let userid = app.globalData.masterInfo.userID
    //尝试获取上传的文件信息
    wx.request({
      url: 'https://diaosudev.cn/file/getFile/' + userid + '/' + taskid,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        //判断该任务是否已被完成
        if(res.data!=""&&res.data.fileStatus == 2){
          this.setData({
            showOneButtonDialog: true,
            dialogmessage: '该任务已完成，不可重复进入！'
          })
        }else {
          wx.navigateTo({
            url: '../taskInfo/taskInfo?taskID=' + taskid,
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
        }
      }
    })
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