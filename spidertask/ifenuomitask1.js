'use strict'
var webPage=require('webpage');
var page=webPage.create();
var url='https://www.baidu.com/s?wd=';
var system=require('system');
var keyword=system.args[1];
var mydata={};
var st=Date.now();

console.log('输入的关键词是：'+keyword);


if(system.args.length===1){
 	console.log('请先输入搜索关键词如：maid!');
 	phantom.exit();//exit the program
}

//msg
// page.onConsoleMassage=function(msg){
// 	try{
//         console.log('Page title is '+msg);
// 	    mydata.msg=msg;
// 	}catch(e){
// 		return;
// 	}
// }



page.open(url+encodeURIComponent(keyword),function(status) {
	console.log('Status:'+status);
	if(status!=='success'){
		failedlink();
	}else{   
	  var dataList=page.evaluate(function(){
              var Lists=[],
                  results=document.querySelectorAll(".c-container"),
                  len=results.length;

              for(var i=0; i<len; i++){
                var item=results[i],
                      title=item.querySelector('.t>a'),
                      info=item.querySelector('.c-abstract') || item.querySelector('.c-span-last p:first-child') ,
                      link=item.querySelector('.c-showurl') || item.querySelector('.c-showurl-color'),
                      pic=item.querySelector('.c-img');

                  Lists.push({
                      title: title ? (title.textContent || '') : '',  //textContent可以获取该元素下的所有文本节点
                      info: info ? (info.textContent || '') : '',
                      link: link ? (link.textContent || '') : '',
                      pic: pic ? (pic.src || '') : ''
                  })
              }
             return Lists;
          })
	    successlink(dataList);
	    console.log(JSON.stringify(mydata,null,4));
	    phantom.exit();
    }
})

function successlink(d){
    mydata.code=1;
    mydata.msg='获取成功';
    mydata.word=keyword;
    mydata.time=Date.now()-st;
    mydata.dataList=d;
}
    // 获取失败函数
function failedlink(){
    mydata.code=0;
    mydata.msg='获取失败';
    mydata.word=keyword;
    mydata.time=Date.now()-st;
    mydata.dataList=[];
}
// page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',function(){ 
//       (page.evaluate(function(){
//             var dataList=$('#content_left .result.c-container').map(function(){
//             var info={};
//             info.title=$(this).find('.t').text() || '';
//             info.link=$(this).find('.t > a').attr('src') || '';
//             info.abstract=$(this).find('.c-abstract').text() || '';
//             info.pic=$(this).find('.general_image_pic img').attr('src') || '';
//             return info;            
//             }).toArray();
//       })
//       )
//     })


