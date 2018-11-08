const app = getApp();

function BasePage(data, onLoad, onReady, onShow, onHide, onUnload, 
  onPullDownRefresh, onReachBottom, onShareAppMessage) {

  return function() {
   
  };
}

function Observer() {
  debugger
  var pages = getCurrentPages();
  var curPage = pages[pages.length - 1];
  debugger
}

module.exports = {
  // 'BasePage': BasePage,
  'Observer': Observer
}

