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
