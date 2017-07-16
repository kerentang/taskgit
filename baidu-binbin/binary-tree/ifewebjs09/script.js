'use strict'
// 获取dom节点-id
function $id (id) {
  return document.getElementById(id);
}

// 获取各节点
var myroot = $id('root');// 获取dom树的根节点
var myinput = $id('input-text');// 获取输入框的节点，输入框的值为myinput.value;
var inputtext = myinput.value;
var timer = null;// 初始化定时器
var nodearr = [];// 定义一个空数组用来保存节点

// 遍历操作-广度优先／深度优先；
// 广度优先-递归;
function mylfre (node) {
  nodearr.push(node);
  var arr = [];
  arr.push(node);  // 专门用来取第一项子节点,因为arr.shift()和arr.pop()会更改原数组，所以新建一个数组专门
  while (arr.length != 0) {
    var temp = arr.shift();
    var n = temp.childNodes.length;
    for (var i = 0; i < n; i++) {
      if (temp.childNodes[i].nodeType == '1') {
        nodearr.push(temp.childNodes[i]);
        arr.push(temp.childNodes[i]);
      }
    }
  }
}

// 深度优先-递归;:children[0]==textNode,注意！所以不能用firsrElementChild,要用children[1],
// 后面要查看第一项子节点的内容所以还是从0开始。。。
function myffre (node) {
  if (node !== null) {
    nodearr.push(node);
    if (node.children.length > 0) {
      var child = node.children[0];
      for (var i = 0; i < node.children.length; i++) {
        myffre(node.children[i]);
      }
    }
  }
  return nodearr;
}

// 创建新元素
function createele () {
  var ele = document.createElement('div');
  var elep = document.createElement('p');
  var myinputtext;
  if (inputtext === '') { alert('请先输入内容！'); } else { myinputtext = document.createTextNode(inputtext.trim()); }
  elep.appendChild(myinputtext);
  ele.appendChild(elep);
  ele.setAttribute('class', 'box');
  return ele;
}

// 定位元素位置
var mynode = '';
function divclick () {
  document.querySelectorAll('div').forEach(function (item) {
    item.onclick = function (e) {
      if (e.target.getAttribute('class') == 'box') {
        clearstyle();
        // 阻止冒泡
        alert(this.innerHTML);
        e = e || window.e;
        e.stopPropagation();
        this.style.backgroundColor = '#00f';
        mynode = this;
      }
    }
  })
}
divclick();
window.ondblclick = function (e) {
  e = e || window.e;
  e.stopPropagation();
  clearstyle();
}
// 处理添加函数
function addele () {
  var input = $id('input-text').value.trim();
  if (input === '') { alert('请先输入内容！') } else if (mynode == '') { alert('请先选中节点！') } else {
    var ele = document.createElement('div');
    var elep = document.createElement('p');
    elep.innerHTML = input;
    ele.appendChild(elep);
    ele.setAttribute('class', 'box');
    mynode.appendChild(ele);
    divclick();
  }
}
// 删除元素
function delele () {
  if (mynode === '') {
    alert('请选择要删除的元素')
  } else {
    mynode.remove();
  }
}

// change_style()给遍历的节点添加额外的样式背景颜色变成黄色
function change_style () {
  var i = 0;
  timer = setInterval(function () {
    if (i > nodearr.length - 1) {
      clearInterval(timer);
      nodearr[nodearr.length - 1].style.backgroundColor = '#0ff';
      return;
    } else if (i < nodearr.length) {
      if (i > 0) {
        nodearr[i - 1].style.backgroundColor = '#0ff';
      }
      nodearr[i].style.backgroundColor = '#ff0';
    }
    i++;
  }, 500);
}

// 清除添加的样式
function clearstyle () {
  if (nodearr.length) {
    clearInterval(timer);// 取消定时执行的timer,以便能随时开启另外一种遍历而不会存在上一次的timer的干扰
    for (var i = 0; i < nodearr.length; i++) {
      nodearr[i].style.backgroundColor = '#fff';
    }
    nodearr = [];// 清除上一次点击的样式改变
  } else {
    document.querySelectorAll('div').forEach(function (item) {
      item.style.backgroundColor = '#fff';
    })
  }
}

// 将各个阶段的事件写在一起方便监听
function init (e) {
  clearstyle();
  e = e || window.e
  let target = e.target || e.srcElement;
  switch (target.id) {
    case 'lf-re':
      mylfre(myroot)
      break;
    case 'ff-re':
      myffre(myroot)
      break;
  }
  change_style();
}

// 各个btn的监听事件:
window.onload = function () {
  $id('lf-re').addEventListener('click', init);
  $id('ff-re').addEventListener('click', init);
  $id('clear').addEventListener('click', clearstyle);

  $id('add-ele').onclick = function () {
    addele();
  }
  $id('del-ele').onclick = function () {
    delele();
  }
}
