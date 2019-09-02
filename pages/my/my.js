// pages/my/my.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHasLogin: false,
    userInfo: null,
    address: {},
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.address) {
      this.setData({
        address: app.globalData.address
      });
    }
    if (app.globalData.userInfo) {
      this.setData({
        userHasLogin: true,
        userInfo: app.globalData.userInfo,
      });
    }
    if (app.globalData.orderList) {
      this.setData({
        orderList: app.globalData.orderList
      });
    }
  },

  navigateToAddressPage: function () {
    wx.navigateTo({
      url: '/pages/my/address/address',
    });
  },

  showLoginModal: function () {
    const self = this;
    if (this.data.userHasLogin) {
      wx.showModal({
        content: '确定退出C-Shop',
        showCancel: true,
        cancelText: '暂不退出',
        cancelColor: '#aaa',
        confirmText: '确认退出',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            self.clearUserInfo();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    } else {
      wx.showModal({
        content: '登陆到C-Shop',
        showCancel: true,
        cancelText: '暂不登陆',
        cancelColor: '#aaa',
        confirmText: '确认登陆',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            self.getUserInfo();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
    
  },

  getUserInfo: function () {
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: res => {
        console.log(res);
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userHasLogin: true,
          userInfo: res.userInfo,
        });
        wx.setStorageSync('userInfo', res.userInfo);
      }
    });
  },

  clearUserInfo: function () {
    wx.removeStorageSync('userInfo');
    this.setData({
      userHasLogin: false,
      userInfo: {},
    });
  },

  showPayInfo: function () {
    wx.showModal({
      title: '支付提示',
      content: '本产品仅用于演示, 支付功能已屏蔽',
      showCancel: false,
    });
  },

  navigateToOrderDetailPage: function (evt) {
    const order = evt.currentTarget.dataset.order;
    wx.navigateTo({
      url: '/pages/my/payOrder/payOrder?order=' + encodeURIComponent(JSON.stringify(order)),
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
    if (app.globalData.address) {
      this.setData({
        address: app.globalData.address
      });
    }
    if (app.globalData.userInfo) {
      this.setData({
        userHasLogin: true,
        userInfo: app.globalData.userInfo,
      });
    }
    if (app.globalData.orderList) {
      this.setData({
        orderList: app.globalData.orderList
      });
    }
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