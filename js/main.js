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
      reel = _('#triggerReel'),
      d = _('#desktopinnner');
  if(checkBowser){
    console.log("Mobile");
    d.classList.remove('showDisplayFlex');
    d.classList.add('hideDisplay');
    mn.setAttribute('onclick', 'mainMenuMob("open")');
    ph.setAttribute('href', 'tel:57303009');
    reel.setAttribute('href', 'https://vimeo.com/175730619');
    reel.setAttribute('target', '_blank');
    reel.setAttribute('rel', 'noopener noreferrer');
  } else {
    console.log("Desktop");
    d.setAttribute('onmouseover', 'mainMenuDes("over")');
    d.setAttribute('onmouseout', 'mainMenuDes("out")');
    mn.setAttribute('onmouseover', 'mainMenuDes("over")');
    mn.setAttribute('onmouseout', 'mainMenuDes("out")');
    ph.setAttribute('onclick', 'phonePop("open")');
    ph.setAttribute('title', 'Ver teléfono y horarios');
    reel.setAttribute('onclick', 'popReel("open")');
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
    wr.style.right = "-18vw";
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
    console.log("OPEEEEN");
    wr.style.display  = "block"
    setTimeout(function(){ wr.style.opacity  = "1" },600);
  } else {
    wr.style.opacity  = "0"
    setTimeout(function(){ wr.style.display  = "none" },600);
  }
}

function aboutThisPop(c){
  var wr = _('#abouthis'),
      trigger = _('#triggerAbout'),
      about = trigger.children[0],
      close = trigger.children[1],
      closeMob = _('.close');
  if(c === 'open'){
    wr.style.display = "block";
    about.style.display = "none";
    close.style.display = "block";
    setTimeout(function(){
      wr.style.opacity = "1";
      closeMob.style.display = "inline-block";
      trigger.setAttribute('onclick', 'aboutThisPop("close")');
      setTimeout(function(){
        closeMob.style.opacity = "1"
      },600);
    },600);
  } else {
    wr.style.opacity = "0"
    about.style.display = "block";
    close.style.display = "none";
    setTimeout(function(){
      closeMob.style.display = "none";
      wr.style.display = "none"
      trigger.setAttribute('onclick', 'aboutThisPop("open")');
      setTimeout(function(){
        closeMob.style.opacity = "0"
      },600);
    },600);
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

function support(a) {
  let b = " ";
  return "probably" == a.canPlayType("video/webm") || "maybe" == a.canPlayType("video/webm") ? b = "webm" : "probably" != a.canPlayType("video/mp4") && "maybe" != a.canPlayType("video/mp4") || (b = "mp4"), b
}



function loadVid() {
  if(!checkBowser){
    let cover = __('.cover'),
        xhrVid = [],
        urlList = [],
        r = 0;
    for (let i = 0; i < cover.length; i++) {
      cover[i].setAttribute('style', ' ');
      let vid = document.createElement("VIDEO");
      vid.classList.add('videostyle');
      vid.setAttribute('preload', 'auto');
      //ponercover
      cover[i].appendChild(vid);
    }
  let v = __('.videostyle')[0],
      a, b = support(v);
      if (" " == b ? a = 0 : "mp4" == b ? a = 1 : "webm" == b && (a = 2), 1 === a) {
        for (let c = 0; c <= cover.length-1; c++){
        	urlList.push("assets/vid/work-" + c + ".mp4");
        }
        for (var c = 0; c < urlList.length; c++){
        	xhrVid[c] = new XMLHttpRequest, xhrVid[c].open("GET", urlList[c], !0), xhrVid[c].responseType = "blob", xhrVid[c].send();
        }
      }
      if (2 === a) {
        for(let c = 0; c <= cover.length-1; c++){
          urlList.push("assets/vid/work-" + c + ".webm");
        }
        for(let c = 0; c < urlList.length; c++) {
          xhrVid[c] = new XMLHttpRequest;
          xhrVid[c].open("GET", urlList[c], !0);
          xhrVid[c].responseType = "blob";
          xhrVid[c].onload = function (e){
            // let p = _('#per');
            if(this.readyState == 4){
              r+=1;
              let num = r*(100/cover.length-1);
              if(r === cover.length){
                //function render videos
                //loading
                vidRender();
              }
            }
          }
          xhrVid[c].send();
        }
    }
  }
}

function vidRender(){
  let vtag = __('.videostyle'),
      a, b = support(vtag[0]);
  for (var i = 0; i < vtag.length; i++) {
    let src = document.createElement("SOURCE");
      if (" " == b ? a = 0 : "mp4" == b ? a = 1 : "webm" == b && (a = 2), 1 === a) {
        src.setAttribute('src', 'assets/vid/work-'+i+'.mp4');
        src.setAttribute('type', 'video/mp4');
      }
      if (2 === a) {
        src.setAttribute('src', 'assets/vid/work-'+i+'.webm');
        src.setAttribute('type', 'video/webm');
      }
    vtag[i].appendChild(src);
  }
  setOverWork();
}

function setOverWork(){
  let v = __('.videostyle');
  for (var i = 0; i < v.length; i++) {
    v[i].setAttribute('onmouseover', 'overWork("over", this)');
    v[i].setAttribute('onmouseout', 'overWork("out", this)');
  }
}

function overWork(c, t){
  if(c === "over"){
    t.play();
  } else {
    t.pause();
    setTimeout(function(){ t.currentTime = 0; },60);
  }
}

//e
function hideCoverLogo(){
  let trigger = _('#mainprojects').getBoundingClientRect().top,
      wr = _('#logoCoverWrap');
  if(trigger < -10){
    wr.classList.remove('showDisplayFlex');
    wr.classList.add('hideDisplay');
  } else {
    wr.classList.remove('hideDisplay');
    wr.classList.add('showDisplayFlex');
  }
}

function changeBackground(){
  let backs = [],
      wr = _('#mainprojects'),
      cMain = wr.getAttribute('data-back'),
      c = window.innerHeight/2,
      f = __('.flag'),
      fLen = f.length,
      tops = [];
      backs.push(cMain);

  for (let i = 0; i < fLen; i++) {
    backs.push(f[i].getAttribute('data-back'));
    tops.push(f[i].getBoundingClientRect().top - c);
  }
  if(tops[0] < 0){
    wr.style.background = backs[1];
  }  else {
    wr.style.background = backs[0];
  }
  for (let i = 1; i < fLen; i++) {
    if(tops[i] < 0){ wr.style.background = backs[i+1]; }
  }
}

function removeAboutScroll(){
  let about = _('#triggerAbout'),
      c = window.innerHeight/2,
      trigger = _('.projects').getBoundingClientRect().top;
  if(trigger < c){
    about.style.opacity = "0"
  } else {
    about.style.opacity = "1"
  }
}

function detectWaveLayouts(){
  let wave = _('#wavewrap'),
      c = window.innerHeight/2,
      triggerWrap = _('.projects'),
      trigger = triggerWrap.getBoundingClientRect().top;
  if(trigger < c){
    wave.style.bottom = "0"
  } else {
    wave.style.bottom = "-120px"
  }
}

document.onkeydown = function(e){
  let wr = _('#popPhone');
  e = e || window.event;
  if (e.keyCode == '27') {
   phonePop('close');
  }
}
smoothScroll.init();
