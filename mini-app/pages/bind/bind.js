// pages/bind/bind.js
let app = getApp()
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  formSubmit: function (e) {
    let message = e.detail.value
    console.log('form发生了submit事件，携带数据为：', message)
    if(message.username == "" || message.userid == ""){
      this.setData({
        showOneButtonDialog: true,
        dialogmessage: '姓名和学号不能为空！'
      })
    }else if(message.userid.length != 13){
      this.setData({
        showOneButtonDialog: true,
        dialogmessage: '学号长度必须为13位！'
      })
    }
    //判断密码长度是否符合要求
    else if(message.password1.length < 10){
      this.setData({
        showOneButtonDialog: true,
        dialogmessage: '密码长度太短，\n请重新输入！'
      })
    } else if (message.password1 != message.password2){
      this.setData({
        showOneButtonDialog: true,
        dialogmessage: '密码不一致，\n请重新输入！'
      })
    }else{
      wx.login({
        success: res => {
          console.log(res)
          console.log(message)
          console.log(app.globalData.avatarUrl)
          //app.globalData.code = res.code
          console.log(app.globalData.code)
          wx.request({
            url: 'https://diaosudev.cn/user/createUser',
            data: {
              OpenID: res.code,
              UserName: message.username,
              UserID: message.userid,
              AvatarUrl: app.globalData.avatarUrl,
              PassWord: message.password1
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              console.log(res)
              if (res.statusCode == 500) {
                //用户创建失败
                this.setData({
                  showOneButtonDialog: true,
                  dialogmessage: '用户已存在！！！'
                })
              } else if (res.statusCode == 200) {
                app.globalData.masterInfo = {
                  avatarUrl: app.globalData.avatarUrl,
                  openID: null,
                  passWord: null,
                  userID: message.userid,
                  userName: message.username
                }
                //跳转到用户主页
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            }
          })
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