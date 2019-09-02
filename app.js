//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // 获取购物车商品信息和地址信息
    const cart = wx.getStorageSync('cart') || [];
    this.globalData.cartProductList = cart;
    const address = wx.getStorageSync('address');
    this.globalData.address = address;
    const userInfo = wx.getStorageSync('userInfo');
    this.globalData.userInfo = userInfo;
    const orderList = wx.getStorageSync('order') || [];
    this.globalData.orderList = orderList;


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    cartProductList: [],
    address: null,
    userInfo: null,
    orderList: []
  }
})