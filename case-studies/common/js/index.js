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
    $("#footer-cs").load("../common/footer-cs.html");
});

$(function(){
    $("#header-cs").load("../common/header-cs.html");
});

