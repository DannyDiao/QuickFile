// pages/fileInfo/fileInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOneButtonDialog: false,
    oneButton: [{
      text: '确定'
    }],
    dialogmessage: '',
    fileInfo: ""
  },

  tapDialogButton: function (e) {
    this.setData({
      showOneButtonDialog: false
    })
    wx.navigateBack({

    })
  },

  preview: function() {
    //预览文件
    console.log("预览")
    wx.downloadFile({
      url: 'https://diaosudev.cn'+this.data.fileInfo.filePath,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },

  pass: function () {
    //文件审核通过，修改文件状态
    console.log("通过")
    wx.request({
      url: 'https://diaosudev.cn/file/updateFileStatus',
      data: {
        UserID: this.data.fileInfo.userID,
        TaskID: this.data.fileInfo.taskID,
        FileStatus: 2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          this.setData({
            showOneButtonDialog: true,
            dialogmessage: '文件审核通过！'
          })
        }
      }
    })
  },

  reject: function () {
    //文件被驳回，修改文件状态
    console.log("驳回")
    wx.request({
      url: 'https://diaosudev.cn/file/updateFileStatus',
      data: {
        UserID: this.data.fileInfo.userID,
        TaskID: this.data.fileInfo.taskID,
        FileStatus: 0
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          this.setData({
            showOneButtonDialog: true,
            dialogmessage: '文件已被驳回！'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //通过taskID和userID获取文件信息
    wx.request({
      url: 'https://diaosudev.cn/file/getFile/' + options.userID + '/' + options.taskID,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        let fileinfo = res.data
        let submitdate = fileinfo.submitDate.split(".")
        fileinfo.submitDate = submitdate[0].replace('T', ' ')
        if(fileinfo.fileDetails == ""){
          fileinfo.fileDetails = "无"
        }
        //获取文件提交者姓名
        wx.request({
          url: 'https://diaosudev.cn/user/getuser/' + fileinfo.userID,
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res.data)
            //在file数据中增加提交者姓名
            fileinfo.ownerName = res.data.userName
            this.setData({
              fileInfo: fileinfo
            })
          }
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