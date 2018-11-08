
var _this;
export default class MyPromise {
  
  constructor(fn) {
    _this = this;
    this.resFn = function() {};
    fn(this.resolve, this.reject);
  }

  then(resFn = () => {}) {
    this.resFn = resFn;
  }

  resolve(res) {
    debugger
    _this.resFn();
    
  }

  reject(res) {

  }
}