$(document).ready(function () {
    // Version 2.2 Manage Materials Panel State Management
    var $workspace = $('.dcf-materials-workspace--v2-1');
    if (!$workspace.length) return;

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

    let currentMaterialsState = 'table';

    function setPanelState(state) {
        currentMaterialsState = state;
        $workspace.attr('data-materials-state', state);

        // Derive visibility flags
        var isDocumentVisible = state === 'document-with-cards' || state === 'document-with-filter-and-cards' || state === 'document-only';
        var isDocumentOnly = state === 'document-only';
        var canToggleFullWidth = state === 'document-with-cards' || state === 'document-with-filter-and-cards' || state === 'document-only';

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

    // 1. Initial State
    // For version 2.2 only: show filter and expand accordion by default on page load.
    // This file is only loaded by the refactored /version-2-2/ route, so no version
    // guard is needed — but we use a pathname check for safety.
    if (window.location.pathname.indexOf('/version-2-2/') !== -1) {
        // Set initial state immediately so currentMaterialsState is correct before
        // any deferred handlers run.
        setPanelState('table');

        // Defer the v2.2 overrides until after all $(document).ready handlers
        // (including the housekeeping.js FILTER block) have run. housekeeping.js
        // hides #materials_column_1 for all version-2 pages on its own ready block;
        // we must re-apply our desired state after it.
        setTimeout(function () {
            // Re-apply filter-visible state. This overrides the housekeeping.js reset.
            setPanelState('table-with-filter');

            // Expand the GOV.UK accordion by clicking its own "show all" button.
            // This lets the component update its own ARIA attributes, button text and
            // section states — avoiding a visual-only expanded state that would leave
            // controls out of sync.
            var $showAllBtn = $('#materials-accordion .govuk-accordion__show-all');
            // Only click if the accordion is currently in the collapsed ("Show all") state.
            if ($showAllBtn.length && $showAllBtn.find('.govuk-accordion__show-all-text').text().trim() !== 'Hide all sections') {
                $showAllBtn.trigger('click');
            }
        }, 50);
    } else {
        setPanelState('table');
    }

    // Reclassify return: if returning from /version-2-2/C-reclassify, activate Manage Materials tab
    if (sessionStorage.getItem('reclassify_success') === 'true') {
        sessionStorage.removeItem('reclassify_success');
        if (typeof showTabByNumber === 'function') {
            showTabByNumber(2, false);
        }
    }

    // 2. Filter Toggling
    $(document).off('click.version21Materials', '#show_filter_Materials, #close_filter_Materials');
    $(document).on('click.version21Materials', '#show_filter_Materials, #close_filter_Materials', function (e) {
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

    // 3. Document Open Behaviour
    $(document).off('click.version21Materials', '.openMe a, .show-case, .js-material-link');
    $(document).on('click.version21Materials', '.openMe a, .show-case, .js-material-link', function (e) {
        // Preserve existing loading behaviour, just update layout
        setTimeout(function () {
            setPanelState('document-with-cards');
        }, 50);
    });

    // 4. Full-width Toggle
    $(document).off('click.version21Materials', '[data-action="toggle-full"]');
    $(document).on('click.version21Materials', '[data-action="toggle-full"]', function (e) {
        e.preventDefault();
        if (currentMaterialsState === 'document-with-cards' || currentMaterialsState === 'document-with-filter-and-cards') {
            setPanelState('document-only');
        } else if (currentMaterialsState === 'document-only') {
            setPanelState('document-with-cards');
        }
    });

    // 5. Close Viewer Action
    $(document).off('click.version21Materials', '[data-action="close-viewer"]');
    $(document).on('click.version21Materials', '[data-action="close-viewer"]', function (e) {
        // Existing close behavior is triggered by data-action="close-viewer" elsewhere
        setPanelState('table');
    });

    // Maintain global access for legacy reasons if needed
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

// v2.2 action menu controller — deterministic, hidden/display as single source of truth.
// Replaces all previous mousedown/click state-tracking attempts.
function initV22ActionMenus() {
    var $materialsBtn = $('#show_Materials_Actions');
    var $materialsMenu = $('#materials_Actions');

    // ---- helpers ----
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

    // ---- initialise menu closed ----
    closeMenu($materialsBtn, $materialsMenu);

    // ---- native capture-phase shield ----
    // housekeeping.js binds an un-namespaced $(document).mouseup that hides
    // #materials_Actions on every mouseup outside the container — including
    // when the user clicks the toggle button. Because mouseup fires before
    // click, the legacy handler hides the menu before our click handler runs.
    // We stop mouseup from reaching the document when it originates on our
    // buttons or menus, using a capture-phase listener (fires before jQuery
    // bubble-phase handlers).
    var shieldTargets = [
        $materialsBtn[0], $materialsMenu[0]
    ].filter(Boolean);

    shieldTargets.forEach(function (el) {
        el.addEventListener('mouseup', function (e) {
            e.stopPropagation();
        }, true); // capture phase
    });

    // ---- Actions on selection toggle ----
    $materialsBtn.off('.v22ActionMenus').on('click.v22ActionMenus', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (isMenuOpen($materialsMenu)) {
            closeMenu($materialsBtn, $materialsMenu);
        } else {
            openMenu($materialsBtn, $materialsMenu);
            // Enable/disable single-selection-only actions
            var count = $('input[name=materials_document]:checked').length;
            if (count === 1) {
                $materialsMenu.find('.rename-Document').attr('active', 'active').removeClass('govuk-button--disabled').show();
            } else {
                $materialsMenu.find('.rename-Document').hide();
            }
        }
    });

    // ---- outside-click to close (pointerdown fires before click on items) ----
    $(document).off('.v22ActionMenusOutside').on('pointerdown.v22ActionMenusOutside', function (e) {
        var $t = $(e.target);
        if (!$t.closest($materialsBtn).length && !$t.closest($materialsMenu).length) {
            if (isMenuOpen($materialsMenu)) closeMenu($materialsBtn, $materialsMenu);
        }
    });
}

$(function () {
    initV22ActionMenus();
});

// v2.2 overrides for legacy housekeeping.js functions

// viewDefendants in housekeeping.js checks pathname.indexOf('/version-2/'), which is
// false for /version-2-2/, causing it to open the wrong tab. This override forces
// Manage Materials (tab 2) and triggers the defendants document link directly.
window.viewDefendants = function () {
    showTabByNumber(2, false);
    var $targetLink = $('.show-case[data-id="18"][data-doc="defendants.pdf"]').first();
    if ($targetLink.length > 0) {
        $targetLink.trigger('click');
    }
    return false;
};

// documentUpdateStatement is called by the existing inline onclick handler on the Update Statement button
// but is not defined anywhere in the codebase. This no-op prevents a ReferenceError while preserving
// the navigation behaviour provided by the openUpdateStatement override above.
window.documentUpdateStatement = function () {};

// openModalOver in housekeeping.js checks pathname.indexOf('/version-2/'), which is false for
// /version-2-2/, causing it to call showTabByNumber(3) (Comms) instead of showTabByNumber(2)
// (Manage Materials). This override forces the correct tab for the v2.2 route.
window.openModalOver = function () {
    var redactionModalOver = '#redactionModalOver';
    $(redactionModalOver).removeClass('rj-dont-display');
    showTabByNumber(2, false);
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
    // Force v2 branch — /version-2-2/ does not match /version-2/ in housekeeping.js
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
