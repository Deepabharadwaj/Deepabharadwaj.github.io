
var prev_handler = window.onload;
window.onload=function() { // or window.addEventListener("load",function() {
    // Get the modal
  var modal = document.getElementById("myModal");
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    // captionText.innerHTML = this.alt;
  }

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
  if (prev_handler) {
    prev_handler();
  }
}

$(document).click(function(event) {
  //if you click on anything except the modal itself or the "open modal" link, close the modal
  if (!$(event.target).closest("#modal").length) {
    var modal = document.getElementById("myModal");
    console.log(modal.style.display);
  //   if(modal.style.display != "none") 
  //   {
  //     modal.style.display = "none";
  //   }
  }
});