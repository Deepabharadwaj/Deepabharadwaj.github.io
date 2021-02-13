$(function(){
  $("#Modal").load("../common/modal.html");
});

// Modal handling
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
      if (!$(event.target).closest("#img01").length)
      {
        if (!$(event.target).closest("#bar-wrap").length){
            modal.style.display = "none";
            reset_zoom();
        }
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
      console.log(img.style.transform);
    }

    function update_zoom(delta){
      let bar_width = bar.offsetWidth;
      let slider_pos = slider.offsetLeft;
      let curr_per = slider_pos / bar_width;
      let new_per = valBetween(curr_per + delta, 0.1, 0.9);
      console.log("bar_width", bar_width, "slider_pos", slider_pos,"curr_per", curr_per, "new_per", new_per);
      // let sliderOff = valBetween(slider.offsetLeft - 2.5 + dPercent * 100, 0, 100);

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
    console.log(zoom_in_btn);
    console.log(zoom_out_btn);
    close_btn.addEventListener("mousedown", reset);
    zoom_in_btn.addEventListener("mousedown", zoom_in);
    zoom_out_btn.addEventListener("mousedown", zoom_out);

    // in case we override window.onload
    if (prev_handler) {
      prev_handler();
    }
}