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
  onLoad: function () {
    this.getUserInfo();
  },
  authorize: function (e) {
    // 点击 opentype button 获取用户授权后返回值为用户的信息
    console.log(e.detail);
    if (e.detail.userInfo) {
      this.login(e.detail.userInfo);
    }
  },
  login: function (userInfo) {
    wx.login({
      success: (result) => {
        let code = result.code;
        if (code) {
          wx.request({
            url: `${this.data.hostUrl}/user/token`,
            data: { code: code, nickname: userInfo.nickName, avatar_url: userInfo.avatarUrl },
            header: { 'content-type': 'application/json' },
            method: 'GET',
            success: (result) => {
              console.log(result);
              wx.setStorageSync("token", result.data.data.token);
              wx.setStorageSync("isLogin", true);
              this.setData({ isLogin: true });
              this.getUserInfo();
            },
            fail: function (err) {
              console.log(err);
            }
          });
        }
      }
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
              this.setData({ nickname: userInfo.nickName, avatarUrl: userInfo.avatarUrl });
            }
          });
        }
      }
    })
  }
})