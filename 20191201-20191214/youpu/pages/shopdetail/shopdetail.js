let app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  hostUrl: app.globalData.hostUrl,
  token: wx.getStorageSync("token"),
  likeIcon: "../../assets/icons/love_empty.png",
  likedIcon: "../../assets/icons/love_solid.png",
  currentLikeIcon: false,
  currentLikeCount: 0,
  timeIcon: "../../assets/icons/time.png",
  locationIcon: "../../assets/icons/location.png",
  curSub: undefined,
  curCategory: undefined
}

Page({
  data: initialData,
  onLoad: function (option) {
    console.log(option);
    const { id, sub, category } = option;
    this.setData({ shop_id: id });
    this.setData({ curSub: sub, curCategory: category });
    this.getShopInfo(id);
  },
  onShow: function () {
    this.getComment();
  },
  like: function () {
    if (wx.getStorageSync("isLogin")) {
      if (!this.data.currentLikeIcon) {
        wx.request({
          url: `${this.data.hostUrl}/shop/like`,
          header: { 'content-type': 'application/json', 'Authorization': `Bearer ${this.data.token}` },
          data: { 'shop_id': this.data.shop.shop_id },
          method: 'POST',
          success: (result) => {
            let cnt = this.data.currentLikeCount + 1;
            console.log(result.data.data);
            this.setData({ currentLikeIcon: true, currentLikeCount: cnt });
          }
        });
      }
      else {
        wx.request({
          url: `${this.data.hostUrl}/shop/unlike`,
          header: { 'content-type': 'application/json', 'Authorization': `Bearer ${this.data.token}` },
          data: { 'shop_id': this.data.shop.shop_id },
          method: 'POST',
          success: (result) => {
            console.log(result.data.data);
            let cnt = this.data.currentLikeCount - 1;
            this.setData({ currentLikeIcon: false, currentLikeCount: cnt });
          }
        });
      }
    }
    else {
      this.goToAuthorize();
    }
  },
  getShopInfo: function (shop_id) {
    wx.request({
      url: `${this.data.hostUrl}/shop/info?shop_id=${shop_id}`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${this.data.token}` },
      method: 'GET',
      success: (result) => {
        console.log(result.data.data);
        this.setData({ shop: result.data.data, currentLikeIcon: result.data.data.liked, currentLikeCount: result.data.data.liker_count });
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  getComment: function () {
    wx.request({
      url: `${this.data.hostUrl}/comment/shop?shop_id=${this.data.shop_id}`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${this.data.token}` },
      success: (result) => {
        console.log(result.data.data);
        this.setData({ comment: result.data.data });
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  goToComment: function () {
    if (wx.getStorageSync("isLogin")) {
      wx.navigateTo({
        url: `../../pages/comment/comment?shop_id=${this.data.shop.shop_id}&shop_name=${this.data.shop.name}&category=${this.data.curCategory}&subcategory=${this.data.curSub}`,
        fail: (err) => { console.log(err) },
      });
    }
    else {
      this.goToAuthorize();
    }
  },
  goToAuthorize: function () {
    wx.navigateTo({
      url: '../../pages/authorize/authorize'
    });
  },
  goToCommentDetail: function (e) {
    const { avatarurl, nickname, shopid, commentid, text } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../../pages/commentdetail/commentdetail?avatar_url=${avatarurl}&nickname=${nickname}&shop_id=${shopid}&comment_id=${commentid}&text=${text}&category=${this.data.curCategory}&subcategory=${this.data.curSub}`
    });
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    });
  }
})