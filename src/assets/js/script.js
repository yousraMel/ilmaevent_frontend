/* ==============================================
                CUSTOM SCRIPT
================================================*/
$(function () {
    "use strict"; // Start of use strict

    // Select all links with hashes that contains the class scroll-smooth
    // $('a.scroll-smooth[href*="#"]')
    //     // Remove links that don't actually link to anything
    //     .not('[href="#"]')
    //     .click(function () {
    //         // On-page links
    //         if (
    //             location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
    //             location.hostname == this.hostname
    //         ) {
    //             // Figure out element to scroll to
    //             var target = $(this.hash);
    //             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //             // Does a scroll target exist?
    //             if (target.length) {
    //                 // Only prevent default if animation is actually gonna happen
    //                 event.preventDefault();
    //                 $('html, body').animate({
    //                     scrollTop: (target.offset().top - 90)
    //                 }, 800, "easeOutExpo");
    //                 return false;
    //             }
    //         }
    //     });

    // Closes responsive menu when a scroll trigger link is clicked
    // $('.scroll-smooth').click(function () {
    //     $('.navbar-collapse').collapse('hide');
    // });

    // Activate scrollspy to add active class to navbar items on scroll
    // $('body').scrollspy({
    //     target: '#mainNavbar',
    //     offset: 75
    // });

    // Change Navbar On Scrolling
    var navbarChangeOnScroll = function () {

        // if ($(window).scrollTop() > 500) {
        //     console.log("scrolled");
        //     $("nav").removeClass("navbar-short").addClass("navbar-long");
        //     $("li").removeClass("navbar-short__item").addClass("navbar-long__item");
        //     $("a").removeClass("navbar-short__link").addClass("navbar-long__link");
        //     $("div").removeClass("navbar-short__brand").addClass("navbar-long__brand");
        //     // $("div").removeClass("navbar-short__logo-box").addClass("navbar-long__logo-box");
        //     $("img").removeClass("navbar-short__logo").addClass("navbar-long__logo");

        // } else {
        //     console.log("not scrolled");
        //     $("nav").removeClass("navbar-long").addClass("navbar-short");
        //     $("li").removeClass("navbar-long__item").addClass("navbar-short__item");
        //     $("a").removeClass("navbar-long__link").addClass("navbar-short__link");
        //     $("div").removeClass("navbar-long__brand").addClass("navbar-short__brand");
        //     // $("div").removeClass("navbar-long__logo-box").addClass("navbar-short__logo-box");
        //     $("img").removeClass("navbar-long__logo").addClass("navbar-short__logo");

        // }
    };

    // Collapse now if page is not at top
    // navbarChangeOnScroll();

    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarChangeOnScroll);

});


/* ==============================================
                JQUERY EASINGS
================================================*/
// t: current time, b: begInnIng value, c: change In value, d: duration
$.extend($.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});
