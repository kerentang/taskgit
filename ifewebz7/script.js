'use strict'
//get dom by id
function $id(){

}
//get dom by nodeName
function $dom(){

}
// get dom
var;
//get input.value
var;
//get selectIndex text
var;
//use obj to save
var myobj={
	'小明':[80,90,70],
	'小红':[90,60,70],
	'小亮':[80,60,90],
	'小洲':[70,85,80],
	'小华':[81,92,76],
	'小敏':[66,73,89],
	'小菲':[88,87,86]
}
//myobj里现在只有3项数据，最后一项是前面三项之和，用一个函数来输出
function result(myobj){
	
}
function check (myobj) {
	if(myobj.length!==0){

	}else{
		alert('表格中无数据请先添加！');
	}
}
//sort up （default）
function sort_up(myobj){

}
//sort down
function sort_down (myobj) {
	
}

//delete
function delerow (myobj) {
	// 删除之前先检查一下table的children
	check(myobj);

}
//insert one line
var myarr=[];
function checkinput (str) {
	if(str){
        var strarr=str.split('/[,， ；]/');
        myarr.concat(strarr);
        return myarr;
	}else{
		return myobj;
	}
}
function user_input(myarr){
	myobj[name]=myarr;
}
//render to dom：1.createElement;2.appendChild()
function createtr () {
	//td,tr.appendChild(td),td.innerHTML=myobj[i]
	var otr;
	return otr;
}
function render(myobj){
    //table.appendChild(otr)
}
//统一处理函数-代理
function init(e){
	var e=e || window.e ,target=e.target || e.srcElement;
	switch(target.id){
        case 'up':
        	sort_up(myobj)
        	break;
        case 'down':
        	sort_down (myobj)
        	break;
        case 'dele':
        	delerow (myobj)
        	break;
        case 'myadd':
        	break;
	}
    render(myobj);
}
//addEventListener
window.onload=function(){
	$id('btns').addEventListener('click',init);
}