'use strict'

//简化获取节点的函数-by id
function $id(id){
	return document.getElementById(id);
}
//获取节点 by nodeName
function $dom (mydom) {
	return document.querySelectorAll(mydom);
}

//获取dom节点
var i_input=$id('input-text'),
    i_psd1=$id('psd1'),
    i_psd2=$id('psd2'),
    i_mail=$id('mail'),
    i_phone=$id('phone-num'),
    m_box=$id('box'),
    b_submit=$id('submit');
var ps=$dom('p'),
    inputs=$dom('input');

//设置一个result，为后面判断submit的onclick事件;
var result;
//p的各种提示信息
function msg_of_notice (mystatus,mystate,cur_input){
    cur_input.nextElementSibling.style.display='block';
    if(mystatus=='oblur'){
        if(mystate){
            switch(cur_input.id){
                case 'input-text':
                  cur_input.nextElementSibling.innerHTML='名称格式正确'
                  break;
                case 'psd1':
                  cur_input.nextElementSibling.innerHTML='密码可用'
                  break;
                case 'psd2':
                  cur_input.nextElementSibling.innerHTML='再次输入密码正确'
                  break;
                case 'mail':
                  cur_input.nextElementSibling.innerHTML='邮箱可用'
                  break;
                case 'phone-num':
                  cur_input.nextElementSibling.innerHTML='电话号码可用'
                  break;
            }
            cur_input.nextElementSibling.style.color='#0f0';
        }else{
            cur_input.nextElementSibling.innerHTML='输入格式不正确，请重新输入！';
            cur_input.nextElementSibling.style.color='#f00';
        }
    }else if(mystatus=='ofocus'){
        if(mystate){
            switch(cur_input.id){
                case 'input-text':
                  cur_input.nextElementSibling.innerHTML='必填，长度为4-16个字符'
                  break;
                case 'psd1':
                  cur_input.nextElementSibling.innerHTML='必填，英文和数字组合，长度为6-18个'
                  break;
                case 'psd2':
                  cur_input.nextElementSibling.innerHTML='请再次填写密码'
                  break;
                case 'mail':
                  cur_input.nextElementSibling.innerHTML='必填，请填写邮箱的完整地址'
                  break;
                case 'phone-num':
                  cur_input.nextElementSibling.innerHTML='必填，请填写国内11位电话号码'
                  break;
            }
            cur_input.nextElementSibling.style.color='#999';
        }
    }
}

//input 获取焦点的代理事件:1.onfocus;2.显示p的样式;
var cur_input='';
function myfocus () {
	inputs.forEach(function(item) {
		item.onfocus=function(e) {
			var e=e || window.e,target=e.target || e.srcElement;
			this.style.boxShadow='0 0 5px #00f';
			this.style.borderColor='#00f';
            msg_of_notice ('ofocus',true,this);
            cur_input=this;
            return cur_input;
		}
	})
}
myfocus ();
//input 失去焦点的代理事件：1.onblur；2.获取长度；3.检查长度；4.检查输入是否合法；5.显示p的样式
//获取输入框内容的长度
function getlen (cur_input) {
	var templen=cur_input.value.trim().length;
        var i,len=0;
        for(i=0;i<templen;i++){
           if(cur_input.value.trim().charCodeAt(i)>=0 && cur_input.value.trim().charCodeAt(i)<=255){
               len=len+1;
           }else{len=len+2;}
        };
    return len;
}

//检查输入框的长度是否符合规定
function check_length (cur_input) {
	var mylen=getlen(cur_input);
    if(mylen>4 && mylen<16){
        alert(mylen);
        return mylen;
    }else{
        return false;
    }
}

//长度符合规定时检查输入是否合法：密码只能由数字和英文大小写字母组成；且任意输入框均不能含有空格；
function check_input(cur_input){
    if(check_length (cur_input)){
    	var myinput=cur_input.value.trim();
        var regtext=/[a-zA-Z0-9_\u4e00-\u9fa5]/g,regpsd=/[a-zA-Z0-9]/g,regs=/[\s]/g;
        if(cur_input.id=='psd1' || cur_input.id=='psd2'){
            //要获取下一个兄弟元素用nextsibling或者:after动态生成p,然后display=block;
            //要获取下一个input兄弟元素用伪元素或者伪态next[input]/input:
             if(regpsd.test(myinput) && !regs.test(myinput)){
                return myinput;
            }
            else{return false;}
        }else{
            if(regtext.test(myinput) && !regs.test(myinput)){
                return myinput;
            }else{return false;}
        }
    }
}

//失去焦点的函数-通过检查输入框内容的长度和字符是否合法-相应改变输入框的样式和p的样式以及提示词
function myblur () {
    inputs.forEach(function(item) {
        item.onblur=function(e) {
            var e=e || window.e,target=e.target || e.srcElement;
                if(check_input(this)){
                    this.style.boxShadow='none';
                    this.style.borderColor='#0f0';
                    msg_of_notice ('oblur',true,this);
                    result=true;
                    return true;
                }
                else{
                    this.style.boxShadow='none';
                    this.style.borderColor='#f00';
                    msg_of_notice ('oblur',false,this);
                    result=false;
                    return false;
                }
        }
    });
     result=result && true;
}


//button的提交校验事件:弹窗校验result的boolean值：
//true->校验成功-提交；
//false->失败-设置一个onchange事件判断是否修改？重新自动提交：则禁止提交
function mysubmit (result) {
    if(result){
        alert('提交成功！');
        return true;
    }else{
        alert('提交失败！请按照提示重新填写！')
        return false;
    }
}



//网页加载完毕后再执行函数-监听事件函数
window.onload=function(){
    $id('box').addEventListener('click',myfocus);
    $id('box').addEventListener('click',myblur);
    $id('submit').onclick=function(){
        mysubmit(result);
    }
}