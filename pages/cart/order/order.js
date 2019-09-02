// pages/cart/order/order.js
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
    const address = app.globalData.address;
    if (address) {
      this.setData({
        userName: address.userName,
        phone: address.phone,
        fullAddress: address.province + address.city + address.township + address.detailAddress
      });
    }
    this.getCheckedProductList(); 
    this.calculateCartProductPrice();

    this.calculateChoosedProductNumber();
  },

  getCheckedProductList: function () {
    const checkedProductList = [];
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
      if (app.globalData.cartProductList[i].checked) {
        checkedProductList.push(app.globalData.cartProductList[i]);
      }
    }
     this.setData({
       checkedProductList
     });
  },

  calculateCartProductPrice: function () {
    let price = 0;
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
      if (app.globalData.cartProductList[i].checked) {
        price += app.globalData.cartProductList[i].price * app.globalData.cartProductList[i].number;
      }
    }

    this.setData({
      totalPrice: price.toFixed(2)
    });
  },

  calculateChoosedProductNumber: function () {
    let num = 0;
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
      if (app.globalData.cartProductList[i].checked) num += app.globalData.cartProductList[i].number;
    }

    this.setData({
      currentChoosedPorductNumber: num
    });
  },

  navigateToAddressPage: function () {
    wx.navigateTo({
      url: '/pages/my/address/address',
    });
  },

  showPayInfo: function () {
    if (!this.data.fullAddress) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      });
      return;
    }

    const self = this;
    wx.showModal({
      title: '支付提示',
      content: '本产品仅用于演示, 支付功能已屏蔽',
      showCancel: false,
      success: res => {
        if (res.confirm) {
          self.generateOrder();
        }
      }
    });
  },

  generateOrder: function () {
    const order = {
      id: util.uuid(),
      productList: this.data.checkedProductList,
      infactPay: this.data.totalPrice,
      createAt: util.formatTime(new Date()),
      userName: this.data.userName,
      phone: this.data.phone,
      fullAddress: this.data.fullAddress,
      displayImage: this.data.checkedProductList[0].image, //订单简略页的覆盖图片,
      displayProductName: this.data.checkedProductList[0].name + ' ' + 
        this.data.checkedProductList[0].amount + (this.data.checkedProductList.length > 0 ? '等' : ''),
      displayProductNumber: this.data.currentChoosedPorductNumber + '件商品'
    }
    app.globalData.orderList.push(order);
    wx.setStorageSync('order', app.globalData.orderList);
    
    this.updateCartProductList();
    wx.switchTab({
      url: '/pages/my/my'
    })
  },

  updateCartProductList: function () {
    for (let i = 0; i < this.data.checkedProductList.length; i++) {
      for (let j = 0; j < app.globalData.cartProductList.length; j++) {
        if (this.data.checkedProductList[i].id == app.globalData.cartProductList[j].id) {
          app.globalData.cartProductList.splice(j, 1);
          break;
        }
      }
    }
    wx.setStorageSync('cart', app.globalData.cartProductList);
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
    const address = app.globalData.address;
    if (address) {
      this.setData({
        userName: address.userName,
        phone: address.phone,
        fullAddress: address.province + address.city + address.township + address.detailAddress
      });
    }
    this.getCheckedProductList(); 
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