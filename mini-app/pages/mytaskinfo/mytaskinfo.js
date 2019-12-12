// pages/mytaskinfo/mytaskinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskinfo: "无",//任务详情（详细要求，可选）
    filetype: "无要求",//任务规定的文件格式，可选
    deadline: "9999-99-99 99:99:99",//任务截止日期
    forcheck_image: "/images/arrow-up.png",
    reject_image: "/images/arrow-down.png",
    passed_image: "/images/arrow-down.png",
    showforcheck: true,
    showreject: false,
    showpassed: false,
    //待审核的文件，按提交日期排序，从后端获取
    forcheckfile: [
      { fileid: "1", filename: "文件1", fileowner: "提交者1", ownerava: "/images/wx_authorize.jpg", submittime: "提交日期1" },
      { fileid: "2", filename: "文件2", fileowner: "提交者2", ownerava: "/images/wx_authorize.jpg", submittime: "提交日期2" },
      { fileid: "3", filename: "文件3", fileowner: "提交者3", ownerava: "/images/wx_authorize.jpg", submittime: "提交日期3" }
    ],
    //被驳回的文件
    rejectfile: [
      { fileid: "1", filename: "文件1", fileowner: "提交者1", ownerava: "/images/wx_authorize.jpg",submittime: "提交日期1" },
      { fileid: "2", filename: "文件2", fileowner: "提交者2", ownerava: "/images/wx_authorize.jpg",submittime: "提交日期2" },
      { fileid: "3", filename: "文件3", fileowner: "提交者3", ownerava: "/images/wx_authorize.jpg",submittime: "提交日期3" }
    ],
    //已通过的文件
    passedfile: [
      { fileid: "1", filename: "文件1", fileowner: "提交者1", ownerava: "/images/wx_authorize.jpg",submittime: "提交日期1" },
      { fileid: "2", filename: "文件2", fileowner: "提交者2", ownerava: "/images/wx_authorize.jpg",submittime: "提交日期2" },
      { fileid: "3", filename: "文件3", fileowner: "提交者3", ownerava: "/images/wx_authorize.jpg",submittime: "提交日期3" }
    ]
  },

  onclick: function (e) {
    console.log(e.currentTarget.dataset.taskid)
    //获取任务id后获取文件路径下载预览
    // wx.downloadFile({
    //   // 示例 url，并非真实存在
    //   url: 'http://www.wlxt.uestc.edu.cn/wlxt/ncourse/1026/assignment/100002720/3501/2017221201001.pdf',
    //   success: function (res) {
    //     const filePath = res.tempFilePath
    //     wx.openDocument({
    //       filePath: filePath,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })
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
        passed_image: "/images/arrow-down.png"
      })
    } else {
      this.setData({
        showpassed: true,
        passed_image: "/images/arrow-up.png"
      })
    }
    console.log(this.data.showpassed)
  },

  pass: function(e) {
    //文件审核通过，修改文件状态
    console.log(e.currentTarget.dataset.taskid)
  },

  reject: function(e) {
    //文件被驳回，修改文件状态
    console.log(e.currentTarget.dataset.taskid)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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