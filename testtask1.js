// 声明变量
var webPage=require('webpage'),
    page=webPage.create(),
    system=require('system'),
    url='https://www.baidu.com/s?wd=',  //搜索url
    query=system.args[1],   //phantomjs中规定args数组中的第一个参数是文件名
    res={},
    t=Date.now();


console.log('输入的关键词是：'+query);

if(query===undefined){
    console.log('请先输入关键词');
    phantom.exit();  //如果没有这个结束语，phantomjs不会自行结束
}

//打开url进行抓取，encodeURIComponent是对字符串进行编码。
//open的第二个参数往往是回调函数，s表示获取url的结果，有sucess和fail两种结果
page.open(url+encodeURIComponent(query),function(s){
    if(s!=='success'){
        captureFailed();
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

        captureSuccess(dataList);
        console.log(JSON.stringify(res,null,4));  //JSON回显函数
        phantom.exit();
    }
})

    //获取成功函数
function captureSuccess(d){
    res.code=1;
    res.msg='获取成功';
    res.word=query;
    res.time=Date.now()-t;
    res.dataList=d;
}
    // 获取失败函数
function captureFailed(){
    res.code=0;
    res.msg='获取失败';
    res.word=query;
    res.time=Date.now()-t;
    res.dataList=[];
}
