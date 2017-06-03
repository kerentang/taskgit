'use strict'
function Observer (data) {
  this.data = data;
  this.walk(data);
}
var pro = Observer.prototype;
pro.walk = function (obj) {
  var val;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      if (typeof val === 'object') {
        Observer(val);
      }
      this.convert(key, val);
    }
  }
};

pro.convert = function (key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('你访问了' + key);
      return val;
    },
    set: function (newVal) {
      console.log('你设置了' + key);
      console.log('新的' + key + '=' + newVal)
      if (newVal === val) {
        return;
      }
      val = newVal;
    }
  })
};
var app1 = new Observer({
  name: '新的name',
  age: '24'
});

app1.data.name = 'word tiana';
app1.data.name = 'll;'
