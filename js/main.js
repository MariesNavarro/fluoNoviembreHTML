"use strict";
var checkBowser = false;
if(bowser.mobile || bowser.tablet || /SymbianOS/.test(window.navigator.userAgent)) checkBowser = true;

window.console.log("%cCoded by Mn - http://fluo.com.mx", "color:pink;  font-size: 10px; background:#000; padding:2px;");
    function _(el){return document.querySelector(el); }
    function __(el){return document.querySelectorAll(el); }
    loadingLogo();

function loadingHover(){
  function onAssetsLoaded(){
    var frames = [];
    for (var i = 0; i < 111; i++) {
        frames.push(PIXI.Texture.fromFrame('fluo_' + i + '.png'));
    }
    var anim = new PIXI.extras.AnimatedSprite(frames);
    anim.width = apphover.renderer.width;
    anim.height = apphover.renderer.height;
    anim.animationSpeed = 0.56;
    anim.alpha = 0.5;
    anim.play();
    apphover.stage.addChild(anim);
  }
}

function loadingLogo(){
  var app, apphover,
      logotipo = _('#logotipoMenu');
  app = new PIXI.Application(100, 100,{antialias: false, transparent: true, resolution: 1});
  logotipo.appendChild(app.view);
  apphover = new PIXI.Application(100, 100,{antialias: false, transparent: true, resolution: 1});
  logotipo.appendChild(apphover.view);
  PIXI.loader
  .add('img/pixi/logotipo_1.json')
  .add('img/pixi/logotipo_2.json')
  .add('img/pixi/logotipo_3.json')
  .add('img/pixi/hoverlogo_1.json')
  .add('img/pixi/hoverLogo_2.json')
  .load(onAssetsLoaded);
  function onAssetsLoaded(){
    var frames = [];
    var framesHover = [];
    for (var i = 0; i < 237; i++) {
        frames.push(PIXI.Texture.fromFrame('fluo_' + i + '.png'));
    }
    for (var i = 0; i < 134; i++) {
        framesHover.push(PIXI.Texture.fromFrame('fluoHover_' + i + '.png'));
    }
    var anim = new PIXI.extras.AnimatedSprite(frames);
    var animH = new PIXI.extras.AnimatedSprite(framesHover);
    anim.width = app.renderer.width;
		anim.height = app.renderer.height;
    animH.width = app.renderer.width;
		animH.height = app.renderer.height;
    anim.animationSpeed = 0.56;
    anim.play();
    animH.alpha = 0;
    animH.animationSpeed = 0.56;
    animH.interactive = true;
    animH.loop = false;
    animH.play();
    animH.mouseover = function(mouseData) {
      this.alpha = 1;
      setTimeout(function(){ anim.alpha = 0; },1600)
      this.gotoAndPlay(0);
    }
    animH.mouseout = function(mouseData) {
      this.alpha = 0;
      anim.alpha = 1;
      this.stop();
    }
    app.stage.addChild(anim);
    apphover.stage.addChild(animH);
  }
}

function checkForDevice(){
  var ph = _('#telefonofluo'),
      mn = _('#triggerMenu'),
      d = _('#desktopinnner');
  if(checkBowser){
    console.log("Mobile");
    d.classList.remove('showDisplayFlex');
    d.classList.add('hideDisplay');
    mn.setAttribute('onclick', 'mainMenuMob("open")');
    ph.setAttribute('href', 'tel:57303009');
  } else {
    console.log("Desktop");
    d.setAttribute('onmouseover', 'mainMenuDes("over")');
    d.setAttribute('onmouseout', 'mainMenuDes("out")');
    mn.setAttribute('onmouseover', 'mainMenuDes("over")');
    mn.setAttribute('onmouseout', 'mainMenuDes("out")');
    ph.setAttribute('onclick', 'phonePop("open")');
    ph.setAttribute('title', 'Ver teléfono y horarios')
  }
}

function mainMenuMob(c){
  var wr = _('#mobileinner');
  if(c === 'open'){
    wr.style.display = "block";
    setTimeout(function(){ wr.style.opacity = "1"; },600);
  } else {
    wr.style.opacity = "0";
    setTimeout(function(){ wr.style.display = "none"; },600);
  }
}

function mainMenuDes(c){
  var wr = _('#desktopinnner');
  if(c === 'over'){
    wr.style.right = "2vw";
  } else {
    wr.style.right = "-10vw";
  }
}

function phonePop(c){
  var wr = _('#popPhone');
  if(c === "open"){
    wr.classList.remove("hideDisplay");
    wr.classList.add("showDisplayFlex");
    wr.style.opacity = "1"
  } else{
    wr.style.opacity = "0"
    setTimeout(function(){
      wr.classList.remove("showDisplayFlex");
      wr.classList.add("hideDisplay");
    },600);
  }
}
checkForDevice();

function popReel(c){
  var wr = _('#showreel');
  if(c === 'open'){
    // wr.style.display  = "none"
  } else {
    console.log("Close");
    wr.style.display  = "none"
  }
}

function overLine(c, e) {
  var e = _(e);
  switch (c) {
  case "over":
    e.classList.remove("scaleDownLine");
    e.classList.add("scaleUpLine");
  break;
  case "out":
    e.classList.remove("scaleUpLine");
    e.classList.add("scaleDownLine");
  break;
  case "overW":
    e.classList.remove("scaleDownLineW");
    e.classList.add("scaleUpLineW");
  break;
  case "outW":
    e.classList.remove("scaleUpLineW");
    e.classList.add("scaleDownLineW");
  break;
  }
}

//e
window.onorientationchange = function(){
  var aboutthis = _('#aboutthis');
  if(window.orientation == 90 || window.orientation == -90){
    aboutthis.style.display = "none"
  } else {
    aboutthis.style.display = "block"
  }
}
window.onscroll = function(){
  var wave = _('#wavewrap');
  var center = window.innerHeight/2;
  var triggerWrap = _('.projects');
  var trigger = triggerWrap.getBoundingClientRect().top;
  if(trigger < center){
    wave.style.bottom = "0"
  } else {
    wave.style.bottom = "-120px"
  }
}
document.onkeydown = function(e){
  var wr = _('#popPhone');
  e = e || window.event;
  if (e.keyCode == '27') {
   phonePop('close');
  }
}
smoothScroll.init();
