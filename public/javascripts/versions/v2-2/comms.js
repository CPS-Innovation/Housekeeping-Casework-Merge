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
