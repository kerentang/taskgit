'use strict'

function Observer(data){
	//暂时不考虑数组
    this.data=data;
    this.walk(data);
    this.eventsBus=new Event();
}

let pro=Observer.prototype;

pro.walk=function(obj){
    let val;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            val=obj[key];
            //遍历嵌套层的数据
            if(typeof val ==='object'){
                new Observer(val);
            } 
            this.convert(key,val);
        }
    }
};

pro.convert=function(key,val){
	let _this=this;
	Object.defineProperty(this.data,key,{
		enumerable:true,
		configurable:true,
		get:function(){
		    console.log('你访问了'+key);
		    return val;
		},
		set:function(newVal){
		    console.log('你设置了'+key);
		    console.log('新的'+key+'='+newVal);
		    //$watch函数
		    _this.eventsBus.emit(key,val,newVal);
		    if(newVal===val){
		        return;
		    }
		    val=newVal;
		    //如果传入的newval是对象
		    if(typeof newVal ==='object'){
                new Observer(Val);
		    }
		}
	})
};

pro.$watch=function(attr,callback){
    this.eventsBus.on(attr,callback);
}

function Event(){
	this.events={};
}

Event.prototype.on=function(attr,callback) {
	if(this.events[attr]){
        this.events[attr].push(callback);
	}else{
        this.events[attr]=[callback];
	}
}

Event.prototype.off=function (attr) {
	for(let key in this.events){
        if(this.events.hasOwnProperty(key) && key===attr){
        	delete this.events[key];
        }
	}
}

Event.prototype.emit=function(attr,...arg){
    this.events[attr] && this.events[attr].forEach(function(item){
    	item(...arg);
    })
}

let app=new Observer({
    name:'keren',
    age:'18'
});

app.$watch('age',function(oldVal,newVal){
    console.log(`我的年龄现在是：${newVal},之前是${oldVal}`);
});

app.$watch('age',function(oldVal,newVal){
	console.log(`我的年龄变大了，现在竟然有${newVal}岁了诶`);
});

app.data.age=26;
		