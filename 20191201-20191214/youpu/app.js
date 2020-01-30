App({
  globalData: {
    homeBackground: "../../assets/home_background.png",
    searchIcon: "../../assets/icons/search.png",
    hostUrl: "https://byupick.ksmeow.moe",
  },
  goAuthorize: function () {
    wx.navigateTo({
      url: '../../pages/authorize/authorize',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  onLaunch() {
    console.log("初始化完啦！");
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.statusBarHeight = result.statusBarHeight;
      }
    });
  },
  checkLoginStatus: function () {
    if (wx.getStorageSync("token")) {
      this.login();
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
            },
            fail: function (err) {
              console.log(err);
            }
          });
        }
      }
    });
  },
})

