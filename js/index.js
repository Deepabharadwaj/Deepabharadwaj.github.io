function replace(location, image)
{
    location.src = image;
    // $(image).fadeTo('slow' , '0.33' );
    // $("#image").stop().animate({opacity: 0},1000,function(){
    //     $(this).css({'background-image': "url('/images/alt_image.png')"})
    //                .animate({opacity: 1},{duration:1000});
    //  });
    
}

var context= {};
var ball = {};
var x=10;
var dx=0.2;
var interval;
var rest_ball = false;
var max_neg = 0;
function init(myCanvas)
{
  context[myCanvas] = myCanvas.getContext('2d');
  interval = setInterval(draw,10, myCanvas);
  rest_ball = false;
  max_neg = 10;
  x=10;
  dx=0.5;
}

function draw(myCanvas)
{
  context[myCanvas].clearRect(0,0, 300,300);
  context[myCanvas].beginPath();
  context[myCanvas].fillStyle="#fdb92d";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  context[myCanvas].arc(40,x,10,0,Math.PI*2,true);
  context[myCanvas].closePath();
  context[myCanvas].fill();
  // Boundary Logic
  if( x< max_neg || x>30) dx=-dx; 
  x+=dx;
  if(rest_ball && x <= -18){
    clearInterval(interval);
  }
}

function kill() {
    max_neg = -20;
    rest_ball = true;
}