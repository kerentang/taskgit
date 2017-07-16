'use strict'
function Observer(data){
	this.data=data;
	this.dep=new Dep();

	if(Array.isArray(data)){
    //暂不考虑数组
	}else{
        this.walk(data);
	}
}

let p=Observer.prototype;

p.walk=function(obj){
	let val;
	for(let key in obj){
		if(obj.hasOwnProperty(key)){
            val=obj[key];
            if(typeof val ==='object'){
            	new Observer(val)
            }
		}
		this.convert(key,val);
	}
}

p.convert=function(key,val){
	let dep=new Dep();
	if(typeof val==='object'){
        var childOb=new Observer(val);
	}

    Object.defineProperty(this.data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            console.log('你访问了'+key);

            if(Dep.target){
            	dep.depend();
            	if(childOb){
            		childOb.dep.depend();
            	}
            }
            return val;
        },
        set:function (newVal) {
        	console.log('你设置了'+key);
        	console.log('新的'+key+'='+newVal);

        	if(newVal===val){
        		return;
        	}
        	val=newVal;

        	if(typeof val ==='object'){
        		childOb=new Observer(val);
        	}

        	dep.notify();
        }
    })
}

p.$watch=function (attr,callback) {
	//this.eventsBus.on(attr,callback);
	for(let key in this.data){
		if(this.data.hasOwnProperty(key) && typeof this.data[key]==='object'){
			this.data[key].__ob__.eventsBus.on(attr,callback);
		}
	}
}

//观察者
function Dep () {
	this.subs=[];
}
Dep.target=null;

Dep.prototype.depend=function(){
	Dep.target.addDep(this);
}

Dep.prototype.addSub=function (sub) {
	this.subs.push(sub);
}

Dep.prototype.notify=function () {
    for(let i=0,len=this.subs.length;i<len;i++){
        this.subs[i].update();
    }
}


//watcher
function Watcher(value,attr){
    this.value=value;
    this.attr=attr;
    this.get();
}

Watcher.prototype.beforeGet=function(){
    Dep.target=this;
};

Watcher.prototype.get=function () {
    this.beforeGet();
    let val=this.value[this.attr];
    if(typeof val==='object'){
        for(let childAttr in val){
            new Watcher(val[childAttr],childAttr);
        }
    }
}

Watcher.prototype.addDep=function (dep) {
    dep.addSub(this);
    console.log('我订阅了传入参数的变化');
}

Watcher.prototype.update=function () {
    console.log('name或者age变化了，导致data变了');
}

let app=new Observer({
    basicinfo:{
        name:'lifeng',
        age:18
    },
    address:'beijing'
});
let watcher=new Watcher(app.data,'basicinfo');
app.data.basicinfo=24;
