// pages/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOneButtonDialog: false,
    oneButton: [{ text: '确定' }],
    dialogmessage: ''
  },

  tapDialogButton: function(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },
  tapOneDialogButton: function(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //判断学号和姓名是否存在
    //若不存在，返回toast提示信息
    this.setData({
      dialogmessage: '姓名与学号不匹配或用户不存在，\n请重新输入！'
    })
    //若存在顺便判断是否已绑定微信
    //若已绑定，返回toast提示信息
    // this.setData({
    //   dialogmessage: '该用户已绑定其他微信账号，\n请重新输入！'
    // })
    //判断全部通过后，更新数据库，将用户信息与微信openid绑定，进入主页
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