/**
 * Site-wide behavior: nav loading, loader splash, nav-ball animation,
 * scroll highlights, and read-more arrow animation.
 *
 * Globals (intentionally exposed; referenced from inline HTML handlers):
 *   - wait_loader()                       loader splash content
 *   - replace(el, src)                    swap an <img> src
 *   - init(canvasId), kill(canvasId)      nav-ball hover animation
 *   - nav_active_id                       page-set hint for which nav item is active
 */

/* -------------------------------------------------------------------------- */
/* Partials: header, footer (and case-study variants)                          */
/* -------------------------------------------------------------------------- */
$(function () {
  $('#header').load('common/header.html');
  $('#footer').load('common/footer.html');
  $('#header-cs').load('../common/header-cs.html');
  $('#footer-cs').load('../common/footer-cs.html');
});

/* -------------------------------------------------------------------------- */
/* Tiny image swap helper used by inline onmouseover/onmouseout attributes     */
/* -------------------------------------------------------------------------- */
function replace(el, src) {
  $(el).attr('src', src);
}

/* -------------------------------------------------------------------------- */
/* Bouncing-ball nav hover animation                                           */
/* -------------------------------------------------------------------------- */
function isTouchEnabled() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function Ball(context, intervalId) {
  this.context = context;
  this.interval = intervalId;
  this.rest_ball = false;
  this.max_neg = 10;
  this.x = 10;
  this.dx = 0.5;
}

var ball = {};

function init(canvasId) {
  var canvas = document.getElementById(canvasId);
  if (!ball[canvasId] || ball[canvasId].interval === false) {
    ball[canvasId] = new Ball(
      canvas.getContext('2d'),
      setInterval(drawBall, 10, canvasId)
    );
  } else {
    var b = ball[canvasId];
    b.x = 10;
    b.dx = 0.5;
    b.max_neg = 10;
    b.rest_ball = false;
  }
}

function drawBall(canvasId) {
  if (isTouchEnabled()) return;
  var b = ball[canvasId];
  b.context.clearRect(0, 0, 300, 300);
  b.context.beginPath();
  b.context.fillStyle = '#fdb92d';
  b.context.arc(25, b.x, 8, 0, Math.PI * 2, true);
  b.context.closePath();
  b.context.fill();

  if (b.x < b.max_neg || b.x > 30) b.dx = -b.dx;
  b.x += b.dx;
  if (b.rest_ball && b.x <= -18) {
    clearInterval(b.interval);
    b.interval = false;
  }
}

function kill(canvasId) {
  var b = ball[canvasId];
  b.max_neg = -30;
  b.rest_ball = true;
  b.dx *= 3;
}

/* -------------------------------------------------------------------------- */
/* Loader splash (random fun fact while the page boots)                        */
/* -------------------------------------------------------------------------- */
var FUN_FACTS = [
  {
    heading: "While we wait &#x1F605; , Deepa's Fun Fact #1",
    content:
      "I’m currently learning kickboxing, hope to become a part-time kickboxing instructor on the weekends soon. Gotta keep practicing my jabs & crosses though! &#129354;&#127939;&#8205;&#9792;&#65039;&#128074; ",
  },
  {
    heading: "While we wait &#x1F605; , Deepa’s Fun Fact #2",
    content:
      "I’m obsessed with corgis, and adopted a 6 month old corgi puppy called Strippaw. Check out his instagram page @strippawthecorgi, don’t forget to follow! &#128054; &#128248;",
  },
  {
    heading: "While we wait &#x1F605; , Deepa’s Fun Fact #3",
    content:
      "I’m an adrenaline junkie, gone skydiving, rock climbing, skiing, paragliding & ziplining. Post Covid, bungee jumping off the Grand Canyon is next! &#127938;&#127964;&#65039;&#128170;",
  },
  {
    heading: "While we wait &#x1F605; , Deepa's Fun Fact #4",
    content:
      "Been designing buildings for a couple of years across India & the USA, one of my competition entries for an Eco Park Gateway in India was actually built! &#129304; &#128119;&#8205;&#9792;&#65039; &#127959;&#65039;",
  },
  {
    heading: "While we wait &#x1F605; , Deepa’s Fun Fact #5",
    content:
      "My partner is a robotics engineer, we both absolutely love collaborating on our projects. It’s an epic combination of design + tech! &#129302; &#129299; &#128591; ",
  },
  {
    heading: "While we wait &#x1F605; , Deepa’s Fun Fact #6",
    content:
      "I love learning about different technologies and how to use them to design more creatively and efficiently. Currently learning how to code in Javascript, and animate in After Effects! &#128187; &#128588; &#128587;&#8205;&#9792;&#65039; ",
  },
];

var loaderReadyAt = Date.now();

function wait_loader() {
  var pick = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
  $('#fun-heading').html(pick.heading);
  $('#fun-content').html(pick.content);
  loaderReadyAt = Date.now();
}

function hideLoader() {
  var loader = document.querySelector('.loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
  }
}

/* -------------------------------------------------------------------------- */
/* Active nav state — pages set `nav_active_id` inline before this runs        */
/* -------------------------------------------------------------------------- */
var nav_active_id = 'nav-about';

function setActiveNav() {
  var el = document.getElementById(nav_active_id);
  if (el) {
    el.classList.add('active');
  } else {
    setTimeout(setActiveNav, 200);
  }
}

function bindNavToggle() {
  var toggle = document.getElementById('toggle');
  if (toggle) {
    $('#toggle').click(function () {
      $(this).toggleClass('active');
    });
  } else {
    setTimeout(bindNavToggle, 200);
  }
}

/* -------------------------------------------------------------------------- */
/* Scroll-driven highlight + read-more arrow nudges                            */
/* -------------------------------------------------------------------------- */
function isHighlightInView(el) {
  var docViewTop = $(window).scrollTop() + 800;
  var elemTop = $(el).offset().top;
  return elemTop <= docViewTop && elemTop > $(window).scrollTop() + 100;
}

function isReadMoreInView(el) {
  var $window = $(window);
  var docViewTop = $window.scrollTop();
  var docViewBottom = docViewTop + $window.height();
  var elemTop = $(el).offset().top - 100;
  var elemBottom = elemTop + $(el).outerHeight() + 125;
  return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

var arrowAnimations = {};

function updateScrollHighlights() {
  var highlights = document.getElementsByClassName('highlight');
  for (var i = 0; i < highlights.length; i++) {
    highlights[i].style.backgroundPosition = isHighlightInView(highlights[i])
      ? '-100% 0'
      : '0% 0';
  }

  if (isTouchEnabled()) {
    var arrows = document.querySelectorAll('.read-more');
    for (var j = 0; j < arrows.length; j++) {
      if (isReadMoreInView(arrows[j])) {
        arrowAnimations[j].play();
      } else {
        arrowAnimations[j].restart();
        arrowAnimations[j].pause();
      }
    }
  }
}

function bindReadMoreAnimations() {
  var arrows = document.querySelectorAll('.read-more');
  arrows.forEach(function (arrow, i) {
    var animation = anime({
      targets: arrow.children,
      translateX: 20,
      duration: 500,
      direction: 'alternate',
      easing: 'linear',
      loop: true,
    });
    arrowAnimations[i] = animation;
    animation.pause();

    arrow.addEventListener('mouseover', function () {
      animation.play();
    });
    arrow.addEventListener('mouseleave', function () {
      animation.restart();
      animation.pause();
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Boot                                                                        */
/* -------------------------------------------------------------------------- */
window.addEventListener('load', function () {
  var LOADER_MIN_MS = 2000;
  var elapsed = Date.now() - loaderReadyAt;
  if (elapsed < LOADER_MIN_MS) {
    setTimeout(hideLoader, LOADER_MIN_MS - elapsed);
  } else {
    hideLoader();
  }

  bindReadMoreAnimations();
  setActiveNav();
  bindNavToggle();
  updateScrollHighlights();
  window.addEventListener('scroll', updateScrollHighlights);
});
