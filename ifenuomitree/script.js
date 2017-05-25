'use strict'
//get node by id
function $id (id) {
	return document.getElementById(id);
}
//get node by element
function $dom (node) {
	return document.querySelectorAll(node);
}

//存储各节点数据：nodes=[{},{},...];
//渲染数据到左边列表div+li>a
//没有展开时三角形图标朝右
//展开时三角形图标朝下：background-image旋转90度
//点击一次只渲染一层子节点
//渲染子节点时同时添加三角形和图标，有子节点时是文件夹图标，没有子节点是文档图标
//同时渲染child到右边:li,display='block',flex布局
//再次点击该节点时-有子节点：展开->未展开；未展开->展开
//没有子节点：状态不变；
var nodes=[{
    name:'父节点1',
    children:[
        {name:'父节点11',children:[{name:'子节点1'},{name:'子节点1'},{name:'子节点1'},{name:'子节点1'},{name:'子节点1'},{name:'子节点1'}]},
        {name:'父节点12',children:[{name:'子节点1'},{name:'子节点1'},{name:'子节点1'}]},
        {name:'父节点13',children:[{name:'子节点1'},{name:'子节点1'},{name:'子节点1'},{name:'子节点1'}]},
        {name:'父节点14',children:[{name:'子节点1'},{name:'子节点1'}]}]
},{
	name:'父节点2',
    children:[
        {name:'父节点21',children:[{name:'子节点2'},{name:'子节点2'},{name:'子节点2'},{name:'子节点2'}]},
        {name:'父节点22',children:[{name:'子节点2'},{name:'子节点2'},{name:'子节点2'}]}]
}];

//创建节点：ul>li+div
function createul(){
	var oul=document.createElement('ul');
	oul.setAttribute('class','node');//node的class包含伪元素，写成两个：展开和未展开的
	return oul;
}
function createli(nd){
	var oli=document.createElement('li');
	oli.innerHTML=nd;
	return oli;
}
function creatediv(nd){
    var odiv=document.createElement('div');
    odiv.setAttribute('class','tree');
    odiv.innerHTML=nd;
    return odiv;
}
//展开第一层节点
function shownd (nodes) {
	
}
















