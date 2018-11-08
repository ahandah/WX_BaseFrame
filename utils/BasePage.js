
//获取应用实例
// const app = getApp();
// const utils = require( './util');
// const request = require('./requestapi');
// const Observer = require('./Observer');
var _this
export default class BasePage {

  constructor(page) {
    _this = this;
    this.page = page;
    this.app = getApp();
    this.utils = require( './util');
    this.request = require('./requestapi');
    Page(this.render());
  }

  render() {
    let result = {
      data: this.data,
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: (options) => {
        console.log('base onload');
        if(this.page.onLoad != undefined){
          this.page.onLoad(options);
        }
          
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: () => {
        console.log('base onready');
        if(this.page.onReady != undefined){
          this.page.onReady();
        }
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: () => {
        console.log('base onshow');
        if(this.page.onShow != undefined){
          this.page.onShow();
        }
      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: () => {
        console.log('base onhide');
        if(this.page.onHide != undefined){
          this.page.onHide();
        }
      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: () => {
        console.log('base onunload');
        if(this.page.onUnload != undefined){
          this.page.onUnload();
        }
      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: () => {
        console.log('base onpulldownrefresh');
        if(this.page.onPullDownRefresh != undefined){
          this.page.onPullDownRefresh();
        }
      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: () => {
        console.log('base onreachbottom');
        if(this.page.onReachBottom != undefined){
          this.page.onReachBottom();
        }
      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: () => {
        console.log('base onshareappmessage');
        if(this.page.onShareAppMessage != undefined){
          this.page.onShareAppMessage();
        }
      },
    }

    //添加监听事件
    for(let fn in this.page.bindEvent) {
      result[fn] = this.bindEvent(fn);
    }
    
    return result;
  }

  //拓展监听事件
  bindEvent(fn) {
    return function(e) {
      console.log('add bind event');
      _this.page.bindEvent[fn](e);
    };
  }
  
}
