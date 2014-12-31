// random shit
//


(function($){
    $(document).ready(function() {
        $('.downwards').click(function(e) {
            e.preventDefault();
            var $target = $('.howitworks');
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 300, 'swing');
        });
    });
})(jQuery);
