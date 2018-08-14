$(document).ready(function($) {
	"use strict";

	//Preloader
    $(window).on('load', function() { // makes sure the whole site is loaded 
      $('#status').fadeOut(); // will first fade out the loading animation 
            $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website. 
            $('body').delay(500).css({'overflow':'visible'});
    })

    
    //Initiat WOW JS
    new WOW().init();

     // Back-to-top
    var btt = $('.back-to-top');

    btt.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });

    $(window).on('scroll',function() {
        var self = $(this),
        height = self.height(),
        top = self.scrollTop();

        if (top > height) {
            if (!btt.is(':visible')) {
                btt.show();
            }
        }   else {
                btt.hide();
            }
    });

    //Data-filter
    $(".filter-button").on('click',function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
			//$('.filter[filter-item="'+value+'"]').removeClass('hidden');
			//$(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    //Anchor Tag
	$(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
    });

	//Filter-button
    if ($(".filter-button").removeClass("active")) {
		$(this).removeClass("active");
		}
	$(this).addClass("active");

	//Filter-button
    $(".filter-button").on('click',function(){
            var value = $(this).attr('data-filter');
        
            if(value == "all")
            {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
            }
        else
        {
        //$('.filter[filter-item="'+value+'"]').removeClass('hidden');
        //$(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
        $(this).removeClass("active");
    }
        $(this).addClass("active");
    
});