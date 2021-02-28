$(function(){
  $("#footer").load("common/footer.html"); 
});

$(function(){
  $("#header").load("common/header.html"); 
});

$(function(){
  $("#footer-cs").load("../common/footer-cs.html");
});

$(function(){
  $("#header-cs").load("../common/header-cs.html");
});

function replace(location, image){ 
  $(location).attr("src", image);
}

class Ball{
  constructor(context, interval) {
    this.context = context;
    this.interval= interval;
    this.rest_ball = false;
    this.max_neg = 10;
    this.x = 10;
    this.dx = 0.5;
  }
}

var ball = {}; 

function init(myCanvas)
{
  const canvas = document.getElementById(myCanvas);
  if(!ball[myCanvas] || ball[myCanvas].interval == false){
    ball[myCanvas] = new Ball(canvas.getContext('2d'), setInterval(draw,10, myCanvas))
  } else {
    ball[myCanvas].x = 10;
    ball[myCanvas].dx = 0.5;
    ball[myCanvas].max_neg = 10;
    ball[myCanvas].rest_ball = false;
  }
}

function draw(myCanvas)
{
  if (is_touch_enabled())
    return;
  var curr_ball = ball[myCanvas];
  curr_ball.context.clearRect(0,0, 300,300);
  curr_ball.context.beginPath();
  curr_ball.context.fillStyle="#fdb92d";
  curr_ball.context.arc(25, curr_ball.x,8,0,Math.PI*2,true);
  curr_ball.context.closePath();
  curr_ball.context.fill();
  // Boundary Logic
  if( curr_ball.x< curr_ball.max_neg || curr_ball.x>30) 
     curr_ball.dx =- curr_ball.dx; 
  curr_ball.x += curr_ball.dx;
  if(curr_ball.rest_ball && curr_ball.x <= -18){
    clearInterval(curr_ball.interval);
    curr_ball.interval = false;
  }
}

function kill(myCanvas) {
  var curr_ball = ball[myCanvas];
  curr_ball.max_neg = -30;
  curr_ball.rest_ball = true;
  curr_ball.dx *=3;
}

function is_touch_enabled() { 
  return ( 'ontouchstart' in window ) ||  
         ( navigator.maxTouchPoints > 0 ) ||  
         ( navigator.msMaxTouchPoints > 0 ); 
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop()+800;
    var docViewBottom = docViewTop + $(window).height()-200;

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewTop) && (elemTop > $(window).scrollTop()+100));
}

function isScrolledIntoView2(elem) {
  var $window = $(window),
      docViewTop = $window.scrollTop(),
      docViewBottom = docViewTop + $window.height(),
      elemTop = $(elem).offset().top - 100,
      elemBottom = elemTop + $(elem).outerHeight() + 125;
  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

var anime_dict = {};

allInView = function () {

	var elements = document.getElementsByClassName("highlight");

	var i;
	for (i = 0; i < elements.length; i++) {
		if (isScrolledIntoView(elements[i])) {
  			elements[i].style.backgroundPosition = "-100% 0";
		}
		else {
			elements[i].style.backgroundPosition = "0% 0";
		}
  }
 
  if(is_touch_enabled()){
    var arrows = document.querySelectorAll('.read-more');
    for (i = 0; i < arrows.length; i++) {
      if (isScrolledIntoView2(arrows[i])) {
        anime_dict[i].play();
      }
      else {
        anime_dict[i].restart();
        anime_dict[i].pause();
      }
    }
  }
}

// $(window).scroll(allInView);

var headings = ["While we wait &#x1F605; , Deepa's Fun Fact #1",
                "While we wait &#x1F605; , Deepa’s Fun Fact #2",
                "While we wait &#x1F605; , Deepa’s Fun Fact #3",
                "While we wait &#x1F605; , Deepa's Fun Fact #4",
                "While we wait &#x1F605; , Deepa’s Fun Fact #5",
                "While we wait &#x1F605; , Deepa’s Fun Fact #6",];
var contents = ["I’m currently learning kickboxing, hope to become a part-time kickboxing instructor on the weekends soon. Gotta keep practicing my jabs & crosses though! &#129354;&#127939;&#8205;&#9792;&#65039;&#128074; ",
                "I’m obsessed with corgis, and adopted a 6 month old corgi puppy called Strippaw. Check out his instagram page @strippawthecorgi, don’t forget to follow! &#128054; &#128248;",
                "I’m an adrenaline junkie, gone skydiving, rock climbing, skiing, paragliding & ziplining. Post Covid, bungee jumping off the Grand Canyon is next! &#127938;&#127964;&#65039;&#128170;",
                "Been designing buildings for a couple of years across India & the USA, one of my competition entries for an Eco Park Gateway in India was actually built! &#129304; &#128119;&#8205;&#9792;&#65039; &#127959;&#65039;",
                "My partner is a robotics engineer, we both absolutely love collaborating on our projects. It’s an epic combination of design + tech! &#129302; &#129299; &#128591; ",
                "I love learning about different technologies and how to use them to design more creatively and efficiently. Currently learning how to code in Javascript, and animate in After Effects! &#128187; &#128588; &#128587;&#8205;&#9792;&#65039; "
              ];

var nav_active_id = "nav-about";

var time_ready = Date.now();
function wait_loader() {
  var num = Math.floor((Math.random() * headings.length));
  $("#fun-heading").html(headings[num]);
  $("#fun-content").html(contents[num]);
  time_ready = Date.now();
}

const hide_fun = async () => {
  const loader = document.querySelector(".loader");
  if(loader && !loader.classList.contains("hidden") ){
    loader.className += " hidden"; // class "loader hidden"  
  }
}

set_active = function() {
  var nav_active = document.getElementById(nav_active_id);
  if(nav_active)
    nav_active.classList.add("active");
  else
    setTimeout(set_active, 200);
}

window.addEventListener('load', function() {
  var time_left = 2000 - Date.now() + time_ready;
  if(time_left > 0)
    setTimeout(hide_fun, time_left);
  else
    hide_fun();
  var arrows = document.querySelectorAll('.read-more');
  var i;
	for (i = 0; i < arrows.length; i++) {
    var arrow = arrows[i];
    let animation = anime({
      targets: arrow.children,
      translateX: 20,
      duration: 500,
      direction: 'alternate',
      easing: 'linear',
      loop: true
    });
    anime_dict[i] = animation;
    animation.pause();

    arrow.addEventListener ('mouseover', function hover(){
      animation.play();
    });
    arrow.addEventListener ('mouseleave', function leave(){
      animation.restart();
      animation.pause();
    });
  }
  
  set_active();
  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
   });
  $(allInView);
  window.addEventListener('scroll', allInView);
});
