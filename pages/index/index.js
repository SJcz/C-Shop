//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    FeaturedTheme: '精选主题',
    LatestProduct: '最近商品',
    productList: [
      {
        id: 'guazi',
        image: '/images/p4.png',
        name: '锈色瓜子',
        amount: '100克',
        price: '0.01',
        checked: false
      }, {
        id: 'qincai',
        image: '/images/p5.png',
        name: '芹菜',
        amount: '半斤',
        price: '0.01',
        checked: false
      }, {
        id: 'mi',
        image: '/images/p6.png',
        name: '素米',
        amount: '300克',
        price: '0.01',
        checked: false
      },
      {
        id: 'guazi',
        image: '/images/p4.png',
        name: '锈色瓜子',
        amount: '100克',
        price: '0.01',
        checked: false
      }, {
        id: 'qincai',
        image: '/images/p5.png',
        name: '芹菜',
        amount: '半斤',
        price: '0.01',
        checked: false
      }, {
        id: 'mi',
        image: '/images/p6.png',
        name: '素米',
        amount: '300克',
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
  
  onLoad: function () {
    
  },
})
