function BlurCarouselImg(item_id) {
    var item = document.getElementById(item_id);
    item.style.transform = "scale(1.05)";
    item.style.filter = "blur(5px)";
}

function ResetCarouselImg(item_id) {
    var item = document.getElementById(item_id);
    item.style.transform = "scale(1.0)";
    item.style.filter = "blur(0px)";

}
