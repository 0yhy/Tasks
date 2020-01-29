let app = getApp();

const initialData = {
  title: "",
  statusBarHeight: app.globalData.statusBarHeight,
  likeEmptyIcon: app.globalData.likeEmptyIcon,
  likeIcon: app.globalData.likeIcon,
  currentLikeIcon: false,
  timeIcon: app.globalData.timeIcon,
  locationIcon: app.globalData.locationIcon
}

Page({
  data: initialData,
  onLoad: function (option) {
    this.setData({ title: option.title });
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  like: function (e) {
    const bool = this.data.currentLikeIcon;
    this.setData({ currentLikeIcon: !bool });
  }
})