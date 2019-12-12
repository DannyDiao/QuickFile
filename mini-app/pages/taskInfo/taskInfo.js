// pages/taskInfo/taskInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filename: "添加文件"
  },

  selectfile: function (e) {
    console.log(e)
    wx.chooseMessageFile({
      count: 1,
      success: res => {
        console.log(res)
        this.setData({
          filename: res.tempFiles[0].name
        })
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0].path
        const fileName = res.tempFiles[0].name
        wx.uploadFile({
          url: 'http://148.70.157.68:8080/file/uploadFile', //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            'filename': fileName
          },
          success: res => {
            console.log(res)
            const data = res.data
            //do something
          }
        })
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