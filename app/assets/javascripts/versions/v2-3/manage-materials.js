$(document).ready(function () {
    // Version 2.3 Manage Materials Workspace State & Interaction Management
    var $workspace = $('.dcf-materials-workspace--v2-1');
    if (!$workspace.length) return;

    // Only run on version 2.3 routes
    if (window.location.pathname.indexOf('/version-2-3/') === -1) return;

    var $filterPanel = $workspace.find('[data-panel="materials-filter"]');
    var $tablePanel = $workspace.find('[data-panel="materials-table"]');
    var $cardsPanel = $workspace.find('[data-panel="materials-cards"]');
    var $documentPanel = $workspace.find('[data-panel="materials-document"]');
    var $showFilterBtn = $('#show_filter_Materials');
    var $hideFilterBtn = $('#close_filter_Materials');
    var $toggleFullBtn = $('[data-action="toggle-full"]');
    var $closeViewerBtn = $('[data-action="close-viewer"]');

    var $closeViewerSeparator = $('[data-toolbar-control="close-viewer-separator"]');
    var $closeViewerControls = $('[data-toolbar-control="close-viewer"]');
    var $toggleFullSeparator = $('[data-toolbar-control="toggle-full-separator"]');
    var $toggleFullControls = $('[data-toolbar-control="toggle-full"]');
    var $materialsActionsMenu = $('#show_Materials_Actions').closest('.moj-button-menu');

    var currentMaterialsState = 'table';
    var filterWasOpenBeforeFullWidth = false;

    function setPanelState(state) {
        currentMaterialsState = state;
        $workspace.attr('data-materials-state', state);

        // Derive visibility flags
        var isDocumentVisible = state === 'document-with-cards' || state === 'document-with-filter-and-cards' || state === 'document-only';
        var isDocumentOnly = state === 'document-only';
        var canToggleFullWidth = isDocumentVisible;

        // Apply toolbar visibility explicitly
        $closeViewerControls.toggle(isDocumentVisible);
        $closeViewerSeparator.toggle(isDocumentVisible && !isDocumentOnly);
        $toggleFullControls.toggle(canToggleFullWidth);
        $toggleFullSeparator.toggle(canToggleFullWidth);

        $materialsActionsMenu.toggle(!isDocumentVisible);
        $('#show_filter_Redactions, #close_filter_Redactions').hide();

        // Defensive: remove any grid column classes from workspace itself
        $workspace.removeClass('govuk-grid-column-full govuk-grid-column-full-from-desktop govuk-grid-column-three-quarters govuk-grid-column-one-half govuk-grid-column-one-quarter');

        // Helper to clean grid classes from document panel
        $documentPanel.removeClass('govuk-grid-column-full-from-desktop govuk-grid-column-three-quarters govuk-grid-column-one-half');
        // Helper to clean grid classes from table panel
        $tablePanel.removeClass('govuk-grid-column-full-from-desktop govuk-grid-column-three-quarters');

        switch (state) {
            case 'table': // State A
                $filterPanel.hide();
                $cardsPanel.hide();
                $documentPanel.hide();
                $tablePanel.show().addClass('govuk-grid-column-full-from-desktop');

                $showFilterBtn.show();
                $hideFilterBtn.hide();
                $toggleFullBtn.attr('aria-pressed', 'false').text('View document full width');
                break;

            case 'table-with-filter': // State B
                $cardsPanel.hide();
                $documentPanel.hide();
                $filterPanel.show().addClass('govuk-grid-column-one-quarter');
                $tablePanel.show().addClass('govuk-grid-column-three-quarters');

                $showFilterBtn.hide();
                $hideFilterBtn.show();
                break;

            case 'document-with-cards': // State C
                $filterPanel.hide();
                $tablePanel.hide();
                $cardsPanel.show().addClass('govuk-grid-column-one-quarter');
                $documentPanel.show().addClass('govuk-grid-column-three-quarters');

                $showFilterBtn.show();
                $hideFilterBtn.hide();
                $toggleFullBtn.attr('aria-pressed', 'false').text('View document full width');
                break;

            case 'document-with-filter-and-cards': // State D
                $tablePanel.hide();
                $filterPanel.show().addClass('govuk-grid-column-one-quarter');
                $cardsPanel.show().addClass('govuk-grid-column-one-quarter');
                $documentPanel.show().addClass('govuk-grid-column-one-half');

                $showFilterBtn.hide();
                $hideFilterBtn.show();
                $toggleFullBtn.attr('aria-pressed', 'false').text('View document full width');
                break;

            case 'document-only': // State E
                $filterPanel.hide();
                $tablePanel.hide();
                $cardsPanel.hide();
                $documentPanel.show().addClass('govuk-grid-column-full-from-desktop');

                $showFilterBtn.hide();
                $hideFilterBtn.hide();
                $toggleFullBtn.attr('aria-pressed', 'true').text('Exit full width');
                break;
        }
    }

    // Synchronize active card and table row state
    function syncActiveMaterial(label) {
        if (!label) return;
        label = $.trim(label);

        // 1. Sync DCF material cards
        $('.dcf-material-card').each(function () {
            var $card = $(this);
            var cardTitle = $.trim($card.find('.dcf-material-card__title a, .dcf-material-card__title').text());
            var cardTitleAttr = $.trim($card.find('.js-material-link').attr('data-title'));
            var isMatch = (cardTitle === label || cardTitleAttr === label);
            $card.toggleClass('dcf-material-card--active', isMatch);
            $card.find('.js-material-link').attr('aria-current', isMatch ? 'true' : 'false');
        });

        // 2. Sync table rows
        $('#filter_Redactions table tbody tr').each(function () {
            var $row = $(this);
            var rowTitle = $.trim($row.find('.openMe a, .show-case').text());
            var isMatch = (rowTitle === label);
            $row.toggleClass('active_document', isMatch);
            $row.find('td.title_column').toggleClass('documentSelected', isMatch);
            if (isMatch) {
                $row.removeClass('unread_document');
            }
        });
    }

    // Core handler when any document is opened
    function handleDocumentOpened(label) {
        if (!label) return;
        label = $.trim(label);

        syncActiveMaterial(label);

        // Transition layout state to document view
        if (currentMaterialsState === 'table' || currentMaterialsState === 'table-with-filter') {
            setPanelState('document-with-cards');
        }
        // If already in document-with-cards, document-with-filter-and-cards, or document-only,
        // preserve the user's current filter and full-width state.
    }

    // 1. Initial State
    setPanelState('table-with-filter');

    // Expand the GOV.UK accordion if collapsed on initial load
    setTimeout(function () {
        var $showAllBtn = $('#materials-accordion .govuk-accordion__show-all');
        if ($showAllBtn.length && $showAllBtn.find('.govuk-accordion__show-all-text').text().trim() !== 'Hide all sections') {
            $showAllBtn.trigger('click');
        }
    }, 50);

    // Reclassify return: if returning from /version-2-3/C-reclassify, activate Manage Materials tab
    if (sessionStorage.getItem('reclassify_success') === 'true') {
        sessionStorage.removeItem('reclassify_success');
        if (typeof showTabByNumber === 'function') {
            showTabByNumber(2, false);
        }
    }

    // 2. Filter Toggling
    $(document).off('click.v23MaterialsFilter', '#show_filter_Materials, #close_filter_Materials');
    $(document).on('click.v23MaterialsFilter', '#show_filter_Materials, #close_filter_Materials', function (e) {
        e.preventDefault();
        if (currentMaterialsState === 'table') {
            setPanelState('table-with-filter');
        } else if (currentMaterialsState === 'table-with-filter') {
            setPanelState('table');
        } else if (currentMaterialsState === 'document-with-cards') {
            setPanelState('document-with-filter-and-cards');
        } else if (currentMaterialsState === 'document-with-filter-and-cards') {
            setPanelState('document-with-cards');
        }
    });

    // 3. Document Open Interaction Adapter
    // Listens to document selections from table rows, DCF cards, and search modals
    $(document).off('click.v23MaterialsDocOpen', '.openMe a, .show-case, .js-material-link, #searchModal .mb5 a');
    $(document).on('click.v23MaterialsDocOpen', '.openMe a, .show-case, .js-material-link, #searchModal .mb5 a', function () {
        var $el = $(this);
        var label = $el.attr('data-title') || $el.text();
        label = $.trim(label);

        // If the element is not inside .openMe or #searchModal (e.g. standalone custom link), invoke handleMenuLinkClick
        if (!$el.closest('.openMe').length && !$el.closest('#searchModal').length) {
            if (typeof window.handleMenuLinkClick === 'function') {
                window.handleMenuLinkClick(label);
            }
        }

        handleDocumentOpened(label);
    });

    // 4. Switching Tabs in Document Viewer
    $(document).off('click.v23MaterialsTabClick', '#tab-list .govuk-tabs__tab');
    $(document).on('click.v23MaterialsTabClick', '#tab-list .govuk-tabs__tab', function () {
        var label = $(this).text().trim();
        setTimeout(function () {
            syncActiveMaterial(label);
        }, 10);
    });

    // 5. Tab Close Behaviour
    $(document).off('click.v23MaterialsTabClose', '#tab-list .closeButtonOnCPS');
    $(document).on('click.v23MaterialsTabClose', '#tab-list .closeButtonOnCPS', function () {
        setTimeout(function () {
            var $remainingTabs = $('#tab-list li.govuk-tabs__list-item').not('.arrow');
            if ($remainingTabs.length === 0) {
                $('.dcf-material-card').removeClass('dcf-material-card--active').find('.js-material-link').removeAttr('aria-current');
                $('#filter_Redactions table tbody tr').removeClass('active_document').find('td.title_column').removeClass('documentSelected');
                if (currentMaterialsState === 'document-with-filter-and-cards') {
                    setPanelState('table-with-filter');
                } else {
                    setPanelState('table');
                }
            } else {
                var activeTabLabel = $('#tab-list li.govuk-tabs__list-item--selected .govuk-tabs__tab, #tab-list li#selectedTab .govuk-tabs__tab').first().text().trim();
                if (activeTabLabel) {
                    syncActiveMaterial(activeTabLabel);
                }
            }
        }, 50);
    });

    // 6. Full-width Toggle
    $(document).off('click.v23MaterialsToggleFull', '[data-action="toggle-full"]');
    $(document).on('click.v23MaterialsToggleFull', '[data-action="toggle-full"]', function (e) {
        e.preventDefault();
        if (currentMaterialsState === 'document-with-cards' || currentMaterialsState === 'document-with-filter-and-cards') {
            filterWasOpenBeforeFullWidth = (currentMaterialsState === 'document-with-filter-and-cards');
            setPanelState('document-only');
        } else if (currentMaterialsState === 'document-only') {
            if (filterWasOpenBeforeFullWidth) {
                setPanelState('document-with-filter-and-cards');
            } else {
                setPanelState('document-with-cards');
            }
        }
    });

    // 7. Close Viewer Action (Close all documents)
    $(document).off('click.v23MaterialsCloseViewer', '[data-action="close-viewer"]');
    $(document).on('click.v23MaterialsCloseViewer', '[data-action="close-viewer"]', function (e) {
        e.preventDefault();
        $('#tab-list li.govuk-tabs__list-item').not('.arrow').remove();
        $('#redact_column_2 .document-panel').remove();
        $('#tab-list').hide();
        $('#docCopy').show();

        $('.dcf-material-card').removeClass('dcf-material-card--active').find('.js-material-link').removeAttr('aria-current');
        $('#filter_Redactions table tbody tr').removeClass('active_document').find('td.title_column').removeClass('documentSelected');

        if (currentMaterialsState === 'document-with-filter-and-cards') {
            setPanelState('table-with-filter');
        } else {
            setPanelState('table');
        }
    });

    // 8. Search within materials interaction
    $(document).off('click.v23SearchMaterials', '#redact_column_1 #search_materials');
    $(document).on('click.v23SearchMaterials', '#redact_column_1 #search_materials', function () {
        var resultValue = $('#redact_column_1 #searchURNModal').val();
        if (resultValue !== undefined) {
            $('.searchModalResults').text(resultValue);
            $('#searchURNModal-result').val(resultValue).text(resultValue);
            $('#searchErrorPanel').hide();
            $('#searchModal .das-cookie-banner').removeClass('small');
        }
    });

    $(document).off('keydown.v23SearchMaterialsKey', '#redact_column_1 #searchURNModal');
    $(document).on('keydown.v23SearchMaterialsKey', '#redact_column_1 #searchURNModal', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            $('#redact_column_1 #search_materials').trigger('click');
        }
    });

    // Maintain global access for legacy callers
    window.updateRedactLayout = function () {
        var hasActiveDoc = $('.active_document').length > 0;
        if (hasActiveDoc) {
            if (currentMaterialsState.indexOf('document') === -1) {
                setPanelState('document-with-cards');
            }
        } else {
            setPanelState('table');
        }
    };
});

// v2.3 action menu controller
function initV23ActionMenus() {
    var $materialsBtn = $('#show_Materials_Actions');
    var $materialsMenu = $('#materials_Actions');

    function isMenuOpen($menu) {
        return !$menu.prop('hidden');
    }

    function openMenu($btn, $menu) {
        $menu.prop('hidden', false).css('display', 'block');
        $btn.attr('aria-expanded', 'true').addClass('open');
    }

    function closeMenu($btn, $menu) {
        $menu.prop('hidden', true).css('display', 'none');
        $btn.attr('aria-expanded', 'false').removeClass('open');
    }

    closeMenu($materialsBtn, $materialsMenu);

    var shieldTargets = [
        $materialsBtn[0], $materialsMenu[0]
    ].filter(Boolean);

    shieldTargets.forEach(function (el) {
        el.addEventListener('mouseup', function (e) {
            e.stopPropagation();
        }, true);
    });

    $materialsBtn.off('.v23ActionMenus').on('click.v23ActionMenus', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (isMenuOpen($materialsMenu)) {
            closeMenu($materialsBtn, $materialsMenu);
        } else {
            openMenu($materialsBtn, $materialsMenu);
            var count = $('input[name=materials_document]:checked').length;
            if (count === 1) {
                $materialsMenu.find('.rename-Document').attr('active', 'active').removeClass('govuk-button--disabled').show();
            } else {
                $materialsMenu.find('.rename-Document').hide();
            }
        }
    });

    $(document).off('.v23ActionMenusOutside').on('pointerdown.v23ActionMenusOutside', function (e) {
        var $t = $(e.target);
        if (!$t.closest($materialsBtn).length && !$t.closest($materialsMenu).length) {
            if (isMenuOpen($materialsMenu)) closeMenu($materialsBtn, $materialsMenu);
        }
    });
}

$(function () {
    if (window.location.pathname.indexOf('/version-2-3/') !== -1) {
        initV23ActionMenus();
    }
});

// v2.3 overrides for legacy housekeeping.js functions
window.viewDefendants = function () {
    if (typeof showTabByNumber === 'function') {
        showTabByNumber(2, false);
    }
    var $targetLink = $('.show-case[data-id="18"][data-doc="defendants.pdf"]').first();
    if ($targetLink.length > 0) {
        $targetLink.trigger('click');
    }
    return false;
};

window.documentUpdateStatement = function () {};

window.openModalOver = function () {
    var redactionModalOver = '#redactionModalOver';
    $(redactionModalOver).removeClass('rj-dont-display');
    if (typeof showTabByNumber === 'function') {
        showTabByNumber(2, false);
    }
    var activeDoc = $('#filter_Redactions table tr.active_document a.show-case').text();
    if (activeDoc) {
        sessionStorage.setItem('last_active_doc', activeDoc);
    }
};

window.openUpdateStatement = function () {
    window.location.href = '/version-2/update-statement';
};

window.openUpdateExhibit = function () {
    window.location.href = '/version-2/update-exhibit';
};

window.openDocumentInNewWindow = function () {
    var activeReviewTab = '#tab_content_2';
    var isReviewTabVisible = $(activeReviewTab).is(':visible');
    var activeTabPanel = $('.govuk-tabs__panel:not(.govuk-tabs__panel--hidden)');

    if (isReviewTabVisible && activeTabPanel.length > 0) {
        var pdfViewer = activeTabPanel.find('#pdf-root');
        var documentURL = pdfViewer.attr('data-pdf-url');

        if (documentURL) {
            documentURL = documentURL.replace('/public/files/', '').replace('/files/', '');
            var windowName = 'Document_' + Date.now();
            window.open('/public/files/' + documentURL, windowName,
                'width=800,height=800,top=0,left=0,scrollbars=yes,location=no,toolbar=no,menubar=no,status=no');
            return false;
        }
    }

    var selectedDocs = $("input[name=materials_document]:checked, input[name=comms_document]:checked");

    if (selectedDocs.length === 0) {
        var activeRow = $('.active_document').closest('tr');
        if (activeRow.length > 0) {
            var titleCell = activeRow.find('.openMe');
            var docURL = titleCell.find('a, button').attr('data-doc');

            if (docURL) {
                var winName = 'Document_' + Date.now();
                window.open('/public/files/' + docURL, winName,
                    'width=800,height=800,top=0,left=0,scrollbars=yes,location=no,toolbar=no,menubar=no,status=no');
                return false;
            }
        }
    }

    selectedDocs.each(function (index) {
        var row = $(this).closest('tr');
        var cell = row.find('td.title_column, td.subject-cell');
        var docURL = cell.find('.openMe a, .openMe button').attr('data-doc');

        if (!docURL) {
            var nextRow = row.next('tr.hidden_row');
            var embedSrc = nextRow.find('embed').attr('src');
            if (embedSrc) {
                docURL = embedSrc.replace('/public/files/', '').replace('/files/', '');
            }
        }

        if (!docURL) {
            var btn = cell.find('button.show_comms, button.show_material');
            docURL = btn.attr('data-doc');
        }

        if (docURL) {
            var offsetX = 50 * index;
            var offsetY = 50 * index;
            var winName = 'Document_' + Date.now() + '_' + index;
            window.open('/public/files/' + docURL, winName,
                'width=800,height=800,top=' + offsetY + ',left=' + offsetX + ',scrollbars=yes,location=no,toolbar=no,menubar=no,status=no');
        }
    });

    return false;
};
