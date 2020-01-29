let app = getApp();

let Data = {
  searchIcon: app.globalData.searchIcon,
  statusBarHeight: app.globalData.statusBarHeight
};

Page({
  data: Data,
  goback: function () {
    wx.navigateBack({
      delta: 1
    });
  }
})