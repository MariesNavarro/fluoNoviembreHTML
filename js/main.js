let cyan = '#37e6ef';
let magenta = '#e337fc';
let purple = '#9568f6';

"use strict";
let checkBowser = false;
if(bowser.mobile || bowser.tablet || /SymbianOS/.test(window.navigator.userAgent)) checkBowser = true;

window.console.log("%cCoded by Mn", "color:pink;  font-size: 10px; background:#000; padding:2px;");
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
  let app, apphover, apploading,
      loadingPixi = _('#fluoDeg'),
      logotipo = _('#logotipoMenu');
  apploading = new PIXI.Application(160, 160,{antialias: false, transparent: true, resolution: 1});
  loadingPixi.appendChild(apploading.view);
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
  .add('img/pixi/logoLoading.json')
  .load(onAssetsLoaded);
  function onAssetsLoaded(){
    loadingPixi.setAttribute('style', ' ');
    var framesLoading = [];
    var frames = [];
    var framesHover = [];
    for (var i = 0; i < 66; i++) {
        framesLoading.push(PIXI.Texture.fromFrame('fluoLoading_' + i + '.png'));
    }
    for (var i = 0; i < 237; i++) {
        frames.push(PIXI.Texture.fromFrame('fluo_' + i + '.png'));
    }
    for (var i = 0; i < 134; i++) {
        framesHover.push(PIXI.Texture.fromFrame('fluoHover_' + i + '.png'));
    }
    var aniLoad = new PIXI.extras.AnimatedSprite(framesLoading);
    var anim = new PIXI.extras.AnimatedSprite(frames);
    var animH = new PIXI.extras.AnimatedSprite(framesHover);
    aniLoad.width = apploading.renderer.width;
		aniLoad.height = apploading.renderer.height;
    aniLoad.animationSpeed = 0.56;
    aniLoad.play();

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
    apploading.stage.addChild(aniLoad);
    app.stage.addChild(anim);
    apphover.stage.addChild(animH);
  }
}

function loadingPhr(c){
  let per = _('#per');
  if(c > 20 && c < 40){
    per.innerHTML = "Almost 2..."
  } else if (c > 40 && c < 60) {
    per.innerHTML = "Almost 3..."
  } else if (c > 60 && c < 80){
    per.innerHTML = "Almost 4..."
  } else if (c > 80){
    per.innerHTML = "Almost 5..."
  }
}


function loadPosters(s, fun){
  let xhr = [],
      url = [],
      c = 0,
      line = _('#loading').children[2],
      num;
  for (let i = 1; i < 8; i++) {
    url.push(s+i+'.jpg');
  }
  for (let i = 0; i < url.length; i++) {
    xhr[i] = new XMLHttpRequest;
    xhr[i].open("GET", url[i], true);
    xhr[i].responseType = "blob";
    xhr[i].onload = function(e){
      if(this.readyState === 4){
        c++;
        num = Math.round((c*(100/7)));
        line.style.height = num+"%";
        loadingPhr(num);
        if(c === 7){
          fun();
        }
      }
    }
    xhr[i].send();
  }
}

function posterSection(){
  let wr = _('#loading');
  wr.style.opacity = "0";
  setTimeout(function(){ wr.style.display = "none"; },600);
}

function posterProjects(){
  let wr = _('#loading');
  wr.style.opacity = "0";
  setTimeout(function(){ wr.style.display = "none"; },600);
}

function support(a) {
  let b = " ";
  return "probably" == a.canPlayType("video/webm") || "maybe" == a.canPlayType("video/webm") ? b = "webm" : "probably" != a.canPlayType("video/mp4") && "maybe" != a.canPlayType("video/mp4") || (b = "mp4"), b
}

function loadVid() {
  if(!checkBowser){
    let wr = _('#loading'),
        cover = __('.cover'),
        xhrVid = [],
        urlList = [],
        line = _('#loading').children[2],
        r = 0;
    for (let i = 0; i < cover.length; i++) {
      cover[i].setAttribute('style', ' ');
      let vid = document.createElement("VIDEO");
      vid.classList.add('videostyle');
      vid.setAttribute('preload', 'auto');
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
            if(this.readyState == 4){
              r+=1;
              let num = Math.round(r*(108/cover.length-1));
              line.style.height = num+'%';
              if(r === cover.length){
                vidRender();
                wr.style.opacity = "0";
                setTimeout(function(){ wr.style.display = "none"; },600);
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
            if(this.readyState == 4){
              r+=1;
              let num = Math.round(r*(108/cover.length-1));
              line.style.height = num+'%';
              if(r === cover.length){
                vidRender();
                wr.style.opacity = "0";
                setTimeout(function(){ wr.style.display = "none"; },600);
              }
            }
          }
          xhrVid[c].send();
        }
    }
  } else {
    let wr = _('#loading'),
        cvMob = __('.cover'),
        line = _('#loading').children[2],
        num,
        len = cvMob.length,
        c = 0,
        urlMob = [],
        xhrMob = [];
    for (var i = 0; i < cvMob.length; i++) {
      urlMob.push(cvMob[i].getAttribute('data-img'));
    }
    for (var i = 0; i < len; i++) {
      xhrMob[i] = new XMLHttpRequest;
      xhrMob[i].open("GET", urlMob[i], true);
      xhrMob[i].responseType = "blob";
      xhrMob[i].onload = function (e){
        if(this.readyState === 4){
          c++;
          num = Math.round((c*(100/len)));
          line.style.height = num+"%";
          loadingPhr(num);
          if(num > 95) renderWorkMobile();
        }
      }
      xhrMob[i].send();
    }
    function renderWorkMobile(){
      for (var i = 0; i < len; i++) {
        cvMob[i].style.backgroundImage = "url("+urlMob[i]+")";
      }
      wr.style.opacity = "0";
      setTimeout(function(){ wr.style.display = "none"; },600);
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

function sh(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
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
      reelD = _('#triggerReelD'),
      reelM = _('#triggerReelM'),
      d = _('#desktopinnner');
  if(checkBowser){

    d.classList.remove('showDisplayFlex');
    d.classList.add('hideDisplay');
    mn.setAttribute('onclick', 'mainMenuMob("open")');
    ph.setAttribute('href', 'tel:57303009');
    reelM.setAttribute('href', 'https://vimeo.com/175730619');
    reelM.setAttribute('target', '_blank');
    reelM.setAttribute('rel', 'noopener noreferrer');
  } else {

    d.setAttribute('onmouseover', 'mainMenuDes("over")');
    d.setAttribute('onmouseout', 'mainMenuDes("out")');
    mn.setAttribute('onmouseover', 'mainMenuDes("over")');
    mn.setAttribute('onmouseout', 'mainMenuDes("out")');
    ph.setAttribute('onclick', 'phonePop("open")');
    ph.setAttribute('title', 'Ver teléfono y horarios');
    reelD.setAttribute('onclick', 'popReel("open")');
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
    wr.style.display = "block";
    setTimeout(function(){ wr.style.opacity = "1"; },600);
  } else{
    wr.style.opacity = "0"
    setTimeout(function(){
      wr.style.display = "none";
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
  let wr = _('#abouthis');
  if(wr === null) return;
  let trigger = _('#triggerAbout'),
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

function setProfiles(){
 let p = __('.profile_in');
 if(checkBowser){
   p[0].setAttribute('onclick', 'profileMobile("f")');
   p[1].setAttribute('onclick', 'profileMobile("t")');
 } else {
   p[0].setAttribute('onclick', 'profileDesktop("fOpen")');
   p[1].setAttribute('onclick', 'profileDesktop("tOpen")');
 }
}

function profileMobile(c){
  let wr = _('#profiles_wr'),
      w = window.innerWidth;
  if(c === "f"){
    isOpenF = !isOpenF;
    wr.style.left = "100vw";
  } else {
    isOpenT = !isOpenT;
    wr.style.left = "-100vw";
  }
}

function profileDesktop(c){
  let wr = _('#profiles_wr'),
      bt = _('.close_des_btn'),
      img = bt.children[0],
      fadewr = __('.profile_in'),
      w = window.innerWidth;

  switch (c) {
  case 'fOpen':
  isOpenF = !isOpenF;
  fadewr[0].style.opacity = "0";
  if(w < 650){
    wr.style.left = "100vw";
  } else {
    wr.style.left = "50vw";
    bt.setAttribute('onclick', 'profileDesktop("fClose")');
    bt.style.left = "calc(0% - 20px)";
    bt.style.display = "block";
    setTimeout(function(){
      bt.style.opacity = "1";
    },600);
  }
  break;
  case 'tOpen':
  isOpenT = !isOpenT;
  fadewr[1].style.opacity = "0";
  if(w < 650){
    wr.style.left = "-100vw";
  } else {
    wr.style.left = "-50vw";
    bt.setAttribute('onclick', 'profileDesktop("tClose")');
    bt.style.left = "calc(100% - 20px)";
    img.classList.add('rotIcon');
    bt.style.display = "block";
    setTimeout(function(){
      bt.style.opacity = "1";
    },600);
  }
  break;
  case 'fClose':
    isOpenF = !isOpenF;
    fadewr[0].style.opacity = "1";
    bt.style.display = "none";
    bt.style.opacity = "0";
    wr.style.left = "0";
  break;
  case 'tClose':
    isOpenT = !isOpenT;
    fadewr[1].style.opacity = "1";
    bt.style.display = "none";
    bt.style.opacity = "0";
    wr.style.left = "0";
  break;
  }
}

function arrowProfile(c, t){
 if(c === "over"){
   t.classList.add('rotArrow');
 } else {
   t.classList.remove('rotArrow');
 }
}

function checkAbout(){
  let wr = _('#profiles_wr'),
      w = window.innerWidth;
  if(w < 650 && isOpenF){
    wr.style.left = "100vw";
  }
  if(w > 650 && isOpenF){
    wr.style.left = "50vw";
  }
  if(w < 650 && isOpenT){
    wr.style.left = "-100vw";
  }
  if(w > 650 && isOpenT){
    wr.style.left = "-50vw";
  }
}

function perfilClb(c,n,ig,w,p,b,i){
  let menu = _('#clb>div'),
      wr = _('#clb>#perfil_wr');

  if(c === "open"){
    bio(b);
    fillInfo(n,ig,w,p,b,i);
    if(!checkBowser){
      menu.style.marginLeft = "-50%";
    }
    wr.style.right = "0";
  } else {
    menu.style.marginLeft = "0";
    wr.style.right = "-100%";
  }
}

function fillInfo(n,ig,w,p,b,i){
  let _n = n, _ig = ig, _w = w, _p = p, _b = b, _i = i;
  if(_ig === 0){
    _('#info>#ig').style.display = "none";
  } else {
    _('#info>#ig').style.display = "block";
    _('#info>#ig').setAttribute('href', 'www.instagram.com/' + _ig);
    _('#info>#ig>span').innerHTML = _ig;
  }
  if(_w === 0){
    _('#info>#wb').style.display = "none";
  } else {
    _('#info>#wb').style.display = "block";
    _('#info>#wb').setAttribute('href', 'www.' + _w);
    _('#info>#wb>span').innerHTML = _w;
  }
  _('#perfil_wr>div>#pic').style.backgroundImage = "url(img/colaboradores/"+_p+")";
  _('#info>#name').innerHTML = _n;

}

function vSizeMock(w){
  let wr = _(w),
      vd = wr.children[0],
      wr_W = wr.offsetWidth,
      vd_W = vd.getAttribute('width'),
      vd_H = vd.getAttribute('height');
  vd.setAttribute('data-ratio', vd_H / vd_W);
  let r = vd.getAttribute('data-ratio'),
      new_H = wr_W * r;
      vd.setAttribute('width', wr_W);
      vd.setAttribute('height', new_H);
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
  var img = _('#swipe_slider'),
      description = _('#descriptionSliderMobile').children[0];
  img.setAttribute('data-img', stringSliderMobile+c+'.jpg');
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
  let pop = __('.popIndex');
  e = e || window.event;
  if (e.keyCode == '27') {
   for (var i = 0; i < pop.length; i++) {
     pop[i].style.display = "none"
   };
   aboutThisPop('close');
  }
}


function changeHome(){
  // console.log("Change home");
}

function changeHomeValues(c ,k){
  switch (k) {
    case 'f':
      // lv0 = " ";
      console.log("F");
      lv0 = new LavaLamp(screen.width, screen.height, 10, cyan, magenta);
    break;
    case 'l':
    // lv0 = " ";
    console.log("L");
      lv0 = new LavaLamp(screen.width, screen.height, 10, purple, magenta);
    break;
    case 'u':
      // lv0 = " ";
      console.log("U");
      lv0 = new LavaLamp(screen.width, screen.height, 10, purple, cyan);
    break;
  }
}


/* s */
let c_services_mobile = 0;
function servicesMobile(c){
  let s = __('.sliderwr_services>li');
  if(c === 'next'){
    c_services_mobile++;
    if(c_services_mobile > 7) c_services_mobile = 0;
    slider(c_services_mobile);
  } else {
    c_services_mobile--;
    if(c_services_mobile < 0) c_services_mobile = 7;
    slider(c_services_mobile);
  }

  function slider(n){
    clear();
    s[n].style.display = "block";
  }

  function clear(){
    for (var i = 0; i < s.length; i++) {
      s[i].style.display = "none";
    }
  }
}
function overServices(c, el, t){
  let i = t.children[2].children[0];
  i.setAttribute('src', 'img/services/' + el + c + '.svg');
}

function loadServices(){
 if(!checkBowser){
 	let s = __('.step'),
      wr = _('#loading'),
      xhrVid = [],
      urlList = [];
 	for(let i =0; i < s.length; i++){
 		let v = document.createElement("VIDEO");
 		v.setAttribute('preload', 'auto');
 		v.setAttribute('loop', ' ');
 		v.setAttribute('autoplay', ' ');
    s[i].appendChild(v);
 	}
  let v = _('.step>video'),
      r = 0,
      a, b = support(v);
    if (" " == b ? a = 0 : "mp4" == b ? a = 1 : "webm" == b && (a = 2), 1 === a) {
      for (let c = 0; c <= s.length-1; c++){
      	urlList.push("assets/services/" + c+ ".mp4");
      }
      for (var c = 0; c < urlList.length; c++){
      	xhrVid[c] = new XMLHttpRequest;
        xhrVid[c].open("GET", urlList[c], !0);
        xhrVid[c].responseType = "blob";
        xhrVid[c].onload = function (e){
          if(this.readyState == 4){
            r+=1;
            let num = Math.round(r*(108/s.length-1));
            loadingPhr(num);
            if(r === s.length){
              renderServices();
              setTimeout(function(){
                wr.style.opacity = "0";
                setTimeout(function(){ wr.style.display = "none" },600);
              },1000);
            }
          }
        }
        xhrVid[c].send();
      }
    }
    if (2 === a) {
      for(let c = 0; c <= s.length-1; c++){
        urlList.push("assets/services/"+ c+ ".webm");
      }
      for(let c = 0; c < urlList.length; c++) {
        xhrVid[c] = new XMLHttpRequest;
        xhrVid[c].open("GET", urlList[c], !0);
        xhrVid[c].responseType = "blob";
        xhrVid[c].onload = function (e){
        if(this.readyState == 4){
          r+=1;
          let num = Math.round(r*(108/s.length-1));
          loadingPhr(num);
          if(r === s.length){
            renderServices();
            setTimeout(function(){
              wr.style.opacity = "0";
              setTimeout(function(){ wr.style.display = "none" },600);
            },1000);
          }
        }
      }
      xhrVid[c].send();
    }
  }
 } //bowser
 //Movil
}

function renderServices(){
  let v  = __('.step>video'),
      a, b = support(v[0]);
  for (var i = 0; i < v.length; i++) {
    let s = document.createElement("SOURCE");
    if (" " == b ? a = 0 : "mp4" == b ? a = 1 : "webm" == b && (a = 2), 1 === a) {
      s.setAttribute('src', 'assets/services/'+i+'.mp4');
      s.setAttribute('type', 'video/mp4');
    }
    if (2 === a) {
      s.setAttribute('src', 'assets/services/'+i+'.webm');
      s.setAttribute('type', 'video/webm');
    }
    v[i].appendChild(s);
  }
}

function getFlagV(){
  var f = __('.flagV'),
      x = [],
      ct = (window.innerWidth/2)+100,
      pstp = _('#instruccion');

  for(let i = 0; i < f.length; i++){
    x.push(f[i].getBoundingClientRect().x - ct);
  }
  if(x[0] < 0 && x[1] > 0) indexStep(0);
  if(x[1] < 0 && x[2] > 0) indexStep(1);
  if(x[2] < 0 && x[3] > 0) indexStep(2);
  if(x[3] < 0 && x[4] > 0) indexStep(3);
  if(x[4] < 0 && x[5] > 0) indexStep(4);
  if(x[5] < 0 && x[6] > 0) indexStep(5);
  if(x[6] < 0 && x[7] > 0) indexStep(6);
  if(x[7] < 0) indexStep(7);
}

let fSc1 = false, fSc2 = false,
    fSc3 = false, fSc4 = false,
    fSc5 = false, fSc6 = false,
    fSc7 = false, fSc8 = false;

function indexStep(c){
  var s = __('.step'),
      p = __('#instruccion>span'),
      pstp = _('#instruccion');

  switch (c) {
    case 0:
      fSc2 = false;
      fSc3 = false;
      fSc4 = false;
      fSc5 = false;
      fSc6 = false;
      fSc7 = false;
      fSc8 = false;
      if(!fSc1){
        console.log("1: Introduccion");
        p[0].style.display = "block";
        p[1].style.display = "none";
        p[2].style.display = "none";
        p[3].style.display = "none";
        p[4].style.display = "none";
        changeIcon(c);
        changeStep(c);
      }
      fSc1 = true;
    break;
    case 1:
      fSc1 = false;
      fSc3 = false;
      fSc4 = false;
      fSc5 = false;
      fSc6 = false;
      fSc7 = false;
      fSc8 = false;
      if(!fSc2){
        console.log("2: Diagnositco");
        p[0].style.display = "none";
        p[1].style.display = "block";
        p[2].style.display = "none";
        p[3].style.display = "none";
        p[4].style.display = "none";
        changeIcon(c);
        changeStep(c);
      }
      fSc2 = true;
    break;
    case 2:
      fSc1 = false;
      fSc2 = false;
      fSc4 = false;
      fSc5 = false;
      fSc6 = false;
      fSc7 = false;
      fSc8 = false;
      if(!fSc3){
        console.log("3: Brief");
        p[0].style.display = "none";
        p[1].style.display = "none";
        p[2].style.display = "block";
        p[3].style.display = "none";
        p[4].style.display = "none";
        changeIcon(c);
        changeStep(c);
      }
      fSc3 = true;
    break;
    case 3:
      fSc1 = false;
      fSc2 = false;
      fSc3 = false;
      fSc5 = false;
      fSc6 = false;
      fSc7 = false;
      fSc8 = false;
      if(!fSc4){
        console.log("4: Concepto");
        p[0].style.display = "none";
        p[1].style.display = "none";
        p[2].style.display = "none";
        p[3].style.display = "block";
        p[4].style.display = "none";
        changeIcon(c);
        changeStep(c);
      }
      fSc4 = true;
    break;
    case 4:
      fSc1 = false;
      fSc2 = false;
      fSc3 = false;
      fSc4 = false;
      fSc6 = false;
      fSc7 = false;
      fSc8 = false;
      if(!fSc5){
        console.log("5: Prototipo");
        p[0].style.display = "none";
        p[1].style.display = "none";
        p[2].style.display = "none";
        p[3].style.display = "none";
        p[4].style.display = "block";
        changeIcon(c);
        changeStep(c);
      }
      fSc5 = true;
    break;
    case 5:
      fSc1 = false;
      fSc2 = false;
      fSc3 = false;
      fSc4 = false;
      fSc5 = false;
      fSc7 = false;
      fSc8 = false;
      if(!fSc6){
        console.log("6: Ajustes");
        p[0].style.display = "none";
        p[1].style.display = "none";
        p[2].style.display = "none";
        p[3].style.display = "none";
        p[4].style.display = "none";
        changeIcon(c);
        changeStep(c);
      }
      fSc6 = true;
    break;
    case 6:
      fSc1 = false;
      fSc2 = false;
      fSc3 = false;
      fSc4 = false;
      fSc5 = false;
      fSc6 = false;
      fSc8 = false;
      if(!fSc7){
        console.log("7: Implementacion");
        p[0].style.display = "none";
        p[1].style.display = "none";
        p[2].style.display = "none";
        p[3].style.display = "none";
        p[4].style.display = "none";
        changeIcon(c);
        changeStep(c);
      }
      fSc7 = true;
    break;
    case 7:
      fSc1 = false;
      fSc2 = false;
      fSc3 = false;
      fSc4 = false;
      fSc5 = false;
      fSc6 = false;
      fSc7 = false;
      if(!fSc8){
        console.log("¿Dudas?");
        p[0].style.display = "none";
        p[1].style.display = "none";
        p[2].style.display = "none";
        p[3].style.display = "none";
        p[4].style.display = "none";
        changeStep(c);
      }
      fSc8 = true;
    break;
  }
}

function changeIcon(c){
  let istp = __('#iconosteps>img');

  for (var i = 0; i < istp.length; i++) {
    istp[i].style.opacity = "0.5";
  }
  istp[c].style.opacity = "1";
}

function changeStep(c){
  var s = __('.step'),
      wristp = _('#iconosteps'),
      wrimp = _('#implementacion'),
      wrfn = _('#final');

  for (let i = 0; i < s.length; i++) {
    s[i].style.opacity = "0";
    s[c].classList.add('transition');
  }

  setTimeout(function(){
    s[c].style.opacity = 1;
  },600);
  if(c === 7){
    wristp.style.opacity = "0";
    wrfn.style.opacity = "1";
  } else {
    wristp.style.opacity = "1";
    wrfn.style.opacity = "0";
  }
  if(c === 6){
    wrimp.style.opacity = "1";
  } else {
    wrimp.style.opacity = "0";
  }
}
