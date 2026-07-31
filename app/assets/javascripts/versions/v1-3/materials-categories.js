/* global $ */
$(document).ready(function () {
  if (window.location.pathname.indexOf('/version-1-3/') === -1) return

  var categoryFilters = [
    { id: 'filter_materials__Category_1', chip: 'materials_filters_clear_Statement', rowClass: 'material_Statement' },
    { id: 'filter_materials__Category_2', chip: 'materials_filters_clear_Exhibit', rowClass: 'material_Exhibit' },
    { id: 'filter_materials__Category_3', chip: 'materials_filters_clear_MG_Form', rowClass: 'material_MG_Form' },
    { id: 'filter_materials__Category_4', chip: 'materials_filters_clear_Other', rowClass: 'material_Other' },
    { id: 'filter_materials__Category_5', chip: 'materials_filters_clear_Defendant', rowClass: 'material_Defendant' },
    { id: 'filter_materials__Category_6', chip: 'materials_filters_clear_Unused_material', rowClass: 'material_Always_Unused' }
  ]

  function mainRows () {
    return $('#materials_table tbody tr.govuk-table__row').not('.hidden_row')
  }

  function selectedCategoryFilters () {
    return categoryFilters.filter(function (filter) {
      return $('#' + filter.id).is(':checked')
    })
  }

  function selectedStatuses () {
    return $('input[name=filter_materials__Status]:checked').map(function () {
      if (this.id === 'filter_materials__Status_1') return 'Used'
      if (this.id === 'filter_materials__Status_2') return 'Unused'
      if (this.id === 'filter_materials__Status_3') return 'None'
      return ''
    }).get()
  }

  function rowStatus ($row) {
    return $.trim($row.find('td').eq(5).text())
  }

  function rowMatchesCategory ($row, filters) {
    if (!filters.length) return true
    return filters.some(function (filter) {
      return $row.hasClass(filter.rowClass)
    })
  }

  function rowMatchesStatus ($row, statuses) {
    if (!statuses.length) return true
    return statuses.indexOf(rowStatus($row)) !== -1
  }

  function rowMatchesNew ($row, newFilterSelected) {
    return !newFilterSelected || $row.hasClass('material_New')
  }

  function resetPreviewRows () {
    $('#materials_table tr.hidden_row').hide()
    $('button.show_material_actions').removeClass('hide').text('Preview')
  }

  function updateMaterialsCount () {
    var visibleRows = mainRows().filter(':visible').length
    var totalRows = mainRows().length
    $('.info_wrapper p').html('Showing <strong>' + visibleRows + '</strong> materials out of <strong>' + totalRows + '</strong>')
    $('.tab-2-content').text('Materials (' + visibleRows + ')')
    $('.no_results').toggle(visibleRows === 0)
  }

  function updateSelectedFilters () {
    var hasNewFilter = $('input[name=filter_materials__New]').is(':checked')
    var statuses = selectedStatuses()
    var categories = selectedCategoryFilters()
    var hasAnyFilter = hasNewFilter || statuses.length || categories.length

    $('#active_filter').toggle(hasAnyFilter)
    $('.selected_filter, .materials_filters_Title_1, .materials_filters_Title_2, .materials_filters_Title_3').hide()

    if (hasNewFilter) {
      $('.materials_filters_Title_1, .materials_filters_clear_New').show()
    }

    if (statuses.length) {
      $('.materials_filters_Title_2').show()
      $('.materials_filters_clear_Used').toggle(statuses.indexOf('Used') !== -1)
      $('.materials_filters_clear_Unused').toggle(statuses.indexOf('Unused') !== -1)
      $('.materials_filters_clear_None').toggle(statuses.indexOf('None') !== -1)
    }

    if (categories.length) {
      $('.materials_filters_Title_3').show()
      categories.forEach(function (filter) {
        $('.' + filter.chip).show()
      })
    }
  }

  function applyVersion13Filters () {
    var categories = selectedCategoryFilters()
    var statuses = selectedStatuses()
    var hasNewFilter = $('input[name=filter_materials__New]').is(':checked')

    resetPreviewRows()

    mainRows().each(function () {
      var $row = $(this)
      var showRow = rowMatchesNew($row, hasNewFilter) && rowMatchesStatus($row, statuses) && rowMatchesCategory($row, categories)
      $row.toggle(showRow)
    })

    updateSelectedFilters()
    updateMaterialsCount()
  }

  function clearAllFilters () {
    $('input[name=filter_materials__New], input[name=filter_materials__Status], input[name=filter_materials__Category]').prop('checked', false)
    resetPreviewRows()
    mainRows().show()
    updateSelectedFilters()
    updateMaterialsCount()
  }

  var $fullWidthToggle = $('[data-toolbar-control="toggle-full"]')

  function hasDisplayedDocumentPanel () {
    return $('#redact_column_2 .document-panel').filter(function () {
      return !$(this).hasClass('govuk-tabs__panel--hidden') && $(this).is(':visible')
    }).length > 0
  }

  function isRedactionsFullWidth () {
    return $('#redact_column_2').hasClass('govuk-grid-column-full')
  }

  function applyRedactionsLayout (isFullWidth) {
    $('#redact_column_1').toggle(!isFullWidth)
    $('#redact_column_2')
      .toggleClass('govuk-grid-column-full', isFullWidth)
      .toggleClass('govuk-grid-column-three-quarters', !isFullWidth)
  }

  function updateFullWidthToggle () {
    var hasDocument = hasDisplayedDocumentPanel()
    var isFullWidth = isRedactionsFullWidth()
    if (!hasDocument && isFullWidth) {
      applyRedactionsLayout(false)
      isFullWidth = false
    }
    $fullWidthToggle.toggle(hasDocument)
    $fullWidthToggle.attr('aria-pressed', isFullWidth ? 'true' : 'false')
    $fullWidthToggle.text(isFullWidth ? 'Exit full width' : 'View document full width')
  }

  function setRedactionsFullWidth (isFullWidth) {
    applyRedactionsLayout(isFullWidth)
    updateFullWidthToggle()
  }

  function updateFullWidthToggleAfterDocumentChange () {
    window.setTimeout(updateFullWidthToggle, 0)
  }

  updateFullWidthToggle()

  $fullWidthToggle.off('click.v13FullWidth').on('click.v13FullWidth', function (e) {
    e.preventDefault()
    setRedactionsFullWidth(!isRedactionsFullWidth())
  })

  $(document)
    .off('click.v13FullWidthDocumentState')
    .on('click.v13FullWidthDocumentState', '.openMe a, #tab-list .govuk-tabs__tab, #tab-list .closeButtonOnCPS, .redact_Document, .redact_Document_Multiple_Docs', updateFullWidthToggleAfterDocumentChange)

  $('#applyFiltersBtn').off('click').on('click', function (e) {
    e.preventDefault()
    applyVersion13Filters()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  $('.materials_filters_clear_All').off('click').on('click', function (e) {
    e.preventDefault()
    clearAllFilters()
  })

  $('.materials_filters_clear_New').off('click').on('click', function (e) {
    e.preventDefault()
    $('input[name=filter_materials__New]').prop('checked', false)
    applyVersion13Filters()
  })

  $('.materials_filters_clear_Used, .materials_filters_clear_Unused, .materials_filters_clear_None').off('click').on('click', function (e) {
    e.preventDefault()
    if ($(this).hasClass('materials_filters_clear_Used')) $('#filter_materials__Status_1').prop('checked', false)
    if ($(this).hasClass('materials_filters_clear_Unused')) $('#filter_materials__Status_2').prop('checked', false)
    if ($(this).hasClass('materials_filters_clear_None')) $('#filter_materials__Status_3').prop('checked', false)
    applyVersion13Filters()
  })

  categoryFilters.forEach(function (filter) {
    $('.' + filter.chip).off('click').on('click', function (e) {
      e.preventDefault()
      $('#' + filter.id).prop('checked', false)
      applyVersion13Filters()
    })
  })

  $('#searchModal input[name="searchDocumentCategory"]').off('click').on('click', function () {
    var selectedCategories = $('#searchModal input[name="searchDocumentCategory"]:checked').map(function () {
      return this.value
    }).get()
    var $items = $('#searchModal .details .search-item')

    if (!selectedCategories.length) {
      $items.fadeIn()
      return
    }

    $items.hide().filter(function () {
      var groups = ($(this).attr('data-group') || '').split(/\s+/)
      return selectedCategories.some(function (category) {
        return groups.indexOf(category) !== -1
      })
    }).fadeIn()
  })

  $('#applyFiltersBtn_Modal').off('click').on('click', function (e) {
    e.preventDefault()
    $('#searchModal input[name="searchDocumentCategory"]').first().triggerHandler('click')
  })
})
