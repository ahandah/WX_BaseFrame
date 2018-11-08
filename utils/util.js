
var _md5 = require('./md5.js');
var RSA = require('./wx_rsa.js');
// _this.RSAEncrypt(newPwd, Seed);

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function touchEvent(fn) {

  return function () {
    console.log('onClick');
    fn();
  }
}

function isFunction(_function) {
  return typeof _function === 'function';
}

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

function random() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function hexMD5(str) {
  return _md5.hexMD5(str);
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function setCookie(key, cookie) {
  wx.setStorageSync(key, cookie)
}

function getCookie(key) {
  return wx.getStorageSync(key);
}

//四舍五入法
function toRound(num, size) {
  return Math.round(num * Math.pow(10, size)) / Math.pow(10, size);
}
//去尾法
function toFloor(num, size) {
  return Math.floor(num * Math.pow(10, size)) / Math.pow(10, size);
}
//进一法
function toCeil(num, size) {
  return Math.ceil(num * Math.pow(10, size)) / Math.pow(10, size);
}

//加    
function floatAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

//减    
function floatSub(arg1, arg2) {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度    
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//乘    
function floatMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


//除   
function floatDiv(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
  try { t2 = arg2.toString().split(".")[1].length } catch (e) { }

  r1 = Number(arg1.toString().replace(".", ""));

  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

module.exports = {
  formatTime: formatTime,
  touchEvent: touchEvent,
  json2Form: json2Form,
  isFunction: isFunction,
  generateUUID: generateUUID,
  random: random,
  hexMD5: hexMD5,
  setCookie: setCookie,
  getCookie: getCookie,
  toRound: toRound,
  toFloor: toFloor,
  toCeil: toCeil,
  floatAdd: floatAdd,
  floatSub: floatSub,
  floatMul: floatMul,
  floatDiv: floatDiv,
}
