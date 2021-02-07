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

$(allInView);
$(window).scroll(allInView);


function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop()+800;
    var docViewBottom = docViewTop + $(window).height()-200;

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewTop) && (elemTop > $(window).scrollTop()+100));
}

function allInView() {

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
}

window.onload=function() {
  var arrows = document.querySelectorAll('.read-more');
  arrows.forEach(function(arrow) {
    let animation = anime({
      targets: arrow.children,
      translateX: 20,
      duration: 500,
      direction: 'alternate',
      easing: 'linear',
      loop: true
    });
    animation.pause();

    arrow.addEventListener ('mouseover', function hover(){
      animation.play();
    });
    arrow.addEventListener ('mouseleave', function leave(){
      animation.restart();
      animation.pause();
    });
  });
}

$(function(){
      $("#footer").load("common/footer.html"); 
    });
