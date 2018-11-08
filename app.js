//app.js

var _this;

App({

  onLaunch: function () {
    _this = this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null
  }

})

wx.getSystemInfo({
  success: function (res) {
    _this.globalData.screenWidth = res.windowWidth;
    _this.globalData.screenHeight = res.windowHeight;
  },
})

// 异步
function getUserStorage(Key, onSuccess) {
  wx.getStorage({
    //获取数据的key
    key: Key,
    success: function (tt) {
      console.log('StorageData_' + Key + ':' + tt.data)
      onSuccess(tt.data)
    },
    fail: function (res) {
      console.log('==getStoreFail==' + Key)
    }
  })
}

//定位
function getLocation() {
  // debugger
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      let latitude = res.latitude
      let longitude = res.longitude
      wx.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
        success: res => {
          if (res.statusCode == 200) {
            _this.getKeyByCityName(res.data.result.ad_info.city, (data) => {
              _this.globalData.city = res.data.result.ad_info.city
              _this.globalData.Key = data.Key
              _this.globalData.parentkey = data.ParentID
            })
            console.log('1--' + _this.globalData.city + '--2--' + _this.globalData.Key + '--3--' + _this.globalData.parentkey)
            // console.log(res)
            // console.log(res.data.result.ad_info.city+res.data.result.ad_info.adcode);
            console.log('city:' + res.data.result.ad_info.city)
            //that.selectCounty();
          }
        }
      })
    },
    fail: function(res) {
      console.log('--------location------fail-----------')
      console.log(res)
    }
  })
}

function getUserInfo(success, fail) {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) { //'scope.userLocation'
        success();
      } else {
        let pages = getCurrentPages();
        let pre = pages[pages.length - 1];
        pre.setData({
          showUserInfo: true
        }) 
      }
    
    },
    fail: res => {
      console.log(res)
      fail();
    }
  });
}