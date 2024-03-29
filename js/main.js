var cyan = '#37e6ef',
    magenta = '#e337fc',
    verde = '#00ff86',
    azul = '#0a46ff',
    purple = '#9568f6';

"use strict";
var checkBowser = false;
if(bowser.mobile || bowser.tablet || /SymbianOS/.test(window.navigator.userAgent)) checkBowser = true;

window.console.log("%cCoded by Mn", "color:#34408f;  font-size: 10px; background:#000; padding:20px;");
function _(el){return document.querySelector(el); }
function __(el){return document.querySelectorAll(el); }

function initscroll(){ smoothScroll.init() }

function overIcon(c, e, t){
  t.setAttribute('src', 'img/' + e + c + '.svg');
}


function loadingPhr(c){
  var per = _('#per');
  if(c > 20 && c < 40){
    per.innerHTML = "Ya casi 2..."
  } else if (c > 40 && c < 60) {
    per.innerHTML = "Ya casi 3..."
  } else if (c > 60 && c < 80){
    per.innerHTML = "Ya casi 4..."
  } else if (c > 80){
    per.innerHTML = "Ya casi 5..."
  }
}

function loadPosters(s, fun){
  var xhr = [],
      url = [],
      c = 0,
      line = _('#loading').children[2],
      num;
  for (var i = 1; i < 8; i++) {
    url.push(s+i+'.jpg');
  }
  for (var i = 0; i < url.length; i++) {
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
  var wr = _('#loading');
  wr.style.opacity = "0";
  setTimeout(function(){ wr.style.display = "none"; },600);
}

function posterProjects(){
  var wr = _('#loading');
  wr.style.opacity = "0";
  setTimeout(function(){ wr.style.display = "none"; },600);
}

function support(a) {
  var b = " ";
  return "probably" == a.canPlayType("video/webm") || "maybe" == a.canPlayType("video/webm") ? b = "webm" : "probably" != a.canPlayType("video/mp4") && "maybe" != a.canPlayType("video/mp4") || (b = "mp4"), b
}

function loadVid() {
  if(!checkBowser){
    var wr = _('#loading'),
        cover = __('.cover'),
        xhrVid = [],
        urlList = [],
        line = _('#loading').children[2],
        r = 0;
    for (var i = 0; i < cover.length; i++) {
      cover[i].setAttribute('style', ' ');
      var vid = document.createElement("VIDEO");
      vid.classList.add('videostyle');
      vid.setAttribute('preload', 'auto');
      cover[i].appendChild(vid);
    }

  var v = __('.videostyle')[0],
      a, b = support(v);
      if (" " == b ? a = 0 : "mp4" == b ? a = 1 : "webm" == b && (a = 2), 1 === a) {
        for (var c = 0; c <= cover.length-1; c++){
        	urlList.push("assets/vid/work-" + c + ".mp4");
        }
        for (var c = 0; c < urlList.length; c++){
        	xhrVid[c] = new XMLHttpRequest;
          xhrVid[c].open("GET", urlList[c], !0);
          xhrVid[c].responseType = "blob";
          xhrVid[c].onload = function (e){
            if(this.readyState == 4){
              r+=1;
              var num = Math.round(r*(108/cover.length-1));
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
        for(var c = 0; c <= cover.length-1; c++){
          urlList.push("assets/vid/work-" + c + ".webm");
        }
        for(var c = 0; c < urlList.length; c++) {
          xhrVid[c] = new XMLHttpRequest;
          xhrVid[c].open("GET", urlList[c], !0);
          xhrVid[c].responseType = "blob";
          xhrVid[c].onload = function (e){
            if(this.readyState == 4){
              r+=1;
              var num = Math.round(r*(108/cover.length-1));
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
    var wr = _('#loading'),
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
  var vtag = __('.videostyle'),
      a, b = support(vtag[0]);
  for (var i = 0; i < vtag.length; i++) {
    var src = document.createElement("SOURCE");
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
  var v = __('.videostyle');
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
      phInfo = __(".telefonofluo"),
      mn = _('#triggerMenu'),
      reelD = _('#triggerReelD'),
      reelM = _('#triggerReelM'),
      d = _('#desktopinnner'),
      fix = _('.onmenuout');
  if(checkBowser){

    d.classList.remove('showDisplayFlex');
    d.classList.add('hideDisplay');
    mn.setAttribute('onclick', 'mainMenuMob("open")');
    ph.setAttribute('href', 'tel:57303009');
    reelM.setAttribute('href', 'https://vimeo.com/175730619');
    reelM.setAttribute('target', '_blank');
    reelM.setAttribute('rel', 'noopener noreferrer');
    for (var i = 0; i < phInfo.length; i++) {
      phInfo[i].setAttribute('href', 'tel:57303009');
    }
  } else {
    fix.setAttribute('onmouseover', 'mainMenuDes("out")');
    d.setAttribute('onmouseover', 'mainMenuDes("over")');
    // d.setAttribute('onmouseout', 'mainMenuDes("out")');
    mn.setAttribute('onmouseover', 'mainMenuDes("over")');
    // mn.setAttribute('onmouseout', 'mainMenuDes("out")');
    ph.setAttribute('onclick', 'phonePop("open")');
    ph.setAttribute('title', 'Ver teléfono y horarios');
    reelD.setAttribute('onclick', 'popReel("open")');
    for (var i = 0; i < phInfo.length; i++) {
      phInfo[i].setAttribute('onclick', 'phonePop("open")');
    }
    for (var i = 0; i < phInfo.length; i++) {
      phInfo[i].setAttribute('title', 'Ver teléfono y horarios');
    }
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
    setTimeout(function(){
      wr.style.right = "-18vw";
    },200)
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

function hangoutPop(c){
  var wr = _('#popHangout');
  if(c === "open"){
    wr.style.display = "block";
    setTimeout(function(){ wr.classList.remove('hideOpacity'); },600);
  } else {
    wr.classList.add('hideOpacity');
    setTimeout(function(){ wr.style.display = "none"; },600);
  }
}

function popReel(c){
  var wr = _('#showreel');
  if(c === 'open'){
    adjustReelSize();
    wr.style.display  = "block"
    setTimeout(function(){ wr.style.opacity  = "1" },600);
  } else {
    wr.style.opacity  = "0"
    setTimeout(function(){ wr.style.display  = "none" },600);
  }
}

function adjustReelSize(){
  var wr = _('#videoWrap'),
      ifr = _('#videoWrap>iframe');
  setTimeout(function(){
    var wrW = wr.clientWidth,
        ifrW = ifr.getAttribute('width'),
        ifrH = ifr.getAttribute('height');
    ifr.setAttribute('r', ifrH/ifrW);
    var r = ifr.getAttribute('r'),
        newH = wrW * r;
    ifr.setAttribute('height', newH);
    ifr.setAttribute('width', wrW);
  },300)
}

function popSliderWr(c, t){
  var wr = _('#popSlider'),
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
  var wr = _('#abouthis');
  if(wr === null) return;
  var trigger = _('#triggerAbout'),
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
  var e = _('#lineBackTo');
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
 var p = __('.profile_in');
 if(checkBowser){
   p[0].setAttribute('onclick', 'profileMobile("f")');
   p[1].setAttribute('onclick', 'profileMobile("t")');
 } else {
   p[0].setAttribute('onclick', 'profileDesktop("fOpen")');
   p[1].setAttribute('onclick', 'profileDesktop("tOpen")');
 }
}

function profileMobile(c){
  var wr = _('#profiles_wr'),
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
  var wr = _('#profiles_wr'),
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
  var wr = _('#profiles_wr'),
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
  var menu = _('#clb>div'),
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
  var _n = n, _ig = ig, _w = w, _p = p, _b = b, _i = i;
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
  var wr = _(w),
      vd = wr.children[0],
      wr_W = wr.offsetWidth,
      vd_W = vd.getAttribute('width'),
      vd_H = vd.getAttribute('height');
  vd.setAttribute('data-ratio', vd_H / vd_W);
  var r = vd.getAttribute('data-ratio'),
      new_H = wr_W * r;
      vd.setAttribute('width', wr_W);
      vd.setAttribute('height', new_H);
}

//e
function hideCoverLogo(){
  var trigger = _('#mainprojects').getBoundingClientRect().top,
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
  var backs = [],
      wr = _('#mainprojects'),
      cMain = wr.getAttribute('data-back'),
      c = window.innerHeight/2,
      f = __('.flag'),
      fLen = f.length,
      tops = [];
      backs.push(cMain);
  for (var i = 0; i < fLen; i++) {
    backs.push(f[i].getAttribute('data-back'));
    tops.push(f[i].getBoundingClientRect().top - c);
  }
  if(tops[0] < 0){
    wr.style.background = backs[1];
  }  else {
    wr.style.background = backs[0];
  }
  for (var i = 1; i < fLen; i++) {
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
  var about = _('#triggerAbout'),
      c = window.innerHeight/2,
      trigger = _('.projects').getBoundingClientRect().top;
  if(trigger < c){
    about.style.opacity = "0"
  } else {
    about.style.opacity = "1"
  }
}

function detectWaveLayouts(){
  var wave = _('#wavewrap'),
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
  var swipe_det = new Object();
  swipe_det.sX = 0;
  swipe_det.sY = 0;
  swipe_det.eX = 0;
  swipe_det.eY = 0;
  var min_x = 20;
  var max_x = 40;
  var min_y = 40;
  var max_y = 50;
  var direc = "";
  var ele = document.getElementById(el);
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

var c_slider_m = 1;
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

var c_slider_d = 0;
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
   var mtrx = [[6,7,1,7,1,2,1,2,3],
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
     for (var i = 0; i < slides.length; i++) {
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
  var pop = __('.popIndex');
  e = e || window.event;
  if (e.keyCode == '27') {
   for (var i = 0; i < pop.length; i++) {
     pop[i].style.display = "none"
   };
   aboutThisPop('close');
  }
}

// function exitInstructions(){
//   console.log("Exit instructions");
//   var wr = _('#instruction');
//   wr.style.opacity = "0";
//   setTimeout(function(){
//     wr.style.display = "none";
//   },600);
// }

function instructions(c){
  var wr = _('#instruction'),
      i = __('.instruction');

  var timeout_1, timeout_2, timeout_3;
      if(c === "again"){
        wr.style.display = "block";
        setTimeout(function(){
            wr.style.opacity = "0.5";
        },200);
        normal();
      }
      if(c === 'normal'){ normal() }
      if(c === 'exit'){ wr.style.display = "none"; }


    function normal(n){

      //phase1
    timeout_1 = setTimeout(function(){
          i[0].classList.remove("showOpacity");
          i[0].classList.add("hideOpacity");
          i[1].classList.remove("hideDisplay");
          i[1].classList.add("showDisplay");
        setTimeout(function(){
          i[0].classList.remove("showDisplay");
          i[0].classList.add("hideDisplay");
          i[1].classList.remove("hideOpacity");
          i[1].classList.add("showOpacity");
        },200);
    },3000);
    //phase2
    timeout_2 = setTimeout(function(){
        i[1].classList.remove("showOpacity");
        i[1].classList.add("hideOpacity");
        i[2].classList.remove("hideDisplay");
        i[2].classList.add("showDisplay");
        setTimeout(function(){
          i[1].classList.remove("showDisplay");
          i[1].classList.add("hideDisplay");
          i[2].classList.remove("hideOpacity");
          i[2].classList.add("showOpacity");
        },200)
    },6200);
    //phase3 - reset
    timeout_3 = setTimeout(function(){
      wr.style.opacity = "0";
      setTimeout(function(){
        wr.style.display = "none";
        i[2].classList.remove("showDisplay");
        i[2].classList.add("hideDisplay");
        i[2].classList.remove("showOpacity");
        i[2].classList.add("hideOpacity");

        i[1].classList.remove("hideDisplay");
        i[1].classList.add("showDisplay");
        i[1].classList.remove("hideOpacity");
        i[1].classList.add("showOpacity");
      },500)
  },9400);

  // if(n === 'exit') { console.log("Return");
  //   wr.style.opacity = "0";
  //   setTimeout(function(){
  //       clearTimeout(timeout_1);
  //       clearTimeout(timeout_2);
  //       clearTimeout(timeout_3);
  //       console.log(timeout_1);
  //       wr.style.display = "none";
  //       setTimeout(function(){
  //         i[2].classList.remove("showDisplay");
  //         i[2].classList.add("hideDisplay");
  //         i[2].classList.remove("showOpacity");
  //         i[2].classList.add("hideOpacity");
  //
  //         i[1].classList.remove("hideDisplay");
  //         i[1].classList.add("showDisplay");
  //         i[1].classList.remove("hideOpacity");
  //         i[1].classList.add("showOpacity");
  //
  //
  //         i[0].classList.remove("showDisplay");
  //         i[0].classList.add("hideDisplay");
  //         i[0].classList.remove("showOpacity");
  //         i[0].classList.add("hideOpacity");
  //       },1000)
  //     },500)
  //   }
  }
}

function instructionsMobile(c){
  var wr = _('#instruction'),
      i = __('.instruction');
      if(c === "again"){
        wr.style.display = "block";
        setTimeout(function(){
            wr.style.opacity = "0.5";
        },200);
      }
      //phase1
    setTimeout(function(){
          i[0].classList.remove("showOpacity");
          i[0].classList.add("hideOpacity");
          i[1].classList.remove("hideDisplay");
          i[1].classList.add("showDisplay");
        setTimeout(function(){
          i[0].classList.remove("showDisplay");
          i[0].classList.add("hideDisplay");
          i[1].classList.remove("hideOpacity");
          i[1].classList.add("showOpacity");
        },200);
    },3000);
    //phase2
    setTimeout(function(){
      wr.style.opacity = "0";
      setTimeout(function(){
        wr.style.display = "none";
        i[2].classList.remove("showDisplay");
        i[2].classList.add("hideDisplay");
        i[2].classList.remove("showOpacity");
        i[2].classList.add("hideOpacity");

        i[1].classList.remove("hideDisplay");
        i[1].classList.add("showDisplay");
        i[1].classList.remove("hideOpacity");
        i[1].classList.add("showOpacity");
      },500)
  },6200);
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
      lv0 = new LavaLamp(screen.width, screen.height, 10, purple, verde);
    break;
    case 'o':
      console.log("O");
      lv0 = new LavaLamp(screen.width, screen.height, 10, cyan, verde);
    break;
  }
}


/* s */
var c_services_mobile = 0;
function servicesMobile(c){
  var s = __('.sliderwr_services>li');
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
  var i = t.children[2].children[0];
  i.setAttribute('src', 'img/services/' + el + c + '.svg');
}

function loadServices(){
 if(!checkBowser){
 	var s = __('.step'),
      wr = _('#loading'),
      xhrVid = [],
      urlList = [];
 	for(var i =0; i < s.length; i++){
 		var v = document.createElement("VIDEO");
 		v.setAttribute('preload', 'auto');
 		v.setAttribute('loop', ' ');
 		v.setAttribute('autoplay', ' ');
    s[i].appendChild(v);
 	}
  var v = _('.step>video'),
      r = 0,
      a, b = support(v);
    if (" " == b ? a = 0 : "mp4" == b ? a = 1 : "webm" == b && (a = 2), 1 === a) {
      for (var c = 0; c <= s.length-1; c++){
      	urlList.push("assets/services/" + c+ ".mp4");
      }
      for (var c = 0; c < urlList.length; c++){
      	xhrVid[c] = new XMLHttpRequest;
        xhrVid[c].open("GET", urlList[c], !0);
        xhrVid[c].responseType = "blob";
        xhrVid[c].onload = function (e){
          if(this.readyState == 4){
            r+=1;
            var num = Math.round(r*(108/s.length-1));
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
      for(var c = 0; c <= s.length-1; c++){
        urlList.push("assets/services/"+ c+ ".webm");
      }
      for(var c = 0; c < urlList.length; c++) {
        xhrVid[c] = new XMLHttpRequest;
        xhrVid[c].open("GET", urlList[c], !0);
        xhrVid[c].responseType = "blob";
        xhrVid[c].onload = function (e){
        if(this.readyState == 4){
          r+=1;
          var num = Math.round(r*(108/s.length-1));
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
  var v  = __('.step>video'),
      a, b = support(v[0]);
  for (var i = 0; i < v.length; i++) {
    var s = document.createElement("SOURCE");
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

function preventStepsOver(){
  var f = _("#flagPrevent").getBoundingClientRect().x,
      wristp = _('#iconosteps');
      if(f < 0){
        wristp.classList.remove("hideDisplay");
        wristp.classList.add("showDisplayFlex");
      } else {
        wristp.classList.remove("showDisplayFlex");
        wristp.classList.add("hideDisplay");
      }
}

function getFlagV(){
  var f = __('.flagV'),
      x = [],
      ct = (window.innerWidth/2)+100,
      pstp = _('#instruccion'),
      tagline = _('#tagline>p'),
      lastFlag = _('#lastFlag');
  var last = lastFlag.getBoundingClientRect().x;
  for(var i = 0; i < f.length; i++){
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


  if(last < 50){
    tagline.classList.remove("hideOpacity");
    tagline.classList.add("showOpacity");
  }
  if(last > 50){
    tagline.classList.remove("showOpacity");
    tagline.classList.add("hideOpacity");
  }
}

var fSc1 = false, fSc2 = false,
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
        p[5].style.display = "none";
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
        p[5].style.display = "none";
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
        p[5].style.display = "none";
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
        p[5].style.display = "none";
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
        p[5].style.display = "none";
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
        p[5].style.display = "block";
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
        p[5].style.display = "none";
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
        p[5].style.display = "none";
        changeStep(c);
      }
      fSc8 = true;
    break;
  }
}

function changeIcon(c){
  var istp = __('#iconosteps>a>img');

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

  for (var i = 0; i < s.length; i++) {
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

function shuffle(array) {
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

function randomBeforeAfter(){
  var tit = __('.beforeafterTit'),
      img = __('.imgProject'),
      href = __('.beforeafter'),
      arrPr = [];
      for (var i = 0; i < projects.length; i++) {
        arrPr.push(projects[i]);
      }
      arrPr = shuffle(arrPr);
      for (var i = 0; i < tit.length; i++) {
        tit[i].innerHTML = arrPr[i].name;
        img[i].style.backgroundImage = "url(" +arrPr[i].img+")";
        href[i].setAttribute("href", arrPr[i].href);
      }
}
