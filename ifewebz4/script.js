var c=document.getElementById('ui-layer');
	var ctx=c.getContext('2d');
	var iwidth=c.width,iheight=c.height;
	ctx.font = "14px serif";
	//画出背景格子
	function drawgrid(){
	    //row
	    for(var i=1;i<12;i++){
            ctx.moveTo(40,40*i);
            ctx.lineTo(iwidth-40,40*i);
            ctx.closePath();//闭合路径
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#333';
            ctx.stroke();
	    }
	    //column
	    for(var j=1;j<12;j++){
            ctx.moveTo(40*j,40);
            ctx.lineTo(40*j,iheight-40);
            ctx.closePath();//闭合路径
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#333';
            ctx.stroke();
	    }
	    //num
        ctx.fillStyle = '#333';
        //row-num
	    for(var i=1;i<11;i++){
            ctx.moveTo(20+40*i,30);
            ctx.fillText(i, 16+40*i, 30);
	    }
	    //column-num
	    for(var j=1;j<11;j++){
            ctx.moveTo(20,25+40*j);
            ctx.fillText(j, 20, 25+40*j);
	    }
	}
    function $id(id){
        return document.getElementById(id);
    }
    var cx=document.getElementById('box');
    var cax=cx.getContext('2d');
	var bwidth=cx.width,bheight=cx.height;
    var raf;
	//画个三角形，箭头朝向右边，方便第一次移动
	//三角形的方向由四组数据确定：左边第一位数字：0-row,1-col;第二位数字:0-left,1-right;
	//所以01-水平朝右；00-水平朝左；10-垂直向上；11-垂直向下
	//（x,y）用来
	var triangle={
	    x0:0,
	    y0:0,
	    vx:40,
	    vy:40,
        color:'#ff0',
        direct:1,
        draw:function(){
        cax.beginPath();
	    cax.moveTo(this.x0,this.y0);
	    cax.lineTo(this.x0,this.y0+40);
	    cax.lineTo(this.x0+40,this.y0+20);
	    cax.lineTo(this.x0,this.y0);
	    cax.lineWidth=2;
	    cax.fillStyle=this.color;
	    cax.closePath();
	    cax.fill();
          }
       }
    triangle.draw();
    var direct;
    function drawrow(direct){       
        triangle.x0=triangle.x0+triangle.vx*direct;
        triangle.y0=triangle.y0;
        if((triangle.x0+triangle.vx)>bwidth || (triangle.x0+triangle.vx)<0){
            triangle.x0=0;
        };
        triangle.draw();
    }
    function drawcol(direct){
    	//cax.clearRect(0,0, bwidth, bheight); 
        //triangle.draw();
        triangle.x0=triangle.x0;        
        triangle.y0=triangle.y0+triangle.vy*direct;
        if((triangle.y0+triangle.vy)<0 || (triangle.y0+triangle.vy)>bheight){
            triangle.y0=0;
        }
        triangle.draw();
        //raf = window.requestAnimationFrame(drawrow);
     }
	// function turn(){
 //        cax.clearRect(0,0,bwidth,bheight);
 //        cax.save();
      
 //        cax.restore();
	// }
    function init(e){
    	e=e || window.e,target=e.target || e.srcElement;
        cax.clearRect(0,0,bwidth,bheight);
        cax.save();
        switch(target.id){
        	case 'go':
        		drawrow(1);
        		break;
        	case 'back':
        		drawrow(-1);
        		break;
        	case 'up' :
        		drawcol(-1);
        		break;
        	case 'down' :
        		drawcol(1);
        		break;
        }
        cax.restore();
    }
    //左转
	//右转
	//向后转
    window.onload=function(){
    	drawgrid();
        $id('go').addEventListener('click',init);
        $id('back').addEventListener('click',init);
         $id('up').addEventListener('click',init);
        $id('down').addEventListener('click',init);
    }
	

 //    window.onload=function(){
	//     document.getElementById('GO').addEventListener('click',init);
 //    }