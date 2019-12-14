// pages/taskInfo/taskInfo.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogtitle: "",
    dialogtitle1: "",
    showOneButtonDialog1: false,
    showOneButtonDialog: false,
    oneButton: [{
      text: '确定'
    }],
    dialogmessage: '',
    filename: "点击添加文件",
    tempFilePaths: "",
    taskerName: "",
    taskInfo: {
      taskID: "",
      taskName: "",
      userID: "",
      taskDetails: "",
      deadLine: "",
      fileType: "",
      taskStatus: ""
    }
  },

  tapDialogButton1: function(e) {
    this.setData({
      showOneButtonDialog1: false
    })
    wx.navigateBack({

    })
  },

  tapDialogButton: function(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },

  selectfile: function(e) {
    console.log(e)
    wx.chooseMessageFile({
      count: 1,
      success: res => {
        console.log(res)
        let fileName = res.tempFiles[0].name
        //获取文件扩展名
        let ext = fileName.substr(fileName.lastIndexOf('.') + 1)
        console.log(ext)
        //判断文件是否符合格式要求
        if (this.data.taskInfo.fileType == "无") {
          this.setData({
            filename: res.tempFiles[0].name,
            tempFilePaths: res.tempFiles[0].path
          })
        } else if (this.data.taskInfo.fileType == "doc" && (ext == 'doc' || ext == 'docx')) {
          this.setData({
            filename: res.tempFiles[0].name,
            tempFilePaths: res.tempFiles[0].path
          })
        } else if (this.data.taskInfo.fileType == "jpg" && (ext == 'jpg')) {
          this.setData({
            filename: res.tempFiles[0].name,
            tempFilePaths: res.tempFiles[0].path
          })
        } else if (this.data.taskInfo.fileType == "xls" && (ext == 'xls' || ext == 'xlsx')) {
          this.setData({
            filename: res.tempFiles[0].name,
            tempFilePaths: res.tempFiles[0].path
          })
        } else if (this.data.taskInfo.fileType == "pdf" && (ext == 'pdf')) {
          this.setData({
            filename: res.tempFiles[0].name,
            tempFilePaths: res.tempFiles[0].path
          })
        } else if (this.data.taskInfo.fileType == "ppt" && (ext == 'ppt' || ext == 'pptx')) {
          this.setData({
            filename: res.tempFiles[0].name,
            tempFilePaths: res.tempFiles[0].path
          })
        } else {
          this.setData({
            dialogtitle: "",
            showOneButtonDialog: true,
            dialogmessage: '文件格式不符合要求！！！'
          })
        }
      }
    })
  },

  formSubmit: function(e) {
    let filedetails = e.detail.value.filedetails
    console.log('form发生了submit事件，携带数据为：', filedetails)
    if (this.data.tempFilePaths == "") {
      this.setData({
        dialogtitle: "上传失败",
        showOneButtonDialog: true,
        dialogmessage: '请先添加要上传的文件！'
      })
    } else {
      //先上传文件
      wx.uploadFile({
        url: 'https://diaosudev.cn/file/uploadFile',
        filePath: this.data.tempFilePaths,
        name: 'file',
        formData: {
          'filename': this.data.filename,
          'UserID': app.globalData.masterInfo.userID,
          'TaskID': this.data.taskInfo.taskID
        },
        success: res => {
          //返回文件存储名
          console.log(res)
          if (res.statusCode == 200) {
            let fileName = this.data.filename
            //再插入文件表
            wx.request({
              url: 'https://diaosudev.cn/file/createFile',
              data: {
                UserID: app.globalData.masterInfo.userID,
                TaskID: this.data.taskInfo.taskID,
                FileName: this.data.filename,
                FilePath: '/static/' + res.data,
                FileType: fileName.substr(fileName.lastIndexOf('.') + 1),
                FileDetails: filedetails
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: res => {
                console.log(res)
                //上传成功返回上一页面
                if (res.statusCode == 200) {
                  this.setData({
                    showOneButtonDialog1: true,
                    dialogmessage1: "文件提交成功！！！"
                  })
                }
              }
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
        //获取任务发起者名字
        wx.request({
          url: 'https://diaosudev.cn/user/getuser/' + res.data.userID,
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res.data)
            this.setData({
              taskerName: res.data.userName
            })
          }
        })
      }
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