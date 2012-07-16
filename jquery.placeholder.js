'use strict';
/*
 * JQuery placeholder plugin
 * 
 * Create a customized placeholder for input text fields and textareas
 *
 * @copyright @thiagolewin
 * @version 0.1
 */
(function($) {
  $.fn.placeholder = function(options) {
    
    var settings = {
      checkNative: true,
      phText: null
    }
    
    $.extend(true, settings, options);
    
    // Check for native support 
    if(settings.checkNative && false) {
      // TODO include native check for placeholder and remove false ;)
    } else {
      (this.length ? this : $('[data-ph]')).each(function(idx, elem) {
        var el = $(elem);
        createLabelPlaceholder(el, settings.phText || el.attr('data-ph'));
      });
    }
    return this; // chain
  }
  
  
  function createLabelPlaceholder(inputElement, phText) {
    var 
      div = $('<div></div'),
      label = $('<label></label>'),
      labelBlocker = $('<div></div>');
    
    div.css({
      position: 'relative',
      display: 'inline-block',
      margin: 0,
      padding: 0
    });
    
    label.css({
      position: 'absolute',
      display: 'inline-block', // Default, but I we must have sure!
      /* Place label right in front of cursor */
      top:  parseInt(inputElement.css('padding-top')) + 
            parseInt(inputElement.css('margin-top')) + 
            parseInt(inputElement.css('border-top-width')),
      left: parseInt(inputElement.css('padding-left')) + 
            parseInt(inputElement.css('margin-left')) + 
            parseInt(inputElement.css('border-left-width')),
      right: 0,
      bottom: 0,
      font: inputElement.css('font'),
      'z-index': 100
    });
    
    labelBlocker.css({
      position: 'absolute',
      display: 'inline-block',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      'z-index': 101
    });
    
    if(inputElement.attr('name')) {
      label.attr('for', inputElement.attr('name'));
    }
      
    label.attr('class', 'jq-ph');    
    label.html(phText);
    
    labelBlocker.click(function() {
      inputElement.focus();
    });
    
    inputElement
      .wrap(div)
      .before(label)
      .before(labelBlocker)
      .keyup(function() {
        if($(this).val().length > 0) {
          label.hide();
        } else {
          label.show();
        }
      })
      .change(function() { // Useful when text changed using js, ex: $(input).val('placeholder').change();
        $(this).keyup();
      })
      .keyup();
  }
  
})(jQuery);
 