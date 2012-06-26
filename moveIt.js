/**
 * simplified jQuery plugin to set a css3 property by name
 */
(function($) {
    
    "use strict";
    
    // Used to convert dashed css properties to camelCase
    // e.g. `transform-origin` becomes `transformOrigin`
    function camelize(s) {
        return s.replace(/-([a-z])/g, function($0, $1) {
            return $1.toUpperCase();
        });
    }
    
    // Used to capitalize camelCase properties
    //   so we can prepend a browser prefix (e.g. Webkit)
    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    
    $.fn.css3 = function(prop, value) {
        var capitalizedProp, prefixes, i, prefixed;
        
        // TODO: here you would just want to return this
        //   if this.length == 0
        // TODO: here you would want to return the property value 
        //   if arguments.length == 1
        // TODO: here you would want to accept an object
        //   with property-value pairs
                
        // JavaScript's HTMLElement#style object uses camel case
        //   instead of CSS's dashes
        //   so `transform-origin` needs to be `transformOrigin`
        prop = camelize(prop);
        
        // Test if this css property is "in" HTMLElement#style
        // We can test any element, even a dynamically created div
        // TODO: here you would want to cache this testing
        if (prop in this[0].style) {
            // Browser recognizes this property without a prefix
            // Value might be undefined, but it is "in" style
            return this.css(prop, value);
        }
        // Check all the browser prefixes
        capitalizedProp = capitalize(prop);
        prefixes = ['Webkit', 'Moz', 'O', 'MS'];
        for (i = 0; i < prefixes.length; i++) {
            // Capitalize and add prefix so
            // e.g. `transformOrigin` becomes `MozTransformOrigin`
            prefixed = prefixes[i] + capitalizedProp;
            if (prefixed in this[0].style) {
                // Browser recognizes this property 
                //   with this prefix
                return this.css(prefixed, value);
            }
        }
        // Browser doesn't support this property at all
        return this;
    }
    
}(jQuery));
    
    
(function($) {
    //'use strict';

    function rotateMe(element) {
        var milliSeconds = (Math.random() * 2000) + 000;
        var degY = (Math.random() * 10) - 5;
        var zPx = (Math.random() * 60) - 30;

        $(element).css3('transition', 'all '+milliSeconds+'ms linear')
            .css3('transform', 'rotateY('+degY+'deg) translateZ('+zPx+'px)');

        setTimeout(rotateMe, milliSeconds, element);
    }

    $(function() {
        // Set transition.
        //$('div').css3('transition', 'all 1000ms ease-in-out');
        $('body').css3('perspective', '1000px');
        $('div').css3('transform-origin', '50% 50%');

        // Apply rotation.
        $('div').each(function(index, element) {
            //if (!$(element).hasClass('ancSiteWrp') && !$(element).hasClass('subCon') && !$(element).hasClass('mainContent')) {
            if (!$(element).hasClass('ancSiteWrp')) {
                rotateMe(element);
            }
        });

    });

}(jQuery));