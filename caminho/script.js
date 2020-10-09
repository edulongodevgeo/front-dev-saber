var mobileNav = {
    // Variables
    $overlayNav: $('.overlay--nav'),
    $overlayNavChild: $('.overlay--nav').children('span'),
    $overlayContent: $('.overlay--content'),
    $overlayContentChild: $('.overlay--content').children('span'),
    $navTrigger: $('.nav__trigger'),
    $nav: $('.nav--mobile'),
    transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    
    init: function() {
        var self = this;
        
        // Init the layers
        this.initLayers();
        $(window).on('resize', function() {
            self.initLayers();
        });
        
        // Handle the transitions
        this.$navTrigger.on('click', function(e) {
            e.preventDefault();
            
            if (!self.$navTrigger.hasClass('is-active')) {
                // .nav--trigger active
                self.$navTrigger.addClass('is-active');

                // .overlay--nav active
                self.$overlayNavChild.addClass('is-active').one(self.transitionEnd, function() {
                    // .nav active
                    self.$nav.addClass('is-active');
                });

                // no-csstransitions fallback
                if ($('html').hasClass('no-csstransitions')) {
                    self.$nav.addClass('is-active');
                }
            } else {
                // .nav inactive
                self.$nav.removeClass('is-active').one(self.transitionEnd, function() {
                    // .overlay--nav inactive
                    self.$overlayNavChild.removeClass('is-active').off();
                    
                    // .nav--trigger inactive
                    self.$navTrigger.removeClass('is-active');
                });

                // no-csstransitions fallback
                if ($('html').hasClass('no-csstransitions')) {
                    self.$overlayNavChild.removeClass('is-active');
                    self.$navTrigger.removeClass('is-active');            
                }
            }
        });
    },

    initLayers: function() {
        var self = this;
        var diameter = (Math.sqrt(Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
        
        self.$overlayNavChild.css({
            scaleX: 0,
            scaleY: 0,
            translateZ: 0,
            height: diameter+'px',
            width: diameter+'px',
            top: -(diameter/2)+'px',
            left: -(diameter/2)+'px',
        });
    }
}

mobileNav.init();