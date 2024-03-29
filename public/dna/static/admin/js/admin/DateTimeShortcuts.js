;(function() {
  'use strict'
  var DateTimeShortcuts = {
    calendars: [],
    calendarInputs: [],
    clockInputs: [],
    clockHours: {
      default_: [
        [gettext_noop('Now'), -1],
        [gettext_noop('Midnight'), 0],
        [gettext_noop('6 a.m.'), 6],
        [gettext_noop('Noon'), 12],
        [gettext_noop('6 p.m.'), 18],
      ],
    },
    dismissClockFunc: [],
    dismissCalendarFunc: [],
    calendarDivName1: 'calendarbox', 
    calendarDivName2: 'calendarin', 
    calendarLinkName: 'calendarlink', 
    clockDivName: 'clockbox', 
    clockLinkName: 'clocklink', 
    shortCutsClass: 'datetimeshortcuts', 
    timezoneWarningClass: 'timezonewarning', 
    timezoneOffset: 0,
    init: function() {
      var body = document.getElementsByTagName('body')[0]
      var serverOffset = body.getAttribute('data-admin-utc-offset')
      if (serverOffset) {
        var localOffset = new Date().getTimezoneOffset() * -60
        DateTimeShortcuts.timezoneOffset = localOffset - serverOffset
      }
      var inputs = document.getElementsByTagName('input')
      for (var i = 0; i < inputs.length; i++) {
        var inp = inputs[i]
        if (
          inp.getAttribute('type') === 'text' &&
          inp.className.match(/vTimeField/)
        ) {
          DateTimeShortcuts.addClock(inp)
          DateTimeShortcuts.addTimezoneWarning(inp)
        } else if (
          inp.getAttribute('type') === 'text' &&
          inp.className.match(/vDateField/)
        ) {
          DateTimeShortcuts.addCalendar(inp)
          DateTimeShortcuts.addTimezoneWarning(inp)
        }
      }
    },
    now: function() {
      var body = document.getElementsByTagName('body')[0]
      var serverOffset = body.getAttribute('data-admin-utc-offset')
      if (serverOffset) {
        var localNow = new Date()
        var localOffset = localNow.getTimezoneOffset() * -60
        localNow.setTime(
          localNow.getTime() + 1000 * (serverOffset - localOffset),
        )
        return localNow
      } else {
        return new Date()
      }
    },
    addTimezoneWarning: function(inp) {
      var warningClass = DateTimeShortcuts.timezoneWarningClass
      var timezoneOffset = DateTimeShortcuts.timezoneOffset / 3600
      if (!timezoneOffset) {
        return
      }
      if (inp.parentNode.querySelectorAll('.' + warningClass).length) {
        return
      }
      var message
      if (timezoneOffset > 0) {
        message = ngettext(
          'Note: You are %s hour ahead of server time.',
          'Note: You are %s hours ahead of server time.',
          timezoneOffset,
        )
      } else {
        timezoneOffset *= -1
        message = ngettext(
          'Note: You are %s hour behind server time.',
          'Note: You are %s hours behind server time.',
          timezoneOffset,
        )
      }
      message = interpolate(message, [timezoneOffset])
      var warning = document.createElement('span')
      warning.className = warningClass
      warning.textContent = message
      inp.parentNode.appendChild(document.createElement('br'))
      inp.parentNode.appendChild(warning)
    },
    addClock: function(inp) {
      var num = DateTimeShortcuts.clockInputs.length
      DateTimeShortcuts.clockInputs[num] = inp
      DateTimeShortcuts.dismissClockFunc[num] = function() {
        DateTimeShortcuts.dismissClock(num)
        return true
      }
      var shortcuts_span = document.createElement('span')
      shortcuts_span.className = DateTimeShortcuts.shortCutsClass
      inp.parentNode.insertBefore(shortcuts_span, inp.nextSibling)
      var now_link = document.createElement('a')
      now_link.setAttribute('href', '#')
      now_link.textContent = gettext('Now')
      now_link.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.handleClockQuicklink(num, -1)
      })
      var clock_link = document.createElement('a')
      clock_link.setAttribute('href', '#')
      clock_link.id = DateTimeShortcuts.clockLinkName + num
      clock_link.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
        DateTimeShortcuts.openClock(num)
      })
      quickElement(
        'span',
        clock_link,
        '',
        'class',
        'clock-icon',
        'title',
        gettext('Choose a Time'),
      )
      shortcuts_span.appendChild(document.createTextNode('\u00A0'))
      shortcuts_span.appendChild(now_link)
      shortcuts_span.appendChild(document.createTextNode('\u00A0|\u00A0'))
      shortcuts_span.appendChild(clock_link)
      var clock_box = document.createElement('div')
      clock_box.style.display = 'none'
      clock_box.style.position = 'absolute'
      clock_box.className = 'clockbox module'
      clock_box.setAttribute('id', DateTimeShortcuts.clockDivName + num)
      document.body.appendChild(clock_box)
      clock_box.addEventListener('click', function(e) {
        e.stopPropagation()
      })
      quickElement('h2', clock_box, gettext('Choose a time'))
      var time_list = quickElement('ul', clock_box)
      time_list.className = 'timelist'
      var name =
        typeof DateTimeShortcuts.clockHours[inp.name] === 'undefined'
          ? 'default_'
          : inp.name
      DateTimeShortcuts.clockHours[name].forEach(function(element) {
        var time_link = quickElement(
          'a',
          quickElement('li', time_list),
          gettext(element[0]),
          'href',
          '#',
        )
        time_link.addEventListener('click', function(e) {
          e.preventDefault()
          DateTimeShortcuts.handleClockQuicklink(num, element[1])
        })
      })
      var cancel_p = quickElement('p', clock_box)
      cancel_p.className = 'calendar-cancel'
      var cancel_link = quickElement(
        'a',
        cancel_p,
        gettext('Cancel'),
        'href',
        '#',
      )
      cancel_link.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.dismissClock(num)
      })
      document.addEventListener('keyup', function(event) {
        if (event.which === 27) {
          DateTimeShortcuts.dismissClock(num)
          event.preventDefault()
        }
      })
    },
    openClock: function(num) {
      var clock_box = document.getElementById(
        DateTimeShortcuts.clockDivName + num,
      )
      var clock_link = document.getElementById(
        DateTimeShortcuts.clockLinkName + num,
      )
      if (getStyle(document.body, 'direction') !== 'rtl') {
        clock_box.style.left = findPosX(clock_link) + 17 + 'px'
      } else {
        clock_box.style.left = findPosX(clock_link) - 110 + 'px'
      }
      clock_box.style.top = Math.max(0, findPosY(clock_link) - 30) + 'px'
      clock_box.style.display = 'block'
      document.addEventListener(
        'click',
        DateTimeShortcuts.dismissClockFunc[num],
      )
    },
    dismissClock: function(num) {
      document.getElementById(
        DateTimeShortcuts.clockDivName + num,
      ).style.display = 'none'
      document.removeEventListener(
        'click',
        DateTimeShortcuts.dismissClockFunc[num],
      )
    },
    handleClockQuicklink: function(num, val) {
      var d
      if (val === -1) {
        d = DateTimeShortcuts.now()
      } else {
        d = new Date(1970, 1, 1, val, 0, 0, 0)
      }
      DateTimeShortcuts.clockInputs[num].value = d.strftime(
        get_format('TIME_INPUT_FORMATS')[0],
      )
      DateTimeShortcuts.clockInputs[num].focus()
      DateTimeShortcuts.dismissClock(num)
    },
    addCalendar: function(inp) {
      var num = DateTimeShortcuts.calendars.length
      DateTimeShortcuts.calendarInputs[num] = inp
      DateTimeShortcuts.dismissCalendarFunc[num] = function() {
        DateTimeShortcuts.dismissCalendar(num)
        return true
      }
      var shortcuts_span = document.createElement('span')
      shortcuts_span.className = DateTimeShortcuts.shortCutsClass
      inp.parentNode.insertBefore(shortcuts_span, inp.nextSibling)
      var today_link = document.createElement('a')
      today_link.setAttribute('href', '#')
      today_link.appendChild(document.createTextNode(gettext('Today')))
      today_link.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.handleCalendarQuickLink(num, 0)
      })
      var cal_link = document.createElement('a')
      cal_link.setAttribute('href', '#')
      cal_link.id = DateTimeShortcuts.calendarLinkName + num
      cal_link.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
        DateTimeShortcuts.openCalendar(num)
      })
      quickElement(
        'span',
        cal_link,
        '',
        'class',
        'date-icon',
        'title',
        gettext('Choose a Date'),
      )
      shortcuts_span.appendChild(document.createTextNode('\u00A0'))
      shortcuts_span.appendChild(today_link)
      shortcuts_span.appendChild(document.createTextNode('\u00A0|\u00A0'))
      shortcuts_span.appendChild(cal_link)
      var cal_box = document.createElement('div')
      cal_box.style.display = 'none'
      cal_box.style.position = 'absolute'
      cal_box.className = 'calendarbox module'
      cal_box.setAttribute('id', DateTimeShortcuts.calendarDivName1 + num)
      document.body.appendChild(cal_box)
      cal_box.addEventListener('click', function(e) {
        e.stopPropagation()
      })
      var cal_nav = quickElement('div', cal_box)
      var cal_nav_prev = quickElement('a', cal_nav, '<', 'href', '#')
      cal_nav_prev.className = 'calendarnav-previous'
      cal_nav_prev.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.drawPrev(num)
      })
      var cal_nav_next = quickElement('a', cal_nav, '>', 'href', '#')
      cal_nav_next.className = 'calendarnav-next'
      cal_nav_next.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.drawNext(num)
      })
      var cal_main = quickElement(
        'div',
        cal_box,
        '',
        'id',
        DateTimeShortcuts.calendarDivName2 + num,
      )
      cal_main.className = 'calendar'
      DateTimeShortcuts.calendars[num] = new Calendar(
        DateTimeShortcuts.calendarDivName2 + num,
        DateTimeShortcuts.handleCalendarCallback(num),
      )
      DateTimeShortcuts.calendars[num].drawCurrent()
      var shortcuts = quickElement('div', cal_box)
      shortcuts.className = 'calendar-shortcuts'
      var day_link = quickElement(
        'a',
        shortcuts,
        gettext('Yesterday'),
        'href',
        '#',
      )
      day_link.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.handleCalendarQuickLink(num, -1)
      })
      shortcuts.appendChild(document.createTextNode('\u00A0|\u00A0'))
      day_link = quickElement('a', shortcuts, gettext('Today'), 'href', '#')
      day_link.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.handleCalendarQuickLink(num, 0)
      })
      shortcuts.appendChild(document.createTextNode('\u00A0|\u00A0'))
      day_link = quickElement('a', shortcuts, gettext('Tomorrow'), 'href', '#')
      day_link.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.handleCalendarQuickLink(num, +1)
      })
      var cancel_p = quickElement('p', cal_box)
      cancel_p.className = 'calendar-cancel'
      var cancel_link = quickElement(
        'a',
        cancel_p,
        gettext('Cancel'),
        'href',
        '#',
      )
      cancel_link.addEventListener('click', function(e) {
        e.preventDefault()
        DateTimeShortcuts.dismissCalendar(num)
      })
      document.addEventListener('keyup', function(event) {
        if (event.which === 27) {
          DateTimeShortcuts.dismissCalendar(num)
          event.preventDefault()
        }
      })
    },
    openCalendar: function(num) {
      var cal_box = document.getElementById(
        DateTimeShortcuts.calendarDivName1 + num,
      )
      var cal_link = document.getElementById(
        DateTimeShortcuts.calendarLinkName + num,
      )
      var inp = DateTimeShortcuts.calendarInputs[num]
      if (inp.value) {
        var format = get_format('DATE_INPUT_FORMATS')[0]
        var selected = inp.value.strptime(format)
        var year = selected.getUTCFullYear()
        var month = selected.getUTCMonth() + 1
        var re = /\d{4}/
        if (re.test(year.toString()) && month >= 1 && month <= 12) {
          DateTimeShortcuts.calendars[num].drawDate(month, year, selected)
        }
      }
      if (getStyle(document.body, 'direction') !== 'rtl') {
        cal_box.style.left = findPosX(cal_link) + 17 + 'px'
      } else {
        cal_box.style.left = findPosX(cal_link) - 180 + 'px'
      }
      cal_box.style.top = Math.max(0, findPosY(cal_link) - 75) + 'px'
      cal_box.style.display = 'block'
      document.addEventListener(
        'click',
        DateTimeShortcuts.dismissCalendarFunc[num],
      )
    },
    dismissCalendar: function(num) {
      document.getElementById(
        DateTimeShortcuts.calendarDivName1 + num,
      ).style.display = 'none'
      document.removeEventListener(
        'click',
        DateTimeShortcuts.dismissCalendarFunc[num],
      )
    },
    drawPrev: function(num) {
      DateTimeShortcuts.calendars[num].drawPreviousMonth()
    },
    drawNext: function(num) {
      DateTimeShortcuts.calendars[num].drawNextMonth()
    },
    handleCalendarCallback: function(num) {
      var format = get_format('DATE_INPUT_FORMATS')[0]
      format = format
        .replace('\\', '\\\\')
        .replace('\r', '\\r')
        .replace('\n', '\\n')
        .replace('\t', '\\t')
        .replace("'", "\\'")
      return function(y, m, d) {
        DateTimeShortcuts.calendarInputs[num].value = new Date(
          y,
          m - 1,
          d,
        ).strftime(format)
        DateTimeShortcuts.calendarInputs[num].focus()
        document.getElementById(
          DateTimeShortcuts.calendarDivName1 + num,
        ).style.display = 'none'
      }
    },
    handleCalendarQuickLink: function(num, offset) {
      var d = DateTimeShortcuts.now()
      d.setDate(d.getDate() + offset)
      DateTimeShortcuts.calendarInputs[num].value = d.strftime(
        get_format('DATE_INPUT_FORMATS')[0],
      )
      DateTimeShortcuts.calendarInputs[num].focus()
      DateTimeShortcuts.dismissCalendar(num)
    },
  }
  window.addEventListener('load', DateTimeShortcuts.init)
  window.DateTimeShortcuts = DateTimeShortcuts
})()
