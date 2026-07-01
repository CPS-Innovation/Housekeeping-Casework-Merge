// =================================== HOUSEKEEPING =================================== //
//
// COUNTER UPDATES: Added counter update functions for materials and communications
// - updateMaterialsCounters(): Updates counts/totals for materials after filtering
// - updateCommsCounters(): Updates counts/totals for communications after filtering
// These functions handle "showing X of Y" displays and tab counters
//

// $(document).ready(function() {
//    $("body")
//        .contents()
//        .filter(function() {
//            return this.nodeType == Node.TEXT_NODE;
//        })
//        .remove();
//    $("body").css("visibility", "visible");
// });

// $(document).ready(function() {
//     $('#global-navigation').show();
//     // $('#secondary-navigation').show();
//     // $('.my-cases').addClass('current');
//     // $('.sub-case').addClass('current');

// });

// document.addEventListener('DOMContentLoaded', function() {
//      var dropdownToggle = document.querySelector('.dropdown-toggle');
//      var dropdownMenu = dropdownToggle.nextElementSibling;

//      dropdownToggle.addEventListener('click', function(e) {
//           e.preventDefault(); // Prevent default link behavior
//           var parentMenuItem = dropdownToggle.parentElement;

//           if (parentMenuItem.classList.contains('show')) {
//                parentMenuItem.classList.remove('show');
//                dropdownToggle.classList.remove('active'); // Remove the arrow-up class when dropdown closes
//           } else {
//                // Close any open dropdowns
//                var openDropdowns = document.querySelectorAll('.menu-item.show');
//                openDropdowns.forEach(function(dropdown) {
//                     dropdown.classList.remove('show');
//                     dropdown.querySelector('.dropdown-toggle').classList.remove('active'); // Ensure any other arrows also point down
//                });
//                // Open the clicked dropdown
//                parentMenuItem.classList.add('show');
//                dropdownToggle.classList.add('active'); // Add the arrow-up class when dropdown opens
//           }
//      });

//      // Close the dropdown menu if clicked outside
//      document.addEventListener('click', function(e) {
//           var isClickInside = dropdownToggle.contains(e.target) || dropdownMenu.contains(e.target);
//           if (!isClickInside) {
//                dropdownToggle.parentElement.classList.remove('show');
//                dropdownToggle.classList.remove('active'); // Ensure the arrow points down when clicking outside
//           }
//      });
// });

// $(document).ready(function() {
//      $('#global-navigation').show();
//      $('.my-cases').attr('aria-current', 'page');
//      $('.sub-case').attr('aria-current', 'page');
// });

// // Store the existing MOJ filter toggle instance without altering its behavior.
// const mojFilterToggle = new MOJFrontend.FilterToggleButton({
//      bigModeMediaQuery: '(min-width: 48.063em)',
//      startHidden: true,
//      toggleButton: {
//           container: document.querySelector('.moj-action-bar__filter'),
//           showText: 'Show filter',
//           hideText: 'Hide filter',
//           classes: 'govuk-button--secondary'
//      },
//      closeButton: {
//           container: document.querySelector('.moj-filter__header-action'),
//           text: 'Close'
//      },
//      filter: {
//           container: document.querySelector('.moj-filter')
//      }
// });

// document.addEventListener('DOMContentLoaded', () => {
//      const shownDisplay = document.querySelector('[data-comm-shown]');
//      const applyFiltersBtn = document.getElementById('applyFiltersBtn');
//      const activeFiltersArea = document.getElementById('activeFiltersArea');
//      const filters = {
//           keywords: () => document.getElementById('keywords').value.trim().toLowerCase(),
//           newComms: () => document.querySelector('input[name="newComms"]:checked') !== null,
//           type: () => [...document.querySelectorAll('input[name="In/Out"]:checked')].map(el => el.nextElementSibling.innerText.trim().toLowerCase()),
//           status: () => [...document.querySelectorAll('input[name^="status"]:checked')].map(el => el.nextElementSibling.innerText.trim().toLowerCase()),
//           commsWith: () => [...document.querySelectorAll('input[name="commsWith"]:checked')].map(el => el.nextElementSibling.innerText.trim().toLowerCase())
//      };

//      const rows = [...document.querySelectorAll('#past-month tbody tr.govuk-table__row')];
//      const activeFilterList = document.querySelector('[data-active-filters]');
//      const noResults = document.getElementById('no-results-message');
//      const total = rows.length;

//      // Update totals
//      document.querySelectorAll('[data-comm-total]').forEach(el => el.textContent = total);
//      document.querySelectorAll('[data-comm-shown]').forEach(el => el.textContent = total);

//      function applyFilters() {
//           const active = {
//                keyword: filters.keywords(),
//                newComms: filters.newComms(),
//                type: filters.type(),
//                status: filters.status(),
//                commsWith: filters.commsWith()
//           };

//           let visibleCount = 0;
//           rows.forEach(row => {
//                const subject = row.querySelector('.subject-cell')?.innerText.toLowerCase() || '';
//                const type = row.children[2].innerText.toLowerCase().trim();
//                const commsWith = row.children[3].innerText.toLowerCase().trim();
//                const category = row.children[4].innerText.toLowerCase().trim();
//                const isNew = row.querySelector('.govuk-tag--blue') !== null;

//                const matchKeyword = !active.keyword || subject.includes(active.keyword);
//                const matchNewComms = !active.newComms || isNew;
//                const matchType = active.type.length === 0 || active.type.includes(type);
//                const matchStatus = active.status.length === 0 || active.status.includes(category);
//                const matchCommsWith = active.commsWith.length === 0 || active.commsWith.includes(commsWith);

//                const matches = matchKeyword && matchNewComms && matchType && matchStatus && matchCommsWith;
//                row.style.display = matches ? '' : 'none';
//                if (matches) visibleCount++;
//           });

//           shownDisplay.textContent = visibleCount;
//           noResults.style.display = visibleCount === 0 ? 'block' : 'none';
//           updateLozenges(active);
//      }

//      function updateLozenges(active) {
//           activeFilterList.innerHTML = '';

//           const addFilter = (filterType, value) => {
//                const li = document.createElement('li');
//                li.innerHTML = `
//                     <a class="app-c-filter-summary__remove-filter" href="javascript:void(0)" data-filter="${filterType}" data-filter-value="${value}">
//                          <span class="app-c-filter-summary__remove-filter-text">
//                               <span class="govuk-visually-hidden">Remove filter</span>
//                               ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}: ${value}
//                          </span>
//                     </a>
//                `;
//                activeFilterList.appendChild(li);
//           };

//           if (active.keyword) addFilter('Keyword', active.keyword);
//           if (active.newComms) addFilter('New communications', 'Unread');
//           active.type.forEach(val => addFilter('In/Out', val));
//           active.status.forEach(val => addFilter('Category', val));
//           active.commsWith.forEach(val => addFilter('Comms with', val));

//           activeFiltersArea.style.display = activeFilterList.children.length ? 'block' : 'none';

//           document.querySelectorAll('.app-c-filter-summary__remove-filter').forEach(link => {
//                link.addEventListener('click', () => {
//                     const filterType = link.getAttribute('data-filter');
//                     const filterValue = link.getAttribute('data-filter-value');
//                     removeFilter(filterType, filterValue);
//                     applyFilters();
//                });
//           });
//      }

//      function removeFilter(filterType, filterValue) {
//           switch (filterType) {
//                case 'Keyword':
//                     document.getElementById('keywords').value = '';
//                     break;
//                case 'New communications':
//                     document.querySelector('input[name="newComms"]').checked = false;
//                     break;
//                case 'In/Out':
//                     document.querySelectorAll('input[name="In/Out"]').forEach(el => {
//                          if (el.nextElementSibling.innerText.trim().toLowerCase() === filterValue.toLowerCase()) {
//                               el.checked = false;
//                          }
//                     });
//                break;
//                case 'Category':
//                     document.querySelectorAll('input[name^="status"]').forEach(el => {
//                          if (el.nextElementSibling.innerText.trim().toLowerCase() === filterValue.toLowerCase()) {
//                               el.checked = false;
//                          }
//                     });
//                break;
//                case 'Comms with':
//                     document.querySelectorAll('input[name="commsWith"]').forEach(el => {
//                          if (el.nextElementSibling.innerText.trim().toLowerCase() === filterValue.toLowerCase()) {
//                               el.checked = false;
//                          }
//                     });
//                break;
//           }
//      }

//      function clearFilters() {
//           document.getElementById('keywords').value = '';
//           document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
//           applyFilters();
//      }

//      applyFiltersBtn.addEventListener('click', e => {
//           e.preventDefault();
//           applyFilters();
//           const toggleBtn = document.querySelector('.moj-action-bar__filter button');
//           if (toggleBtn && toggleBtn.textContent.trim() === 'Hide filter') {
//                toggleBtn.click();
//           }
//      });

//      // Attach clear filters handler to both clear filters buttons/links.
//      document.querySelectorAll('.clear-filters, #clearFiltersLink').forEach(clearLink => {
//           clearLink.addEventListener('click', e => {
//                e.preventDefault();
//                clearFilters();
//           });
//      });

//      clearFilters();
// });

///////////////////////////////////////////////////// CHRIS CODE - START /////////////////////////////////////////////////////

// TABS
$(document).ready(function () {

    // --- NOTIFICATION BANNER AUTO-FADEOUT (10 seconds) ---
    // This function applies a 10s fadeout to any visible notification banner
    function applyBannerFadeOut(banner) {
        var $banner = $(banner);
        // Only apply if it's currently visible and hasn't had the timeout applied yet
        if ($banner.is(':visible') && !$banner.data('timeout-applied')) {
            $banner.data('timeout-applied', true);
            setTimeout(function () {
                $banner.fadeOut(1000);
            }, 10000);
        }
    }

    // 1. Apply to any banners visible on page load
    $('.govuk-notification-banner').each(function () {
        applyBannerFadeOut(this);
    });

    // 2. Use MutationObserver to catch banners that are shown dynamically
    // (e.g., via .show(), .removeClass('rj-dont-display'), or added to DOM)
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // Check for new elements added to the DOM
            if (mutation.type === 'childList') {
                $(mutation.addedNodes).find('.govuk-notification-banner').addBack('.govuk-notification-banner').each(function () {
                    applyBannerFadeOut(this);
                });
            }
            // Check for style/class changes (like .show() or removing hidden classes)
            else if (mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                if ($(mutation.target).hasClass('govuk-notification-banner')) {
                    applyBannerFadeOut(mutation.target);
                }
            }
        });
    });

    // Start observing the entire document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    // --- END NOTIFICATION BANNER AUTO-FADEOUT ---

    // Function to get URL parameter by name
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Function to show a specific tab
    function showTabByNumber(tabNumber, isLogicalV1) {
        // Detect version from URL
        var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;

        // Map tab numbers for Version 2 if using v1 logical numbers
        // v1 Order: 1:PCD, 2:Materials, 3:Review & Redact, 4:Comms, 5:Reviews
        // v2 Order: 1:PCD, 2:Manage materials (v1:3), 3:Comms (v1:4), 4:Reviews (v1:5), 5:Materials (v1:2), 6:Review and redact (v1:3)
        var targetTabNumber = tabNumber;
        if (isVersion2 && isLogicalV1) {
            // Mapping v1 logical tab numbers to v2 physical tab indices
            if (tabNumber == 1) targetTabNumber = 1; // PCD
            else if (tabNumber == 2) targetTabNumber = 5; // Materials
            else if (tabNumber == 3) targetTabNumber = 2; // Manage materials (v1:3) - primary mapping
            else if (tabNumber == 4) targetTabNumber = 3; // Comms
            else if (tabNumber == 5) targetTabNumber = 4; // Reviews
        }

        // Hide all panels
        $('.panel').hide();

        // Remove selected class from all tab links
        $('#new-tabs li').removeClass('govuk-tabs__list-item--selected');

        // Show the specific tab panel
        $('#tab_content_' + targetTabNumber).show();

        // Add selected class to the specific tab link
        $('.tab-' + targetTabNumber + '-content_link').addClass('govuk-tabs__list-item--selected');

        // Handle special cases for specific tabs (using logical purpose)
        // If it's the "Review & Redact" style tab (v1:3, v2:2, v2:6)
        if ((!isVersion2 && tabNumber == 3) || (isVersion2 && (targetTabNumber == 2 || targetTabNumber == 6))) {
            $('#tab-list').show();
            $('#docCopy').hide();
        }

        // If it's the "Communications" tab (v1:4, v2:3)
        if ((!isVersion2 && tabNumber == 4) || (isVersion2 && targetTabNumber == 3)) {
            // Update communications counters when the tab is shown
            if (typeof updateCommsCounters === 'function') {
                updateCommsCounters();
            }
        }

        // Hide extra navigation elements
        $('.extra-nav').hide();
        $('.extended-navigation').removeClass('govuk-tabs__list-item--selected');
        $('.show-hide').removeClass('active');
    }

    // Check for tab parameter in URL and show appropriate tab
    var tabParam = getUrlParameter('tab');
    if (tabParam) {
        showTabByNumber(tabParam, true);
    }

    // Updated tab click handler that works with URL parameters
    $("#new-tabs .tab-link").on("click", function (e) {
        e.preventDefault();

        // Get the tab number from the class name
        var classes = $(this).attr('class');
        var tabMatch = classes.match(/tab-(\d+)-content/);
        if (tabMatch) {
            var tabNumber = tabMatch[1];
            showTabByNumber(tabNumber, false);
        } else {
            // Fallback to original behavior for non-numbered tabs
            $('ul#new-tabs li').removeClass('govuk-tabs__list-item--selected');
            $(this).parent().addClass('govuk-tabs__list-item--selected');

            $('.extra-nav').hide();
            $('.extended-navigation').removeClass('govuk-tabs__list-item--selected');
            $('.show-hide').removeClass('active');
        }
    });

    // Keep existing individual tab handlers for backward compatibility
    $('.tab-1-content').on("click", function (e) {
        showTabByNumber(1);
    });

    $('.tab-2-content').on("click", function (e) {
        showTabByNumber(2);
    });

    $('.tab-3-content').on("click", function (e) {
        showTabByNumber(3);
    });

    $('.tab-3-content_link').on("click", function (e) {
        showTabByNumber(3);
    });

    $('.tab-4-content').on("click", function (e) {
        showTabByNumber(4);
    });

    $('.tab-5-content').on("click", function (e) {
        showTabByNumber(5);
    });

    $('.tab-5-content_link').on("click", function (e) {
        showTabByNumber(5);
    });

    window.showTabByNumber = showTabByNumber;

    if (sessionStorage.getItem('reclassify_success') === 'true') {
        var reclassifiedItems = JSON.parse(sessionStorage.getItem('reclassify_items') || '[]');
        var newType = sessionStorage.getItem('reclassify_type');
        var sourceTab = sessionStorage.getItem('reclassify_source_tab');

        if (reclassifiedItems.length > 0 && newType) {
            reclassifiedItems.forEach(function (itemName) {
                if (sourceTab === "2") {
                    // Update Materials table
                    $('#materials_table tbody tr').each(function () {
                        var row = $(this);
                        var checkbox = row.find('input[name=materials_document]');
                        if (checkbox.val() === itemName) {
                            // Update Type (3rd column) or Category (4th column)
                            // Based on description: "their Category or Type value changed to the selected option"
                            // In materials table: 3rd is Type, 4th is Category. Let's update both or one?
                            // Usually 'document type' matches 'Type' column in materials.
                            row.find('td:nth-child(3)').text(newType);

                            // Highlight the change
                            row.css('background-color', '#F3F2F1');
                            setTimeout(function () {
                                row.css('background-color', '');
                            }, 5000);
                        }
                    });
                } else if (sourceTab === "4") {
                    // Update Comms table
                    $('#comms_table tbody tr').each(function () {
                        var row = $(this);
                        var subjectBtn = row.find('.show_comms');
                        var itemNameInRow = subjectBtn.text().trim();

                        // Also check a[data-id] for newer rows if they exist
                        if (!itemNameInRow) {
                            itemNameInRow = row.find('.title_column a').text().trim();
                        }

                        if (itemNameInRow === itemName) {
                            // In comms table: 5th column is Comms type
                            row.find('td:nth-child(5)').text(newType);

                            // Highlight the change
                            row.css('background-color', '#f3f2f1');
                            setTimeout(function () {
                                row.css('background-color', '');
                            }, 5000);
                        }
                    });
                }
            });

            // Show a success banner
            var message = reclassifiedItems.length + (reclassifiedItems.length === 1 ? ' item' : ' items') + ' reclassified to ' + newType;
            var banner = $('<div class="govuk-notification-banner govuk-notification-banner--success" role="alert" data-module="govuk-notification-banner">' +
                '<div class="govuk-notification-banner__header"><h2 class="govuk-notification-banner__title">Success</h2></div>' +
                '<div class="govuk-notification-banner__content"><h3 class="govuk-notification-banner__heading">' + message + '</h3></div></div>');

            $('#notification-area').prepend(banner);

            // Auto-remove banner after 10 seconds
            setTimeout(function () {
                banner.fadeOut(500, function () {
                    $(this).remove();
                });
            }, 10000);
        }

        // Clean up
        sessionStorage.removeItem('reclassify_success');
        sessionStorage.removeItem('reclassify_items');
        sessionStorage.removeItem('reclassify_type');
        sessionStorage.removeItem('reclassify_source_tab');
    }

    // --- RESTORE ACTIVE DOCUMENT IN TAB 3 ---
    var lastActiveDoc = sessionStorage.getItem('last_active_doc');
    if (lastActiveDoc) {
        // Find the link in Tab 3 filter table with the matching text
        var $docLink = $('#filter_Redactions table .openMe a').filter(function () {
            return $(this).text().trim() === lastActiveDoc.trim();
        });

        if ($docLink.length > 0) {
            // Ensure we are on Tab 3
            showTabByNumber(3);
            // Trigger click to select document
            $docLink.click();
            // Clean up
            sessionStorage.removeItem('last_active_doc');
        }
    }
});

// FILTER
$(document).ready(function () {

    var isVersion2Page = window.location.pathname.indexOf('/version-2/') !== -1;

    $('#show_filter_Comms, .no_results, #show_filter_Redactions').hide();

    if (isVersion2Page) {
        $('#show_filter_Materials').show();
        $('#close_filter_Materials').hide();
        $('#materials_column_1, #materials_filter').hide();
        // NOTE: .dcf-materials-workspace--v2-1 is the legacy class name for the version 2.2
        // DCF workspace. The name was retained to avoid a risky selector refactor.
        // This class only exists in the version 2.2 tab-2 block and will never appear on 2.0 or 2.1.
        var $workspacev21 = $('.dcf-materials-workspace--v2-1');
        if (!$workspacev21.length) {
            $('#materials_column_2, #materials_content').removeClass('govuk-grid-column-three-quarters').addClass('govuk-grid-column-full');
        } else {
            $('#materials_column_2').removeClass('govuk-grid-column-three-quarters').addClass('govuk-grid-column-full');
        }
    } else {
        $('#show_filter_Materials').hide();
    }

    // Initialize counters on page load
    if (typeof updateMaterialsCounters === 'function') {
        updateMaterialsCounters();
    }
    if (typeof updateCommsCounters === 'function') {
        updateCommsCounters();
    }

    // Set up a MutationObserver to watch for table changes and update counters automatically
    // This ensures counters are updated regardless of which filtering system is used
    if (window.MutationObserver && document.querySelector('#materials_table')) {
        var observer = new MutationObserver(function (mutations) {
            var shouldUpdate = false;
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    shouldUpdate = true;
                }
                if (mutation.type === 'childList') {
                    shouldUpdate = true;
                }
            });
            if (shouldUpdate && typeof updateMaterialsCounters === 'function') {
                updateMaterialsCounters();
            }
        });

        // Start observing table rows for style changes (show/hide)
        var tableRows = document.querySelectorAll('#materials_table tbody tr');
        tableRows.forEach(function (row) {
            observer.observe(row, {
                attributes: true,
                attributeFilter: ['style'],
                childList: false,
                subtree: false
            });
        });
    }

    // Set up a MutationObserver for the communications table
    if (window.MutationObserver && document.querySelector('#comms_table')) {
        var commsObserver = new MutationObserver(function (mutations) {
            var shouldUpdate = false;
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    shouldUpdate = true;
                }
                if (mutation.type === 'childList') {
                    shouldUpdate = true;
                }
            });
            if (shouldUpdate && typeof updateCommsCounters === 'function') {
                updateCommsCounters();
            }
        });

        // Start observing communications table rows for style changes (show/hide)
        var commsTableRows = document.querySelectorAll('#comms_table tbody tr');
        commsTableRows.forEach(function (row) {
            commsObserver.observe(row, {
                attributes: true,
                attributeFilter: ['style'],
                childList: false,
                subtree: false
            });
        });
    }

    // MATERIALS
    $("#close_filter_Materials").on("click", function (e) {
        // v2.2 manages its own panels via the inline click.version21Materials handler
        if ($('.dcf-materials-workspace--v2-1').length) return;
        $('#show_filter_Materials').show();
        $('#close_filter_Materials').hide();
        $('#materials_column_1, #materials_filter').hide();
        // NOTE: .dcf-materials-workspace--v2-1 is the legacy class name for the version 2.2
        // DCF workspace. Only present on version 2.2 pages.
        var $workspacev21 = $('.dcf-materials-workspace--v2-1');
        if (!$workspacev21.length) {
            $('#materials_column_2, #materials_content').removeClass('govuk-grid-column-three-quarters').addClass('govuk-grid-column-full');
        } else {
            $('#materials_column_2').removeClass('govuk-grid-column-three-quarters').addClass('govuk-grid-column-full');
        }
    });

    $("#show_filter_Materials").on("click", function (e) {
        // v2.2 manages its own panels via the inline click.version21Materials handler
        if ($('.dcf-materials-workspace--v2-1').length) return;
        $(this).hide();
        $('#close_filter_Materials').show();
        $('#materials_column_1, #materials_filter').show();
        $('#materials_column_2').removeClass('govuk-grid-column-full').addClass('govuk-grid-column-three-quarters');
        // NOTE: .dcf-materials-workspace--v2-1 is the legacy class name for the version 2.2
        // DCF workspace. Only present on version 2.2 pages.
        var $workspacev21 = $('.dcf-materials-workspace--v2-1');
        if (!$workspacev21.length) {
            $('#materials_content').removeClass('govuk-grid-column-three-quarters').addClass('govuk-grid-column-full');
        }
    });

    // COMMS
    $("#close_filter_Comms").on("click", function (e) {
        $('#show_filter_Comms').show();
        $('#close_filter_Comms').hide();
        $('#comms_column_1').hide();
        $('#comms_column_2').removeClass('govuk-grid-column-three-quarters').addClass('govuk-grid-column-full');
    });

    $("#show_filter_Comms").on("click", function (e) {
        $(this).hide();
        $('#close_filter_Comms').show();
        $('#comms_column_1').show();
        $('#comms_column_2').removeClass('govuk-grid-column-full').addClass('govuk-grid-column-three-quarters');
    });

    // REDACTIONS
    $("#close_filter_Redactions").on("click", function (e) {
        $('#show_filter_Redactions').show();
        $('#close_filter_Redactions').hide();
        $('#redact_column_1').hide();
        $('#redact_column_2').removeClass('govuk-grid-column-three-quarters').addClass('govuk-grid-column-full');
    });

    $("#show_filter_Redactions").on("click", function (e) {
        $(this).hide();
        $('#close_filter_Redactions').show();
        $('#redact_column_1').show();
        $('#redact_column_2').removeClass('govuk-grid-column-full').addClass('govuk-grid-column-three-quarters');
    });

    // CLEAR FILTERS
    $('.materials_filters_clear_All').on("click", function (e) {
        e.preventDefault();
        $('#active_filter').hide();
        $('#active_filter h3').hide();
        $('.selected_filter').hide();
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');
        $('input[name=filter_materials__New]').prop('checked', false);
        $('input[name=filter_materials__Status]').prop('checked', false);
        $('input[name=filter_materials__Category]').prop('checked', false);
        $('.no_results').hide();

        // Update counters after clearing filters
        updateMaterialsCounters();
    });

    // Function to update materials counters and "showing X of Y" displays
    function updateMaterialsCounters() {
        // Count total materials (excluding header row and hidden detail rows)
        var totalMaterials = $('table#materials_table tbody tr:not(.hidden_row)').length;

        // Count visible materials (excluding header row and hidden detail rows, only main rows that are visible)
        var visibleMaterials = $('table#materials_table tbody tr:visible:not(.hidden_row)').length;

        // Update the specific counter structure from the HTML template
        // Find the paragraph that contains "Showing X materials out of Y" ONLY in the materials tab
        var counterParagraph = $('#materials_column_2 .info_wrapper p, #materials_content .info_wrapper p');
        if (counterParagraph.length > 0) {
            // Update the content with the new counts
            counterParagraph.html('Showing <strong>' + visibleMaterials + '</strong> materials out of <strong>' + totalMaterials + '</strong>');
        }

        // Also try to update any alternative counter patterns
        $('[data-materials-shown]').text(visibleMaterials);
        $('[data-materials-total]').text(totalMaterials);

        // Update tab counters - target the specific Materials list tab
        var materialsTab = $('.tab-2-content');
        if (materialsTab.length > 0) {
            // Extract and update the number in parentheses
            var tabText = materialsTab.text();
            var updatedText = tabText.replace(/\(\d+\)/, '(' + totalMaterials + ')');
            materialsTab.text(updatedText);
        }

        // Update any counter in tabs or other elements using common patterns
        $('.materials-count, .materials-counter').text(visibleMaterials);
        $('.materials-total').text(totalMaterials);
        $('#materials-tab-count, .materials-tab .count, .materials-tab .badge').text(visibleMaterials);

        // Handle no results display
        if (visibleMaterials === 0) {
            $('.no_results').show();
        } else {
            $('.no_results').hide();
        }
    }

    // Function to update communications counters and "showing X of Y" displays
    function updateCommsCounters() {
        // Count total communications (only count actual table rows in comms_table)
        var totalComms = $('table#comms_table tbody tr').length;

        // Count visible communications - but if the tab is hidden, count all rows
        var isTabVisible = $('#tab_content_4').is(':visible');
        var visibleComms;

        if (isTabVisible) {
            // Tab is shown, count only visible rows
            visibleComms = $('table#comms_table tbody tr:visible').length;
        } else {
            // Tab is hidden, assume all rows are visible (count all)
            visibleComms = totalComms;
        }

        // Update "showing X of Y" displays
        $('[data-comms-shown], [data-comm-shown]').text(visibleComms);
        $('[data-comms-total], [data-comm-total]').text(totalComms);

        // Update tab badges/counters
        $('#comms-tab-count, .comms-tab .count, .comms-tab .badge').text(visibleComms);
        $('.comms-count, .comms-counter').text(visibleComms);
        $('.comms-total').text(totalComms);

        // Update "showing" text displays
        $('.showing-comms-count').text(visibleComms);
        $('.total-comms-count').text(totalComms);
        $('.comms-showing-text').text('Showing ' + visibleComms + ' of ' + totalComms + ' communications');

        // Handle no results display
        if (visibleComms === 0) {
            $('.no_results, #no-results-message').show();
        } else {
            $('.no_results, #no-results-message').hide();
        }
    }

    $('#applyFiltersBtn').on("click", function (e) {
        // Reset visibility first - show all rows
        $('table#materials_table tr').show();
        $('.no_results').hide();

        // SECTION 1
        if ($('input[name=filter_materials__New]').is(':checked')) {
            $('#active_filter').show();
            $('.materials_filters_Title_1, .materials_filters_clear_New').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_New').show();
        }

        // SECTION 2
        if ($('input[name=filter_materials__Status]').is(':checked')) {
            $('#active_filter').show();
            $('.materials_filters_Title_2').show();
        }

        if ($('input[id=filter_materials__Status_1]').is(':checked')) {
            $('.materials_filters_clear_Used').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Used').show();
        }

        if ($('input[id=filter_materials__Status_2]').is(':checked')) {
            $('.materials_filters_clear_Unused').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Unused').show();
        }
        if ($('input[id=filter_materials__Status_3]').is(':checked')) {
            $('.materials_filters_clear_None').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_None').show();
        }

        // SECTION 3
        if ($('input[name=filter_materials__Category]').is(':checked')) {
            $('#active_filter').show();
            $('.materials_filters_Title_3').show();
        }
        if ($('input[id=filter_materials__Category_1]').is(':checked')) {
            $('.materials_filters_clear_Review').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Review').show();
        }
        if ($('input[id=filter_materials__Category_2]').is(':checked')) {
            $('.materials_filters_clear_Case_overview').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Case_overview').show();
        }
        if ($('input[id=filter_materials__Category_3]').is(':checked')) {
            $('.materials_filters_clear_Statement').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Statement').show();
        }
        if ($('input[id=filter_materials__Category_4]').is(':checked')) {
            $('.materials_filters_clear_Exhibit').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Exhibit').show();
        }

        if ($('input[id=filter_materials__Category_5]').is(':checked')) {
            $('.materials_filters_clear_Forensics').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Forensics').show();
        }

        if ($('input[id=filter_materials__Category_6]').is(':checked')) {
            $('.materials_filters_clear_Always_Unused').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Always_Unused').show();
            $('.no_results').show();
        }


        if ($('input[id=filter_materials__Category_7]').is(':checked')) {
            $('.materials_filters_clear_Defendant').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Defendant').show();
        }

        if ($('input[id=filter_materials__Category_8]').is(':checked')) {
            $('.materials_filters_clear_Court_preparation').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Court_preparation').show();
        }

        if ($('input[id=filter_materials__Category_9]').is(':checked')) {
            $('.materials_filters_clear_Communications').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Communications').show();
        }

        if ($('input[id=filter_materials__Category_10]').is(':checked')) {
            $('.materials_filters_clear_Uncategorised').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_Uncategorised').show();
        }

        if ($('input[id=filter_materials__Category_11]').is(':checked')) {
            $('.materials_filters_clear_MG_Form').show();

            $('table#materials_table tr').hide();
            $('table#materials_table thead tr, table#materials_table tr.material_MG_Form').show();
        }


        // Update counters after filtering
        updateMaterialsCounters();

        // Scroll to top of the page
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    $('.selected_filter').on("click", function (e) {
        $(this).hide();
    });

    // SECTION 1
    $('.materials_filters_clear_New').on("click", function (e) {
        $('input[name=filter_materials__New]').prop('checked', false);
        $('.materials_filters_Title_1').hide();
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });

    // SECTION 2
    $('.materials_filters_clear_Used').on("click", function (e) {
        $('input[id=filter_materials__Status_1]').prop('checked', false);
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else if ($('input[name=filter_materials__Status]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Category]:checked').length >= 1) {
            $('.materials_filters_Title_2').hide();
            $('#active_filter').show();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });

    $('.materials_filters_clear_Unused').on("click", function (e) {
        $('input[id=filter_materials__Status_2]').prop('checked', false);
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else if ($('input[name=filter_materials__Status]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Category]:checked').length >= 1) {
            $('.materials_filters_Title_2').hide();
            $('#active_filter').show();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });

    $('.materials_filters_clear_None').on("click", function (e) {
        $('input[id=filter_materials__Status_3]').prop('checked', false);
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else if ($('input[name=filter_materials__Status]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Category]:checked').length >= 1) {
            $('.materials_filters_Title_2').hide();
            $('#active_filter').show();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });

    // SECTION 3
    $('.materials_filters_clear_Statement').on("click", function (e) {
        $('input[id=filter_materials__Category_1]').prop('checked', false);
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
            $('.materials_filters_Title_3').hide();
            $('#active_filter').show();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });

    $('.materials_filters_clear_Exhibit').on("click", function (e) {
        $('input[id=filter_materials__Category_2]').prop('checked', false);
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
            $('.materials_filters_Title_3').hide();
            $('#active_filter').show();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });

    $('.materials_filters_clear_MG_Form').on("click", function (e) {
        $('input[id=filter_materials__Category_3]').prop('checked', false);
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
            $('.materials_filters_Title_3').hide();
            $('#active_filter').show();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });

    $('.materials_filters_clear_Other').on("click", function (e) {
        $('input[id=filter_materials__Category_4]').prop('checked', false);
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
            $('.materials_filters_Title_3').hide();
            $('#active_filter').show();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });

    $('.materials_filters_clear_Always_Unused').on("click", function (e) {
        $('input[id=filter_materials__Category_5]').prop('checked', false);
        // Restore to page load state - show only main material rows, hide detail rows
        $('table#materials_table tr:not(.hidden_row)').show();
        $('table#materials_table tr.hidden_row').hide();
        // Reset all material action buttons to unexpanded state
        $('button.show_material_actions').removeClass('hide').html('Preview <i class="fa-solid fa-chevron-down"></i>');

        if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
            $('#active_filter').hide();
        } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
            $('.materials_filters_Title_3').hide();
            $('#active_filter').show();
        } else {
            $('#active_filter').show();
        }

        // Update counters after clearing filter
        updateMaterialsCounters();
    });


});

// ACTIONS - MATERIALS & COMMS
$(document).ready(function () {

    $("#show_Materials_Actions").click(function () {
        $(this).toggleClass('active');
        $('.hidden_buttons').toggle();
    });

    $("#show_Comms_Actions").click(function () {
        $(this).toggleClass('active');
        $('.hidden_buttons').toggle();
    });

});

$(document).mouseup(function (e) {
    var container = $("#materials_Actions");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        $('#show_Materials_Actions').removeClass('active');
    }

    var container_V2 = $("#comms_Actions");

    if (!container_V2.is(e.target) && container_V2.has(e.target).length === 0) {
        container_V2.hide();
        $('#show_Comms_Actions').removeClass('active');
    }

});


// Hide actions depending on certain criteria
$(document).ready(function () {

    // Hide the update actions by default until an Exhibit or Statement material is selected
    $('#update-exhibit').hide();
    $('#update-statement').hide();

    $("#show_Materials_Actions").click(function () {

        // Get all checked materials
        const checkedMaterials = $("input[name=materials_document]:checked");
        const materialsCount = checkedMaterials.length;

        if (materialsCount === 1) {
            // Show actions that can only be performed on a single item
            $('#materials_Actions .rename-Document').attr('active', 'active').removeClass('govuk-button--disabled');
            $('#materials_Actions .rename-Document').show();


            // Check to see whether the material is a statement or Exhibit

            // If the checked material is an Exhibit, show certain actions
            const checkedMaterialType = $("input[name=materials_document]:checked")
                .closest('tr')
                .find('td')
                .eq(3)
                .text();

            console.log(checkedMaterialType);

            if (checkedMaterialType === "Exhibits") {
                console.log("checkedMaterialType is Exhibit");
                $('#update-exhibit').show();
                $('#update-statement').hide();
            } else if (checkedMaterialType === "Statements") {
                console.log("checkedMaterialType is Statements");
                $('#update-exhibit').hide();
                $('#update-statement').show();
            }


        } else {
            // Show actions that can be 'bulk' performed on many items
            $('#materials_Actions .rename-Document').hide();

            // Optionally show the item as disabled
            // $('#materials_Actions .rename-Document').attr('disabled','disabled').addClass('govuk-button--disabled');
        }
    });

    $("#show_Comms_Actions").click(function () {

        // Get all checked comms
        const checkedComms = $("input[name=comms_document]:checked");
        const commsCount = checkedComms.length;

        if (commsCount === 1) {
            // Show Comms actions that can only be performed on a single item
            $('#comms_Actions .rename-Document').show();

        } else {
            // Show Comms actions that can be 'bulk' performed on many items
            $('#comms_Actions .rename-Document').hide();
        }
    });
});

$(window).scroll(function () {

    var scroll = $(window).scrollTop();

    if (scroll >= 375) {
        $(".actions_holder").addClass("sticky");
    } else {
        $(".actions_holder").removeClass("sticky");
    }

});

// SELECTING MATERIALS & COMMS
$(document).ready(function () {

    $('#tab-list, #auto_reclassify').hide();

    // open the reclassify page on click
    $(document).on('click', '#update-and-reclassify', function (e) {
        e.preventDefault();
        if ($(this).hasClass('govuk-button--disabled')) return;

        var selectedItems = [];
        var sourceTab = "";

        // Check which tab we are on and get selected items
        if ($('#tab_content_2').is(':visible')) {
            sourceTab = "2";
            $('input[name=materials_document]:checked').each(function () {
                selectedItems.push($(this).val());
            });
        } else if ($('#tab_content_4').is(':visible')) {
            sourceTab = "4";
            $('input[name=comms_document]:checked').each(function () {
                // For comms, the value might be different, let's try to get the subject text
                var row = $(this).closest('tr');
                var subjectText = row.find('.show_comms').text().trim();
                selectedItems.push(subjectText || $(this).val());
            });
        }

        if (selectedItems.length > 0) {
            sessionStorage.setItem('reclassify_items', JSON.stringify(selectedItems));
            sessionStorage.setItem('reclassify_source_tab', sourceTab);

            // Get version from URL
            var path = window.location.pathname;
            var versionMatch = path.match(/\/version-\d+\//);
            var versionPrefix = versionMatch ? versionMatch[0] : "";

            window.location.href = versionPrefix + "C-reclassify";
        }
    });

    // RECLASSIFY
    $(".auto_reclassify_Documents").click(function () {
        $('#discard_successful, #rename_COMPLETE, #mark_as, #update_exhibit_successful').hide();
        $('#auto_reclassify').stop(true, true).show(); // Show the banner quickly

        // Hide the banner after 2 seconds
        setTimeout(function () {
            $('#auto_reclassify').hide(); // Fade out smoothly
        }, 3000);
    });

    // MATERIALS
    $("#materials_documents_ALL").click(function () {
        if ($(this).is(':checked')) {
            $('input[name=materials_document]').prop('checked', true);
            $('.mark_as_Read').removeAttr('disabled').removeClass('govuk-button--disabled');
        } else {
            $('input[name=materials_document]').prop('checked', false);
            $('.mark_as_Read').attr('disabled', 'disabled').addClass('govuk-button--disabled');
        }
        updateSelectedMaterials();
    });

    $('input[name=materials_document]').click(function () {
        if ($("input[name=materials_document]:checked").length >= 1) {
            $('#update-and-reclassify, .unused_Materials_Multiple_Docs, .reclassify_Document_Multiple_Docs, .redact_Document_Multiple_Docs, .mark_as_Read').removeAttr('disabled').removeClass('govuk-button--disabled');
        } else if ($("input[name=materials_document]:checked").length == 0) {
            $('#update-and-reclassify, .unused_Materials_Multiple_Docs, .reclassify_Document_Multiple_Docs, .redact_Document_Multiple_Docs, .mark_as_Read').attr('disabled', 'disabled').addClass('govuk-button--disabled');
        }
        updateSelectedMaterials();
    });

    function updateSelectedMaterials() {
        var selected = [];
        $('input[name=materials_document]:checked').each(function () {
            if ($(this).val() !== 'Select all') {
                selected.push($(this).val());
            }
        });
        $('#material_selected').val(selected.join(', '));
    }

    // MATERIALS - Reclassify to Unused handler
    $('.unused_Materials_Multiple_Docs').click(function (e) { // Add 'e' parameter
        e.stopPropagation(); // Prevent the menu from closing
        if (!$(this).is(':disabled')) {
            markMaterialsAsUnused();
        }
    });

    // COMMS
    $("#comms_documents_ALL").click(function () {
        if ($(this).is(':checked')) {
            $('input[name=comms_document]').prop('checked', true);
            $('.mark_as_Read').removeAttr('disabled').removeClass('govuk-button--disabled');
        } else {
            $('input[name=comms_document]').prop('checked', false);
            $('.mark_as_Read').attr('disabled', 'disabled').addClass('govuk-button--disabled');
        }
        updateSelectedComms();
    });

    $('input[name=comms_document]').click(function () {
        if ($("input[name=comms_document]:checked").length >= 1) {
            $('#update-and-reclassify').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.unused-Document').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.rename_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.reclassify_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.discard_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.redact_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.read_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.mark_as_Read').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.unused_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');
            $('.viewInNewWindow_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');


        } else if ($("input[name=comms_document]:checked").length == 0) {
            $('#update-and-reclassify').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.unused-Document').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.rename_Comms_Multiple_Docs').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.reclassify_Comms_Multiple_Docs').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.discard_Comms_Multiple_Docs').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.redact_Comms_Multiple_Docs').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.read_Comms_Multiple_Docs').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.mark_as_Read').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.unused_Comms_Multiple_Docs').attr('disabled', 'disabled').addClass('govuk-button--disabled');
            $('.viewInNewWindow_Comms_Multiple_Docs').attr('disabled', 'disabled').addClass('govuk-button--disabled');
        }
        updateSelectedComms();
    });

    function updateSelectedComms() {
        var selected = [];
        $('input[name=comms_document]:checked').each(function () {
            if ($(this).val() !== 'Select all' && $(this).val() !== 'hmrc') {
                selected.push($(this).val());
            }
        });
        $('#comms_material_selected').val(selected.join(', '));
    }

    // COMMS - Reclassify to Unused handler
    $('.unused_Comms_Multiple_Docs').click(function (e) { // Add 'e' parameter
        e.stopPropagation(); // Prevent the menu from closing
        if (!$(this).is(':disabled')) {
            markCommsAsUnused();
        }
    });

    $('.show_material, .show_material_actions,#show_Materials_Actions').click(function () {
        $('#discard_successful, #update_exhibit_successful').hide();

        var materialsNumber = $(this).data('id');
        if (materialsNumber) {
            var $row = $('table#materials_table tr[data-row_id="' + materialsNumber + '"]');
            var $actionButton = $('button.show_material_actions[data-id="' + materialsNumber + '"]');

            $row.toggle();
            $actionButton.toggleClass('hide');

            var urlParams = new URLSearchParams(window.location.search);
            var version = (urlParams.get('version') || '').toString();
            var major = version ? (version.indexOf('.') > -1 ? version.split('.') [0] : version) : '';

            if (major === '0') {
                if ($actionButton.hasClass('hide')) {
                    $actionButton.html('Hide <i class="fa-solid fa-chevron-down"></i>');
                } else {
                    $actionButton.html('Actions <i class="fa-solid fa-chevron-down"></i>');
                }
            } else {
                if ($actionButton.hasClass('hide')) {
                    $actionButton.html('Hide');
                } else {
                    $actionButton.html('Preview');
                }
            }
        }
    });

    $('.show_comms, .show_comms_actions,#show_Comms_Actions').click(function () {
        $('#discard_successful, #update_exhibit_successful').hide();

        var commsNumber = $(this).data('id');
        if (commsNumber) {
            var $row = $('table#comms_table tr[data-row_id="' + commsNumber + '"]');
            var $actionButton = $('button.show_comms_actions[data-id="' + commsNumber + '"]');

            $row.toggle();
            $actionButton.toggleClass('hide');

            if ($actionButton.hasClass('hide')) {
                $actionButton.html('Hide');
            } else {
                $actionButton.html('Preview');
            }
        }
    });

    // Maintain the chevrons for older version 0 and removing them for newer versions
    // Replaced by refactored logic above


    // $('.show_material_actions.hide').click(function(){
    //      $(this).html('Actions <i class="fa-solid fa-chevron-down"></i>').removeClass('hide');
    //      $('table#materials_table tr.hidden_row').hide();
    // });

    $('.redact_Document_Multiple_Docs').click(function () {
        $('ul#tab-list').show();

        var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
        var targetTabNumber = isVersion2 ? 2 : 3;
        $('ul#new-tabs li').removeClass('list-item--selected govuk-tabs__list-item--selected');
        $('ul#new-tabs li.tab-' + targetTabNumber + '-content_link').addClass('list-item--selected govuk-tabs__list-item--selected');

        $('.panel').hide();
        var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
        var activeReviewTab = isVersion2 ? '#tab_content_2' : '#tab_content_3';
        $(activeReviewTab).show();
        $('#docCopy').hide();

        var redactedDocuments = parseInt($("input[name=materials_document]:checked").length);
        var existingNUmber = parseInt($('.redacted_documents').text());
        $('.redacted_documents').text(redactedDocuments + existingNUmber);

        // Scroll to a position above the tabs
        scrollToTab3Position();
    });

    $('.redact_Document').click(function () {
        $('.panel').hide();
        $('#tab_content_2').hide();
        var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
        var activeReviewTab = isVersion2 ? '#tab_content_2' : '#tab_content_3';
        $(activeReviewTab).show();
        $('#tab-list').show();

        var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
        var targetTabNumber = isVersion2 ? 2 : 3;
        $('#new-tabs li').removeClass('list-item--selected govuk-tabs__list-item--selected');
        $('#new-tabs li.tab-' + targetTabNumber + '-content_link').addClass('list-item--selected govuk-tabs__list-item--selected');

        $('#docCopy').hide();

        var redactedDocuments = parseInt($('.redacted_documents').text());
        $('.redacted_documents').text(redactedDocuments + 1);

        // Scroll to a position above the tabs
        scrollToTab3Position();
    });

    $('#filter_Redactions table .openMe a').click(function () {
        // v2.2 handles document open via its own click.version21Materials handler
        if ($('.dcf-materials-workspace--v2-1').length) return;
        $('ul#tab-list').show();
        var redactedDocuments = parseInt($('.redacted_documents').text());
        $('.redacted_documents').text(redactedDocuments + 1);

        $('.panel').hide();
        var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
        var activeReviewTab = isVersion2 ? '#tab_content_2' : '#tab_content_3';
        $(activeReviewTab).show();

        $('.active_document').removeClass('active_document');
        $('.govuk-tag').filter(function () {
            return $(this).text().trim() === 'Active document';
        }).remove();
        var $row = $(this).closest('tr');
        var $td = $(this).closest('td');

        $row.addClass('active_document').removeClass('unread_document');
        if ($td.find('.govuk-tag').filter(function () {
            return $(this).text().trim() === 'Active document';
        }).length === 0) {
            $td.prepend(`<strong class="govuk-tag active_document">Active document</strong>`);
        }

        // Enable "View in new window" button when a document becomes active
        $('.open-Document').removeClass('govuk-button--disabled');

        // Scroll to a position above the tabs
        scrollToTab3Position();
    });

});

function scrollToTab3Position() {
    // Get the tabs position
    var tabsPosition = $('#tab-list').offset().top;
    // Scroll to a position 200px above the tabs
    $('html, body').animate({
        scrollTop: tabsPosition - 200
    }, 300);
}

function closeTab() {
    var redactedDocuments = parseInt($('.redacted_documents').text());
    $('.redacted_documents').text(redactedDocuments - 1);

    var numberOfLis = parseInt($('ul#tab-list').children().length);
    if (numberOfLis <= 4) {
        $('#tab-list').hide();
    }

}

// MARK AS READ
$(document).ready(function () {

    $('#mark_as').hide();

    $('.mark_as_Read').click(function () {
        $(this).toggleClass('read');

        $('#discard_successful, #auto_reclassify, #update_exhibit_successful').hide();

        var isRead = $(this).hasClass('read');
        $('#mark_as').show();

        // Handle multiple selections for Materials
        if ($("input[name=materials_document]:checked").length > 0) {
            $("input[name=materials_document]:checked").each(function () {
                if ($(this).val() !== 'Select all') {
                    var $row = $(this).closest('tr');
                    if (isRead) {
                        $row.find('.govuk-tag--blue').remove();
                    } else {
                        if ($row.find('.govuk-tag--blue').length === 0) {
                            $row.find('.title_column').prepend('<strong class="govuk-tag govuk-tag--blue">New</strong>');
                        }
                    }
                }
            });
        }

        // Handle multiple selections for Comms
        if ($("input[name=comms_document]:checked").length > 0) {
            $("input[name=comms_document]:checked").each(function () {
                if ($(this).val() !== 'Select all') {
                    var $row = $(this).closest('tr');
                    if (isRead) {
                        $row.find('.govuk-tag--blue').remove();
                    } else {
                        if ($row.find('.govuk-tag--blue').length === 0) {
                            // Comms uses title_column or subject-cell
                            var $target = $row.find('.title_column');
                            if ($target.length === 0) $target = $row.find('.subject-cell');
                            $target.prepend('<strong class="govuk-tag govuk-tag--blue">New</strong>');
                        }
                    }
                }
            });
        }

        // Update selected documents count in notification banner
        var selectedCount = 0;
        if ($("input[name=materials_document]:checked").length > 0) {
            selectedCount = $("input[name=materials_document]:checked").filter(function () {
                return $(this).val() !== 'Select all';
            }).length;
        } else if ($("input[name=comms_document]:checked").length > 0) {
            selectedCount = $("input[name=comms_document]:checked").filter(function () {
                return $(this).val() !== 'Select all' && $(this).val() !== 'hmrc';
            }).length;
        }

        if (selectedCount > 1) {
            $('.document_title').text(selectedCount + ' documents');
        } else {
            var document_title = $(this).closest('.openMe').find('.redact_Document').text();
            // If clicked from main button, find the first selected row's title
            if (!document_title) {
                var $firstChecked = $("input[name=materials_document]:checked, input[name=comms_document]:checked").first();
                document_title = $firstChecked.closest('tr').find('.show_material, .show_comms').text().trim();
            }
            $('.document_title').text(document_title);
        }

        var row_ID = parseInt($(this).closest('tr').data('row_id'));
        if (!isNaN(row_ID)) {
            if (row_ID == 1) {
                $('table#materials_table .document_row_1').toggleClass('read');
            }
            if (row_ID == 2) {
                $('table#materials_table .document_row_2').toggleClass('read');
            }
            if (row_ID == 3) {
                $('table#materials_table .document_row_3').toggleClass('read');
            }
            if (row_ID == 4) {
                $('table#materials_table .document_row_4').toggleClass('read');
            }
            if (row_ID == 5) {
                $('table#materials_table .document_row_5').toggleClass('read');
            }
            if (row_ID == 6) {
                $('table#materials_table .document_row_6').toggleClass('read');
            }
            if (row_ID == 7) {
                $('table#materials_table .document_row_7').toggleClass('read');
            }
            if (row_ID == 8) {
                $('table#materials_table .document_row_8').toggleClass('read');
            }
            if (row_ID == 9) {
                $('table#materials_table .document_row_9').toggleClass('read');
            }
            if (row_ID == 10) {
                $('table#materials_table .document_row_10').toggleClass('read');
            }
            if (row_ID == 11) {
                $('table#materials_table .document_row_11').toggleClass('read');
            }
            if (row_ID == 12) {
                $('table#materials_table .document_row_12').toggleClass('read');
            }
            if (row_ID == 13) {
                $('table#materials_table .document_row_13').toggleClass('read');
            }
            if (row_ID == 14) {
                $('table#materials_table .document_row_14').toggleClass('read');
            }
            if (row_ID == 15) {
                $('table#materials_table .document_row_15').toggleClass('read');
            }
            if (row_ID == 16) {
                $('table#materials_table .document_row_16').toggleClass('read');
            }
            if (row_ID == 17) {
                $('table#materials_table .document_row_17').toggleClass('read');
            }
            if (row_ID == 18) {
                $('table#materials_table .document_row_18').toggleClass('read');
            }
            if (row_ID == 19) {
                $('table#materials_table .document_row_19').toggleClass('read');
            }
            if (row_ID == 20) {
                $('table#materials_table .document_row_20').toggleClass('read');
            }
        }

        if (isRead) {
            $('.mark_as_Read').addClass('read').html('Mark as unread');
        } else {
            $('.mark_as_Read').removeClass('read').html('Mark as read');
        }

        if (isRead) {
            $('#mark_as').addClass('read');
            $('#mark_as .govuk-notification-banner__title').text('Mark as read successful');
            $('#mark_as .govuk-notification-banner__heading .status').text('read');
        } else {
            $('#mark_as').removeClass('read');
            $('#mark_as .govuk-notification-banner__title').text('Mark as unread successful');
            $('#mark_as .govuk-notification-banner__heading .status').text('unread');
        }

    });

});

function mark_as_Read() {
    $('#filter_Redactions table tr.active_document strong').hide();
    $('#mark_as').show();
    $('html,body').scrollTop(0);
    var document_title = $('#filter_Redactions table tr.active_document a.show-case').text();
    $('.document_title').text(document_title);
}

// RENAME
$(document).ready(function () {

    $('#completing_rename, #rename_COMPLETE').hide();

    $('.rename-Document').click(function () {
        // Find the checked checkbox in the current panel
        const $checkedBox = $(this).closest('.panel').find('input[name$="_document"]:checked').first();
        const $targetRow = $checkedBox.closest('tr');

        // Get the current title from the identified row
        let document_title = $targetRow.find('.show_material, .show_comms').text().trim();

        // Update the modal input field
        $('#rename-Document').val(document_title);

        // FIRST: Remove the class from EVERYWHERE to prevent cross-table updates
        $('tr.rename_document').removeClass('rename_document');

        // SECOND: Apply the class to the specific row we identified
        $targetRow.addClass('rename_document');
    });

});

function documentRename() {
    var documentName = $('#filter_Redactions table tr.active_document a.show-case').text();
    $('#rename-Document').val(documentName);
}

function renameDocument() {
    // 1. UI Feedback: Hide form and show loading spinner
    $('#rename_form').hide();
    $('#completing_rename').show();

    // 2. Get the new name from the input field
    var newDocumentName = $('#rename-Document').val();

    // 3. Simulate processing delay (1 second)
    setTimeout(function () {
        // Clear other active notification banners
        $('#discard_successful, #auto_reclassify, #mark_as, #update_exhibit_successful').hide();

        // Close the modal
        $("#openRenameModal").addClass("rj-dont-display");

        // 4. Show Success Banner with Auto-hide (10 seconds)
        $("#rename_COMPLETE").show();
        setTimeout(function () {
            $('#rename_COMPLETE').fadeOut();
        }, 10000);

        // 5. Target the specific row being renamed
        // Note: The click handler for '.rename-Document' adds this class to the correct row
        var $targetRow = $('tr.rename_document');

        // Update name in Materials or Comms table based on which row has the class
        $targetRow.find('.show_material, .show_comms').text(newDocumentName);

        // Update status tags (Hide existing tags and prepend "Renamed" tag)
        var $statusCell = $targetRow.find('td.title_column, td.subject-cell');
        $statusCell.find('strong.govuk-tag').hide();
        $statusCell.prepend(`<strong class="govuk-tag govuk-tag--green">Renamed</strong>`);

        // 6. Global UI Updates (Updates occurrences of the name in other UI components)
        $('#filter_Redactions table tr.active_document').find('.show-case').text(newDocumentName);
        $('.document-panel .docSummaryTopPage p.inPageSearchMargins2').text(newDocumentName);
        $('ul#tab-list li.govuk-tabs__list-item--selected a').text(newDocumentName);
        $('#documentNameHeader .inPageSearchMargins2').text(newDocumentName);

        // Update notification message text
        $('.updated-message p strong').text(newDocumentName);
        $('.updated-message .info-text').text('Document has been renamed ' + newDocumentName);

    }, 1000);
}

function openRenameModal() {
    $("#openRenameModal").removeClass("rj-dont-display");
    // Ensure the default state is set
    $('#rename_form').show();
    $('#completing_rename').hide();
}

function closeRenameModal() {
    $("#openRenameModal").addClass("rj-dont-display");
    $('#materials_table tr.govuk-table__row').removeClass('rename_document');
    // Reset state for next time
    $('#rename_form').show();
    $('#completing_rename').hide();
}

// Open selected documents in a new window
function openDocumentInNewWindow() {
    // Check if we are in the "Review and Redact" tab AND a specific document tab is visible
    var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
    var activeReviewTab = isVersion2 ? '#tab_content_2' : '#tab_content_3';
    let isReviewTabVisible = $(activeReviewTab).is(':visible');
    let activeTabPanel = $('.govuk-tabs__panel:not(.govuk-tabs__panel--hidden)');

    if (isReviewTabVisible && activeTabPanel.length > 0) {
        let pdfViewer = activeTabPanel.find('#pdf-root');
        let documentURL = pdfViewer.attr('data-pdf-url');

        if (documentURL) {
            // Normalize URL
            documentURL = documentURL.replace('/public/files/', '').replace('/files/', '');
            let windowName = 'Document_' + Date.now();
            window.open('/public/files/' + documentURL, windowName,
                `width=800,height=800,top=0,left=0,scrollbars=yes,location=no,toolbar=no,menubar=no,status=no`);
            return false;
        }
    }

    // Get all selected materials and comms
    let selectedDocs = $("input[name=materials_document]:checked, input[name=comms_document]:checked");

    // If no documents are selected via checkboxes, check for the active document in the Review and Redact tab
    if (selectedDocs.length === 0) {
        let activeRow = $('.active_document').closest('tr');
        if (activeRow.length > 0) {
            let titleCell = activeRow.find('.openMe');
            let documentURL = titleCell.find('a, button').attr('data-doc');
            let documentTitle = titleCell.find('a, button').text().trim();

            if (documentURL) {
                // Open a new browser window for the active document
                let windowName = 'Document_' + Date.now();
                window.open('/public/files/' + documentURL, windowName,
                    `width=800,height=800,top=0,left=0,scrollbars=yes,location=no,toolbar=no,menubar=no,status=no`);
                return false;
            }
        }
    }

    // For each selected document (existing logic for Materials and Comms tabs)
    selectedDocs.each(function (index) {
        let row = $(this).closest('tr');
        let titleCell = row.find('td.title_column, td.subject-cell');
        let documentURL = titleCell.find('.openMe a, .openMe button').attr('data-doc');
        let documentTitle = titleCell.find('.openMe a, .openMe button').text().trim();

        // Fallback for documentURL if not in data-doc
        if (!documentURL) {
            let nextRow = row.next('tr.hidden_row');
            let embedSrc = nextRow.find('embed').attr('src');
            if (embedSrc) {
                documentURL = embedSrc.replace('/public/files/', '').replace('/files/', '');
            }
        }

        // Second fallback: check if it's a button directly in the cell (no .openMe)
        if (!documentURL) {
            let button = titleCell.find('button.show_comms, button.show_material');
            documentURL = button.attr('data-doc');
            if (!documentTitle) {
                documentTitle = button.text().trim();
            }
        }

        // Open a new browser window for each document with a unique name
        if (documentURL) {
            // Add a small offset to each window position for a staggered effect
            let offsetX = 50 * index;
            let offsetY = 50 * index;

            // Create a unique name for each window
            let windowName = 'Document_' + Date.now() + '_' + index;

            // Open window with specific position and size, request no location etc although most browsers will ignore these
            window.open('/public/files/' + documentURL, windowName,
                `width=800,height=800,top=${offsetY},left=${offsetX},scrollbars=yes,location=no,toolbar=no,menubar=no,status=no`);
        }
    });

    return false;
}

// Update statement
// When clicking the action button to update a statement, go to a new page
function openUpdateStatement() {
    window.location.href = "/version-1/update-statement.html";
}

// Display the statement update form
function updateStatement() {
    // Set default values for the form fields
    // $('#statement-reference-number').val('CVJ/01');
    // $('#statement-item').val('Photos of bladed article');
    // $('#statement-name').val('MCLOVE MG12');
    // $('[name="addWitnessProducer"]').val(['new']);
    // $('#existing-statement-producer-witness').val('');

    $('#does-statement-have-date').prop("checked", true);
    $('#does-statement-have-date').prop("checked", true);
    $('#conditional-does-statement-have-date').removeClass("govuk-radios__conditional--hidden");
    $('#statement-date-day').val('10');
    $('#statement-date-month').val('9');
    $('#statement-date-year').val('2025');
    $('#statement-number').val('4');
    $('#materialStatus').prop("checked", true);

    // Hide the check your answers panel
    $('#check-statement-answers').hide();

    // Show the form
    $('#update-statement-form').show();

}

// Display the check your answers panel
function checkUpdatedStatement() {
    // Check your answers button
    $('#check-updated-statement').click(function (e) {
        e.preventDefault();
        // Hide the form
        $('#update-statement-form').hide();
        // Show the check your answers panel
        $('#check-statement-answers').show();
    })
}

// Update Exhibit
// When clicking the action button to update an exhibit, go to a new page
function openUpdateExhibit() {
    window.location.href = "/version-1/update-exhibit.html";
}

// Display the exhibit update form
function updateExhibit() {
    // Set default values for the form fields
    $('#exhibit-reference-number').val('CVJ/01');
    $('#exhibit-item').val('Photos of bladed article');
    $('#exhibit-name').val('MCLOVE MG12');
    $('[name="addWitnessProducer"]').val(['new']);
    $('#conditional-add-witness-producer-1').removeClass("govuk-radios__conditional--hidden");
    $('#existing-exhibit-producer-witness').val('');
    $('#new-exhibit-producer-witness').val('PC BYRNE');
    $('#materialStatus').prop("checked", true);

    // Show the form
    $('#update-exhibit-form').show();

    // Hide the check your answers panel
    $('#check-exhibit-answers').hide();
}

// Display the check your answers panel
function checkUpdatedExhibit() {
    // Check your answers button
    $('#check-updated-exhibit').click(function (e) {
        e.preventDefault();
        // Hide the form
        $('#update-exhibit-form').hide();
        // Show the check your answers panel
        $('#check-exhibit-answers').show();
    })
}

// function submitUpdatedExhibit(){
//     // Submit the form
//     $('#submit-updated-exhibit').click(function(e){
//         // alert("Hello, link worked");
//         e.preventDefault();
//         let update_exhibit_COMPLETED = true;
//         // Only trigger navigation; tab selection will be handled on page load using the hash
//         window.location.href = "/version-1/A-index.html#tab_content_3";
//     });
// }

// function openMaterialTab(){
//     window.location.href = "/version-1/A-index.html#tab_content_3";
//     // // Show the material tab
//     // $('.panel').hide();
//     // $('#tab_content_2').show();
//
//     // Display success modal
//     // alert("Exhibit updated successfully");
// }

function openMaterialTab() {
    // Only trigger navigation; tab selection will be handled on page load using the hash
    var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
    window.location.href = isVersion2 ? "/version-2/A-index.html#tab_content_2" : "/version-1/A-index.html#tab_content_3";
}

$(document).ready(function () {
    updateExhibit();
    checkUpdatedExhibit();
//    submitUpdatedExhibit();

    updateStatement();
    checkUpdatedStatement();
//    submitUpdatedStatement();

    var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
    var activeReviewTab = isVersion2 ? "#tab_content_2" : "#tab_content_3";
    if (window.location.hash === activeReviewTab) {
        showTabByNumber(2);
    }
});


// Open the defendants page
function viewDefendants() {
    console.log("viewDefendants function called");
    // Open the Review & Redact Tab
    showTabByNumber(3);

    // Target the specific link for Asset Rec 1 (defendants.pdf)
    var $targetLink = $('.show-case[data-id="18"][data-doc="defendants.pdf"]').first();

    if ($targetLink.length > 0) {
        // Find the parent row and section
        var $row = $targetLink.closest('tr');
        var $section = $targetLink.closest('.accordion-section');

        // Open the accordion section if it's not already open
        $section.find('.accordion-section-header').addClass('active');
        $section.addClass('active');
        $section.find('.accordion-section-body').show();

        // Clear existing active documents
        $('.active_document').removeClass("active_document");
        $('.govuk-tag').filter(function () {
            return $(this).text().trim() === 'Active document';
        }).remove();

        // Mark this document as active
        $row.addClass("active_document");
        if ($row.find('td.title_column .govuk-tag').filter(function () {
            return $(this).text().trim() === 'Active document';
        }).length === 0) {
            $row.find('td.title_column').prepend(`<strong class="govuk-tag active_document">Active document</strong>`);
        }

        // Trigger pageActions for the specific document
        $targetLink.trigger('click');
    } else {
        // Fallback for original cludgy way if the specific document is not found
        $('.accordion-section.section_2').first().find('h2.govuk-heading-s > a.accordion-section-header').addClass('active');
        $('.accordion-section.section_2').first().find('.accordion-section-body').show();

        // Clear existing active documents
        $('.active_document').removeClass("active_document");
        $('.govuk-tag').filter(function () {
            return $(this).text().trim() === 'Active document';
        }).remove();

        var $targetTd = $('.accordion-section.section_2').first().find('#exhibits_table tbody tr:nth-child(5) td');
        $('.accordion-section.section_2').first().find('#exhibits_table tbody tr:nth-child(5)').addClass("active_document");
        if ($targetTd.find('.govuk-tag').filter(function () {
            return $(this).text().trim() === 'Active document';
        }).length === 0) {
            $targetTd.prepend(`<strong class="govuk-tag active_document">Active document</strong>`);
        }
        pageActions();
    }
}

//     function updateExhibit() {
//         $('#rename_form').hide();
//         $('#completing_rename').show();
//         var newDocumentName = $('#rename-Document').val();
//         setTimeout(function () {
//             $('#discard_successful, #auto_reclassify, #mark_as').hide();
//             $("#openRenameModal").addClass("rj-dont-display");
//             $("#rename_COMPLETE").show();
//             $('table#materials_table tr.rename_document').find('.show_material').text(newDocumentName);
//             $('#filter_Redactions table tr.active_document').find('.show-case').text(newDocumentName);
//             $('.document-panel .docSummaryTopPage p.inPageSearchMargins2').text(newDocumentName);
//             $('ul#tab-list li.govuk-tabs__list-item--selected a').text(newDocumentName);
//
//             $('table#materials_table tr.rename_document td.title_column').find('strong.govuk-tag').hide();
//             $('table#materials_table tr.rename_document td.title_column').prepend(`<strong class="govuk-tag govuk-tag--green">Renamed</strong>`);
//
//         }, 1000)
//     }
//
//     function openUpdateExhibitModal() {
//         $("#openUpdateExhibitModal").removeClass("rj-dont-display");
//     }
//
//     function closeUpdateExhibitModal() {
//         $("#openUpdateExhibitModal").addClass("rj-dont-display");
//         $('#materials_table tr.govuk-table__row').removeClass('rename_document');
//     }
//
//     // Expose functions globally for inline onclick handlers
//     window.updateExhibit = updateExhibit;
//     window.openUpdateExhibitModal = openUpdateExhibitModal;
//     window.closeUpdateExhibitModal = closeUpdateExhibitModal;
// });


// REDACT DOCUMENT
$(document).ready(function () {

    $("input[name=materials_document]").click(function () {
        if ($(this).is(':checked')) {
            $(this).closest('tr').addClass('selected_for_readcation');
        } else {
            $(this).closest('tr').removeClass('selected_for_readcation');
        }
    });

    $('.activate_Statements, .activate_MG_Forms, .activate_Other').hide();

    $("select[name=review_materials]").on("change", function () {
        if ($(this).val() == 'Show all documents') {
            $('.activate_All_Documents').show();
            $('.activate_Statements, .activate_MG_Forms, .activate_Other').hide();
        } else if ($(this).val() == 'Statements') {
            $('.activate_Statements').show();
            $('.activate_All_Documents, .activate_MG_Forms, .activate_Other').hide();
        } else if ($(this).val() == 'MG Forms') {
            $('.activate_MG_Forms').show();
            $('activate_All_Documents, .activate_Statements, .activate_Other').hide();
        } else if ($(this).val() == 'Other materials') {
            $('.activate_Other').show();
            $('.activate_All_Documents, .activate_Statements, .activate_MG_Forms').hide();
        }
    });

    $(".activate_All_Documents, .activate_Statements, .activate_MG_Forms, .activate_Other").click(function () {
        $('ul#tab-list').show();
        $('#docCopy').hide();
    });

    $(".show-case").on("click", function (e) {
        var pageCount = $(this).attr("data-page");
        $('.page-counter').addClass('show');
        $('.page-counter strong').text(pageCount);
    });

    $('.accordion-section-body').hide();

    $(".accordion-section-header").on("click", function (e) {
        $(this).toggleClass('active');
        $(this).closest('.accordion-section').toggleClass('active');
        $(this).closest('.accordion-section').find('.accordion-section-body').toggle();
    });


});


// LEGACY MODALS
function openModalProblem() {
    $('#problemModal').removeClass("rj-dont-display");
}

function closeModalProblem() {
    $('#problemModal').addClass("rj-dont-display");
}

function openModal() {
    $('#searchModal').removeClass("rj-dont-display");
}

function closeModal() {
    $('#searchModal').addClass("rj-dont-display");
}

// =================================== Search button =================================== //
$(document).ready(function () {

    $(".search-button").on("click", function (e) {
        e.preventDefault();
        $('#searchFormTest2 .searchForm-inner').find('input').toggleClass('show');
        $('#searchFormTest2 .searchForm-inner').find('.bba.v2').toggleClass('show');
        $(this).toggleClass('open');
        $('#searchFormTest2 .searchForm-inner').toggle();
    });

    $(".search-item a").on("click", function (e) {
        $('.panel').hide();
        $('#tab_content_2').hide();
        var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
        var activeReviewTab = isVersion2 ? '#tab_content_2' : '#tab_content_3';
        $(activeReviewTab).show();
        $('#docCopy').hide();
        $('ul#tab-list').show();

        $('ul#new-tabs li').removeClass('govuk-tabs__list-item--selected');
        var targetTabNumber = isVersion2 ? 2 : 3;
        $('ul#new-tabs li.tab-' + targetTabNumber + '-content_link').addClass('govuk-tabs__list-item--selected');

        var redactedDocuments = parseInt($('.redacted_documents').text());
        $('.redacted_documents').text(redactedDocuments + 1);
    });

    $("input[id=searchURNModal]").on("keyup", function (e) {
        if ($(this).val() == "error") {
            $('button.search').attr('onClick', 'openModal(); searchTerm(); searchError();');
        } else {
            $('button.search').attr('onClick', 'openModal(); searchTerm();');
        }
    });

    $("input[id=searchURNModal2]").on("keyup", function (e) {
        if ($(this).val() == "error") {
            $('button.search').attr('onClick', 'openModal(); searchTerm(); searchError();');
        } else {
            $('button.search').attr('onClick', 'openModal(); searchTerm();');
        }
    });

    $('#searchErrorPanel').hide();

    $('#searchLoadingPanel').hide();


})

function searchTerm() {
    var resultValue = $('#searchURNModal').val();
    $('.searchModalResults').text(resultValue);
    $('#searchURNModal-result').val(resultValue).text(resultValue);
    $('#searchErrorPanel').hide();
    $('#searchModal .das-cookie-banner').removeClass('small');
}

function searchTerm2() {
    var resultValue = $('#searchURNModal2').val();
    $('.searchModalResults').text(resultValue);
    $('#searchURNModal-result').val(resultValue).text(resultValue);
    $('#searchErrorPanel').hide();
    $('#searchModal .das-cookie-banner').removeClass('small');
}

function searchError() {
    $('#searchResultsPanel, #searchLoadingPanel').hide();
    $('#searchErrorPanel').show();
    $('#searchModal .das-cookie-banner').addClass('small');
}


// =================================== NOTES =================================== //
$(document).ready(function () {

    $(".redact_Document").on("click", function (e) {
        // $('div').attr('data-tab-id', 'MCLOVE%20MG3-content').find('.date_details').text('test');
        // $('div').attr('data-tab-id', 'MCLOVE%20MG3-content').find('.time_details').text('test');

        // $('div').attr('data-tab-id', 'Case%20overview%20and%20officer%20comments-content').find('.date_details').text('test  r ewfwef');
        // $('div').attr('data-tab-id', 'Case%20overview%20and%20officer%20comments-content').find('.time_details').text('test  r ewfwef');
    });

})

// function documentDetails() {
//      if ($('.document-panel').data('tab-id','MCLOVE%20MG3-content')) {
//           alert('working');
//      }

// }

function openNewNotesModal() {
    $("#openNewNotesModal").removeClass("rj-dont-display");
}

function closeNewNotesModal() {
    $("#openNewNotesModal").addClass("rj-dont-display");
}

function openNotesModal() {
    $("#openNotesModal").removeClass("rj-dont-display");
    $('#notes-Comments').val('');
}

function closeNotesModal() {
    $("#openNotesModal").addClass("rj-dont-display");
}

// ====================================================== RECLASSIFY FUNCTIONS

/**
 * Reclassifies selected materials to "Unused" status
 * This function handles the bulk reclassification of checked materials
 */
function markMaterialsAsUnused() {
    // Get all checked materials
    var checkedMaterials = $("input[name=materials_document]:checked");
    var materialCount = checkedMaterials.length;

    if (materialCount === 0) {
        return; // No materials selected
    }

    var materialNames = [];

    // Collect material names and update their status in the UI
    checkedMaterials.each(function () {
        var materialName = $(this).val();
        materialNames.push(materialName);

        // Find the corresponding table row and update the status
        var row = $(this).closest('tr');
        var statusCell = row.find('td:nth-child(6)'); // Status is the 6th column

        // Update the status tag to "Unused"
        statusCell.html('<strong class="govuk-tag govuk-tag--yellow">Unused</strong>');

        // Remove "New" tag if present and add visual indicator
        var titleCell = row.find('td:nth-child(2)');
        titleCell.find('.govuk-tag--blue').remove(); // Remove "New" tag
        // row.addClass('reclassified-unused');

        // Add the material_Unused class for filtering and remove other status classes
        row.removeClass('material_None material_Used').addClass('material_Unused');
    });

    // Uncheck all materials
    checkedMaterials.prop('checked', false);
    $('#materials_documents_ALL').prop('checked', false);

    // Disable the action buttons
    $('.reclassify_Document_Multiple_Docs, .redact_Document_Multiple_Docs')
        .attr('disabled', 'disabled')
        .addClass('govuk-button--disabled');

    // Show success notification
    showStatusUpdateSuccess('materials', materialCount, materialNames);
}

/**
 * Reclassifies selected communications to "Unused" status
 * This function handles the bulk reclassification of checked communications
 */
function markCommsAsUnused() {
    // Get all checked communications
    var checkedComms = $("input[name=comms_document]:checked");
    var commsCount = checkedComms.length;

    if (commsCount === 0) {
        return; // No communications selected
    }

    var commsSubjects = [];

    // Collect communication subjects and update their status in the UI
    checkedComms.each(function () {
        var row = $(this).closest('tr');
        var subjectCell = row.find('td:nth-child(2)'); // Subject is the 2nd column
        var subjectText = subjectCell.find('button').text().trim();
        commsSubjects.push(subjectText);

        // Remove "New" tag if present and add visual indicator
        subjectCell.find('.govuk-tag--blue').remove(); // Remove "New" tag
        // row.addClass('reclassified-unused');

        // Add "Unused" indicator to the subject cell
        subjectCell.prepend('<strong class="govuk-tag govuk-tag--yellow">Unused</strong>');
    });

    // Uncheck all communications
    checkedComms.prop('checked', false);
    $('#comms_documents_ALL').prop('checked', false);

    // Disable the action buttons
    $('.reclassify_Comms_Multiple_Docs, .redact_Comms_Multiple_Docs')
        .attr('disabled', 'disabled')
        .addClass('govuk-button--disabled');

    // Show success notification
    showStatusUpdateSuccess('communications', commsCount, commsSubjects);
}

/**
 * Shows a success notification when reclassification is complete
 */
function showStatusUpdateSuccess(type, count, items) {
    // Remove any existing notification banners
    $('.govuk-notification-banner').remove();

    // Create a success message
    var itemText = count === 1 ? (type === 'materials' ? 'material' : 'communication')
        : (type === 'materials' ? 'materials' : 'communications');

    var message = count + ' ' + itemText + ' successfully reclassified to "Unused"';

    // Create notification banner
    var notification = $('<div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner">' +
        '<div class="govuk-notification-banner__header">' +
        '<h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">Success</h2>' +
        '</div>' +
        '<div class="govuk-notification-banner__content">' +
        '<h3 class="govuk-notification-banner__heading">' + message + '</h3>' +
        '<ul class="govuk-list govuk-list--bullet">' +
        items.slice(0, 5).map(function (item) {
            return '<li>' + item + '</li>';
        }).join('') +
        (items.length > 5 ? '<li>... and ' + (items.length - 5) + ' more</li>' : '') +
        '</ul>' +
        '</div>' +
        '</div>');

    // Insert notifications at the top of the content area
    $('#notification-area').html(notification.show());

    // Auto-hide and then REMOVE from DOM
    setTimeout(function () {
        notification.fadeOut(400, function () {
            $(this).remove();
        });
    }, 10000);
}

// Single-row reclassify handler
$(document).on('click', '.reclassify-Document', function () {
    var $row = $(this).closest('tr.govuk-table__row');
    // If this is a hidden_row (details row), get the previous visible row
    if ($row.hasClass('hidden_row')) {
        $row = $row.prevAll('tr.govuk-table__row').first();
    }
    // Update the status cell (6th column)
    var $statusCell = $row.find('td').eq(5);
    $statusCell.html('<strong class="govuk-tag govuk-tag--yellow">Unused</strong>');
    // Remove the 'New' tag from the title cell (2nd column)
    var $titleCell = $row.find('td').eq(1);
    $titleCell.find('.govuk-tag--blue').remove();
    // Add reclassified-unused and material_Unused, remove other status classes
    // $row.addClass('reclassified-unused material_Unused');
    $row.removeClass('material_None material_Used');
    // Show a notification (optional, like bulk)
    showStatusUpdateSuccess('materials', 1, [$titleCell.text().trim()]);
});

// Modal functions
function openModalOver() {
    $(redactionModalOver).removeClass("rj-dont-display");

    // Detect version
    var isVersion2 = window.location.pathname.indexOf('/version-2/') !== -1;
    if (isVersion2) {
        showTabByNumber(2, false);
    } else {
        showTabByNumber(3, false);
    }

    // Save current active document if there is one
    var activeDoc = $('#filter_Redactions table tr.active_document a.show-case').text();
    if (activeDoc) {
        sessionStorage.setItem('last_active_doc', activeDoc);
    }
}

function closeModalOver() {
    $(redactionModalOver).addClass("rj-dont-display");
}

function openModalProblem() {
    $(problemModal).removeClass("rj-dont-display");
}

function closeModalProblem() {
    $(problemModal).addClass("rj-dont-display");
}

function openCaseActionModal() {
    $("#caseActionModal").removeClass("rj-dont-display");
}

function closeCaseActionModal() {
    $("#caseActionModal").addClass("rj-dont-display");
}

function openCaseActionModal2() {
    $("#caseActionModal2").removeClass("rj-dont-display");
}

function closeCaseActionModal2() {
    $("#caseActionModal2").addClass("rj-dont-display");
}

function openCaseActionBuilderModal() {
    $("#caseActionBuilderModal").removeClass("rj-dont-display");
    $("#draft-plan").show();
    $("#sent-plan").hide();
    $('#new-tabs .list-item').removeClass('list-item--selected');
    $('#new-tabs .list-item:first').addClass('list-item--selected');
}

function closeCaseActionBuilderModal() {
    $("#caseActionBuilderModal").addClass("rj-dont-display");
}

function openConfirmationModal() {
    $("#confirmationModal").removeClass("rj-dont-display");
}

function closeConfirmationModal() {
    $("#confirmationModal").addClass("rj-dont-display");
}
