'use strict'
// 获取dom节点-id
function $id (id) {
  return document.getElementById(id);
}
var myroot = $id('root');// 获取dom树的根节点
var timer = null;// 初始化定时器
// 前序中序后序遍历的函数，利用栈（数组nodearr）来保存dom树和子树的根节点,递归遍历
// 前序
var nodearr = [];
function dlrtraver (node) {
  if (!(node == null)) {
    nodearr.push(node);
    dlrtraver(node.firstElementChild);
    dlrtraver(node.lastElementChild);
  }
  return nodearr;
}
// 中序
function ldrtraver (node) {
  if (!(node == null)) {
    ldrtraver(node.firstElementChild);
    nodearr.push(node);
    ldrtraver(node.lastElementChild);
  }
  return nodearr;
}
// 后序
function lrdtraver (node) {
  if (!(node == null)) {
    lrdtraver(node.firstElementChild);
    lrdtraver(node.lastElementChild);
    nodearr.push(node);
  }
  return nodearr;
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
    ++i;
  }, 1000);
}
// 清除添加的样式
function clearstyle () {
  clearInterval(timer);// 取消定时执行的timer,以便能随时开启另外一种遍历而不会存在上一次的timer的干扰
  for (var i = 0; i < nodearr.length; i++) {
    nodearr[i].style.backgroundColor = '#fff';
  }
  nodearr = [];// 清除上一次点击的样式改变
}
// 将各个阶段的事件写在一起方便监听
function init (e) {
  clearstyle();
  e = e || window.e
  let target = e.target || e.srcElement;
  switch (target.id) {
    case 'dlr':
      dlrtraver($id('root'))
      break;
    case 'ldr':
      ldrtraver($id('root'));
      break;
    case 'lrd':
      lrdtraver($id('root'));
      break;
  }
  change_style();
}
// 各个btn的监听事件
window.onload = function () {
  $id('dlr').addEventListener('click', init);
  $id('ldr').addEventListener('click', init);
  $id('lrd').addEventListener('click', init);
}
