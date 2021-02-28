$(function(){
  $("#Modal").load("../common/modal.html");
});

set_onclick = function(elem , func) {
  if(elem)
    elem.onclick = func
  else
    setTimeout(set_onclick, 200, elem, func);
}
// Modal handling
window.addEventListener('load', function() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    
    set_onclick(span, function() {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    });
    set_onclick(modal, function(event) {
      if (!$(event.target).closest("#img01").length)
      {
        if (!$(event.target).closest("#bar-wrap").length){
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
            reset_zoom();
        }
      }
    });

    // set up on click model-img class
    var imgs = document.getElementsByClassName('modal-img');
    Array.from(imgs).forEach(function (img) {
      img.onclick = function(){
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        modal.style.display = "block";
        modalImg.src = this.src;
      // captionText.innerHTML = this.alt;
      }
    });


    let slider = document.querySelector("#slider"),
      bar = document.querySelector("#zoom-bar-cont"),
      img = document.querySelector("#img01");

    //Min-max function to set up slider boundaries
    function valBetween(v, min, max) {
      return Math.min(max, Math.max(min, v));
    }
    //function to define zoom bottom half and top half ranges
    let setZoomVal = function(val, percent, botVal = true) {
      return botVal
        ? valBetween(percent * (1 - val) / 0.5, 0, 1 - val) + val
        : valBetween(percent * (val * 2 - 2), val - 1, val * 2 - 2) - (val - 2);
    };
    function sliderInit(e) {
      e.preventDefault();
      document.addEventListener("mousemove", sliderDrag);
      document.addEventListener("mouseup", e => {
        document.removeEventListener("mousemove", sliderDrag);
      });
    }

    function sliderDrag(e) {
      //Variables aren't set as global to account for possible window resize
      let x0 = bar.getBoundingClientRect().left;
      let width = bar.offsetWidth;
      let dX = e.clientX - x0;
      let dPercent = dX / width;
      let sliderOff = slider.offsetLeft;

      slider.style.left = valBetween(dX / width * 100, 0, 100) + "%";

      img.style.transform =
        "scale(" +
        (sliderOff / width < 0.5
          ? setZoomVal(0.4, dPercent)
          : setZoomVal(3, dPercent, false));
      +")";
    }

    function reset_zoom(){
      img.style.transform = "scale(1)";
      slider.style.left = "50%";
    }
    function reset(){
      setTimeout(reset_zoom, 500);
    }

    function update_zoom(delta){
      let bar_width = bar.offsetWidth;
      let slider_pos = slider.offsetLeft;
      let curr_per = slider_pos / bar_width;
      let new_per = valBetween(curr_per + delta, 0.0, 1.0);

      slider.style.left = new_per * 100  + "%";
      var img_scale = new_per;
      img.style.transform =
        "scale(" +
        (img_scale < 0.5
          ? setZoomVal(0.4, img_scale)
          : setZoomVal(3, img_scale, false));
      +")";
    }
    function zoom_out() {
      update_zoom(-0.05);
    }

    function zoom_in() {
      update_zoom(0.05);
    }

    slider.addEventListener("mousedown", sliderInit);
    bar.addEventListener("mousedown", sliderInit);

    let close_btn = document.getElementsByClassName("close")[0];
    let zoom_in_btn = document.getElementById("zoom-in");
    let zoom_out_btn = document.getElementById("zoom-out");
    close_btn.addEventListener("mousedown", reset);
    zoom_in_btn.addEventListener("mousedown", zoom_in);
    zoom_out_btn.addEventListener("mousedown", zoom_out);
});