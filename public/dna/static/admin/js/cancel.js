;(function($) {
  'use strict'
  $(function() {
    $('.cancel-link').on('click', function(e) {
      e.preventDefault()
      if (window.location.search.indexOf('&_popup=1') === -1) {
        window.history.back() 
      } else {
        window.close() 
      }
    })
  })
})(django.jQuery)
