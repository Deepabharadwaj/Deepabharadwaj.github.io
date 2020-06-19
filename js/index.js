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
var interval = {};
var rest_ball = {};
var max_neg = {};
var x = {};
var dx = {};

function init(myCanvas)
{
  clearInterval(interval[myCanvas]);
  context[myCanvas] = myCanvas.getContext('2d');
  interval[myCanvas] = setInterval(draw,10, myCanvas);
  rest_ball[myCanvas] = false;
  max_neg[myCanvas] = 10;
  x[myCanvas] =10;
  dx[myCanvas] =0.5;
}

function draw(myCanvas)
{
  context[myCanvas].clearRect(0,0, 300,300);
  context[myCanvas].beginPath();
  context[myCanvas].fillStyle="#fdb92d";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  context[myCanvas].arc(40, x[myCanvas],10,0,Math.PI*2,true);
  context[myCanvas].closePath();
  context[myCanvas].fill();
  // Boundary Logic
  if( x[myCanvas]< max_neg[myCanvas] || x[myCanvas]>30) 
    dx[myCanvas] =- dx[myCanvas]; 
  x[myCanvas] += dx[myCanvas];
  if(rest_ball[myCanvas] && x[myCanvas] <= -18){
    clearInterval(interval[myCanvas]);
  }
}

function kill(myCanvas) {
    max_neg[myCanvas] = -20;
    rest_ball[myCanvas] = true;
}