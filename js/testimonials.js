(function($){
    var data = [
        {
            quote: "Phetch lets us edit our constantly M.I.A. roommate into our group pic! I keep nagging her 'Maria, why are you never hanging out with us?' Now I don't care anymore.",
            author: {
                image: 'https://s3.amazonaws.com/com.lift.assets/landing/profile-0.jpg',
                name: 'Sandra M.'
            }
        },
        {
            quote: "With Phetch, I can photoshop my dog's head onto a baby. I hate babies.",
            author: {
                image: 'https://s3.amazonaws.com/com.lift.assets/landing/profile-0.jpg',
                name: 'Pauly G.'
            }
        },
        {
            quote: "An evening with phetch is one of the MOST FUN times I've EVER had!",
            author: {
                image: 'https://s3.amazonaws.com/com.lift.assets/landing/profile-0.jpg',
                name: 'Becky S.'
            }
        }
    ];

    function makeCarousel(options) {
        var rotationTime = 4000;
        var fadeTime = 400;
        var rotatorTimer;
        var pauseTime = 80000;
        var pauseTimer;

        var $el = options.el;
        var data = options.data;
        var testimonialTemplate = _.template($('script.testimonial').html());

        var $content = $('<div class="content" />');
        var $controls = $('<div class="controls" />');
        var controls = [];

        var current;

        function Control(testimonial) {
            var ths = {};
            ths.$el = $('<li class="control" />');
            ths.testimonial = testimonial;

            ths.click = function(e) {
                if ( e ) {
                    // user initiated
                    e.preventDefault();
                    stopTimer();
                }
                ths.activate();
            };

            ths.disactivate = function() {
                ths.testimonial.fadeOut();
                ths.$el.removeClass('active');
            };

            ths.activate = function() {
                disactivateAll(ths);
                ths.testimonial.fadeIn();
                ths.$el.addClass('active');
            };

            ths.init = function() {
                // function called when control is on the page
                ths.$el.click(ths.click);
                ths.$el.data('control', ths);
            }

            return ths;
        };

        function Testimonial(data) {
            var $el = $(testimonialTemplate(data));

            function fadeIn() {
                $el.fadeIn(fadeTime);
            };

            function fadeOut() {
                $el.fadeOut(fadeTime);
            };

            return {
                $el : $el,
                fadeIn : fadeIn,
                fadeOut : fadeOut
            };
        };

        function init() {
            $el.html('');

            // make content and controls containers
            $el.append($content);
            $el.append($controls);

            data.map(function(testimonialData) {
                testimonial = Testimonial(testimonialData);
                testimonial.control = Control(testimonial); 

                $controls.append(testimonial.control.$el);
                $content.append(testimonial.$el);

                testimonial.control.init();

                controls.push(testimonial.control);
            });

            startRotating();
        };

        function disactivateAll(caller) {
            controls.map(function(control) {
                if ( caller !== control ) {
                    control.disactivate();
                }
            });
        };

        function startRotating() {
            $controls.find('.control:first').data('control').click();
            setRotateTimer();
        };

        function setRotateTimer(time) {
            if ( ! time ) { time = rotationTime; }
            rotateTimer = setTimeout(function() {
                var next = $('.control.active').next();
                if ( next.length === 0 ) {
                    next = $('.control:first');
                }
                next.data('control').click();
                setRotateTimer();
            }, time);
        };

        function stopTimer() {
            clearTimeout(rotateTimer);
            pauseTimer = setTimeout(function() {
                setRotateTimer(0);
            }, pauseTime);
        };

        init();
    };

    $(document).ready(function() {
        makeCarousel({
            el: $('.testimonial-carousel'),
            data: data
        });
    });
})(jQuery);
