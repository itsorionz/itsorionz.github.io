!(function ($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function () {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function () {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    var imageGallery = [];
    var imageIndex = 0;

    function buildGalleryCandidates(src) {
      var dotIdx = src.lastIndexOf(".");
      if (dotIdx === -1) return [src];
      var ext = src.slice(dotIdx);
      var namePart = src.slice(0, dotIdx);
      var nameMatch = namePart.match(/^(.*?)(\d*)$/);
      var base = nameMatch[1];
      var list = [];
      for (var i = 1; i <= 40; i++) {
        list.push(base + (i === 1 ? "" : i) + ext);
      }
      if (list.indexOf(src) === -1) list.unshift(src);
      return list;
    }

    function verifyImages(list, callback) {
      var valid = [];
      var remaining = list.length;
      if (!remaining) { callback(valid); return; }
      list.forEach(function (src) {
        var img = new Image();
        img.onload = function () { valid.push(src); check(); };
        img.onerror = function () { check(); };
        img.src = src;
      });
      function check() {
        remaining--;
        if (remaining === 0) callback(valid);
      }
    }

    function showModalImage() {
      if (!imageGallery.length) {
        $(".img-prev").hide();
        $(".img-next").hide();
        $(".img-counter").text("");
        return;
      }
      $("#modalImage").attr("src", imageGallery[imageIndex]);
      $(".img-counter").text((imageIndex + 1) + " / " + imageGallery.length);
      if (imageGallery.length > 1) {
        $(".img-prev").show();
        $(".img-next").show();
      } else {
        $(".img-prev").hide();
        $(".img-next").hide();
      }
    }

    function openImageModal(src) {
      $(".img-prev").hide();
      $(".img-next").hide();
      verifyImages(buildGalleryCandidates(src), function (valid) {
        imageGallery = valid;
        imageIndex = valid.indexOf(src);
        if (imageIndex === -1 && valid.length) imageIndex = 0;
        showModalImage();
        $("#imageModal").addClass("active");
      });
    }

    function closeImageModal() {
      $("#imageModal").removeClass("active");
      $("#modalImage").attr("src", "");
    }

    $(".portfolio-wrap").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      const imgSrc = $(this).find(".img-fluid").attr("src");
      if (!imgSrc) return;
      openImageModal(imgSrc);
    })

    $(".project-btn, .portfolio-links a").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    $(".img-close, #imageModal").on("click", function () {
      closeImageModal();
    });

    $(".img-modal-content").on("click", function (e) {
      e.stopPropagation();
    });

    $(".img-prev").on("click", function (e) {
      e.stopPropagation();
      if (imageGallery.length > 1) {
        imageIndex = (imageIndex - 1 + imageGallery.length) % imageGallery.length;
        showModalImage();
      }
    });

    $(".img-next").on("click", function (e) {
      e.stopPropagation();
      if (imageGallery.length > 1) {
        imageIndex = (imageIndex + 1) % imageGallery.length;
        showModalImage();
      }
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        closeImageModal();
      } else if (e.key === "ArrowLeft" && $("#imageModal").hasClass("active")) {
        $(".img-prev").trigger("click");
      } else if (e.key === "ArrowRight" && $("#imageModal").hasClass("active")) {
        $(".img-next").trigger("click");
      }
    });
  });

  $(document).ready(function () {
    $('.venobox').venobox();
  });

})(jQuery);


// Code Background Function //

document.addEventListener('DOMContentLoaded', () => {
  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomColor() {
    const r = Math.floor(getRandomValue(0, 255));
    const g = Math.floor(getRandomValue(0, 255));
    const b = Math.floor(getRandomValue(0, 255));
    return `rgb(${r}, ${g}, ${b})`;
  }

  document.querySelectorAll('.code-snippet').forEach(snippet => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let fontSizeMin = 12;
    let fontSizeMax = 20;

    if (viewportWidth < 768) { // Adjust font size range for mobile
      fontSizeMin = 8;
      fontSizeMax = 14;
    }

    const randomTranslateX = `${getRandomValue(-viewportWidth, viewportWidth)}px`;
    const randomTranslateY = `${getRandomValue(-viewportHeight, viewportHeight)}px`;
    const randomRotate = `${getRandomValue(-360, 360)}deg`;
    const randomFontSize = `${getRandomValue(fontSizeMin, fontSizeMax)}px`; // Random font size
    const randomColor = getRandomColor(); // Generate random text color

    snippet.style.setProperty('--translateX', randomTranslateX);
    snippet.style.setProperty('--translateY', randomTranslateY);
    snippet.style.setProperty('--rotateDeg', randomRotate);
    snippet.style.fontSize = randomFontSize;
    snippet.style.color = randomColor;

    // Position the snippet at a random starting position within the viewport
    snippet.style.left = `${getRandomValue(0, viewportWidth)}px`;
    snippet.style.top = `${getRandomValue(0, viewportHeight)}px`;
  });
});

