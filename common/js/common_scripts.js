/*-----------------------------------------------------------------------------------

    Theme Name: Hubfolio
    Theme URI: http://
    Description: Creative Agency & Portfolio
    Author: Uithemez
    Author URI: http://themeforest.net/user/Uithemez
    Version: 1.0

-----------------------------------------------------------------------------------*/

$(function () {
  "use strict";

  var wind = $(window);

  /* =============================================================================
    -----------------------------  Smooth Scroll nav   -----------------------------
    ============================================================================= */

  $.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: "linear", // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: "active", // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -75, // offste (in px) for fixed top navigation
  });

  /* =============================================================================
    --------------------------------  Navbar Menu   --------------------------------
    ============================================================================= */

  $(".navbar .dropdown").hover(
    function () {
      $(this).find(".dropdown-menu").addClass("show");
    },
    function () {
      $(this).find(".dropdown-menu").removeClass("show");
    }
  );

  $(".navbar .dropdown-item").hover(
    function () {
      $(this).find(".dropdown-side").addClass("show");
    },
    function () {
      $(this).find(".dropdown-side").removeClass("show");
    }
  );

  $(".navbar .search-form").on("click", ".search-icon", function () {
    $(".navbar .search-form").toggleClass("open");

    if ($(".navbar .search-form").hasClass("open")) {
      $(".search-form .close-search").slideDown();
    } else {
      $(".search-form .close-search").slideUp();
    }
  });

  $(".navbar").on("click", ".navbar-toggler", function () {
    $(".navbar .navbar-collapse").toggleClass("show");
  });

  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $(".navbar"),
      logo = $(".navbar.change .logo> img");

    if (bodyScroll > 300) {
      navbar.addClass("nav-scroll");
      logo.attr("src", "assets/imgs/logo-dark.png");
    } else {
      navbar.removeClass("nav-scroll");
      logo.attr("src", "assets/imgs/logo-light.png");
    }
  });

  function noScroll() {
    window.scrollTo(0, 0);
  }

  $(".navbar .menu-icon").on("click", function () {
    $(".hamenu").addClass("open");

    $(".hamenu").animate({ left: 0 });
  });

  $(".hamenu .close-menu, .one-scroll .menu-links .main-menu > li").on(
    "click",
    function () {
      $(".hamenu").removeClass("open").delay(300).animate({ left: "-100%" });
      $(
        ".hamenu .menu-links .main-menu .dmenu, .hamenu .menu-links .main-menu .sub-dmenu"
      ).removeClass("dopen");
      $(
        ".hamenu .menu-links .main-menu .sub-menu, .hamenu .menu-links .main-menu .sub-menu2"
      ).slideUp();
    }
  );

  $(".hamenu .menu-links .main-menu > li").on("mouseenter", function () {
    $(this).removeClass("hoverd").siblings().addClass("hoverd");
  });

  $(".hamenu .menu-links .main-menu > li").on("mouseleave", function () {
    $(this).removeClass("hoverd").siblings().removeClass("hoverd");
  });

  $(".main-menu > li .dmenu").on("click", function () {
    $(this)
      .parent()
      .parent()
      .find(".sub-menu")
      .toggleClass("sub-open")
      .slideToggle();
    $(this).toggleClass("dopen");
  });

  $(".sub-menu > ul > li .sub-dmenu").on("click", function () {
    $(this)
      .parent()
      .parent()
      .find(".sub-menu2")
      .toggleClass("sub-open")
      .slideToggle();
    $(this).toggleClass("dopen");
  });

  /* =============================================================================
        ------------------------------  Data Background   ------------------------------
        ============================================================================= */

  $(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollTrigger.normalizeScroll(false);

    // create the smooth scroller FIRST!
    let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });

    let headings = gsap.utils.toArray(".js-title").reverse();
    headings.forEach((heading, i) => {
      let headingIndex = i + 1;
      let mySplitText = new SplitText(heading, { type: "chars" });
      let chars = mySplitText.chars;

      chars.forEach((char, i) => {
        smoother.effects(char, { lag: (i + headingIndex) * 0.1, speed: 1 });
      });
    });

    let splitTextLines = gsap.utils.toArray(".js-splittext-lines");

    splitTextLines.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          duration: 2,
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
          // toggleActions: 'play none play reset'
        },
      });

      const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: "lines" });
      // tl.from(itemSplitted.lines, { y: 100, delay: 0.2, opacity: 0, stagger: 0.1, duration: 1, ease: 'inOut' });
      // tl.from(itemSplitted.lines, { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'back.inOut' });
      tl.from(itemSplitted.lines, {
        duration: 1,
        delay: 0.5,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    });
  });

  /* =============================================================================
    ------------------------------  Data Background   ------------------------------
    ============================================================================= */

  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  var pageSectionColor = $(".bg-solid-color, section");
  pageSectionColor.each(function (indx) {
    var color = $(this).attr("data-solid-color");

    if ($(this).attr("data-solid-color")) {
      $(this).css("background-color", color);
    }
  });

  /* =============================================================================
    -----------------------------------  Tabs  -------------------------------------
    ============================================================================= */

  $("#tabs .tab-links").on("click", ".item-link", function () {
    var tab_id = $(this).attr("data-tab");

    $("#tabs .tab-links .item-link").removeClass("current");
    $(this).addClass("current");

    $(".tab-content").hide();
    $("#" + tab_id).show();
  });

  $("#tabs-fade .tab-links").on("click", ".item-link", function () {
    var tab2_id = $(this).attr("data-tab");

    $("#tabs-fade .tab-links .item-link").removeClass("current");
    $(this).addClass("current");

    $(".tab-content").fadeOut();
    $("#" + tab2_id).fadeIn();
  });

  /* =============================================================================
    -------------------------------  Progress Bar  ---------------------------------
    ============================================================================= */

  wind.on("scroll", function () {
    $(".skill-progress .progres").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr("data-value");
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal,
        });
      }
    });
  });

  /* =============================================================================
    -----------------------------  Trigger Plugins  --------------------------------
    ============================================================================= */

  /* ========== YouTubePopUp ========== */

  $("a.vid").YouTubePopUp();
});

/* =============================================================================
-----------------------------  cursor Animation  -----------------------------
============================================================================= */

(function () {
  const link = document.querySelectorAll(".hover-this");
  const cursor = document.querySelector(".cursor");
  const animateit = function (e) {
    const hoverAnim = this.querySelector(".hover-anim");
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this,
      move = 25,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move;
    hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === "mouseleave") hoverAnim.style.transform = "";
  };
  const editCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  };
  link.forEach((b) => b.addEventListener("mousemove", animateit));
  link.forEach((b) => b.addEventListener("mouseleave", animateit));
  window.addEventListener("mousemove", editCursor);

  $("a, .cursor-pointer").hover(
    function () {
      $(".cursor").addClass("cursor-active");
    },
    function () {
      $(".cursor").removeClass("cursor-active");
    }
  );

  /* =============================================================================
    -----------------------------  Text Animation  -----------------------------
    ============================================================================= */

  let elements = document.querySelectorAll(".rolling-text");

  elements.forEach((element) => {
    let innerText = element.innerText;
    element.innerHTML = "";

    let textContainer = document.createElement("div");
    textContainer.classList.add("block");

    for (let letter of innerText) {
      let span = document.createElement("span");
      span.innerText = letter.trim() === "" ? "\xa0" : letter;
      span.classList.add("letter");
      textContainer.appendChild(span);
    }

    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));
  });

  elements.forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.classList.remove("play");
    });
  });
})();

/* =============================================================================
////////////////////////////////////////////////////////////////////////////////
============================================================================= */

$(window).on("load", function () {
  /* =============================================================================
    -----------------------------  isotope Masonery   ------------------------------
    ============================================================================= */

  $(".gallery").isotope({
    itemSelector: ".items",
  });

  // isotope
  $(".gallery2").isotope({
    // options
    itemSelector: ".items",
    masonry: {
      // use element for option
      columnWidth: ".width2",
    },
  });

  var $gallery = $(".gallery , .gallery2").isotope();

  $(".filtering").on("click", "span", function () {
    var filterValue = $(this).attr("data-filter");
    $gallery.isotope({ filter: filterValue });
  });

  $(".filtering").on("click", "span", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  /* =============================================================================
    -----------------------------  Contact Valdition   -----------------------------
    ============================================================================= */

  $("#contact-form").validator();

  $("#contact-form").on("submit", function (e) {
    if (!e.isDefaultPrevented()) {
      var url = "contact.php";

      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function (data) {
          var messageAlert = "alert-" + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            "</div>";
          if (messageAlert && messageText) {
            $("#contact-form").find(".messages").html(alertBox);
            $("#contact-form")[0].reset();
          }
        },
      });
      return false;
    }
  });

  $(".header-cst .caption h1").addClass("normal");
});

/* =============================================================================
-----------------------------  Button scroll up   ------------------------------
============================================================================= */

$(document).ready(function () {
  "use strict";

  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});

/* =============================================================================
-------------------------------  Wow Animation   -------------------------------
============================================================================= */

wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();

/* =============================================================================
////////////////////////////////////////////////////////////////////////////////
============================================================================= */

$(function () {
  /* =============================================================================
    -------------------------------  Preloader svg   -------------------------------
    ============================================================================= */

  const svg = document.getElementById("svg");
  const tl = gsap.timeline();
  const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
  const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

  tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
    delay: 1.5,
    y: -100,
    opacity: 0,
  });
  tl.to(svg, {
    duration: 0.5,
    attr: { d: curve },
    ease: "power2.easeIn",
  }).to(svg, {
    duration: 0.5,
    attr: { d: flat },
    ease: "power2.easeOut",
  });
  tl.to(".loader-wrap", {
    y: -1500,
  });
  tl.to(".loader-wrap", {
    zIndex: -1,
    display: "none",
  });
  tl.from(
    "header .containe", //! it's container
    {
      y: 100,
      opacity: 0,
      delay: 0.3,
    },
    "-=1.5"
  );
  tl.from(
    "header .container .name .img-con svg",
    {
      rotate: 180,
      opacity: 0,
    },
    "-=1"
  );
});
