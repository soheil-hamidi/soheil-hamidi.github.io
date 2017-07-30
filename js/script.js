$(document).ready(function() {

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getPlacesId(index) {
    return "#" + $('#experience .row .places')[index].id
  }

  function checkLocation(index) {
    if (index < 4 && $('#hackathon-controls').hasClass('hide')) {
      $('.places').removeClass('places_active');
      $(getPlacesId(0)).addClass('places_active');
      $('.controls').addClass('hide');
      $('#hackathon-controls').removeClass('hide');
      $('#hackathon-controls').animateCss('fadeIn');
    } else if (index < 8 && index > 3 && $('#work-controls').hasClass('hide')) {
      $('.places').removeClass('places_active');
      $(getPlacesId(1)).addClass('places_active');
      $('.controls').addClass('hide');
      $('#work-controls').removeClass('hide');
      $('#work-controls').animateCss('fadeIn');
    } else if (index > 7 && $('#projects-controls').hasClass('hide')) {
      $('.places').removeClass('places_active');
      $(getPlacesId(2)).addClass('places_active');
      $('.controls').addClass('hide');
      $('#projects-controls').removeClass('hide');
      $('#projects-controls').animateCss('fadeIn');
    }
  }

  async function techAnimation(target) {
    $('.tooltip-container').children().addClass('hide');
    await sleep(500);
    var tech = target.children();
    for (i = 0; i < tech.length; i++) {
      if ($(tech[i]).hasClass('hide')) {
        $(tech[i]).animateCssShow('fadeIn');
      }
      await sleep(50);
    }
  }

  $('[data-toggle="tooltip"]').tooltip();

  $('.carousel').bcSwipe({
    threshold: 100
  });

  $('.ball').click(function() {
    $(this).animateCss('bounce');
    var color = $(this).css('backgroundColor');
    $('#avatar-main').removeClass('colorChange');
    $('#my-name').removeClass('textColorChange');
    $('#avatar-main').css('backgroundColor', color);
    $('#my-name').css('color', color);
    ga('send', 'event', 'Balls', 'clicked', 'Ball color: ' + this.id.split('-')[1]);
  });

  $('#custom_carousel').on('slide.bs.carousel', function(evt) {
    var element = $(evt.relatedTarget)
    techAnimation(element.find('.content .tooltip-container'));
    checkLocation(element.index());
    $('#custom_carousel .controls li.active').removeClass('active');
    $('#custom_carousel .controls li:eq(' + element.index() + ')').addClass('active');
    $('#custom_carousel .controls img').addClass('grayscale-filter');
    $('#custom_carousel .controls img:eq(' + element.index() + ')').removeClass('grayscale-filter');
  });

  $('.places').click(function() {
    var element_id = '#' + this.id;
    if (element_id === '#hackathons') {
      $('.activities:eq(0)').click();
    } else if (element_id === '#work-experience') {
      $('.activities:eq(4)').click();
    } else if (element_id === '#projects') {
      $('.activities:eq(8)').click();
    }
  });

  $('#third').click(async function() {
    $('#avatar-col,#about,#experience,#custom_carousel').addClass('hide');
    $('#first').addClass('animated slideOutUp');
    $('#bio-text').addClass('animated fadeOut');
    $('.fa-angle-down').removeClass('infinite fadeInDown');
    $('.fa-angle-down').addClass('fadeOutDown');
    await sleep(1000);
    $('#main-content').removeClass('hide');
    $('html,body').animate({
        scrollTop: $('#custom_navbar').offset().top
      },
      1000);
    ga('send', 'event', 'Visits', 'clicked', 'Main Content');
    await sleep(1000);
    $('#first').removeClass('animated slideOutUp');
    $('#bio-text').removeClass('animated fadeOut');
    $('.fa-angle-down').addClass('infinite fadeInDown');
    $('.fa-angle-down').removeClass('fadeOutDown');
    $('#avatar-col,#about,#experience,#custom_carousel').removeClass('hide');
    $('#avatar-col').addClass('animated flipInY');
    $('#about').addClass('animated fadeIn');
    $('#experience').addClass('animated flipInX');
    $('#custom_carousel').addClass('animated fadeIn');
    await sleep(1000);
    $('#avatar-col').removeClass('animated flipInY');
    $('#about').removeClass('animated fadeIn');
    $('#experience').removeClass('animated flipInX');
    $('#custom_carousel').removeClass('animated fadeIn');
    $('#second').addClass('hide');
  });

  $('#about').click(async function() {
    $('#avatar-main').addClass('colorChange');
    $('#my-name').addClass('textColorChange');
    $('#first,#bio-text,.fa-angle-down').addClass('hide');
    $('#avatar-col').addClass('animated flipOutY');
    $('#about').addClass('animated fadeOut');
    $('#experience').addClass('animated flipOutX');
    $('#custom_carousel').addClass('animated fadeOut');
    $('#custom_navbar').addClass('animated slideOutUp');
    await sleep(1000);
    $('#second').removeClass('hide');
    $('#second').addClass('animated slideInDown');
    ga('send', 'event', 'Visits', 'clicked', 'About');
    await sleep(1000);
    $('#main-content').addClass('hide');
    $('#avatar-col').removeClass('animated flipOutY');
    $('#about').removeClass('animated fadeOut');
    $('#experience').removeClass('animated flipOutX');
    $('#custom_carousel').removeClass('animated fadeOut');
    $('#custom_navbar').removeClass('animated slideOutUp');
    $('#first,#bio-text,.fa-angle-down').removeClass('hide');
    $('#first').addClass('animated slideInDown');
    $('#bio-text').addClass('animated fadeIn');
    $('.fa-angle-down').addClass('infinite fadeInDown');
    await sleep(1000);
    $('#first').removeClass('animated slideInDown');
    $('#bio-text').removeClass('animated fadeIn');
    $('#second').removeClass('animated slideInDown');
  });

  $.fn.extend({
    animateCss: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

  $.fn.extend({
    animateCssHide: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).addClass('hide');
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

  $.fn.extend({
    animateCssShow: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).removeClass('hide');
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

});
