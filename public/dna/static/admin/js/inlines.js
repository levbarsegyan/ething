;(function($) {
  'use strict'
  $.fn.formset = function(opts) {
    var options = $.extend({}, $.fn.formset.defaults, opts)
    var $this = $(this)
    var $parent = $this.parent()
    var updateElementIndex = function(el, prefix, ndx) {
      var id_regex = new RegExp('(' + prefix + '-(\\d+|__prefix__))')
      var replacement = prefix + '-' + ndx
      if ($(el).prop('for')) {
        $(el).prop(
          'for',
          $(el)
            .prop('for')
            .replace(id_regex, replacement),
        )
      }
      if (el.id) {
        el.id = el.id.replace(id_regex, replacement)
      }
      if (el.name) {
        el.name = el.name.replace(id_regex, replacement)
      }
    }
    var totalForms = $('#id_' + options.prefix + '-TOTAL_FORMS').prop(
      'autocomplete',
      'off',
    )
    var nextIndex = parseInt(totalForms.val(), 10)
    var maxForms = $('#id_' + options.prefix + '-MAX_NUM_FORMS').prop(
      'autocomplete',
      'off',
    )
    var showAddButton =
      maxForms.val() === '' || maxForms.val() - totalForms.val() > 0
    $this.each(function(i) {
      $(this)
        .not('.' + options.emptyCssClass)
        .addClass(options.formCssClass)
    })
    if ($this.length && showAddButton) {
      var addButton = options.addButton
      if (addButton === null) {
        if ($this.prop('tagName') === 'TR') {
          var numCols = this.eq(-1).children().length
          $parent.append(
            '<tr class="' +
              options.addCssClass +
              '"><td colspan="' +
              numCols +
              '"><a href="#">' +
              options.addText +
              '</a></tr>',
          )
          addButton = $parent.find('tr:last a')
        } else {
          $this
            .filter(':last')
            .after(
              '<div class="' +
                options.addCssClass +
                '"><a href="#">' +
                options.addText +
                '</a></div>',
            )
          addButton = $this
            .filter(':last')
            .next()
            .find('a')
        }
      }
      addButton.on('click', function(e) {
        e.preventDefault()
        var template = $('#' + options.prefix + '-empty')
        var row = template.clone(true)
        row
          .removeClass(options.emptyCssClass)
          .addClass(options.formCssClass)
          .attr('id', options.prefix + '-' + nextIndex)
        if (row.is('tr')) {
          row
            .children(':last')
            .append(
              '<div><a class="' +
                options.deleteCssClass +
                '" href="#">' +
                options.deleteText +
                '</a></div>',
            )
        } else if (row.is('ul') || row.is('ol')) {
          row.append(
            '<li><a class="' +
              options.deleteCssClass +
              '" href="#">' +
              options.deleteText +
              '</a></li>',
          )
        } else {
          row
            .children(':first')
            .append(
              '<span><a class="' +
                options.deleteCssClass +
                '" href="#">' +
                options.deleteText +
                '</a></span>',
            )
        }
        row.find('*').each(function() {
          updateElementIndex(this, options.prefix, totalForms.val())
        })
        row.insertBefore($(template))
        $(totalForms).val(parseInt(totalForms.val(), 10) + 1)
        nextIndex += 1
        if (maxForms.val() !== '' && maxForms.val() - totalForms.val() <= 0) {
          addButton.parent().hide()
        }
        row.find('a.' + options.deleteCssClass).on('click', function(e1) {
          e1.preventDefault()
          row.remove()
          nextIndex -= 1
          if (options.removed) {
            options.removed(row)
          }
          $(document).trigger('formset:removed', [row, options.prefix])
          var forms = $('.' + options.formCssClass)
          $('#id_' + options.prefix + '-TOTAL_FORMS').val(forms.length)
          if (maxForms.val() === '' || maxForms.val() - forms.length > 0) {
            addButton.parent().show()
          }
          var i, formCount
          var updateElementCallback = function() {
            updateElementIndex(this, options.prefix, i)
          }
          for (i = 0, formCount = forms.length; i < formCount; i++) {
            updateElementIndex($(forms).get(i), options.prefix, i)
            $(forms.get(i))
              .find('*')
              .each(updateElementCallback)
          }
        })
        if (options.added) {
          options.added(row)
        }
        $(document).trigger('formset:added', [row, options.prefix])
      })
    }
    return this
  }
  $.fn.formset.defaults = {
    prefix: 'form', 
    addText: 'add another', 
    deleteText: 'remove', 
    addCssClass: 'add-row', 
    deleteCssClass: 'delete-row', 
    emptyCssClass: 'empty-row', 
    formCssClass: 'dynamic-form', 
    added: null, 
    removed: null, 
    addButton: null, 
  }
  $.fn.tabularFormset = function(selector, options) {
    var $rows = $(this)
    var alternatingRows = function(row) {
      $(selector)
        .not('.add-row')
        .removeClass('row1 row2')
        .filter(':even')
        .addClass('row1')
        .end()
        .filter(':odd')
        .addClass('row2')
    }
    var reinitDateTimeShortCuts = function() {
      if (typeof DateTimeShortcuts !== 'undefined') {
        $('.datetimeshortcuts').remove()
        DateTimeShortcuts.init()
      }
    }
    var updateSelectFilter = function() {
      if (typeof SelectFilter !== 'undefined') {
        $('.selectfilter').each(function(index, value) {
          var namearr = value.name.split('-')
          SelectFilter.init(value.id, namearr[namearr.length - 1], false)
        })
        $('.selectfilterstacked').each(function(index, value) {
          var namearr = value.name.split('-')
          SelectFilter.init(value.id, namearr[namearr.length - 1], true)
        })
      }
    }
    var initPrepopulatedFields = function(row) {
      row.find('.prepopulated_field').each(function() {
        var field = $(this),
          input = field.find('input, select, textarea'),
          dependency_list = input.data('dependency_list') || [],
          dependencies = []
        $.each(dependency_list, function(i, field_name) {
          dependencies.push(
            '#' +
              row
                .find('.field-' + field_name)
                .find('input, select, textarea')
                .attr('id'),
          )
        })
        if (dependencies.length) {
          input.prepopulate(dependencies, input.attr('maxlength'))
        }
      })
    }
    $rows.formset({
      prefix: options.prefix,
      addText: options.addText,
      formCssClass: 'dynamic-' + options.prefix,
      deleteCssClass: 'inline-deletelink',
      deleteText: options.deleteText,
      emptyCssClass: 'empty-form',
      removed: alternatingRows,
      added: function(row) {
        initPrepopulatedFields(row)
        reinitDateTimeShortCuts()
        updateSelectFilter()
        alternatingRows(row)
      },
      addButton: options.addButton,
    })
    return $rows
  }
  $.fn.stackedFormset = function(selector, options) {
    var $rows = $(this)
    var updateInlineLabel = function(row) {
      $(selector)
        .find('.inline_label')
        .each(function(i) {
          var count = i + 1
          $(this).html(
            $(this)
              .html()
              .replace(/(#\d+)/g, '#' + count),
          )
        })
    }
    var reinitDateTimeShortCuts = function() {
      if (typeof DateTimeShortcuts !== 'undefined') {
        $('.datetimeshortcuts').remove()
        DateTimeShortcuts.init()
      }
    }
    var updateSelectFilter = function() {
      if (typeof SelectFilter !== 'undefined') {
        $('.selectfilter').each(function(index, value) {
          var namearr = value.name.split('-')
          SelectFilter.init(value.id, namearr[namearr.length - 1], false)
        })
        $('.selectfilterstacked').each(function(index, value) {
          var namearr = value.name.split('-')
          SelectFilter.init(value.id, namearr[namearr.length - 1], true)
        })
      }
    }
    var initPrepopulatedFields = function(row) {
      row.find('.prepopulated_field').each(function() {
        var field = $(this),
          input = field.find('input, select, textarea'),
          dependency_list = input.data('dependency_list') || [],
          dependencies = []
        $.each(dependency_list, function(i, field_name) {
          dependencies.push(
            '#' +
              row
                .find('.form-row .field-' + field_name)
                .find('input, select, textarea')
                .attr('id'),
          )
        })
        if (dependencies.length) {
          input.prepopulate(dependencies, input.attr('maxlength'))
        }
      })
    }
    $rows.formset({
      prefix: options.prefix,
      addText: options.addText,
      formCssClass: 'dynamic-' + options.prefix,
      deleteCssClass: 'inline-deletelink',
      deleteText: options.deleteText,
      emptyCssClass: 'empty-form',
      removed: updateInlineLabel,
      added: function(row) {
        initPrepopulatedFields(row)
        reinitDateTimeShortCuts()
        updateSelectFilter()
        updateInlineLabel(row)
      },
      addButton: options.addButton,
    })
    return $rows
  }
  $(document).ready(function() {
    $('.js-inline-admin-formset').each(function() {
      var data = $(this).data(),
        inlineOptions = data.inlineFormset,
        selector
      switch (data.inlineType) {
        case 'stacked':
          selector = inlineOptions.name + '-group .inline-related'
          $(selector).stackedFormset(selector, inlineOptions.options)
          break
        case 'tabular':
          selector =
            inlineOptions.name +
            '-group .tabular.inline-related tbody:first > tr'
          $(selector).tabularFormset(selector, inlineOptions.options)
          break
      }
    })
  })
})(django.jQuery)
