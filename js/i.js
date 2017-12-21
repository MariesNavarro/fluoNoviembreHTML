var ge1doot=ge1doot||{screen:{elem:null,callback:null,ctx:null,width:0,height:0,left:0,top:0,init:function(id,callback,initRes){this.elem=document.getElementById(id);this.callback=callback||null;if(this.elem.tagName=="CANVAS")this.ctx=this.elem.getContext("2d");window.addEventListener('resize',function(){this.resize();}.bind(this),false);this.elem.onselectstart=function(){return false;}
this.elem.ondrag=function(){return false;}
initRes&&this.resize();return this;},resize:function(){var o=this.elem;this.width=o.offsetWidth;this.height=o.offsetHeight;for(this.left=0,this.top=0;o!=null;o=o.offsetParent){this.left+=o.offsetLeft;this.top+=o.offsetTop;}
if(this.ctx){this.elem.width=this.width;this.elem.height=this.height;}
this.callback&&this.callback();},pointer:{screen:null,elem:null,callback:null,pos:{x:0,y:0},mov:{x:0,y:0},drag:{x:0,y:0},start:{x:0,y:0},end:{x:0,y:0},active:false,touch:false,down:function(e,touch){this.touch=touch;e.preventDefault();var pointer=touch?e.touches[0]:e;(!touch&&document.setCapture)&&document.setCapture();this.pos.x=this.start.x=pointer.clientX-this.screen.left;this.pos.y=this.start.y=pointer.clientY-this.screen.top;this.active=true;this.callback.down&&this.callback.down();},up:function(e,touch){this.touch=touch;e.preventDefault();(!touch&&document.releaseCapture)&&document.releaseCapture();this.end.x=this.drag.x;this.end.y=this.drag.y;this.active=false;this.callback.up&&this.callback.up();},move:function(e,touch){this.touch=touch;e.preventDefault();var pointer=touch?e.touches[0]:e;this.mov.x=pointer.clientX-this.screen.left;this.mov.y=pointer.clientY-this.screen.top;if(this.active){this.pos.x=this.mov.x;this.pos.y=this.mov.y;this.drag.x=this.end.x-(this.pos.x-this.start.x);this.drag.y=this.end.y-(this.pos.y-this.start.y);this.callback.move&&this.callback.move();}},init:function(callback){this.screen=ge1doot.screen;this.elem=this.screen.elem;this.callback=callback||{};if('ontouchstart'in window){this.elem.ontouchstart=function(e){this.down(e,true);}.bind(this);this.elem.ontouchmove=function(e){this.move(e,true);}.bind(this);this.elem.ontouchend=function(e){this.up(e,true);}.bind(this);this.elem.ontouchcancel=function(e){this.up(e,true);}.bind(this);}
document.addEventListener("mousedown",function(e){this.down(e,false);}.bind(this),true);document.addEventListener("mousemove",function(e){this.move(e,false);}.bind(this),true);document.addEventListener("mouseup",function(e){this.up(e,false);}.bind(this),true);return this;}},loadImages:function(container){var elem=document.getElementById(container),canvas=document.createElement('canvas'),ctx,init=false,complete=false,n=document.images.length;function arc(color,val,r){ctx.beginPath();ctx.moveTo(50,50);ctx.arc(50,50,r,0,val);ctx.fillStyle=color;ctx.fill();ctx.closePath();}
function load(){if(complete){canvas.style.display="none";return;}
var m=0,timer=32;for(var i=0;i<n;i++)m+=(document.images[i].complete)?1:0;if(m<n){if(!init){init=true;canvas.style.width=canvas.style.height="100px";canvas.width=canvas.height=100;canvas.style.position="fixed";canvas.style.left=canvas.style.top="50%";canvas.style.marginTop=canvas.style.marginLeft="-50px";canvas.style.zIndex=10000;ctx=canvas.getContext("2d");arc('rgb(64,64,64)',Math.PI*2,48);elem.appendChild(canvas);}
arc('rgb(255,255,255)',(m / n)*2*Math.PI,50);}else{if(init){arc('rgb(255,255,255)',2*Math.PI,50);timer=300;}
complete=true;}
setTimeout(load,timer);}
setTimeout(load,32);}}}
let lv0;let Point=function(x,y){this.x=x;this.y=y;this.magnitude=x*x+y*y;this.computed=0;this.force=0;}
Point.prototype.add=function(p){return new Point(this.x+p.x,this.y+p.y)}
var Ball=function(parent){this.vel=new Point((Math.random()>0.5?1:-1)*(0.2+Math.random()*0.25),(Math.random()>0.5?1:-1)*(0.2+Math.random()*1));this.pos=new Point(parent.width*0.2+Math.random()*parent.width*0.6,parent.height*0.2+Math.random()*parent.height*0.6);this.size=(parent.wh / 15)+Math.random()*(parent.wh / 15);this.width=parent.width;this.height=parent.height;}
Ball.prototype.move=function()
{if(pointer.active)
{var dx=pointer.pos.x-this.pos.x;var dy=pointer.pos.y-this.pos.y;var a=Math.atan2(dy,dx);var v=-Math.min(10,500 / Math.sqrt(dx*dx+dy*dy));this.pos=this.pos.add(new Point(Math.cos(a)*v,Math.sin(a)*v));}
if(this.pos.x>=this.width-this.size)
{if(this.vel.x>0)this.vel.x=-this.vel.x;this.pos.x=this.width-this.size;}
else if(this.pos.x<=this.size)
{if(this.vel.x<0)this.vel.x=-this.vel.x;this.pos.x=this.size;}
if(this.pos.y>=this.height-this.size)
{if(this.vel.y>0)this.vel.y=-this.vel.y;this.pos.y=this.height-this.size;}
else if(this.pos.y<=this.size)
{if(this.vel.y<0)this.vel.y=-this.vel.y;this.pos.y=this.size;}
this.pos=this.pos.add(this.vel);}
var LavaLamp=function(width,height,numBalls,c0,c1)
{this.step=10;this.width=width;this.height=height;this.wh=Math.min(width,height);this.sx=Math.floor(this.width / this.step);this.sy=Math.floor(this.height / this.step);this.paint=false;this.metaFill=createRadialGradient(width,height,width,c0,c1);this.plx=[0,0,1,0,1,1,1,1,1,1,0,1,0,0,0,0];this.ply=[0,0,0,0,0,0,1,0,0,1,1,1,0,1,0,1];this.mscases=[0,3,0,3,1,3,0,3,2,2,0,2,1,1,0];this.ix=[1,0,-1,0,0,1,0,-1,-1,0,1,0,0,1,1,0,0,0,1,1];this.grid=[];this.balls=[];this.iter=0;this.sign=1;for(var i=0;i<(this.sx+2)*(this.sy+2);i++)
{this.grid[i]=new Point((i%(this.sx+2))*this.step,(Math.floor(i /(this.sx+2)))*this.step)}
for(var i=0;i<numBalls;i++)
{this.balls[i]=new Ball(this);}}
LavaLamp.prototype.computeForce=function(x,y,idx)
{var force;var id=idx||x+y*(this.sx+2);if(x===0||y===0||x===this.sx||y===this.sy)
{var force=0.6*this.sign;}
else
{var cell=this.grid[id];var force=0;var i=0,ball;while(ball=this.balls[i++])
{force+=ball.size*ball.size /(-2*cell.x*ball.pos.x-2*cell.y*ball.pos.y+ball.pos.magnitude+cell.magnitude);}
force*=this.sign}
this.grid[id].force=force;return force;}
LavaLamp.prototype.marchingSquares=function(next)
{var x=next[0];var y=next[1];var pdir=next[2];var id=x+y*(this.sx+2);if(this.grid[id].computed===this.iter)return false;var dir,mscase=0;for(var i=0;i<4;i++)
{var idn=(x+this.ix[i+12])+(y+this.ix[i+16])*(this.sx+2);var force=this.grid[idn].force;if((force>0&&this.sign<0)||(force<0&&this.sign>0)||!force)
{force=this.computeForce(x+this.ix[i+12],y+this.ix[i+16],idn);}
if(Math.abs(force)>1)mscase+=Math.pow(2,i);}
if(mscase===15)
{return[x,y-1,false];}
else
{if(mscase===5)dir=(pdir===2)?3:1;else if(mscase===10)dir=(pdir===3)?0:2;else
{dir=this.mscases[mscase];this.grid[id].computed=this.iter;}
var ix=this.step /(Math.abs(Math.abs(this.grid[(x+this.plx[4*dir+2])+(y+this.ply[4*dir+2])*(this.sx+2)].force)-1)/
Math.abs(Math.abs(this.grid[(x+this.plx[4*dir+3])+(y+this.ply[4*dir+3])*(this.sx+2)].force)-1)+1);ctx.lineTo(this.grid[(x+this.plx[4*dir+0])+(y+this.ply[4*dir+0])*(this.sx+2)].x+this.ix[dir]*ix,this.grid[(x+this.plx[4*dir+1])+(y+this.ply[4*dir+1])*(this.sx+2)].y+this.ix[dir+4]*ix);this.paint=true;return[x+this.ix[dir+4],y+this.ix[dir+8],dir];}}
LavaLamp.prototype.renderMetaballs=function()
{var i=0,ball;while(ball=this.balls[i++])ball.move();this.iter++;this.sign=-this.sign;this.paint=false;ctx.fillStyle=this.metaFill;ctx.beginPath();i=0;ctx.shadowBlur=50;ctx.shadowColor="black";while(ball=this.balls[i++])
{var next=[Math.round(ball.pos.x / this.step),Math.round(ball.pos.y / this.step),false];do{next=this.marchingSquares(next);}while(next);if(this.paint)
{ctx.fill();ctx.closePath();ctx.beginPath();this.paint=false;}}}
var createRadialGradient=function(w,h,r,c0,c1)
{var gradient=ctx.createRadialGradient(w / 2,h / 2,0,w / 2,h / 2,r);gradient.addColorStop(0,c0);gradient.addColorStop(1,c1);return gradient;}
var run=function(c1,c2)
{requestAnimationFrame(run);ctx.clearRect(0,0,screen.width,screen.height);lv0.renderMetaballs();}
var screen=ge1doot.screen.init("screen",null,true),ctx=screen.ctx,pointer=screen.pointer.init();screen.resize();lv0=new LavaLamp(screen.width,screen.height,10,cyan,magenta);run();