TweenLite.defaultEase = Linear.easeNone;
var tl = new TimelineLite()

tl.to(".box b", 3.05, {x:480, repeat:-1, yoyo:true})
  .to(".box b", 3.4, {y:280, repeat:-1, yoyo:true}, 0)

//https://greensock.com/forums/topic/14252-randommovementofdomelementsbyusinggreensock/