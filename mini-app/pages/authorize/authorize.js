// pages/authorize/authorize.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log(res)
              //存储用户头像
              app.globalData.avatarUrl = res.userInfo.avatarUrl
              this.userLogin()
            }
          });
        }
      }
    })
  },

  getUserinfo: function(e) {
    console.log(e.detail)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      //存储用户头像
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
      this.userLogin()
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  userLogin: function() {
    //获取用户临时code
    wx.login({
      success: res => {
        console.log(res)
        //查询该微信是否已经绑定账号
        wx.request({
          url: 'https://diaosudev.cn/user/getOpenid',
          data: {
            code: res.code
          },
          success: res => {
            console.log(res)
            if (res.statusCode == 404) {
              //跳转到绑定信息页面
              wx.redirectTo({
                url: '/pages/bind/bind',
              })
            } else if (res.statusCode == 200) {
              //微信已绑定账号，返回用户信息,保存在全局变量materInfo
              app.globalData.masterInfo = res.data
              //跳转到用户主页
              wx.switchTab({
                url: '/pages/index/index',
              })
              console.log(app.globalData.masterInfo)
            }
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