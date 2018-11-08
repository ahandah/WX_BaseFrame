// pages/Components/MyList/MyList.js
var _this;
Component({

  ready: function() {
    _this = this;
  },

  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    arrayData: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal) {
        // debugger
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    click: function(e) {
      // debugger
      let arrayData = _this.properties.arrayData;
      arrayData[0].msg = '111';
      _this.setData({
        arrayData: arrayData
      })
      // debugger

      _this.triggerEvent('clickComponent',{});
      _this.innerMethod();
    },

    innerMethod: function() {
      // debugger
    }


  }
})
