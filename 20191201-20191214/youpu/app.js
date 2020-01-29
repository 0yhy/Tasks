App({
  globalData: {
    homeBackground: "../../assets/home_background.png",
    searchIcon: "../../assets/icons/search.png",
    likeEmptyIcon: "../../assets/icons/icon-like-nor.png",
    likeIcon: "../../assets/icons/icon-like.png",
    timeIcon: "../../assets/icons/time.png",
    locationIcon: "../../assets/icons/location.png",
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
    if (this.globalData.token) {
      wx.checkSession({
        fail: () => {
          this.login();
        }
      });
    }
    else {
      this.login();
    }
  },
  login: function () {
    wx.login({
      success: (result) => {
        if (result.code) {
          wx.request({
            url: `${this.globalData.hostUrl}/user/token`,
            data: { code: result.code, },
            method: 'POST',
            header: { 'content-type': 'application/json' },
            success: (result) => {

            },
          });
        }
      }
    });

  }
})

