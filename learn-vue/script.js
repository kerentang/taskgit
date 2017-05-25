class MVVM{
	constructor(options){
		if(options.root){
            this.$root=document.querySelector(options.root);
		}
		if(options.data){
            this.$data=document.querySelector(options.data);
		}
		this.$mapping={
			'v-text':this.vText
		}
		this.$registers={};
		//扫描标签
		this.scan();
		//绑定观察者
		this.attach();
	};
	scan(){
		if(this.$root){
            for(let i=0;i<this.$root.children.length;i++){
                let element=this.$root.children[i];

                if(element.hasAttribute()>0){
                    for(let j of element.attributes){
                    	if(this.$mapping[j.name]){
                            this.$mapping[j.name].call(this,element,j.value)
                    	}  
                    }
                }
            }
		}
	};
	//标签处理函数
	vText(element,model){
        //初始化视图的绑定
        if(element.tagName==='INPUT'){
        	element.value=this.$data[model];
        	element.addEventListener('input',()=>{
                this.$data[model]=element.value;
        	});
        }else{
        	element.innerText=this.$data[model];
        }

        //绑定监视器
        this.register(model,(newVal) => {
            (element.tagName==='INPUT' ? element.value=newVal:element.innerText=newVal);
        });
	};
	//观察者函数:
	observe(path,callbackQueue){
        let lastValue=this.$data[path];

        Object.defineProperty(this.$data,path,{
        	get: () => {
        		return lastValue;
        	},
            set: (newVal) => {
                if(newVal !==lastValue){
                    callbackQueue.forEach((callback) => {
                        if(Object.prototype.toString.call(callback)==='[object Function]'){
                            callback.call(this,newVal);
                        }
                    });
                    lastValue=newVal;
                }
            },
            enumerable:true,
            configurable:true
        });
	};
	//注册函数
	register(path,callback){
        if(Object.prototype.toString.call(this.$registers[path])==='[object Array]'){
            this.$registers[path].push(callback);
        }else{
        	this.$registers[path]=[callback];
        }
	};
    //绑定函数
    attach(){
    	for(let register in this.$registers){
            this.observe(register,this.$registers[register]);
    	}
    };
}
let app = new MVVM({
    root:'#app',
    data:{
        text:'一段文字'
    }
});

document.querySelector('#app button').addEventListener('click',() => {
    app.$data.text = '另一段文字';
});
 //通过调用一个非immurable的方法来监听一个数组的改变
// function  observeArray(arr,callbackQueue){
// 	//观察的方法
// 	const mutatorMethods=['pop','push','reverse'];
//     const arrayProto=Array.prototype;

//     //防止污染Array的原型
//     const hijackProto=Object.create(arrayProto);

//     mutatorMethods.forEach((method) => {
//         Object.defineProperty(hijackProto,method,{
//             enumerable:true,
//             configurable:true,
//             writable:true,
//             value: (... args) => {
//                 //创建一个新数组
//                 let yetVal=arr.slice();
//                 //调用对应的函数
//                 let resultVal=arrayProto[method].call(arr,args);
//                 //新的值
//                 let nowVal=arr;
//             }
//         })
//     })
//     arr.__proto__=hijackProto;
//     //arr.__proto__.__proto__===Array.prototype;//true;
// }