'use strict'
//1.获取左边输入框里的内容val=input
//2.拆成一行一行的；
//3.存入数组里，arr.shift出来每一项
//4.设置一个包含简单功能的匹配正则函数，对应输出正则
//5.渲染函数同时接受数组和正则表达式-输出对应的样式文件
var line_arr=[];

function toline(val){
    line_arr=val.split('\n');
    return line_arr;
}
var lennum=line_arr.length;
function patt_to_style(){
    var patts=[
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ]
    if(val.trim()!==''){
        for(var i=0;i<lennum;i++){
            var tempstr=line_arr[i];
            
        }
    }
}

function masks (val) {
	
}