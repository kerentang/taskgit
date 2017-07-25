'use strict'
var webPage = require('webpage');
var page = webPage.create();
var deviceList = require('./config.json')
var url = 'https://www.baidu.com/s?wd=';
var system = require('system');
var keyword = system.args[1];
var phantom = require('phantomjs');
phantom.outputEncoding = 'utf8'; // 为了能正确地显示汉字，采用 GB2312 编码

var device = system.args[2];

var mydata = {};
var st = Date.now();

console.log('输入的关键词是：' + keyword);

if (system.args.length < 3) {
  console.log('请先输入搜索关键词和设备名称！');
  phantom.exit();// exit the program
}

if (deviceList[device] === undefined) {
  console.log('设备参数错误');
  phantom.exit();
}

console.log('设备参数为： ' + JSON.stringify(deviceList[device]['userAgent']));

page.settings.userAgent = deviceList[device]['userAgent'];
page.viewportSize = {
  width: deviceList[device]['width'],
  height: deviceList[device]['height']
}

page.open(url + encodeURIComponent(keyword), function (status) {
  console.log('Status:' + status);
  if (status !== 'success') {
    failedlink();
  } else {
    var dataList = page.evaluate(function () {
      var Lists = []
      var results = document.querySelectorAll('.c-container')
      var len = results.length

      for (var i = 0; i < len; i++) {
        var item = results[i]
        var title = item.querySelector('.t>a')
        var info = item.querySelector('.c-abstract') || item.querySelector('.c-span-last p:first-child')
        var link = item.querySelector('.c-showurl') || item.querySelector('.c-showurl-color')
        var pic = item.querySelector('.c-img')

        Lists.push({
          title: title ? (title.textContent || '') : '',  // textContent可以获取该元素下的所有文本节点
          info: info ? (info.textContent || '') : '',
          link: link ? (link.textContent || '') : '',
          pic: pic ? (pic.src || '') : ''
        })
      }
      return Lists;
    })
    successlink(dataList);
    console.log(JSON.stringify(mydata, null, 4));
    phantom.exit();
  }
})

function successlink (d) {
  mydata.code = 1;
  mydata.msg = '获取成功';
  mydata.device = device;
  mydata.word = keyword;
  mydata.time = Date.now() - st;
  mydata.dataList = d;
}
    // 获取失败函数
function failedlink () {
  mydata.code = 0;
  mydata.msg = '获取失败';
  mydata.device = device;
  mydata.word = keyword;
  mydata.time = Date.now() - st;
  mydata.dataList = [];
}
