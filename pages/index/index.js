//index.js
import BasePage from "../../utils/BasePage";

import MyPromise from "../../utils/MyPromise";

var lian = require('../../utils/lian');

const thisPage = new BasePage({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('page onLoad');
    thisPage.app;

    // lian.createP()
    // .lian(() => {console.log('1')})
    // .lian(() => {console.log('12')})
    // .lian(() => {console.log('123')}) 
    
    // let myPromise = new MyPromise((resolve) => {
    //   debugger
    //   console.log('123');
    //   resolve();
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('page onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('page onShow');
    thisPage.request.doRequest(
      'https://www.biquge5200.cc/',
      'GET',
      {},
      {},
    );
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('page onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('page onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('page onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('page onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('page onShareAppMessage');
  },

  bindEvent: {
    bind1: function() {
      console.log('bind1')
      wx.navigateTo({
        url: '/packageB/pages/index/index',
      })
    }
  }

})
