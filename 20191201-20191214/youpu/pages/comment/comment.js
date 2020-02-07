const app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  hostUrl: app.globalData.hostUrl,
  shop_id: undefined,
  shop_name: undefined,
  category: undefined,
  subcategory: undefined,
  tags: [],
  selectedTags: [],
  curSwiperNumber: 0,
  placeholder: "说出你对这家店的感受与体验，夸奖与吐槽，让更多人看到吧~",
  commentContent: ""
};

Page({
  data: initialData,
  onLoad(option) {
    this.setData({
      shop_id: option.shop_id,
      shop_name: option.shop_name,
      category: option.category,
      subcategory: option.subcategory
    });
    this.getTagList();
  },
  getTagList: function() {
    wx.request({
      url: `${this.data.hostUrl}/shop/tags`,
      data: {
        category: this.data.category,
        subcategory: this.data.subcategory
      },
      header: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.data.token}`
      },
      success: (result) => {
        let tags = result.data.data;
        console.log(tags);
        let arr = [];
        let subArrNum = Math.ceil(tags.length / 9);
        let lastSubArrNum = tags.length % 9;
        for (let i = 0; i < subArrNum; ++i) {
          let subArr = [];
          let jMax = i === subArrNum - 1 ? lastSubArrNum : 8;
          for (let j = 0; j < jMax; ++j) {
            subArr.push({
              tag: tags[0].name,
              selected: false,
              id: tags[0]._id
            });
            tags.shift();
          }
          arr.push(subArr);
        }
        console.log(arr);
        this.setData({ tags: arr });
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  swipeSwiper: function(e) {
    this.setData({ curSwiperNumber: e.detail.current });
  },
  selectTag: function(e) {
    // 当前swiper的index
    let curIndex = e.currentTarget.dataset.index;
    // 新的tags数组
    let newTags = this.data.tags;
    let curTag = newTags[this.data.curSwiperNumber][curIndex].id;
    newTags[this.data.curSwiperNumber][curIndex].selected = !newTags[
      this.data.curSwiperNumber
    ][curIndex].selected;
    this.setData({ tags: newTags });
    // 更新选中标签数组
    let newTagsArr = this.data.selectedTags;
    let arrIndex = newTagsArr.indexOf(curTag);
    if (arrIndex !== -1) {
      newTagsArr.splice(arrIndex, 1);
    } else {
      newTagsArr.push(curTag);
    }
    this.setData({ selectedTags: newTagsArr });
    console.log(this.data.selectedTags);
  },
  inputComment: function(e) {
    this.setData({ commentContent: e.detail.value });
  },
  submitComment: function() {
    const data = {
      shop_id: this.data.shop_id,
      tags: this.data.selectedTags,
      text: this.data.commentContent,
      images: this.data.images
    };
    console.log(wx.getStorageSync("token"));
    wx.request({
      url: `${this.data.hostUrl}/comment/`,
      data: data,
      header: {
        "content-type": "application/json",
        Authorization: `Bearer ${wx.getStorageSync("token")}`
      },
      method: "POST",
      success: (result) => {
        console.log(result);
        this.goback();
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  chooseImage: function() {
    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (result) => {
        console.log(result);
        for (let image of result.tempFilePaths) {
          wx.uploadFile({
            url: `${this.data.hostUrl}/image`,
            filePath: image,
            name: "image",
            success: (result) => {
              console.log("suceed!!!");
              console.log(result);
            },
            fail: (err) => {
              console.log("fail!!!!");
              console.log(err);
            }
          });
        }
      }
    });
  },
  uploadImage: function() {},
  goback: function() {
    wx.navigateBack({
      delta: 1
    });
  }
});
