'use strict'
// get dom by id
function $id (id) {
  return document.getElementById(id);
}
// get dom by nodeName
function $dom (mynode) {
  return document.querySelectorAll(mynode);
}
// get dom
// get input.value
var oinput = $id('user-input');
// get selectIndex text
var cur_index;

// use obj to save
var myobj = {
  '小明': [80, 90, 70],
  '小红': [90, 60, 70],
  '小亮': [80, 60, 90],
  '小洲': [70, 85, 80],
  '小华': [81, 92, 76],
  '小敏': [66, 73, 89],
  '小菲': [88, 87, 86]
}
// myobj[key]里现在只有3项数据，最后一项是前面三项之和，用一个函数来输出
// myobj[key]数组的求和函数
// myobj[key]的值变成num
// 利用map,reduce
function mysum (x, y) {
  return x + y;
}
function mynum (x) {
  return x - 0;
}
function result (myobj) {
  for (var key in myobj) {
    var temparr = myobj[key].map(mynum);
    var tempsum = temparr.reduce(mysum);
    myobj[key].push(tempsum);
  }
  return myobj;
}
// 改成检查arrofobj的length！！！
// function check (myobj) {
// if(result(myobj)){
//   if(Object.keys(myobj).length){
//      return myobj;
//   }else{
// alert('表格中无数据请先添加！');
// }
// }else{
// return false;
// }
// }
// sort up （default）
// 将对象转换成数组进行排序
var arrofobj = [];
result(myobj);
function obj_to_arr (myobj) {
  for (var key in myobj) {
    var temp = myobj[key];
    temp.unshift(key);
    arrofobj.push(temp);
  }
  return arrofobj;
}
obj_to_arr(myobj);
function sort_up (arrofobj) {
  cur_index = $id('sortby').selectedIndex;
  if (arrofobj.length) {
    arrofobj.sort(function (a, b) {
      return a[cur_index + 1] - b[cur_index + 1];
    	});
  } else{
    	alert('表格已空请先添加！');
  }
}
// sort down
function sort_down (arrofobj) {
  cur_index = $id('sortby').selectedIndex;
  if (arrofobj.length) {
    	arrofobj.sort(function (a, b) {
      return b[cur_index + 1] - a[cur_index + 1];
    	});
  }else {
    	alert('表格已空请先添加！');
  }
}

// delete
function delerow (arrofobj) {
  // 删除之前先检查一下table的children
  if (arrofobj.length == 0) {
    alert('表格已空请先添加！');
    return false;
  } else {
    arrofobj.pop();
    return arrofobj;
  }
}
// insert one line
// var strarr;
// function checkinput (oinput) {
// var str=oinput.value.trim();
// if(str.length!==4){
// alert('输入长度不正确！请重新输入！')
//        return false;
// } else{
// strarr=str.split(/[,， ；]/);
// for(var j=1;j<strarr.length;j++){
//             if(strarr[j]!=='' && !isNaN(strarr[j])){
//                 myobj[strarr[0]]=strarr.slice(1);
//             }
// }
//         return myobj;
// }
// }
// 获取用户自己输入一段数据生成到表格中
// function user_input(myobj){
// if (checkinput (oinput)){
//         result(myobj);
//        return obj_to_arr(myobj);
// } else{
// 	return myobj;
// }

// }
// render to dom：1.createElement;2.appendChild()
function createtd (val) {
  var otd = document.createElement('td');
  otd.innerText = val;
  return otd;
}
function createtr () {
  var otr = document.createElement('tr');
  return otr;
}
function createtable (arrofobj) {
  // td,tr.appendChild(td),td.innerHTML=myobj[i]
  var mytbl = $id('tbl');
  mytbl.innerHTML = '<tr><th>姓名</th><th>语文</th><th>数学</th><th>英语</th><th>总分</th></tr>';
  for (var l = 0; l < arrofobj.length; l++) {
    var trs = createtr();
    for (var n = 0; n < arrofobj[l].length; n++) {
      var tds = createtd(arrofobj[l][n]);
      trs.appendChild(tds);
    }
    mytbl.appendChild(trs);
  }
}

function render () {
    // 首先重置table.children;
  $id('tbl').innerHTML = '';

  createtable(arrofobj);
}
// 统一处理函数-代理
function init (e) {
  e = e || window.e
  let target = e.target || e.srcElement;
  switch (target.id) {
    case 'up':
      sort_up(arrofobj)
      break;
    case 'down':
      sort_down(arrofobj)
      break;
    case 'dele':
      delerow(arrofobj)
      break;
  }
  render();
}
// addEventListener
window.onload = function () {
  $id('mybtn').addEventListener('click', init);
}
