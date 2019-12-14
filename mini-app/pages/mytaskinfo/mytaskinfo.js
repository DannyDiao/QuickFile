// pages/mytaskinfo/mytaskinfo.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskInfo: "",
    forcheck_image: "/images/arrow-up.png",
    reject_image: "/images/arrow-down.png",
    passed_image: "/images/arrow-down.png",
    showforcheck: true,
    showreject: false,
    showpassed: false,
    showdownload: false,
    //待审核的文件，按提交日期排序，从后端获取
    forcheckfile: [],
    //被驳回的文件
    rejectfile: [],
    //已通过的文件
    passedfile: []
  },

  //打包下载文件
  downloadfiles: function () {
    //通过任务ID获取已完成文件的信息，然后打包下载，返回一个压缩包下载链接
    wx.request({
      url: 'https://diaosudev.cn/file/compressFiles/'+this.data.taskInfo.taskID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        if(res.statusCode == 200){
          //直接复制下载链接到剪切板
          wx.setClipboardData({
            data: 'https://diaosudev.cn/static' + res.data,
            success: res => {
              wx.showToast({
                title: '已复制下载链接，请前往浏览器下载哦',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },

  onclick: function (e) {
    console.log(e.currentTarget.dataset.userid)
    //跳转到文件详情页
    wx.navigateTo({
      url: '../fileInfo/fileInfo?userID=' + e.currentTarget.dataset.userid+'&taskID='+this.data.taskInfo.taskID,
    })
  },

  clickforcheck: function (e) {
    console.log(e)
    if (this.data.showforcheck) {
      this.setData({
        showforcheck: false,
        forcheck_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showforcheck: true,
        forcheck_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showforcheck)
  },

  clickreject: function (e) {
    console.log(e)
    if (this.data.showreject) {
      this.setData({
        showreject: false,
        reject_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showreject: true,
        reject_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showreject)
  },

  clickpassed: function (e) {
    console.log(e)
    if (this.data.showpassed) {
      this.setData({
        showpassed: false,
        showdownload: false,
        passed_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showpassed: true,
        passed_image: "/images/arrow-up.png"
      })
      if(this.data.passedfile.length > 0){
        this.setData({
          showdownload: true
        })
      }
    }
    console.log(this.data.showpassed)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.taskID = options.taskID
    //重新刷新页面
    this.setData({
      forcheck_image: "/images/arrow-up.png",
      reject_image: "/images/arrow-down.png",
      passed_image: "/images/arrow-down.png",
      showforcheck: true,
      showreject: false,
      showreject: false
    })
    //从后端获取任务信息，然后赋值给data
    console.log(options)
    //通过options.taskID获取任务信息
    wx.request({
      url: 'https://diaosudev.cn/task/getTask/' + options.taskID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        if(res.data.taskDetails == ""){
          res.data.taskDetails = "无"
        }
        this.setData({
          taskInfo: res.data
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
    //获取当前任务收集的文件信息
    wx.request({
      url: 'https://diaosudev.cn/task/getRelatedFiles/' + app.globalData.taskID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        let files = res.data
        let forcheckFile = []
        let rejectFile = []
        let passedFile = []
        this.setData({
          forcheckfile: [],
          rejectfile: [],
          passedfile: []
        })
        //将文件信息分成三类显示
        for (let i = 0; i < files.length; i++) {
          let submitdate = files[i].submitDate.split(".")
          files[i].submitDate = submitdate[0].replace('T', ' ')
          //通过学号获取文件上传者信息
          wx.request({
            url: 'https://diaosudev.cn/user/getuser/' + files[i].userID,
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              console.log(res.data)
              //在file数据中增加发起人姓名和发起人头像地址
              files[i].ownerName = res.data.userName
              files[i].avatarUrl = res.data.avatarUrl
              //判断文件状态为1， 等待审核
              if (files[i].fileStatus == 1) {
                forcheckFile.push(files[i])
                this.setData({
                  forcheckfile: forcheckFile
                })
              }
              //文件状态为0，处于被驳回的状态
              if (files[i].fileStatus == 0) {
                rejectFile.push(files[i])
                this.setData({
                  rejectfile: rejectFile
                })
              }
              //文件状态为2，文件审核通过
              if (files[i].fileStatus == 2) {
                passedFile.push(files[i])
                this.setData({
                  passedfile: passedFile
                })
              }
              console.log(this.data.forcheckfile)
            }
          })
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