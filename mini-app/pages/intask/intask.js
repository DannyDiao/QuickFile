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
    over_image: "/images/arrow-down.png",
    showtosubmit: true,
    showchecking: false,
    showcomplete: false,
    showover: false,
    //待提交的任务，按截止日期排序，从后端获取
    tosubmit: [],
    //已提交等待审核的任务
    checking: [],
    //已完成的任务
    complete: [],
    //已截止的任务
    overtasks: []
  },

  onclick: function(e) {
    console.log(e.currentTarget.dataset.taskid)
    //获取任务id后传值跳转到文件上传页面
    let taskid = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '../taskInfo/taskInfo?taskID='+taskid,
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  clicktosubmit: function(e) {
    console.log(e)
    if (this.data.showtosubmit) {
      this.setData({
        showtosubmit: false,
        tosubmit_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showtosubmit: true,
        tosubmit_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showtosubmit)
  },

  clickchecking: function(e) {
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

  clickcomplete: function(e) {
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
  onLoad: function(options) {
    this.setData({
      tosubmit_image: "/images/arrow-up.png",
      checking_image: "/images/arrow-down.png",
      complete_image: "/images/arrow-down.png",
      showtosubmit: true,
      showchecking: false,
      showcomplete: false
    })
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
    //隐藏返回第一个页面按钮
    wx.hideHomeButton()
    //从后端获取任务信息，然后赋值给data
    let masterInfo = app.globalData.masterInfo
    //获取参加的任务列表
    wx.request({
      url: 'https://diaosudev.cn/task/getAllTask/' + masterInfo.userID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        let taskdata = res.data
        let toSubmit = []
        let Checking = []
        let Complete = []
        let overTasks = []
        this.setData({
          tosubmit: [],
          checking: [],
          complete: [],
          overtasks: []
        })
        for (let i = 0; i < taskdata.length; i++) {
          //增加发起人姓名字段taskerName
          wx.request({
            url: 'https://diaosudev.cn/user/getuser/' + taskdata[i].userID,
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              console.log(res.data)
              taskdata[i].taskerName = res.data.userName
              //获取用户在该任务提交的文件状态
              wx.request({
                url: 'https://diaosudev.cn/file/getFile/' + masterInfo.userID + '/' + taskdata[i].taskID,
                header: {
                  'content-type': 'application/json'
                },
                success: res => {
                  console.log(res.data)
                  if (taskdata[i].taskStatus == 0){
                    overTasks.push(taskdata[i])
                    this.setData({
                      overtasks: overTasks
                    })
                  }else {
                    //文件状态为0，表示文件被驳回，处于待提交状态，需点击任务重新提交
                    if (res.data.fileStatus == 0) {
                      toSubmit.push(taskdata[i])
                      this.setData({
                        tosubmit: toSubmit
                      })
                    }
                    //文件状态为1，表示文件提交后处于审核状态，不可点击
                    if (res.data.fileStatus == 1) {
                      Checking.push(taskdata[i])
                      this.setData({
                        checking: Checking
                      })
                    }
                    //文件状态为2，表示文件提交后处于审核通过，不可点击
                    if (res.data.fileStatus == 2) {
                      Complete.push(taskdata[i])
                      this.setData({
                        complete: Complete
                      })
                    }
                  }
                }
              })
            }
          })
          
        }
      }
    })
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