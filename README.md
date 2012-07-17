jQuery Placeholder - Plugin
===========================

Creates a CSS customizable placeholder for input elements for browsers that doesn't implement it.

## Approach

The technique behind the plugin consists of create a label element pointing to the source input element ("for" attribute) and listening the for any change event. Once any character populates the source the label element is hidden. If the content of input element is erased the label element is set to visible again.
This approach focus on accessibility, since many tools uses the label content in order to "read" the screen content.
Many other techniques can be used, but they have, in my opinion, serious drawback. For example:

###Insert text into input element and remove it once the user punch any key:
* Hard to customize, in most cases keeps the same input element customization.
* It can send some erroneous content to the server.
* Not recommended for accessibility tools.

## Customization
The label element created by plugin has the class jq-ph that can be customized by CSS.

## Parameters

**phText**: If empty/ null/ undefined the plugin will search for _data-ph_ attribute.

#Examples:

    // Create placeholder for any input element with data-ph attribute.
    $().placeholder() // Same as $('[data-ph]').placeholder()
  
    // Insert a custom placeholder text into a specific element.
    $('#my-input').placeholder({phText: 'Some text'}) 

Licenses:
=========

jQuery Placeholder - Plugin is released under [GPL](https://github.com/tlewin/jquery.placeholder/raw/v0.1.0/GPL-LICENSE.txt) and [MIT](https://github.com/tlewin/jquery.placeholder/raw/v0.1.0/MIT-LICENSE.txt) licenses, same as jQuery software.