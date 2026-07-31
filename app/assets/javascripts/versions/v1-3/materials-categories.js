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

  function hasOpenDocumentTab () {
    return $('#tab-list').is(':visible') && $('#tab-list li.govuk-tabs__list-item').length > 0
  }

  function hasDisplayedDocumentPanel () {
    if (!hasOpenDocumentTab()) return false

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

  function updateViewerToolbarAfterDocumentChange () {
    window.setTimeout(function () {
      updateFullWidthToggle()
      updateDocumentActionsVisibility()
    }, 0)
  }

  function updateFullWidthToggleAfterDocumentClose (e) {
    if (!e.target.closest || !e.target.closest('#tab-list .closeButtonOnCPS')) return

    updateViewerToolbarAfterDocumentChange()
  }

  function watchDocumentViewerState () {
    if (!window.MutationObserver) return

    if (window.v13DocumentViewerStateObserver) {
      window.v13DocumentViewerStateObserver.disconnect()
    }

    window.v13DocumentViewerStateObserver = new window.MutationObserver(updateViewerToolbarAfterDocumentChange)

    $('#tab-list, #redact_column_2').each(function () {
      window.v13DocumentViewerStateObserver.observe(this, {
        childList: true,
        subtree: true
      })
    })
  }

  var documentActionsWrapper = document.querySelector('[data-document-actions-menu]')
  var documentActionsTrigger = document.getElementById('show_Document_Actions')
  var documentActionsMenu = document.getElementById('document_Actions')

  function setDocumentActionsOpen (isOpen, returnFocus) {
    if (!documentActionsWrapper || !documentActionsTrigger || !documentActionsMenu) return

    if (documentActionsWrapper.hidden) isOpen = false

    documentActionsTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    documentActionsTrigger.classList.toggle('active', isOpen)
    documentActionsMenu.hidden = !isOpen
    documentActionsMenu.removeAttribute('style')

    if (!isOpen && returnFocus && !documentActionsWrapper.hidden) {
      documentActionsTrigger.focus()
    }
  }

  function updateDocumentActionsVisibility () {
    var hasDocument = hasDisplayedDocumentPanel()

    if (documentActionsWrapper) {
      documentActionsWrapper.hidden = !hasDocument
      documentActionsWrapper.removeAttribute('style')
    }

    if (!hasDocument) {
      setDocumentActionsOpen(false)
    }
  }

  function updateDeletePageOptionsLabel () {
    var hasVisibleDeleteOptions = $('.page-counter.new').filter(function () {
      return $(this).is(':visible')
    }).length > 0

    $('[data-action="toggle-delete-page-options"]').text(hasVisibleDeleteOptions ? 'Hide delete page options' : 'Show delete page options')
  }

  function toggleDeletePageOptions () {
    var $deletePageOptions = $('.page-counter.new')
    var hasVisibleDeleteOptions = $deletePageOptions.filter(function () {
      return $(this).is(':visible')
    }).length > 0

    $deletePageOptions.toggle(!hasVisibleDeleteOptions)
    updateDeletePageOptionsLabel()
  }

  updateFullWidthToggle()
  updateDocumentActionsVisibility()
  updateDeletePageOptionsLabel()

  $fullWidthToggle.off('click.v13FullWidth').on('click.v13FullWidth', function (e) {
    e.preventDefault()
    setRedactionsFullWidth(!isRedactionsFullWidth())
  })

  $(document)
    .off('click.v13FullWidthDocumentState')
    .on('click.v13FullWidthDocumentState', '.openMe a, #tab-list .govuk-tabs__tab, #tab-list .closeButtonOnCPS, .redact_Document, .redact_Document_Multiple_Docs', updateViewerToolbarAfterDocumentChange)

  if (window.v13FullWidthDocumentCloseHandler) {
    document.removeEventListener('click', window.v13FullWidthDocumentCloseHandler, true)
  }
  window.v13FullWidthDocumentCloseHandler = updateFullWidthToggleAfterDocumentClose
  document.addEventListener('click', window.v13FullWidthDocumentCloseHandler, true)
  watchDocumentViewerState()

  if (window.v13DocumentActionsTriggerHandler && documentActionsTrigger) {
    documentActionsTrigger.removeEventListener('click', window.v13DocumentActionsTriggerHandler)
  }

  window.v13DocumentActionsTriggerHandler = function (e) {
    e.preventDefault()
    e.stopPropagation()

    setDocumentActionsOpen(documentActionsTrigger.getAttribute('aria-expanded') !== 'true')
  }

  if (documentActionsTrigger) {
    documentActionsTrigger.addEventListener('click', window.v13DocumentActionsTriggerHandler)
  }

  if (window.v13DocumentActionsOutsideClickHandler) {
    document.removeEventListener('click', window.v13DocumentActionsOutsideClickHandler)
  }

  window.v13DocumentActionsOutsideClickHandler = function (e) {
    if (!documentActionsWrapper || documentActionsWrapper.hidden) return
    if (documentActionsWrapper.contains(e.target)) return

    setDocumentActionsOpen(false)
  }

  document.addEventListener('click', window.v13DocumentActionsOutsideClickHandler)

  if (window.v13DocumentActionsKeydownHandler) {
    document.removeEventListener('keydown', window.v13DocumentActionsKeydownHandler)
  }

  window.v13DocumentActionsKeydownHandler = function (e) {
    if (e.key !== 'Escape') return
    if (!documentActionsWrapper || !documentActionsMenu || documentActionsWrapper.hidden || documentActionsMenu.hidden) return

    setDocumentActionsOpen(false, true)
  }

  document.addEventListener('keydown', window.v13DocumentActionsKeydownHandler)

  $('#show_Materials_Actions, #show_Comms_Actions').off('click.v13DocumentActions').on('click.v13DocumentActions', function () {
    setDocumentActionsOpen(false)
  })

  $('[data-action="toggle-delete-page-options"]').off('click.v13DeletePageOptions').on('click.v13DeletePageOptions', function (e) {
    e.preventDefault()
    toggleDeletePageOptions()
    setDocumentActionsOpen(false)
  })

  $('#document_Actions button').not('[data-action="toggle-delete-page-options"]').off('click.v13DocumentActions').on('click.v13DocumentActions', function () {
    setDocumentActionsOpen(false)
  })

  $(document)
    .off('click.v13DeletePageOptionsState')
    .on('click.v13DeletePageOptionsState', '.openMe a, #tab-list .govuk-tabs__tab, .redact_Document, .redact_Document_Multiple_Docs', function () {
      window.setTimeout(updateDeletePageOptionsLabel, 300)
    })

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
