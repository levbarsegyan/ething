!(function() {
  function o() {}
  for (
    var n,
      i = [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'exception',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'markTimeline',
        'profile',
        'profileEnd',
        'table',
        'time',
        'timeEnd',
        'timeline',
        'timelineEnd',
        'timeStamp',
        'trace',
        'warn',
      ],
      e = i.length,
      t = (window.console = window.console || {});
    e--;
  )
    t[(n = i[e])] || (t[n] = o)
})(),
  (CKEDITOR.editorConfig = function(o) {
    ;(o.language = 'en'),
      (o.uiColor = '#F7B42C'),
      (o.height = 300),
      (o.toolbarCanCollapse = !0)
  }),
  jQuery.fn.extend({
    adonHideOnScrollDown: function() {
      ;(tags = $(this)),
        (position = $(window).scrollTop()),
        tags.each(function(o) {
          $(this).addClass('adonHideOnScrollDown'),
            $(this).mouseover(function() {
              $(this).addClass('adonHover')
            }),
            $(this).mouseout(function() {
              $(this).removeClass('adonHover')
            })
        }),
        $(window).scroll(function() {
          tags.each(function(o) {
            $(window).scrollTop() > position
              ? $(this)._adonHideIfNotHovering()
              : $(this).removeClass('adonHide')
          }),
            (position = $(window).scrollTop())
        }),
        setInterval(function() {
          ;(curr_position = $(window).scrollTop()),
            curr_position === position &&
              tags.each(function(o) {
                $(this)._adonHideIfNotHovering()
              })
        }, 3e3)
    },
    _adonHideIfNotHovering: function() {
      $(this).hasClass('adonHover') || $(this).addClass('adonHide')
    },
  })
