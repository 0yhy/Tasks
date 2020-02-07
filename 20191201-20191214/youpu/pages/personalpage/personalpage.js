const app = getApp();

const initalData = {
  statusBarHeight: app.globalData.statusBarHeight,
  hostUrl: app.globalData.hostUrl,
  homeBackground: "../../assets/mine_background.png",
  likeIcon: "../../assets/icons/love_empty.png",
  likedIcon: "../../assets/icons/love_solid.png",
  curLikeIcons: [],
  curLikeCounts: []
};

Page({
  data: initalData,
  onLoad: function (option) {
    const { openid } = option;
    this.getUserInfo(openid);
    this.getUserComment(openid);
  },
  getUserInfo: function (openid) {
    wx.request({
      url: `${this.data.hostUrl}/user/info?openid=${openid}`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
      success: (result) => {
        console.log(result.data.data);
        this.setData({ userInfo: result.data.data });
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  getUserComment: function (openid) {
    wx.request({
      url: `${this.data.hostUrl}/comment/user?openid=${openid}`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
      success: (result) => {
        console.log(result.data.data);
        let comments = result.data.data;
        for (let i = 0; i < comments.length; ++i) {
          // 获取每个评论下的商店信息
          wx.request({
            url: `${this.data.hostUrl}/shop/info?shop_id=${comments[i].shop_id}`,
            header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
            success: (result) => {
              comments[i].image_url = result.data.data.image_url;
              comments[i].shop_id = result.data.data.shop_id;
              comments[i].shop_name = result.data.data.name;
              comments[i].shop_location = result.data.data.address;
              let newCurLikeIcons = this.data.curLikeIcons;
              let newCurLikeCounts = this.data.curLikeIcons;
              newCurLikeIcons[i] = result.data.data.liked;
              newCurLikeCounts[i] = result.data.data.liker_count;
              this.setData({ comments: comments, curLikeIcons: newCurLikeIcons, curLikeCounts: newCurLikeCounts });
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
  }
});