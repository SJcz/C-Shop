// pages/cart/cart.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: { 
    currentCartProductList: [],
    allProductAreChecked: false,
    currentPriceTotal: 0,
    currentChoosedPorductNumber: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentCartProductList: app.globalData.cartProductList
    });

    this.updateCartStatisticsStatus();
  },

  navigateToOrderPage: function () {
    if (this.data.currentChoosedPorductNumber > 0) {
      wx.navigateTo({
        url: '/pages/cart/order/order',
      });
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
    this.setData({
      currentCartProductList: app.globalData.cartProductList
    });

    this.updateCartStatisticsStatus();
  },

  addSpecificProductNumber: function (evt) {
    const productId = evt.currentTarget.dataset.id;
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
      if (app.globalData.cartProductList[i].id == productId) {
        app.globalData.cartProductList[i].number++;
        break;
      }
    }
    this.setData({
      currentCartProductList: app.globalData.cartProductList
    });

    this.updateCartStatisticsStatus();
  },

  reduceSpecificProductNumber: function (evt) {
    const productId = evt.currentTarget.dataset.id;
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
      if (app.globalData.cartProductList[i].id == productId) {
        if (app.globalData.cartProductList[i].number == 1) break;
        app.globalData.cartProductList[i].number--;
        break;
      }
    }
    this.setData({
      currentCartProductList: app.globalData.cartProductList
    });

    this.updateCartStatisticsStatus();
  },

  deleteCartProduct: function (evt) {
    const productId = evt.currentTarget.dataset.id;
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
      if (app.globalData.cartProductList[i].id == productId) {
        app.globalData.cartProductList.splice(i, 1);
        break;
      }
    }
    this.setData({
      currentCartProductList: app.globalData.cartProductList
    });

    this.updateCartStatisticsStatus();
  },

  chooseCartProduct: function (evt) {
    const productId = evt.currentTarget.dataset.id;
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
      if (app.globalData.cartProductList[i].id == productId) {
        app.globalData.cartProductList[i].checked = !app.globalData.cartProductList[i].checked;
        break;
      }
    }
    this.setData({
      currentCartProductList: app.globalData.cartProductList
    });

    this.updateCartStatisticsStatus();
  },

  checkCartAllProduct: function () {
    this.data.allProductAreChecked = !this.data.allProductAreChecked;
    if (this.data.allProductAreChecked) {
      for (let i = 0; i < app.globalData.cartProductList.length; i++) {
        app.globalData.cartProductList[i].checked = true;
      }
    } else {
      for (let i = 0; i < app.globalData.cartProductList.length; i++) {
        app.globalData.cartProductList[i].checked = false;
      }
    }

    this.setData({
      currentCartProductList: app.globalData.cartProductList
    });

    this.updateCartStatisticsStatus();
  },

  checkAllProductChooseStatus: function () {
    let checked = true;
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
        if (!app.globalData.cartProductList[i].checked) {
          checked = false;
          break;
        }
    }

    this.setData({
      allProductAreChecked: checked
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
      currentPriceTotal: price.toFixed(2)
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

  updateCartStatisticsStatus: function () {
    this.calculateCartProductPrice();
    this.calculateChoosedProductNumber();
    this.checkAllProductChooseStatus();
    wx.setStorageSync('cart', app.globalData.cartProductList);
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