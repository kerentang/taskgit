var c = document.getElementById('ui-layer')
var ctx = c.getContext('2d')
var iwidth = c.width
var iheight = c.height
ctx.font = '14px serif'
// 画出背景格子
function drawgrid () {
// row
  for (var i = 1; i < 12; i++) {
    ctx.moveTo(40, 40 * i)
    ctx.lineTo(iwidth - 40, 40 * i)
    ctx.closePath()// 闭合路径
    ctx.lineWidth = 1
    ctx.strokeStyle = '#333'
    ctx.stroke()
  }
  // column
  for (var j = 1; j < 12; j++) {
    ctx.moveTo(40 * j, 40)
    ctx.lineTo(40 * j, iheight - 40)
    ctx.closePath()// 闭合路径
    ctx.lineWidth = 1
    ctx.strokeStyle = '#333'
    ctx.stroke()
  }
  // num
  ctx.fillStyle = '#333'
        // row-num
  for (var i = 1; i < 11; i++) {
    ctx.moveTo(20 + 40 * i, 30)
    ctx.fillText(i, 16 + 40 * i, 30)
  }
  // column-num
  for (var j = 1; j < 11; j++) {
    ctx.moveTo(20, 25 + 40 * j)
    ctx.fillText(j, 20, 25 + 40 * j)
  }
}
function $id (id) {
  return document.getElementById(id)
}
var cx = document.getElementById('box')
var cax = cx.getContext('2d')
cax.fillStyle = '#f00'
var bwidth = cx.width
var bheight = cx.height
var raf
// 画个三角形，箭头朝向右边，方便第一次移动
// 三角形的方向由四组数据确定：左边第一位数字：0-row,1-col;第二位数字:0-left,1-right;
// 所以01-水平朝右；00-水平朝左；10-垂直向上；11-垂直向下
// （x,y）用来
var recangle = {
  x0: 20,
  y0: 20,
  vx: 40,
  vy: 40,
  color: '#ff0',
  draw: function () {
    cax.fillRect(this.x0 - 20, this.y0 - 20, 40, 40)
    cax.fillStyle = '#ff0'
    cax.fillRect(this.x0 - 20, this.y0 - 20, 30, 40)
    cax.fillStyle = '#f00'
  }
}
recangle.draw()
var direct
function drawrow (direct) {
  recangle.x0 = recangle.x0 + recangle.vx * direct
  recangle.y0 = recangle.y0
  if ((recangle.x0 + recangle.vx) > bwidth + 20 || (recangle.x0 + recangle.vx) < 0) {
    recangle.x0 = 20
  };
  recangle.draw()
}
function drawcol (direct) {
  // cax.clearRect(0,0, bwidth, bheight);
  // recangle.draw();
  recangle.x0 = recangle.x0
  recangle.y0 = recangle.y0 + recangle.vy * direct
  if ((recangle.y0 + recangle.vy) < 0 || (recangle.y0 + recangle.vy) > bheight + 20) {
    recangle.y0 = 20
  }
  recangle.draw()
        // raf = window.requestAnimationFrame(drawrow);
}
 // function turn(){
 //        cax.clearRect(0,0,bwidth,bheight);
 //        cax.save();

 //        cax.restore();
 // }
function init (e) {
  e = e || window.e
  var target = e.target || e.srcElement
  cax.clearRect(0, 0, bwidth, bheight)
  cax.save()
  switch (target.id) {
    case 'go':
      drawrow(1)
      break
    case 'back':
      cax.fillRect(this.x0 - 20, this.y0 - 20, 10, 40)
      drawrow(-1)
      break
    case 'up' :
      cax.fillRect(this.x0 - 20, this.y0 - 20, 30, 40)
      drawcol(-1)
      break
    case 'down' :
      drawcol(1)
      break
  }
  cax.restore()
}
    // 左转
// 右转
// 向后转

function turn () {
  recangle.draw()
  cax.clearRect(0, 0, bwidth + 20, bheight + 20)
  cax.translate(recangle.x0, recangle.y0)
  cax.save()
  cax.rotate(Math.PI)
  recangle.draw()
  cax.restore()
}

window.onload = function () {
  drawgrid()
  $id('go').addEventListener('click', init)
  $id('back').addEventListener('click', init)
  $id('up').addEventListener('click', init)
  $id('down').addEventListener('click', init)
  $id('turnback').onclick = function () {
    turn()
  }
  // $id('turnback').onclick=function(){
  // cax.clearRect(0,0,bwidth+20,bheight+20);
  // cax.save();
  // turn();
  // cax.restore();
  // $id('go').addEventListener('click',init);
  // // $id('back').addEventListener('click',init);
  // }
}

 //    window.onload=function(){
 //      document.getElementById('GO').addEventListener('click',init);
 //    }
