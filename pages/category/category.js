// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [
      { name: '果味', id: 'guowei' },
      { name: '蔬菜', id: 'shucai' },
      { name: '炒货', id: 'chaohuo' },
      { name: '点心', id: 'dianxin' },
      { name: '粗茶', id: 'cucha' },
      { name: '淡饭', id: 'danfan' }
    ],
    selectedCategoryIndex: 0,
    categoryDetailImage: '/images/c1.png',
    categoryDetailProductList: [
      {
        id: 'qiyiguo',
        image: '/images/p1.png',
        name: '珍奇异果',
        amount: '500克',
        price: '0.01',
        checked: false
      }, {
        id: 'li',
        image: '/images/p2.png',
        name: '梨花带雨',
        amount: '3个',
        price: '0.01',
        checked: false
      }, {
        id: 'hongzao',
        image: '/images/p3.png',
        name: '冬木红枣',
        amount: '500克',
        price: '0.01',
        checked: false
      }, {
        id: 'qiyiguo',
        image: '/images/p1.png',
        name: '珍奇异果',
        amount: '500克',
        price: '0.01',
        checked: false
      }, {
        id: 'li',
        image: '/images/p2.png',
        name: '梨花带雨',
        amount: '3个',
        price: '0.01',
        checked: false
      }, {
        id: 'hongzao',
        image: '/images/p3.png',
        name: '冬木红枣',
        amount: '500克',
        price: '0.01',
        checked: false
      }
    ]
  },

  navigateToProductDetailPage: function (evt) {
    const item = evt.currentTarget.dataset.item;

    wx.navigateTo({
      url: '/pages/detail/detail?product=' + encodeURIComponent(JSON.stringify(item)),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  clickChangeCategory: function (evt) {
    console.log(evt);
    const index = evt.currentTarget.dataset.index;

    this.setData({
      selectedCategoryIndex: index
    });
  },

  swiperChangeCategory: function (evt) {
    console.log(evt);
    const index = evt.detail.current;

    this.setData({
      selectedCategoryIndex: index
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