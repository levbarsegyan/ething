;(function($) {
  'use strict'
  var SelectBox = {
    cache: {},
    init: function(id) {
      var box = document.getElementById(id)
      var node
      SelectBox.cache[id] = []
      var cache = SelectBox.cache[id]
      var boxOptions = box.options
      var boxOptionsLength = boxOptions.length
      for (var i = 0, j = boxOptionsLength; i < j; i++) {
        node = boxOptions[i]
        cache.push({ value: node.value, text: node.text, displayed: 1 })
      }
    },
    redisplay: function(id) {
      var box = document.getElementById(id)
      var node
      $(box).empty() 
      var new_options = box.outerHTML.slice(0, -9) 
      var cache = SelectBox.cache[id]
      for (var i = 0, j = cache.length; i < j; i++) {
        node = cache[i]
        if (node.displayed) {
          var new_option = new Option(node.text, node.value, false, false)
          new_option.setAttribute('title', node.text)
          new_options += new_option.outerHTML
        }
      }
      new_options += '</select>'
      box.outerHTML = new_options
    },
    filter: function(id, text) {
      var tokens = text.toLowerCase().split(/\s+/)
      var node, token
      var cache = SelectBox.cache[id]
      for (var i = 0, j = cache.length; i < j; i++) {
        node = cache[i]
        node.displayed = 1
        var node_text = node.text.toLowerCase()
        var numTokens = tokens.length
        for (var k = 0; k < numTokens; k++) {
          token = tokens[k]
          if (node_text.indexOf(token) === -1) {
            node.displayed = 0
            break 
          }
        }
      }
      SelectBox.redisplay(id)
    },
    delete_from_cache: function(id, value) {
      var node,
        delete_index = null
      var cache = SelectBox.cache[id]
      for (var i = 0, j = cache.length; i < j; i++) {
        node = cache[i]
        if (node.value === value) {
          delete_index = i
          break
        }
      }
      cache.splice(delete_index, 1)
    },
    add_to_cache: function(id, option) {
      SelectBox.cache[id].push({
        value: option.value,
        text: option.text,
        displayed: 1,
      })
    },
    cache_contains: function(id, value) {
      var node
      var cache = SelectBox.cache[id]
      for (var i = 0, j = cache.length; i < j; i++) {
        node = cache[i]
        if (node.value === value) {
          return true
        }
      }
      return false
    },
    move: function(from, to) {
      var from_box = document.getElementById(from)
      var option
      var boxOptions = from_box.options
      var boxOptionsLength = boxOptions.length
      for (var i = 0, j = boxOptionsLength; i < j; i++) {
        option = boxOptions[i]
        var option_value = option.value
        if (option.selected && SelectBox.cache_contains(from, option_value)) {
          SelectBox.add_to_cache(to, {
            value: option_value,
            text: option.text,
            displayed: 1,
          })
          SelectBox.delete_from_cache(from, option_value)
        }
      }
      SelectBox.redisplay(from)
      SelectBox.redisplay(to)
    },
    move_all: function(from, to) {
      var from_box = document.getElementById(from)
      var option
      var boxOptions = from_box.options
      var boxOptionsLength = boxOptions.length
      for (var i = 0, j = boxOptionsLength; i < j; i++) {
        option = boxOptions[i]
        var option_value = option.value
        if (SelectBox.cache_contains(from, option_value)) {
          SelectBox.add_to_cache(to, {
            value: option_value,
            text: option.text,
            displayed: 1,
          })
          SelectBox.delete_from_cache(from, option_value)
        }
      }
      SelectBox.redisplay(from)
      SelectBox.redisplay(to)
    },
    sort: function(id) {
      SelectBox.cache[id].sort(function(a, b) {
        a = a.text.toLowerCase()
        b = b.text.toLowerCase()
        try {
          if (a > b) {
            return 1
          }
          if (a < b) {
            return -1
          }
        } catch (e) {
        }
        return 0
      })
    },
    select_all: function(id) {
      var box = document.getElementById(id)
      var boxOptions = box.options
      var boxOptionsLength = boxOptions.length
      for (var i = 0; i < boxOptionsLength; i++) {
        boxOptions[i].selected = 'selected'
      }
    },
  }
  window.SelectBox = SelectBox
})(django.jQuery)
