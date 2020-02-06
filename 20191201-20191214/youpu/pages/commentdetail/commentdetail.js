const app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  hostUrl: app.globalData.hostUrl,
  avatar_url: undefined,
  nickname: undefined,
  shop_id: undefined,
  comment_id: undefined,
  subcategory: undefined,
  category: undefined,
  secondCommentInfo: undefined,
  shopInfo: undefined,
  likeIcon: "../../assets/icons/icon-like-nor.png",
  likedIcon: "../../assets/icons/icon-like.png",
  maskDisplay: 'none',
  commentContent: undefined
};

Page({
  data: initialData,
  onLoad: function (option) {
    console.log(option);
    const { avatar_url, nickname, comment_id, shop_id, text, sub, category } = option;
    this.setData({
      commentText: text, avatar_url: avatar_url,
      nickname: nickname, shop_id: shop_id, comment_id: comment_id,
      subcategory: sub, category: category
    });
    this.getSecondCommentInfo(comment_id);
    this.getShopInfo(shop_id);
  },
  getSecondCommentInfo: function (comment_id) {
    wx.request({
      url: `${this.data.hostUrl}/comment?comment_id=${comment_id}`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
      success: (result) => {
        console.log(result.data.data);
        this.setData({ secondCommentInfo: result.data.data });
      }
    });
  },
  getShopInfo: function (shop_id) {
    wx.request({
      url: `${this.data.hostUrl}/shop/info?shop_id=${shop_id}`,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
      success: (result) => {
        console.log(result.data.data);
        this.setData({ shopInfo: result.data.data, currentLikeIcon: result.data.data.liked, currentLikeCount: result.data.data.liker_count });
      }
    });
  },
  like: function () {
    if (wx.getStorageSync("isLogin")) {
      if (!this.data.currentLikeIcon) {
        wx.request({
          url: `${this.data.hostUrl}/shop/like`,
          header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
          data: { 'shop_id': this.data.shop_id },
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
          header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
          data: { 'shop_id': this.data.shop_id },
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
  goToAuthorize: function () {
    wx.navigateTo({
      url: '../../pages/authorize/authorize'
    });
  },
  goToShopDetail: function () {
    wx.navigateTo({
      url: `../../pages/shopdetail/shopdetail?id=${this.data.shop_id}&subcategory=${this.data.subcategory}&category=${this.data.category}`
    });
  },
  showMask: function () {
    this.setData({ maskDisplay: 'flex' })
  },
  cancelMask: function () {
    this.setData({ maskDisplay: 'none' })
  },
  setInputData: function (e) {
    this.setData({ commentContent: e.detail.value });
  },
  sendComment: function () {
    const data = {
      shop_id: this.data.shop_id,
      text: this.data.commentContent,
      parent: this.data.comment_id
    }
    console.log(data);
    wx.request({
      url: `${this.data.hostUrl}/comment/`,
      data: data,
      header: { 'content-type': 'application/json', 'Authorization': `Bearer ${wx.getStorageSync("token")}` },
      method: 'POST',
      success: (result) => {
        console.log(result);
        this.cancelMask();
        this.getSecondCommentInfo(this.data.comment_id);
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    });
  }
});