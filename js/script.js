$(document).ready(function(ev) {
  $('#custom_carousel').on('slide.bs.carousel', function(evt) {
    $('#custom_carousel .controls li.active').removeClass('active');
    $('#custom_carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active');
    $('#custom_carousel .controls img').addClass('grayscale-filter');
    $('#custom_carousel .controls img:eq(' + $(evt.relatedTarget).index() + ')').removeClass('grayscale-filter');
  })
});

$('.ball').click(function() {
  $('#' + this.id).animateCss('bounce');
});

$('.places').click(function() {
  var element_id = '#' + this.id;
  $('.places').removeClass('places_active');
  $(element_id).addClass('places_active');
  if (element_id === '#hackathons') {
    $('.controls').addClass('hide');
    $('#hackathon-controls').removeClass('hide');
    $('#hackathon-controls').animateCss('fadeIn');
  } else if (element_id === '#work-experiences') {
    $('.controls').addClass('hide');
    $('#work-controls').removeClass('hide');
    $('#work-controls').animateCss('fadeIn');
  } else if (element_id === '#projects') {
    $('.controls').addClass('hide');
    $('#projects-controls').removeClass('hide');
    $('#projects-controls').animateCss('fadeIn');
  }
});

$('#third').click(async function() {
  $('#avatar-col,#about,#experiences,#custom_carousel').addClass('hide');

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
  $('.fa-angle-down').addClass('infinite fadeInDown');
  $('.fa-angle-down').removeClass('fadeOutDown');

  $('#avatar-col,#about,#experiences,#custom_carousel').removeClass('hide');

  $('#avatar-col').addClass('animated flipInY');
  $('#about').addClass('animated fadeIn');
  $('#experiences').addClass('animated flipInX');
  $('#custom_carousel').addClass('animated fadeIn');

  await sleep(1000);

  $('#avatar-col').removeClass('animated flipInY');
  $('#about').removeClass('animated fadeIn');
  $('#experiences').removeClass('animated flipInX');
  $('#custom_carousel').removeClass('animated fadeIn');
});

$('#about').click(async function() {
  $('#first,#bio-text,.fa-angle-down').addClass('hide');

  $('#avatar-col').addClass('animated flipOutY');
  $('#about').addClass('animated fadeOut');
  $('#experiences').addClass('animated flipOutX');
  $('#custom_carousel').addClass('animated fadeOut');

  await sleep(1000);

  $('html,body').animate({
      scrollTop: $('#first').offset().top
    },
    1000);

  await sleep(1000);

  $('#avatar-col').removeClass('animated flipOutY');
  $('#about').removeClass('animated fadeOut');
  $('#experiences').removeClass('animated flipOutX');
  $('#custom_carousel').removeClass('animated fadeOut');

  $('#first,#bio-text,.fa-angle-down').removeClass('hide');

  $('#first').addClass('animated slideInDown');
  $('#bio-text').addClass('animated fadeIn');
  $('.fa-angle-down').addClass('infinite fadeInDown');

  await sleep(1000);

  $('#first').removeClass('animated slideInDown');
  $('#bio-text').removeClass('animated fadeIn');
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$.fn.extend({
  animateCss: function(animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});
