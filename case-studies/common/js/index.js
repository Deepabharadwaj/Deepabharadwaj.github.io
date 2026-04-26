/**
 * Case-study chrome: image modal partial loading, scroll progress bar,
 * back-to-top button, and "next projects" carousel hover effects.
 *
 * Globals (referenced from inline HTML handlers in case-study pages):
 *   - BlurCarouselImg(id), ResetCarouselImg(id)
 */

/* Hover blur for the next-projects carousel covers */
function BlurCarouselImg(itemId) {
  var item = document.getElementById(itemId);
  if (!item) return;
  item.style.transition = 'all 1.5s';
  item.style.transform = 'scale(1.05)';
  item.style.filter = 'blur(5px)';
}

function ResetCarouselImg(itemId) {
  var item = document.getElementById(itemId);
  if (!item) return;
  item.style.transform = 'scale(1.0)';
  item.style.filter = 'blur(0px)';
}

/* Image modal partial */
$(function () {
  $('#Modal').load('../common/modal.html');
});

/* Scroll progress bar + back-to-top visibility */
window.addEventListener('scroll', function () {
  var top = $(window).scrollTop();
  var height = window.innerHeight;
  var total = document.body.offsetHeight;
  var progress = ((top + height * 0.1) * 100.0) / (total - height * 0.9);
  $('.pbar-overlay').css({ width: progress + '%' });

  if (top < height) {
    $('.gtt-button').addClass('invisible').removeClass('visible');
  } else {
    $('.gtt-button').addClass('visible').removeClass('invisible');
  }
});
