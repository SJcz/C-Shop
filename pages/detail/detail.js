// pages/detail/detail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCartProductTotal: 0,
    hideAnimationImage: true,
    isPlayingAnimation: false,
    selectedIntroduceTabIndex: 0,
    productIntroduceTabList: ['商品详情', '产品参数', '售后保障'],
    product: null ,
    /* {
        image: '/images/p1.png',
    name: '珍奇异果',
    amount: '500克',
    price: '0.01'
  }
  */
    selectedProductNumber: 1,
    pickerRange: [1,2,3,4,5,6,7,8,9,10]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const product = JSON.parse(decodeURIComponent(options.product));
    this.setData({
      product: product
    });

    this.calculatedCartProductTotal();
  },

  addToCart: function () {
    const self = this;
    if (this.data.isPlayingAnimation) return;
    this.setData({
      isPlayingAnimation: true,
      hideAnimationImage: false,
    });

    setTimeout(() => {
      self.setData({
        isPlayingAnimation: false,
        hideAnimationImage: true
      });

      self.updateCartProductList();
      self.calculatedCartProductTotal();
      wx.setStorageSync('cart', app.globalData.cartProductList);
    }, 1400);
  },

  updateCartProductList: function () {
    let i = 0;
    for (; i < app.globalData.cartProductList.length; i++) {
      if (app.globalData.cartProductList[i].id == this.data.product.id) {
        app.globalData.cartProductList[i].number += this.data.selectedProductNumber;
        app.globalData.cartProductList[i].checked = true;
        return;
      }
    }

    if (i == app.globalData.cartProductList.length) {
      this.data.product.number = this.data.selectedProductNumber;
      this.data.product.checked = true;
      app.globalData.cartProductList.push(this.data.product);
    }
  },

  calculatedCartProductTotal: function () {
    let total = 0;
    for (let i = 0; i < app.globalData.cartProductList.length; i++) {
      total += app.globalData.cartProductList[i].number;
    }

    this.setData({
      currentCartProductTotal: total
    });
  },

  switchToCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
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

  clickChangeTab: function (evt) {
    const index = evt.currentTarget.dataset.index;

    this.setData({
      selectedIntroduceTabIndex: index
    });
  },

  swiperChangeTab: function (evt) {
    const index = evt.detail.current;

    this.setData({
      selectedIntroduceTabIndex: index
    });
  },

  changeProductNumber: function (evt) {
    const self = this;
    const index = evt.detail.value;

    this.setData({
      selectedProductNumber: self.data.pickerRange[index]
    });
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