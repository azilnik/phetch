(function($) {
    var timer;
    var duration = 200;
    var error, success;

    var initial;

    function checker() {
        var div = $('div.mce_inline_error');
        if ( div.length ) {
            switch( div.html() ) {
                case 'Please enter a valid email address.' :
                    div.html('Come on homey, why you gonna try and play me like that? Enter a valid email.');
                    break;
            }
        } else {
            timer = setTimeout(checker, duration);
        }
    };

    function initializeChecker() {
        initial = $('.mce_inline_error').html();
        checker();
    };
    
    $('form').submit(initializeChecker);

})(jQuery);
