
var RSA = require('./wx_rsa')
var util = require('./util.js')

var isShowLoading = false;

var defaultHeaders = {
  // 'Platform': 501,
  // 'Content-Type': 'application/json',
  // 'Version': config.Version
  // 'authority':'www.biquge5200.cc',
  // 'method':'GET',
  // 'path':'/',
  // 'scheme':'https',
  // 'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  // 'accept-encoding':'gzip, deflate, sdch, br',
  // 'accept-language':'zh-CN,zh;q=0.8',
  // 'cache-control':'max-age=0',
  // 'referer':'https://www.baidu.com/link?url=kpLuZdsYygZYN_mH34qzwrCPwcnlT_U5lR-BjYBM3xAwYU1-oLvIYCAJAEYXLi2x&wd=&eqid=95541a8800023ac9000000065b7a8929',
  // 'upgrade-insecure-requests':'1',
  // 'user-agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
};

export default class a{
  constructor() {
    debugger
  }
}

function doRequest(url, method, data = {}, header, onSuccess) {
  wx.request({
    url: url,
    data: data,
    // data: defaultParams,
    method: method,
    header: header,
    success: function (res) {
      if (isShowLoading) {
        wx.hideLoading();
        isShowLoading = false;
      }
      if (util.isFunction(onSuccess)) {
        onSuccess(res);
        // if (res.data.Code === 0) {
        //   onSuccess(res.data.Result);
        // } else {
        //   let pages = getCurrentPages()
        //   let prevPage = pages[pages.length - 1]
        //   prevPage.setData({
        //     text: res.data.ErrorDesc,
        //     isShow: true
        //   });
        //   setTimeout(function () {
        //     prevPage.setData({
        //       isShow: false
        //     });
        //   }, 2000);
        //   if (res.data.Code == 21) {
        //     prevPage.setData({
        //       showUserInfo: true
        //     });
        //     getApp().sq()
        //   }
        //   if (res.data.Code == 5) {
        //     wx.redirectTo({
        //       url: '/pages/login/login'
        //     })
        //   } 
        // }
      }
    },
    fail: function (res) {
      if (isShowLoading) {
        wx.hideLoading();
        isShowLoading = false;
      }
      prevPage.setData({
        text: "请检查网络连接!",
        isShow: true
      });
      setTimeout(function () {
        prevPage.setData({
          isShow: false
        });
      }, 2000);
      console.log(res)
    }

  })
}

function headerAddSign(url, method, data, onSuccess) {
  let key = util.render();
  let headers = defaultHeaders;
  let params = {};
  if(getApp() != undefined) {
    if(getApp().globalData.Token != undefined) {
      // debugger//添加固定头(身份验证)
      params['Token'] = getApp().globalData.Token;
      params['UserID'] = getApp().globalData.UserID;
      console.log('req - header - ' + params);
    }
  }
  for(let i in params) {
    if(params[i] != '') {
      data[i] = params[i];
    }
  }
  if (!isShowLoading) {
    wx.showLoading({
      title: '加载中',
    })
    isShowLoading = true;
  }
  getSeed(
    key,
    (result) => {
      headers['Sign'] = util.hexMD5("_" + result.Seed + "_RSPlatFormAPI");
      // headers['Sign'] = '0e7805bf5980a5e16a04d07075ba4281';
      headers['Key'] = key;
      if (method == "POST") {
        headers['Content-Type'] = "application/x-www-form-urlencoded";
      }
      doRequest(url, method, data, headers, onSuccess);
    }
  )
}

//上传图片
function uploadImage(path, onSuccess) {
  let key = util.render();
  let headers = defaultHeaders;
  getSeed(
    key,
    (result) => {
      headers['Content-Type'] = 'multipart/form-data'
      headers['Sign'] = util.hexMD5("_" + result.Seed + "_RSPlatFormAPI");
      headers['Key'] = key;
      var Token = getApp().globalData.Token
      var UserID = getApp().globalData.UserID
      wx.uploadFile({
        header: headers,
        url: config.host + 'Act123?Token=' + Token + '&UserID=' + UserID,
        filePath: path,
        name: 'image',
        formData: {
        },
        success: function (res) {
          if (JSON.parse(res.data).Code == 0) {
            onSuccess(JSON.parse(res.data).Result)
            console.log(JSON.parse(res.data).Result)
          }
        },
        fail: function (res) {
          console.log(res)
        }
      });
    }
  )
}


module.exports = {
  doRequest: doRequest,
  headerAddSign: headerAddSign,
  uploadImage: uploadImage,
}