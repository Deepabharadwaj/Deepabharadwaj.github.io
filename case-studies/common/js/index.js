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


// Model handling
var prev_handler = window.onload; // in case we override window.onload
window.onload=function() { // or window.addEventListener("load",function() {
    // Get the modal
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  modal.onclick = function(event) {
    console.log("clicked");
    if (!$(event.target).closest("#img01").length)
    {
      modal.style.display = "none";
    }
  }

  // set up on click model-img class
  var imgs = document.getElementsByClassName('modal-img');
  Array.from(imgs).forEach(function (img) {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
    // captionText.innerHTML = this.alt;
    }
  });

  // in case we override window.onload
  if (prev_handler) {
    prev_handler();
  }
}
