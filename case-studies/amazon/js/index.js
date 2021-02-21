var reset = false;
var dispayed = false;
const updatebox3 = async () => {
    if(reset === false)
    {
        var first = document.getElementById("chat2");
        first.style.display = "none";
        var second = document.getElementById("chat2_new");
        second.style.display = "block";
        dispayed = true;
    }
}

const updatebox2 = async () => {
    if(reset === false)
    {
        var first = document.getElementById("chat2");
        first.style.display = "block";
        setTimeout(updatebox3, 2000);
    }
}

const updatebox1 = async () => {
    if(reset === false)
    {
        var first = document.getElementById("chat1");
        first.style.display = "none";
        var second = document.getElementById("chat1_new");
        second.style.display = "block";
        setTimeout(updatebox2, 500);
    }
}

function chatupdate() {
    if(dispayed === false)
    {
        reset = false;
        setTimeout(updatebox1, 2000);
    }
}

function chatreset() {
    var first = document.getElementById("chat1");
    first.style.display = "block";
    var second = document.getElementById("chat1_new");
    second.style.display = "none";
    var third = document.getElementById("chat2");
    third.style.display = "none";
    var fourth = document.getElementById("chat2_new");
    fourth.style.display = "none";
    reset = true;
    dispayed = false;
}

var observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true && entries[0]['intersectionRatio'] > 0.5){
      chatupdate();
    } else {
      chatreset();
    }
}, { threshold: [0.1, 1] });

observer.observe(document.querySelector("#chatwindow"));


var state = 2;
function test_func(){
    var img1 = document.getElementById("img_holder_1_1");
    var img2 = document.getElementById("img_holder_1_2");
    var img3 = document.getElementById("img_holder_1_3");
    var caption = document.getElementById("img_holder_1_caption");
    switch(state){
        case 0:
            first_click(img2, img1, img3, 2, 1);
            caption.innerHTML = "Image 1"
            state = 1;
            break;
        case 1:
            first_click(img1, img3, img2, 0, 2);
            caption.innerHTML = "Image 3"
            state = 2;
            break;
        case 2:
            first_click(img3, img2, img1, 1, 0);
            caption.innerHTML = "Image 2"
            state = 0;
            break;
        default:
            break;
    }
}
function right_click(){
    state +=1;
    state %=3;
    test_func();
}
let l_btn = document.getElementById("img_holder_1_left");
l_btn.addEventListener("mousedown", test_func);

let r_btn = document.getElementById("img_holder_1_right");
r_btn.addEventListener("mousedown", right_click);


function first_click(elem1, elem2, elem3, click_state1, click_state3){
    elem1.classList.remove("img_holder_active_3");
    elem1.classList.add("img_holder_inactive");
    elem1.parentElement.style.zIndex ="1";
    elem1.onclick = function(){
        state = click_state1;
        test_func();
    }

    elem3.classList.remove("img_holder_active_3");
    elem3.classList.add("img_holder_inactive");
    elem3.parentElement.style.zIndex ="1";
    elem3.onclick = function(){
        state = click_state3;
        test_func();
    }

    elem2.classList.remove("img_holder_inactive");
    elem2.classList.add("img_holder_active_3");
    elem2.parentElement.style.zIndex ="101";
    elem2.onclick = second_click;
}

function second_click(){
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = this.src;
}

test_func()
