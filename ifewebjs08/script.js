'use strict'
//获取dom节点-id
function $id (id) {
	return document.getElementById(id);
}

//获取各节点
var myroot=$id('root');//获取dom树的根节点
var myinput=$id('input-text');//获取输入框的节点，输入框的值为myinput.value;

var timer=null;//初始化定时器
var nodearr=[];//定义一个空数组用来保存节点

//遍历操作-广度优先／深度优先；
//广度优先-递归;
function mylfre(node){
	if(node!==null){
        if(node.children.length >0){
            for(var i=0;i<node.children.length;i++){
                var child=node.children[i];
                mylfre(child);
            }
            nodearr.push(node);
        }
        else{nodearr.push(node);}
    }
}


//深度优先-递归;:children[0]==textNode,注意！所以不能用firsrElementChild,要用children[1],
//后面要查看第一项子节点的内容所以还是从0开始。。。
function myffre (node) {
	if(node!==null){
    	nodearr.push(node);
    	if(node.children.length>0){
    		var child=node.children[0];
            for(var i=0;i<node.children.length;i++){
                myffre(child);
                child=child.nextElementSibling;
    	    }
    	}
    }
    return nodearr;
}

//遍历第一项子节点是否存在在节点数组中
//查询函数
function myquery(node){
    clearstyle();
    var inputtext=myinput.value.trim().toString(),j=0;
    myffre(node);
    timer=setInterval(function() {
        if(j>nodearr.length-1){
            clearInterval(timer);
            nodearr[nodearr.length-1].style.backgroundColor='#0ff';
            return;
        }else if(j<nodearr.length){
            if(j>0){
                if(nodearr[j].innerHTML==inputtext){
                    nodearr[j].style.color='#f00';
                }
                nodearr[j-1].style.backgroundColor='#0ff';
            }
            nodearr[j].style.backgroundColor='#ff0';
        };
        j++;
    },500);
}

//change_style()给遍历的节点添加额外的样式背景颜色变成黄色
function change_style () {
	var i=0;
    timer=setInterval(function() {
		if(i>nodearr.length-1){
			clearInterval(timer);
			nodearr[nodearr.length-1].style.backgroundColor='#0ff';
			return;
		}else if(i<nodearr.length){
		    if(i>0){
		       nodearr[i-1].style.backgroundColor='#0ff';
		    }
			nodearr[i].style.backgroundColor='#ff0';
		}
		i++;
	},500);
}

//清除添加的样式
function clearstyle(){
	clearInterval(timer);//取消定时执行的timer,以便能随时开启另外一种遍历而不会存在上一次的timer的干扰
    for(var i=0;i<nodearr.length;i++){
    	nodearr[i].style.backgroundColor='#fff';
        nodearr[i].style.color='#000';
    }
    nodearr=[];//清除上一次点击的样式改变
}

//将各个阶段的事件写在一起方便监听
function init(e){
	clearstyle();
    var e=e || window.e,target=e.target || e.srcElement;
    switch(target.id){
        case 'lf-re':
            mylfre(myroot)
            break;
        case 'ff-re':
            myffre(myroot)
            break;
    }
	change_style();
}


//各个btn的监听事件:
window.onload=function(){
	$id('lf-re').addEventListener('click',init);
	$id('ff-re').addEventListener('click',init);
	//查询
	$id('query').onclick=function(){
        myquery(myroot);
    }
}