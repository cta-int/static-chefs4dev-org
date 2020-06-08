;(function(window, $) {
    $.fn.scroller = function(config) {
        config = $.extend({
            button: '.timeline__button',
            target: '.timeline'
        }, config);

        $(this).each(function() {
            var $this = $(this),
                interval = false,
                isDragging = false,
                location = null;

            $this.find(config.target).on('mousedown', function(event) {
                location = event.clientX;
                isDragging = true;
            }).on('mousemove', function(event) {
                if(isDragging) {
                    event.preventDefault();

                    var position = position = $(this).scrollLeft();

                    $(this).scrollLeft(position - (event.clientX - location));
                    location = event.clientX;
                }
            }).on('mouseup', function() {
                isDragging = false;
            });

            $this.on('mousedown touchstart', config.button, function(event) {
                event.preventDefault();
                var $button = $(this);

                if(interval === false) {
                    interval = setInterval(function() {
                        var $timeline = $this.find(config.target),
                            width = $timeline.get(0).scrollWidth,
                            position = $timeline.scrollLeft(),
                            step = 15;

                        if($button.data('direction') === 'left') {
                            if(position <= 0) {
                                // Do nothing.
                            } else if(position < step) {
                                $timeline.animate({scrollLeft: 0}, 50, 'linear');
                            } else {
                                $timeline.animate({scrollLeft: position - step}, 50, 'linear');
                            }
                        } else {
                            if(position >= width) {
                                // Do nothing.
                            } else if(position + step >= width) {
                                $timeline.animate({scrollLeft: width}, 50, 'linear');
                            } else {
                                $timeline.animate({scrollLeft: position + step}, 50, 'linear');
                            }
                        }
                    }, 75);
                }

                $(this).on('mouseup touchend', function(event) {
                    event.preventDefault();

                    clearInterval(interval);
                    interval = false;
                });
            });
        });
    }
})(window, window.jQuery);

jQuery(function($) {
    $('.menu').find('.menu__item').find('a').on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
    });
});