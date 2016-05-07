var main = document.querySelector('.main');
var oLis = document.querySelectorAll('.main>ul>li');
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
window.onload = function () {
    oLis[0].firstElementChild.id = "liChild1";
}
if(winW/winH<desW/desH){
    main.style.webkitTransform = 'scale('+winH/desH+')';
}else{
    main.style.webkitTransform = 'scale('+winW/desW+')';
}
[].forEach.call(oLis,function(){
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener('touchstart',start,false);
    oLi.addEventListener('touchmove',move,false);
    oLi.addEventListener('touchend',end,false);
});
function start(e){
    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    e.preventDefault();
    this.flag = true;
    var moveX = e.changedTouches[0].pageX;
    var moveY = e.changedTouches[0].pageY;
    var movePos = moveY - this.startY;
    if(Math.abs(moveX-this.startX)>Math.abs(movePos)){
        this.flag = false;
        return;
    }
    var index = this.index;
    var lastItem = oLis.length - 1;
    [].forEach.call(oLis,function(){
        if(index!=arguments[1]){
            arguments[0].style.display = 'none';
        }
        arguments[0].className = '';
        arguments[0].firstElementChild.id='';
    })
    if(movePos>0){
        var moveLen = -480 + movePos;
        this.prevsIndex = index == 0 ? lastItem : index -1;
        oLis[this.prevsIndex].style.webkitTransform = 'translateY('+moveLen+'px)';
    }else if(movePos<0){
        var moveLen = 480 + movePos;
        this.prevsIndex = index == lastItem ? 0 : index+1;
        oLis[this.prevsIndex].style.webkitTransform = 'translateY('+moveLen+'px)';
    }
    oLis[this.prevsIndex].style.display = 'block';
    oLis[this.prevsIndex].className = 'zIndex';
    this.style.webkitTransform = 'scale('+(1-Math.abs(movePos/winH)/2)+') translate(0,'+movePos+'px)';
}
function end(e){
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform = 'translate(0,0)';
        oLis[this.prevsIndex].style.webkitTransition = '1s';
        oLis[this.prevsIndex].addEventListener('webkitTransitionEnd',function(){
            if (e.target.tagName == "LI") {
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id = "liChild" + (this.index + 1);
        },false);
        this.flag = false;
    }
}
var musicBtn = document.getElementById("musicBtn");
var musicAudio = document.getElementById("audio1");
window.addEventListener("load", function () {
    musicAudio.play();
    musicAudio.addEventListener("canplay", function () {
        musicBtn.style.display = "block";
        musicBtn.className = "music move";
    }, false);
    musicBtn.addEventListener("touchend", function () {
        if (musicAudio.paused) {
            musicAudio.play();
            musicBtn.className = "music move";
        } else {
            musicAudio.pause();
            musicBtn.className = "music";
        }
    }, false);
}, false);
