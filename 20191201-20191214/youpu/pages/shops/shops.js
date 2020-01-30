let app = getApp();

let Data = {
  title: undefined,
  category: undefined,
  currentTab: 0,
  homeBackground: app.globalData.homeBackground,
  searchIcon: app.globalData.searchIcon,
  statusBarHeight: app.globalData.statusBarHeight,
  hostUrl: app.globalData.hostUrl,
  token: wx.getStorageSync("token")
};

Page({
  data: Data,
  onLoad: function (option) {
    // 接收index.js发送的url中的数据
    this.setData({ title: option.title, category: option.category });
    this.getSubCategory();
  },
  getAllShops: function () {
    wx.request({
      url: `${this.data.hostUrl}/shop/index?category=${this.data.category}`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${this.data.token}` },
      method: 'GET',
      success: (result) => {
        console.log(this.data.subList);
        let shops = result.data.data;
        let shopList = [];
        for (let i = 0; i < this.data.subList.length; ++i) {
          shopList.push([]);
        }
        for (let shop of shops) {
          let currentSub = shopList[this.getSubIndex(shop["subcategory"])];
          currentSub.push(shop);
        }
        console.log(shopList);
        this.setData({ shopList: shopList });
      }
    });
  },
  getSubIndex: function (_id) {
    for (let sub of this.data.subList) {
      if (sub._id === _id) {
        return sub.index;
      }
    }
  },
  getSubCategory: function () {
    wx.request({
      url: `${this.data.hostUrl}/shop/subcategories?category=${this.data.category}`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${this.data.token}` },
      method: 'GET',
      success: (result) => {
        console.log(result);
        let subList = result.data.data;
        if (subList) {
          for (let i = 0; i < subList.length; ++i) {
            subList[i].index = i;
          }
          this.setData({ subList: subList });
          this.getAllShops();
        }
      }
    });
  },
  gosearch: function () {
    wx.navigateTo({
      url: "../../pages/search/search",
    });
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  goShopDetail: function (e) {
    wx.navigateTo({
      url: `../../pages/shopdetail/shopdetail?id=${e.currentTarget.dataset.id}`
    })
  },
  swipeTab: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
  clickTab: function (e) {
    this.setData({ currentTab: e.currentTarget.dataset.index });
  }
})