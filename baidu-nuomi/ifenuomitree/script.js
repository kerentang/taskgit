'use strict'
// get node by id
function $id (id) {
  return document.getElementById(id);
}
// get node by element
function $dom (node) {
  return document.querySelector(node);
}

// 存储各节点数据：nodes=[{},{},...];
// 渲染数据到左边列表div+li
// 点击一次只渲染一层子节点
// 有子节点时是文件夹图标，没有子节点是文档图标
// 同时渲染child到右边:li,display='block',flex布局
// 再次点击该节点时-有子节点：展开->未展开；未展开->展开
// 没有子节点：状态不变；
var nodearr = [{
  name: '父节点1',
  children: [
        {name: '父节点11', children: [{name: '子节点1'}, {name: '子节点1'}, {name: '子节点1'}, {name: '子节点1'}, {name: '子节点1'}, {name: '子节点1'}]},
        {name: '父节点12', children: [{name: '子节点1'}, {name: '子节点1'}, {name: '子节点1'}]},
        {name: '父节点13', children: [{name: '子节点1'}, {name: '子节点1'}, {name: '子节点1'}, {name: '子节点1'}]},
        {name: '父节点14', children: [{name: '子节点1'}, {name: '子节点1'}]}]
}, {
  name: '父节点2',
  children: [
        {name: '父节点21', children: [{name: '子节点2'}, {name: '子节点2'}, {name: '子节点2'}, {name: '子节点2'}]},
        {name: '父节点22', children: [{name: '子节点2'}, {name: '子节点2'}, {name: '子节点2'}]}]
}];
// 渲染节点到文档中
let DOMTreeRender = (nodes, DOMNode) => {
  let str = '';

  (function insertNode (data) {
    if (data.length > 0) {
      data.map(item => {
        if (item.children) {
          str += `<div class="tree" ><div class="folder" onclick="toggleSlider(event)"><a class='folderclose a-block'></a><a class='folder-a' >${item.name}</a></div><div class='file hiden'>`;
          insertNode(item.children);
          str += '</div></div>';
        } else {
          str += `<div class="file"><a class='files a-block'></a><a class='folder-a'>${item.name}</a></div>`;
        }
      })
    }
  })(nodes);

  $dom(DOMNode).innerHTML = str;
};

function toggleSlider (event) {
  let folderIcon = event.target.previousSibling;
  let fileNode = event.target.parentNode.nextSibling;

  exchangeNodeStyle(folderIcon, 'folderclose', 'folderopen');// 文件夹打开关闭图标互换

  fileNode.classList.toggle('hiden');
}

function exchangeNodeStyle (node, preStyle, curStyle) {
  if (node.classList.contains(preStyle)) {
    node.classList.remove(preStyle);
    node.classList.add(curStyle)
  } else {
    node.classList.remove(curStyle);
    node.classList.add(preStyle)
  }
}

DOMTreeRender(nodearr, '#root');
