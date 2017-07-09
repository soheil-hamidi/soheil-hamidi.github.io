$(document).ready(function(ev) {
  $('#custom_carousel').on('slide.bs.carousel', function(evt) {
    $('#custom_carousel .controls li.active').removeClass('active');
    $('#custom_carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active');
    $('#custom_carousel .controls img').addClass('grayscale-filter');
    $('#custom_carousel .controls img:eq(' + $(evt.relatedTarget).index() + ')').removeClass('grayscale-filter');
  })
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$('#third').click(async function() {
  $('#first').addClass('animated slideOutUp');
  $('#bio-text').addClass('animated fadeOut');
  $('.fa-angle-down').removeClass('infinite fadeInDown');
  $('.fa-angle-down').addClass('fadeOutDown');
  await sleep(1000);
  $('html,body').animate({
      scrollTop: $('#custom_navbar').offset().top
    },
    1000);
  await sleep(1000);
  $('#first').removeClass('animated slideOutUp');
  $('#bio-text').removeClass('animated fadeOut');
  $('.fa-angle-down').removeClass('fadeOutDown');
  $('.fa-angle-down').addClass('infinite fadeInDown');
});

$('#about').click(function() {
  $('html,body').animate({
      scrollTop: $('#first').offset().top
    },
    1000);
});

$('.ball').click(async function() {
  element = '#' + this.id;
  $(element).addClass('animated bounce');
  await sleep(1000);
  $(element).removeClass('animated bounce');
});
