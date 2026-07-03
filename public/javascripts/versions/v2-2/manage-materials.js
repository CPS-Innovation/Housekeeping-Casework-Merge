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
    var $documentActionsMenu = $('#show_Document_Actions').closest('.moj-button-menu.dropdown');

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
        $documentActionsMenu.toggle(isDocumentVisible);
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

    // 1. Initial State: State A
    setPanelState('table');

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
