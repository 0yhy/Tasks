
let app = getApp();

let Data = {
  homeBackground: app.globalData.homeBackground,
  searchIcon: app.globalData.searchIcon,
  statusBarHeight: app.globalData.statusBarHeight,
  catagories: [
    {
      "name": "找吃",
      "icon": "../../assets/icons/collect.png",
      "category": 1
    },
    {
      "name": "找喝",
      "icon": "../../assets/icons/collect.png",
      "category": 2
    },
    {
      "name": "找乐子",
      "icon": "../../assets/icons/collect.png",
      "category": 3
    },
    {
      "name": "会学习",
      "icon": "../../assets/icons/collect.png",
      "category": 4
    },
    {
      "name": "会生活",
      "icon": "../../assets/icons/collect.png",
      "category": 5
    },
    {
      "name": "会打扮",
      "icon": "../../assets/icons/collect.png",
      "category": 6
    },
  ],
};

Page({
  data: Data,
  goToShop: function (e) {
    wx.navigateTo({
      url: `../../pages/shops/shops?category=${e.currentTarget.dataset.category}&title=${e.currentTarget.dataset.name}`,
      success: (result) => {
      },
      fail: () => { },
      complete: () => { }
    });
  },
  gosearch: function () {
    wx.navigateTo({
      url: "../../pages/search/search",
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  }
})