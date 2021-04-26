function goto_el(el){
    window.scrollTo({
        left : 0,
        top : $(el).offset().top,
        behavior: 'smooth'
    });
}

let lastKnownScrollPosition = 0;
let dir = 0;
let ticking = false;

function doSomething(scrollPos, dir) {
    let page_top = window.scrollY;
    let height = $(window).height();
    if(dir == -1)
    {
        if(scrollPos < height - 200)
        {
            goto_el("#projects");
            console.log("called");
            ticking = true;
        }
    } 
    else if(dir == 1){
        if(scrollPos < height - 50)
        {
            goto_el("#hello");
            console.log("called");
            ticking = true;
        }
    }
    // console.log(scrollPos, dir, page_top, height);
}

document.addEventListener('scroll', function(e) {
  dir = lastKnownScrollPosition > window.scrollY ? 1 : lastKnownScrollPosition < window.scrollY ? -1 : 0;
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(lastKnownScrollPosition, dir);
    });
  }
  if(window.scrollY >= $("#projects").offset().top - 10 || window.scrollY == 0)
    ticking = false;
});