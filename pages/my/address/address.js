// pages/my/address/address.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    phone: '', 
    province: '',
    city: '',
    township: '',
    detailAddress: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.address.province) {
      this.setData({
        userName: app.globalData.address.userName,
        phone: app.globalData.address.phone,
        province: app.globalData.address.province,
        city: app.globalData.address.city,
        township: app.globalData.address.township,
        detailAddress: app.globalData.address.detailAddress
      });
    }
  },

  changeRegion: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    const region = e.detail.value;
    this.setData({
      province: region[0],
      city: region[1],
      township: region[2],
    });
  },

  changeName: function (e) {
    const userName = e.detail.value;
    this.setData({
      userName: userName
    });
  },

  changePhone: function (e) {
    const phone = e.detail.value;
    this.setData({
      phone: phone
    });
  },

  changeDetailAddress: function (e) {
    const detailAddress = e.detail.value;
    this.setData({
      detailAddress: detailAddress
    });
  },

  saveAddress: function () {
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '电话号码不正确',
        icon: 'none'
      });
      return;
    } 
    if (!this.data.userName) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    if (!this.data.province) {
      wx.showToast({
        title: '选择省/市/区',
        icon: 'none'
      });
      return;
    }
    if (!this.data.detailAddress) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      });
      return;
    }
    const address = {
      userName: this.data.userName,
      phone: this.data.phone,
      province: this.data.province,
      city: this.data.city,
      township: this.data.township,
      detailAddress: this.data.detailAddress,
    }
    wx.setStorageSync('address', address);
    app.globalData.address = address;
    wx.navigateBack();
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