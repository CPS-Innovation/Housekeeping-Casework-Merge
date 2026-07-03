(function () {
    window.openComms = function () {
        // Identify the clicked button from the native event
        var $btn = $(window.event ? window.event.srcElement : (document.activeElement || document.body));

        // Walk up to the nearest <tr> that is not a hidden_row
        var $row = $btn.closest('tr.govuk-table__row:not(.hidden_row)');

        if (!$row.length) {
            return false;
        }

        // The hidden_row immediately follows the data row
        var $hiddenRow = $row.next('tr.hidden_row');

        if (!$hiddenRow.length) {
            return false;
        }

        // Toggle: hide all other open hidden rows first, then show this one
        var isAlreadyOpen = $hiddenRow.is(':visible');

        $('tr.hidden_row').hide();
        $('tr.govuk-table__row').removeClass('active_document');

        if (!isAlreadyOpen) {
            $hiddenRow.show();
            $row.addClass('active_document');
        }

        return false;
    };
}());

// v2.2 Comms Actions-on-selection button
// Use a DOM-ready block so we can call .off('click') to remove any direct handler
// that housekeeping.js may have registered, then bind a namespaced v2.2 handler.
$(function () {
    $('#show_Comms_Actions')
        .off('click')
        .off('click.v22Actions')
        .on('click.v22Actions', function () {
            var $btn = $(this);
            var $menu = $('#comms_Actions');
            var isOpen = $menu.is(':visible');

            // Close all open action menus first
            $('.hidden_buttons').hide();
            $('#show_Materials_Actions, #show_Comms_Actions').removeClass('active');

            if (!isOpen) {
                $menu.show();
                $btn.addClass('active');

                // Enable/disable single-item-only actions based on selection count
                var commsCount = $('input[name=comms_document]:checked').length;
                if (commsCount === 1) {
                    $('#comms_Actions .rename-Document').show();
                } else {
                    $('#comms_Actions .rename-Document').hide();
                }
            }
        });

    // Close Comms actions menu when clicking outside it
    $(document).off('mouseup.v22CommsActions').on('mouseup.v22CommsActions', function (e) {
        var $container = $('#comms_Actions');
        if (!$container.is(e.target) && $container.has(e.target).length === 0 &&
            !$('#show_Comms_Actions').is(e.target)) {
            $container.hide();
            $('#show_Comms_Actions').removeClass('active');
        }
    });
});
