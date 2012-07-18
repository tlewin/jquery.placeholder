/*
 * JQuery placeholder plugin
 * 
 * Create a customized placeholder for input text fields and textareas
 *
 * @copyright @thiagolewin
 * @version 0.2
 */
(function($) {
  'use strict';

  var 
    nativePlaceholderSupport = ('placeholder' in document.createElement('input'));

  $.fn.placeholder = function(options) {

    var 
      settings = {
        checkNative: false,
        attrData: 'data-ph',
        phText: null,
        className: 'jq-ph'
      },
      attrFinder = '';

    $.extend(true, settings, options);

    function getInputElements(reference) {
      reference = reference || [];
      return reference.length ? reference : $('[' + settings.attrData + ']');
    }

    function getPlaceholderText(elem) {
      return settings.phText || elem.attr(settings.attrData);
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

      if(inputElement.attr('id')) {
        label.attr('for', inputElement.attr('id'));
      }

      label.attr('class', settings.className);
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
        
    // Check for native support 
    if(settings.checkNative && nativePlaceholderSupport) {
      // TODO check for pseudo class ::-webkit-input-placeholder/ ::-moz-placeholder
      getInputElements(this).each(function(idx, elem) {
        var el = $(elem);
        el.attr('placeholder', getPlaceholderText(el));
      });
    } else {
      getInputElements(this).each(function(idx, elem) {
        var el = $(elem);
        createLabelPlaceholder(el, getPlaceholderText(el));
      });
    }
    return this; // chain
  }
  
})(jQuery);
 