// pages/my/payOrder/payOrder.js
//待支付订单详情页, 和购物车哪里的订单页面样式有区别.
const app = getApp();
const util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    checkedProductList: [],
    currentChoosedPorductNumber: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const order = JSON.parse(decodeURIComponent(options.order));
    this.setData({
      order
    });
  },

  showPayInfo: function () {
    const self = this;
    wx.showModal({
      title: '支付提示',
      content: '本产品仅用于演示, 支付功能已屏蔽',
      showCancel: false,
      success: res => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    });
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