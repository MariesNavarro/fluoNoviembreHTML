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
      // vid.setAttribute('controls' , ' ');
      // vid.setAttribute('autoplay' , ' ');
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
        	xhrVid[c] = new XMLHttpRequest;
          xhrVid[c].open("GET", urlList[c], !0);
          xhrVid[c].responseType = "blob";
          xhrVid[c].onload = function (e){
            let p = _('#per');
            let wr = _('#loading');
            if(this.readyState == 4){
              r+=1;
              let num = Math.round(r*(100/cover.length-1));
              console.log(num);
              p.innerHTML = num + "%";
              if(r === cover.length){
                //function render videos
                //loading
                // wr.style.display = "none";
                vidRender();
              }
            }
          }
          xhrVid[c].send();
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
            let p = _('#per');
            let wr = _('#loading');
            if(this.readyState == 4){
              r+=1;
              let num = Math.round(r*(100/cover.length-1));
              console.log(num);
              p.innerHTML = num + "%";
              if(r === cover.length){
                //function render videos
                //loading
                // wr.style.display = "none";
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
  let wr = _('#showreel');
  if(c === 'open'){
    wr.style.display  = "block"
    setTimeout(function(){ wr.style.opacity  = "1" },600);
  } else {
    wr.style.opacity  = "0"
    setTimeout(function(){ wr.style.display  = "none" },600);
  }
}


function popSliderWr(c, t){
  let wr = _('#popSlider'),
      img = wr.children[1].children[1],
      src = t.getAttribute('data-img'),
      tx = wr.children[1].children[0];
  if(c === 'open'){
    img.onload = function(){
      tx.style.opacity = "0";
    }
    img.setAttribute('src', src);
    wr.style.display = "block";
    setTimeout(function(){ wr.style.opacity = "1"; },600);
  } else {
    wr.style.opacity = "0";
    setTimeout(function(){
      wr.style.display = "none";
      tx.style.opacity = "1";
    },600);
  }
}

function aboutThisPop(c){
  let wr = _('#abouthis'),
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






function overLine(c) {
  let e = _('#lineBackTo');
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

function bugArrowSlider(){
  var wr = _('.bugArrows').getBoundingClientRect().bottom,
      wh = window.innerHeight,
      check = wr - wh,
      ifce = _('#interfazDesktop');
  if(check < 0){
    ifce.style.opacity = "1";
  } else {
    ifce.style.opacity = "0";
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

/* wr, fun */
function detectswipe(el,func) {
  let swipe_det = new Object();
  swipe_det.sX = 0;
  swipe_det.sY = 0;
  swipe_det.eX = 0;
  swipe_det.eY = 0;
  var min_x = 20;
  var max_x = 40;
  var min_y = 40;
  var max_y = 50;
  var direc = "";
  let ele = document.getElementById(el);
  ele.addEventListener('touchstart',function(e){
  var t = e.touches[0];
  swipe_det.sX = t.screenX;
  swipe_det.sY = t.screenY;
  },false);

  ele.addEventListener('touchmove',function(e){
  e.preventDefault();
  var t = e.touches[0];
  swipe_det.eX = t.screenX;
  swipe_det.eY = t.screenY;
  },false);

  ele.addEventListener('touchend',function(e){
  if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
  if(swipe_det.eX > swipe_det.sX) direc = "next";
  else direc = "prev";
  }
  if (direc != "") {
    if(typeof func === 'function') func(el,direc);
  }
  direc = "";
  },false);
}

let c_slider_m = 1;
function swipeSliderMobile(el,d){
  if(d === 'prev'){
    c_slider_m++;
    if(c_slider_m > 7) c_slider_m = 1;
    sliderMobile(c_slider_m);
  } else {
    c_slider_m--;
    if(c_slider_m < 1) c_slider_m = 7;
    sliderMobile(c_slider_m);
  }
}

function sliderMobile(c){
  var img = _('#swipe_slider').children[0],
      description = _('#descriptionSliderMobile').children[0];
  img.setAttribute('src', stringSliderMobile+c+'.jpg');
  description.innerHTML = c;
}

let c_slider_d = 0;
function swipeSliderDesktop(c){
  if(c === 'next'){
    c_slider_d++;
    if(c_slider_d > 6) c_slider_d = 0;
    initSlider(c_slider_d, 'next');
  } else {
    c_slider_d--;
    if(c_slider_d < 0) c_slider_d = 6;
    initSlider(c_slider_d, 'prev');
  }
}


function initSlider(c, d){
   let mtrx = [[6,7,1,7,1,2,1,2,3],
              [7,1,2,1,2,3,2,3,4],
              [1,2,3,2,3,4,3,4,5],
              [2,3,4,3,4,5,4,5,6],
              [3,4,5,4,5,6,5,6,7],
              [4,5,6,5,6,7,6,7,1],
              [5,6,7,6,7,1,7,1,2]],
       slides = __('.slideIndex'),
       slidesScale = __('.sideImgHide'),
       e = __('.eventSlider'),
       wr = _('.layout_slider_desk>ul'),
       cumain = _('#currentMain'),
       curr = mtrx[c],
       desc = _('#descriptionSliderDesktop>span');
       desc.innerHTML = c+1;
   wr.classList.add('transition');
   cumain.setAttribute('data-img', stringSliderMobile+curr[4]+'.jpg');
   if(d === 'next'){
     wr.style.left = "-200%";
     removeEvent();
     setTimeout(function(){
       for (var i = 0; i <  slidesScale.length; i++) {
          slidesScale[i].style.width = "25%";
       }
     },400);
   } else if(d === 'prev') {
     removeEvent();
     wr.style.left = "0";
     setTimeout(function(){
       for (var i = 0; i <  slidesScale.length; i++) {
          slidesScale[i].style.width = "25%";
       }
     },400);
   } else {
     wr.style.left = "-100%";
   }

   setTimeout(function(){
     wr.classList.remove('transition');
     wr.style.left = "-100%";
     for (let i = 0; i < slides.length; i++) {
       slides[i].style.backgroundImage = "url("+stringSliderMobile+curr[i]+".jpg)";
     }
     for (var i = 0; i <  slidesScale.length; i++) {
        slidesScale[i].style.width = "30%";
     }
     addEvent();
   },600);

   function removeEvent(){
     for (var i = 0; i < e.length; i++) {
       e[i].setAttribute('onclick', ' ');
     }
   }
   function addEvent(){
     e[0].setAttribute('onclick', 'swipeSliderDesktop("prev")');
     e[1].setAttribute('onclick', 'swipeSliderDesktop("next")');
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
