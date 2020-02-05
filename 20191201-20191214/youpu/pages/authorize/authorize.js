let app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  hostUrl: app.globalData.hostUrl
};

Page({
  data: initialData,
  authorize: function (e) {
    // 点击 opentype button 获取用户授权后返回值为用户的信息
    console.log(e.detail);
    if (e.detail.userInfo) {
      this.login(e.detail.userInfo);
    }
    else {
      this.goback();
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
              this.goback();
            },
            fail: function (err) {
              console.log(err);
            }
          });
        }
      }
    });
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    });
  },
});