$(document).ready(function () {

// Toggle Navigation for mobile devices
	jQuery('.nv-ico').on('click', function(){
		$('.nav-sec').slideToggle();
		$(this).toggleClass('active');
	});

	jQuery(function($){
	   $(".search01").Watermark("Search Job Title,Description,Experience , Location etc.");
	   $(".sa-captcha").Watermark("Type Letter Here...");
		
	 });
  
//function scroll to top


jQuery(window).scroll(function () {
        if(jQuery(this).scrollTop() > 1) {
            jQuery('.sa-gotop').css({
                opacity: 1
            });
        } else {
            jQuery('.sa-gotop').css({
                opacity: 0
            });
        }
    });
    jQuery('.sa-gotop').click(function () {
        jQuery('html, body').animate({
            scrollTop: '0px'
        }, 800);
        return false;
    });

 

 
 
	$('.ntf-dropdown').click(function() {

			var type = $(this).data('filter');

			if ($(this).hasClass('active')) {

				$(this).removeClass('active');
				$('.ntf-drop-menu').removeClass('open');

				setTimeout(function() {
					$('.ntf-drop-menu .popout').hide();
				});

			} else {

				$('.ntf-dropdown').removeClass('active');
				$(this).addClass('active');
				
				if ($('.ntf-drop-menu').hasClass('open')) {

					$('.ntf-drop-menu .popout').hide();
					$('.ntf-drop-menu .popout.' + type).fadeIn();

				} else {

					$('.ntf-drop-menu').addClass('open');
					$('.ntf-drop-menu .popout.' + type).fadeIn();
				}
			}

		});
		
		$(document).click(function(event) {
			if ( !$(event.target).hasClass('ntf-dropdown')) {
				$('.ntf-drop-menu .popout').hide();
				$('.ntf-dropdown').removeClass('active');
				$('.ntf-drop-menu').removeClass('open');
			}
			
		});
		
 
		$(".ntf-drop-menu").click(function(event) {
		
			event.stopPropagation();
		});
 
		
}); 

/*  Use Js For IE8 */

$(document).ready(function() {


   $(".footer-ul li:last-child").css("border-right","0px solid #b5b5b5")
   $(".sa-pagination li:nth-child(n+2)").css("margin-left","5px")


}); 
