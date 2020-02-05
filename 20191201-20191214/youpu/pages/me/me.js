let app = getApp();

let Data = {
  homeBackground: "../../assets/mine_background.png",
  hostUrl: app.globalData.hostUrl,
  statusBarHeight: app.globalData.statusBarHeight,
  isLogin: wx.getStorageSync("isLogin"),
  token: wx.getStorageSync("token"),
  meListItem: [
    {
      "name": "我的优惠券"
    },
    {
      "name": "我的点评"
    },
    {
      "name": "我的关注"
    },
    {
      "name": "我的评论"
    },
    {
      "name": "我的收藏"
    },
    {
      "name": "消息"
    },
    {
      "name": "意见反馈"
    },
  ],
};
Page({
  data: Data,
  onShow: function () {
    this.getUserInfo();
  },
  goAuthorize: function () {
    wx.navigateTo({
      url: '../../pages/authorize/authorize',
      success: (result) => {
        console.log(result);
      },
      fail: (err) => { console.log(err) }
    });
  },
  getUserInfo: function () {
    wx.getSetting({
      success: (result) => {
        if (result.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            withCredentials: 'false',
            lang: 'zh_CN',
            timeout: 10000,
            success: (result) => {
              let userInfo = result.userInfo;
              this.setData({ nickname: userInfo.nickName, avatarUrl: userInfo.avatarUrl, isLogin: true });
            }
          });
        }
      }
    })
  }
})