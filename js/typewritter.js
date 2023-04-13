var curr_str = 0;
var curr_chr = 0;
var mode = 1;
let desc_txt = ['a Unicorn &#129412', 'a UX Designer', 'a 3D Visualizer', 'an Illustrator'];
var speed = 100;

function typeWriter() {
    var box = document.getElementById("typing_text");
    if (curr_chr <= desc_txt[curr_str].length && curr_chr >= 0) {
        box.innerHTML = desc_txt[curr_str].substr(0, curr_chr) + '|';
        curr_chr += mode;
        speed = 50;
    } else {
        if (mode == -1)
        {
            curr_str = (curr_str + 1) % desc_txt.length;
            curr_chr = 0;
            speed = 100;
        } else {
            curr_chr = desc_txt[curr_str].length;
            speed = 1000;
        }
        mode *= -1;
    }
    setTimeout(typeWriter, speed);
}

typeWriter();

udpate_navbar = function() {
    var main_page_visible = ($(window).scrollTop() > $(window).height());
      var navbar = document.querySelectorAll('.navbar');
      navbar.forEach(function (el, idx) {
        if(main_page_visible)
          el.style.backgroundColor = 'white';
        else
          el.style.backgroundColor = "#0000";
      });    
}

window.addEventListener('scroll', udpate_navbar);
