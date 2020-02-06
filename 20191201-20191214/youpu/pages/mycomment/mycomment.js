const app = getApp();

const initialData = {
  hostUrl: app.globalData.hostUrl,
  statusBarHeight: app.globalData.statusBarHeight,
};

Page({
  data: initialData,
  onLoad: function () {
    this.getUserComment();
  },
  getUserComment: function () {
    console.log(wx.getStorageSync("token"))
    wx.request({
      url: `${this.data.hostUrl}/comment/user`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
      success: (result) => {
        console.log(result.data.data);
        this.setData({ comments: result.data.data })
      }
    });
  },
  getShopInfo: function (shop_id) {

  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    });
  }
});