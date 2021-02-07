$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })


var i = 0;
var txt = 'I like to watch the shows and movies that all of my friends are watching. Shows like Game of Thrones and The Last Dance. I trust my friends recommendations more than an algorithm. Plus I like knowing what everyone is talking about!';
var speed = 1;

function typeWriter() {
    console.log("typewritter called")
    var box = document.getElementById("demo");
    setTimeout(typeWriter, 1000);
    var loading = document.getElementById("loading");
    loading.style.display = "none";
    var tb1 = document.getElementById("tb1");
    tb1.style.display = "block";
    if (i < txt.length) {
        box.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

var reset = false;
const updatebox3 = async () => {
    if(reset === false)
    {
        var first = document.getElementById("chat2");
        first.style.display = "none";
        var second = document.getElementById("chat2_new");
        second.style.display = "block";
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
    reset = false;
    setTimeout(updatebox1, 2000);
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
}


