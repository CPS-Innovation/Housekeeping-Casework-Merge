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

// v2.2 Comms Actions-on-selection button — deterministic, hidden/display as source of truth.
// Uses the same pattern as initV22ActionMenus() in manage-materials.js.
// housekeeping.js binds an un-namespaced $(document).mouseup that hides #comms_Actions
// on every mouseup outside the container — including when the user clicks the toggle button.
// Fix: native capture-phase mouseup shield stops the legacy handler from interfering.
function initV22CommsActionMenu() {
    var $commsBtn = $('#show_Comms_Actions');
    var $commsMenu = $('#comms_Actions');

    if (!$commsBtn.length || !$commsMenu.length) { return; }

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

    // ---- initialise closed ----
    closeMenu($commsBtn, $commsMenu);

    // ---- capture-phase mouseup shield ----
    // Stops housekeeping.js's bubble-phase $(document).mouseup from hiding
    // #comms_Actions before our click handler runs.
    [$commsBtn[0], $commsMenu[0]].filter(Boolean).forEach(function (el) {
        el.addEventListener('mouseup', function (e) {
            e.stopPropagation();
        }, true); // capture phase
    });

    // ---- toggle ----
    $commsBtn.off('.v22CommsActionMenu').on('click.v22CommsActionMenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (isMenuOpen($commsMenu)) {
            closeMenu($commsBtn, $commsMenu);
        } else {
            openMenu($commsBtn, $commsMenu);
            // Enable/disable single-selection-only Rename
            var count = $('input[name=comms_document]:checked').length;
            if (count === 1) {
                $commsMenu.find('.rename-Document').show();
            } else {
                $commsMenu.find('.rename-Document').hide();
            }
        }
    });

    // ---- outside-click to close (pointerdown fires before click on items) ----
    $(document).off('.v22CommsActionMenuOutside').on('pointerdown.v22CommsActionMenuOutside', function (e) {
        var $t = $(e.target);
        if (!$t.closest($commsBtn).length && !$t.closest($commsMenu).length) {
            if (isMenuOpen($commsMenu)) { closeMenu($commsBtn, $commsMenu); }
        }
    });
}

$(function () {
    initV22CommsActionMenu();
});
