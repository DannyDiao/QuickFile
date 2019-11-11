// pages/authorize/authorize.js
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
              //获取用户临时code
              wx.login({
                success: res => {
                  console.log(res.code)
                  //从数据库获取用户信息
                  //用户已经授权过但并未绑定信息
                  //跳转到绑定信息页面
                  // wx.redirectTo({
                  //   url: '/pages/bind/bind',
                  // })
                  //用户已经授权且已绑定信息
                  //跳转到主页
                  //wx.redirectTo({
                  //  url: '/pages/index/index',
                  //})
                }
              })
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
      wx.login({
        success: res => {
          console.log(res.code)
          //获取openid
          //从数据库获取用户信息

          //用户已经授权过但并未绑定信息
          //跳转到绑定信息页面
          // wx.redirectTo({
          //   url: '/pages/bind/bind',
          // })
          //用户已经授权且已绑定信息
          //跳转到主页
          //wx.redirectTo({
          //  url: '/pages/index/index',
          //})
        }
      })
      //授权成功后，跳转进入小程序首页
      //判断该账号是否已绑定信息
      //若未绑定信息
      //跳转到绑定页面
      // wx.redirectTo({
      //   url: '/pages/bind/bind',
      // })
      //若已绑定信息
      //跳转到主页
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