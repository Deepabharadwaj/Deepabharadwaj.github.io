function BlurCarouselImg(item_id) {
    var item = document.getElementById(item_id);
    item.style.transition = "all 1.5s";
    item.style.transform = "scale(1.05)";
    item.style.filter = "blur(5px)";
}

function ResetCarouselImg(item_id) {
    var item = document.getElementById(item_id);
    item.style.transform = "scale(1.0)";
    item.style.filter = "blur(0px)";

}

function initStickyHero(hero) {
    var observer = new IntersectionObserver(stickyCallback.bind(hero), {threshold: [0, 0.1, 1]});
    observer.observe(hero.content);
  };
  
  function stickyCallback(entries) {
    var bool = entries[0].intersectionRatio > 0;
    Util.toggleClass(this.element, 'sticky-hero--media-is-fixed', bool);
  };

  $(function(){
    $("#Modal").load("../common/modal.html");
  });
  
window.addEventListener('scroll', function() {
  var top = $(window).scrollTop();
  var height = window.innerHeight;
  var total  = document.body.offsetHeight;
  var progress = (top + height*0.1)  * 100.0 / (total - height*0.9);
  var w =  progress + '%';
  $('.pbar-overlay').css({"width": w});

  console.log(top, height, total, progress);
  // if(window.innerWidth > 500)
  //   return;
  if(top < height)
  {
    $('.gtt-button').addClass("invisible");
    $('.gtt-button').removeClass("visible");
  } else {
    $('.gtt-button').addClass("visible");
    $('.gtt-button').removeClass("invisible");
  }
});
  