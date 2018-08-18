/*$.post('http://localhost/tracker/update.php', function(response){
  alert("hello");
});

$(document).ready(function(){

   alert("goodbye");

});*/

document.addEventListener("click",function(e) {
    if (openNav==0) {
        if (e.clientX>=175) {
            moveNav();
        }
    }
    
});

var header = document.getElementById("header_collapse");
var headShadow = document.getElementById("header_shadow");
var headButton = document.getElementById("header_button");
var openHead=1;
function moveHead() {
    openHead = (openHead+1)%2;
    var pos;
    if (openHead==0) pos=-120;
    else pos=-5;
    var id=setInterval(move,5);
    function move() {
        if (openHead==0) {
            if (pos>=-5) {
                clearInterval(id);
                header.style.top="-5px";
                headShadow.style.top="81px";
                headButton.style.top="31px";
            }
            pos+=5;
        }
        else {
            if (pos<=-120) {
                clearInterval(id);
                header.style.top=400-scrollY+'px';
                headShadow.style.top=494-scrollY+'px';
                headButton.style.top=436-scrollY+'px';
            }
            pos-=5;
        }
        header.style.top = pos + 'px';
        headShadow.style.top = (pos + 94) + 'px';
        headButton.style.top = (pos + 36) +'px';
    }
}

document.addEventListener("scroll",function() {
    if (scrollY>175&&mouseYHead>=25) {
        header.style.top=175-scrollY+'px';
        headShadow.style.top=269-scrollY+'px';
        headButton.style.top=211-scrollY+'px';
        openHead=1;
    }
    else {
        header.style.top="0px";
        headShadow.style.top="94px";
        headButton.style.top="36px";
        openHead=0;
    }
});

var mouseYHead=0;
document.addEventListener("mousemove",function(e) {
    mouseYHead=e.clientY;
    if (scrollY>300) {
        if (e.clientY<25&&openHead==1) {
            moveHead();
        }
        else if (e.clientY>110&&openNav==1&&openHead==0) {
            moveHead();
        }
    }
})

var openNav=1;
var navBar = document.getElementById("main_nav");
var cover = document.getElementById("cover");
function moveNav() {
    openNav = (openNav+1)%2;
    var pos;
    var coverOp;
    if (openNav==0) {pos=-200;coverOp=0.0;}
    else {pos=-5;coverOp=0.4;}
    var id=setInterval(move,5);
    function move() {
        if (openNav==0) {
            if (pos>=-5) {
                clearInterval(id);
                navBar.style.left="-5px";
                cover.style.opactiy = 0.4;
            }
            pos+=5;
            coverOp+=0.01;
        }
        else {
            if (pos<=-200) {
                clearInterval(id);
                navBar.style.left="-200px";
                cover.style.opactiy = 0;
            }
            pos-=5;
            coverOp-=0.01;
        }
        navBar.style.left = pos + 'px';
        cover.style.opacity = coverOp;
    }
}