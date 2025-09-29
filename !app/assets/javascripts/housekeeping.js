// =================================== HOUSEKEEPING =================================== //

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
$(document).ready(function() {

    $("#new-tabs .tab-link").on("click", function (e) {
        e.preventDefault();
        $('ul#new-tabs li').removeClass('govuk-tabs__list-item--selected');
        $(this).parent().addClass('govuk-tabs__list-item--selected');

        $('.extra-nav').hide();
        $('.extended-navigation').removeClass('govuk-tabs__list-item--selected');
        $('.show-hide').removeClass('active');
    });

     $('.tab-1-content').on("click", function (e) {
          $('.panel').hide();
          $('#tab_content_1').show();
     });

     $('.tab-2-content').on("click", function (e) {
          $('.panel').hide();
          $('#tab_content_2').show();
     });

     $('.tab-3-content').on("click", function (e) {
          $('.panel').hide();
          $('#tab_content_3').show();
          $('#tab-list').show();
          $('#docCopy').hide();
     });

     $('.tab-3-content_link').on("click", function (e) {
          $('.panel').hide();
          $('#tab_content_3').show();
          $('#tab-list').show();
          $('#docCopy').hide();
     });

     $('.tab-4-content').on("click", function (e) {
          $('.panel').hide();
          $('#tab_content_4').show();
     });
     
     $('.tab-5-content').on("click", function (e) {
          $('.panel').hide();
          $('#tab_content_5').show();
     });

     $('.tab-5-content_link').on("click", function (e) {
          $('.panel').hide();
          $('#tab_content_5').show();
     });

});

// FILTER
$(document).ready(function() {

     $('#show_filter_Comms, #show_filter_Materials, .no_results, #show_filter_Redactions').hide();

     // MATERIALS
     $("#close_filter_Materials").on("click", function (e) {
          $('#show_filter_Materials').show();
          $('#materials_column_1').hide();
          $('#materials_column_2').removeClass('govuk-grid-column-three-quarters').addClass('govuk-grid-column-full');
     });

     $("#show_filter_Materials").on("click", function (e) {
          $(this).hide();
          $('#close_filter_Materials').show();
          $('#materials_column_1').show();
          $('#materials_column_2').removeClass('govuk-grid-column-full').addClass('govuk-grid-column-three-quarters');
     });

     // COMMS
     $("#close_filter_Comms").on("click", function (e) {
          $('#show_filter_Comms').show();
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
          $('table#materials_table tr.material_All').show();
          $('input[name=filter_materials__New]').prop('checked', false);
          $('input[name=filter_materials__Status]').prop('checked', false);
          $('input[name=filter_materials__Category]').prop('checked', false);
     });


     $('#applyFiltersBtn').on("click", function (e) {
          // SECTION 1
          if ($('input[name=filter_materials__New]').is(':checked')) {
               $('#active_filter').show();
               $('.materials_filters_Title_1, .materials_filters_clear_New').show();

               $('table#materials_table tr').hide();

               // $('table#materials_table thead tr, table#materials_table tr.material_New').show();
               $('table#materials_table thead tr, table#materials_table tr.material_Reviews').show();
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
               $('table#materials_table thead tr, table#materials_table tr.material_Statement').show();
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
     });

     $('.selected_filter').on("click", function (e) {
          $(this).hide();
     });

     // SECTION 1
     $('.materials_filters_clear_New').on("click", function (e) {
          $('input[name=filter_materials__New]').prop('checked', false);
          $('.materials_filters_Title_1').hide();
          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else {
               $('#active_filter').show();
          }
     });  

     // SECTION 2
     $('.materials_filters_clear_Used').on("click", function (e) {
          $('input[id=filter_materials__Status_1]').prop('checked', false);
          $('table#materials_table tr.material_All').show();

          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else if ($('input[name=filter_materials__Status]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Category]:checked').length >= 1) {
               $('.materials_filters_Title_2').hide();
               $('#active_filter').show();
          } else {
               $('#active_filter').show();
          }
     });  

     $('.materials_filters_clear_Unused').on("click", function (e) {
          $('input[id=filter_materials__Status_2]').prop('checked', false);
          $('table#materials_table tr.material_All').show();

          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else if ($('input[name=filter_materials__Status]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Category]:checked').length >= 1) {
               $('.materials_filters_Title_2').hide();
               $('#active_filter').show();
          } else {
               $('#active_filter').show();
          }
     });

     $('.materials_filters_clear_None').on("click", function (e) {
          $('input[id=filter_materials__Status_3]').prop('checked', false);
          $('table#materials_table tr.material_All').show();

          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else if ($('input[name=filter_materials__Status]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Category]:checked').length >= 1) {
               $('.materials_filters_Title_2').hide();
               $('#active_filter').show();
          } else {
               $('#active_filter').show();
          }
     });  

     // SECTION 3
     $('.materials_filters_clear_Statement').on("click", function (e) {
          $('input[id=filter_materials__Category_3]').prop('checked', false);
          $('table#materials_table tr.material_All').show();

          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
               $('.materials_filters_Title_3').hide();
               $('#active_filter').show();
          } else {
               $('#active_filter').show();
          }
     });  

     $('.materials_filters_clear_Exhibit').on("click", function (e) {
          $('input[id=filter_materials__Category_4]').prop('checked', false);
          $('table#materials_table tr.material_All').show();

          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
               $('.materials_filters_Title_4').hide();
               $('#active_filter').show();
          } else {
               $('#active_filter').show();
          }
     });  

     $('.materials_filters_clear_Statement').on("click", function (e) {
          $('input[id=filter_materials__Category_3]').prop('checked', false);
          $('table#materials_table tr.material_All').show();

          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
               $('.materials_filters_Title_3').hide();
               $('#active_filter').show();
          } else {
               $('#active_filter').show();
          }
     });  

     $('.materials_filters_clear_Other').on("click", function (e) {
          $('input[id=filter_materials__Category_4]').prop('checked', false);
          $('table#materials_table tr.material_All').show();

          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
               $('.materials_filters_Title_3').hide();
               $('#active_filter').show();
          } else {
               $('#active_filter').show();
          }
     });  

     $('.materials_filters_clear_Always_Unused').on("click", function (e) {
          $('input[id=filter_materials__Category_5]').prop('checked', false);
          $('table#materials_table tr.material_All').show();

          if ($('input[name=filter_materials__New]:checked').length == 0 && $('input[name=filter_materials__Status]:checked').length == 0 && $('input[name=filter_materials__Category]:checked').length == 0) {
               $('#active_filter').hide();
          } else if ($('input[name=filter_materials__Category]:checked').length == 0 || $('input[name=filter_materials__New]:checked').length >= 1 || $('input[name=filter_materials__Status]:checked').length >= 1) {
               $('.materials_filters_Title_3').hide();
               $('#active_filter').show();
          } else {
               $('#active_filter').show();
          }
     });  


});

// ACTIONS - MATERIALS & COMMS
$(document).ready(function() {

     $("#show_Materials_Actions").click(function(){
          $(this).toggleClass('active');
          $('.hidden_buttons').toggle();
     });

     $("#show_Comms_Actions").click(function(){
          $(this).toggleClass('active');
          $('.hidden_buttons').toggle();
     });

});

$(document).mouseup(function(e) {
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

$(window).scroll(function() { 

    var scroll = $(window).scrollTop();

    if (scroll >= 375) {
        $(".actions_holder").addClass("sticky");
    } else {
        $(".actions_holder").removeClass("sticky");
    }

});

// SELECTING MATERIALS & COMMS
$(document).ready(function() {

     $('#tab-list, #auto_reclassify').hide();

     // RECLASSIFY
     $(".auto_reclassify_Documents").click(function(){
          $('#discard_successful, #rename_COMPLETE, #mark_as').hide();
          $('#auto_reclassify').show();
     });

     // MATERIALS
     $("#materials_documents_ALL").click(function(){
          if ($(this).is(':checked')) {
               $('input[name=materials_document]').prop('checked', true);
          } else {
               $('input[name=materials_document]').prop('checked', false);
          }
     });

     $('input[name=materials_document]').click(function(){
          if ($("input[name=materials_document]:checked").length >= 1) {
               $('.reclassify_Document_Multiple_Docs, .redact_Document_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled') .attr('onClick', 'return pageActions();');
          } else if ($("input[name=materials_document]:checked").length == 0) {
               $('.reclassify_Document_Multiple_Docs, .redact_Document_Multiple_Docs').attr('disabled','disabled').addClass('govuk-button--disabled').removeAttr('onClick');
          }
     });

     // COMMS
     $("#comms_documents_ALL").click(function(){
          if ($(this).is(':checked')) {
               $('input[name=comms_document]').prop('checked', true);
          } else {
               $('input[name=comms_document]').prop('checked', false);
          }
     });

     $('input[name=comms_document]').click(function(){
          if ($("input[name=comms_document]:checked").length >= 1) {
               $('.reclassify_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');
               $('.redact_Comms_Multiple_Docs').removeAttr('disabled').removeClass('govuk-button--disabled');
          } else if ($("input[name=comms_document]:checked").length == 0) { 
               $('.reclassify_Comms_Multiple_Docs').attr('disabled','disabled').addClass('govuk-button--disabled');
               $('.redact_Comms_Multiple_Docs').attr('disabled','disabled').addClass('govuk-button--disabled');
          }
     });

     $('.show_material, .show_material_actions').click(function(){
          $('#discard_successful').hide();

          var materialsNumber = $(this).data('id');
          if (materialsNumber == 1) { $('table#materials_table tr[data-row_id="1"').toggle(); $('button.show_material_actions[data-id="1"]').toggleClass('hide'); }
          if (materialsNumber == 2) { $('table#materials_table tr[data-row_id="2"').toggle(); $('button.show_material_actions[data-id="2"]').toggleClass('hide'); }
          if (materialsNumber == 3) { $('table#materials_table tr[data-row_id="3"').toggle(); $('button.show_material_actions[data-id="3"]').toggleClass('hide'); }
          if (materialsNumber == 4) { $('table#materials_table tr[data-row_id="4"').toggle(); $('button.show_material_actions[data-id="4"]').toggleClass('hide'); }
          if (materialsNumber == 5) { $('table#materials_table tr[data-row_id="5"').toggle(); $('button.show_material_actions[data-id="5"]').toggleClass('hide'); }
          if (materialsNumber == 6) { $('table#materials_table tr[data-row_id="6"').toggle(); $('button.show_material_actions[data-id="6"]').toggleClass('hide'); }
          if (materialsNumber == 7) { $('table#materials_table tr[data-row_id="7"').toggle(); $('button.show_material_actions[data-id="7"]').toggleClass('hide'); }
          if (materialsNumber == 8) { $('table#materials_table tr[data-row_id="8"').toggle(); $('button.show_material_actions[data-id="8"]').toggleClass('hide'); }
          if (materialsNumber == 9) { $('table#materials_table tr[data-row_id="9"').toggle(); $('button.show_material_actions[data-id="9"]').toggleClass('hide'); }
          if (materialsNumber == 10) { $('table#materials_table tr[data-row_id="10"').toggle(); $('button.show_material_actions[data-id="10"]').toggleClass('hide'); }
          if (materialsNumber == 11) { $('table#materials_table tr[data-row_id="11"').toggle(); $('button.show_material_actions[data-id="11"]').toggleClass('hide'); }
          if (materialsNumber == 12) { $('table#materials_table tr[data-row_id="12"').toggle(); $('button.show_material_actions[data-id="12"]').toggleClass('hide'); }
          if (materialsNumber == 13) { $('table#materials_table tr[data-row_id="13"').toggle(); $('button.show_material_actions[data-id="13"]').toggleClass('hide'); }
          if (materialsNumber == 14) { $('table#materials_table tr[data-row_id="14"').toggle(); $('button.show_material_actions[data-id="14"]').toggleClass('hide'); }
          if (materialsNumber == 15) { $('table#materials_table tr[data-row_id="15"').toggle(); $('button.show_material_actions[data-id="15"]').toggleClass('hide'); }
          if (materialsNumber == 16) { $('table#materials_table tr[data-row_id="16"').toggle(); $('button.show_material_actions[data-id="16"]').toggleClass('hide'); }
          if (materialsNumber == 17) { $('table#materials_table tr[data-row_id="17"').toggle(); $('button.show_material_actions[data-id="17"]').toggleClass('hide'); }
          if (materialsNumber == 18) { $('table#materials_table tr[data-row_id="18"').toggle(); $('button.show_material_actions[data-id="18"]').toggleClass('hide'); }
          if (materialsNumber == 19) { $('table#materials_table tr[data-row_id="19"').toggle(); $('button.show_material_actions[data-id="19"]').toggleClass('hide'); }
          if (materialsNumber == 20) { $('table#materials_table tr[data-row_id="20"').toggle(); $('button.show_material_actions[data-id="20"]').toggleClass('hide'); }
     });

     $('.show_material_actions').click(function(){
          if ($(this).hasClass('hide')) {
               $(this).html('Hide <i class="fa-solid fa-chevron-down"></i>');
          } else {
               $(this).html('Actions <i class="fa-solid fa-chevron-down"></i>');
          }
     });

     // $('.show_material_actions.hide').click(function(){
     //      $(this).html('Actions <i class="fa-solid fa-chevron-down"></i>').removeClass('hide');
     //      $('table#materials_table tr.hidden_row').hide();     
     // });

     $('.redact_Document_Multiple_Docs').click(function(){
          $('ul#tab-list').show();

          $('ul#new-tabs li').removeClass('list-item--selected govuk-tabs__list-item--selected');
          $('ul#new-tabs li.tab-3-content_link').addClass('list-item--selected govuk-tabs__list-item--selected');

          $('.panel').hide();
          $('#tab_content_2').hide();
          $('#docCopy').hide();
          $('#tab_content_3').show();

          var redactedDocuments = parseInt($("input[name=materials_document]:checked").length);
          var existingNUmber = parseInt($('.redacted_documents').text());
          $('.redacted_documents').text(redactedDocuments + existingNUmber);
          
          // Scroll to a position above the tabs
          scrollToTab3Position();
     });
     
     $('.redact_Document').click(function(){
          $('.panel').hide();
          $('#tab_content_2').hide();
          $('#tab_content_3').show();
          $('#tab-list').show();

          $('#new-tabs li').removeClass('list-item--selected govuk-tabs__list-item--selected');
          $('#new-tabs li.tab-3-content_link').addClass('list-item--selected govuk-tabs__list-item--selected');

          $('#docCopy').hide();

          var redactedDocuments = parseInt($('.redacted_documents').text());
          $('.redacted_documents').text(redactedDocuments + 1);
          
          // Scroll to a position above the tabs
          scrollToTab3Position();
     });

     $('#filter_Redactions table .openMe a').click(function(){
          $('ul#tab-list').show();
          var redactedDocuments = parseInt($('.redacted_documents').text());
          $('.redacted_documents').text(redactedDocuments + 1);

          $('.panel').hide();
          $('#tab_content_3').show();

          $('#filter_Redactions table tbody tr').removeClass('active_document');
          // $('#filter_Redactions table tbody tr td strong.govuk-tag').remove();
          $(this).closest('tr').addClass('active_document').removeClass('unread_document');
          $(this).closest('td').prepend(`<strong class="govuk-tag active_document">Active document</strong>`);
          
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
$(document).ready(function() {

     $('#mark_as').hide();

     $('.mark_as_Read').click(function(){
          $(this).toggleClass('read');

          $('#discard_successful, #auto_reclassify').hide();

          $('#mark_as').show().toggleClass('read');

          var document_title = $(this).closest('.openMe').find('.redact_Document').text();
          $('.document_title').text(document_title);

          var row_ID = parseInt($(this).closest('tr').data('row_id'));
          if (row_ID == 1) { $('table#materials_table .document_row_1').toggleClass('read'); }
          if (row_ID == 2) { $('table#materials_table .document_row_2').toggleClass('read'); }
          if (row_ID == 3) { $('table#materials_table .document_row_3').toggleClass('read'); }
          if (row_ID == 4) { $('table#materials_table .document_row_4').toggleClass('read'); }
          if (row_ID == 5) { $('table#materials_table .document_row_5').toggleClass('read'); }
          if (row_ID == 6) { $('table#materials_table .document_row_6').toggleClass('read'); }
          if (row_ID == 7) { $('table#materials_table .document_row_7').toggleClass('read'); }
          if (row_ID == 8) { $('table#materials_table .document_row_8').toggleClass('read'); }
          if (row_ID == 9) { $('table#materials_table .document_row_9').toggleClass('read'); }
          if (row_ID == 10) { $('table#materials_table .document_row_10').toggleClass('read'); }
          if (row_ID == 11) { $('table#materials_table .document_row_11').toggleClass('read'); }
          if (row_ID == 12) { $('table#materials_table .document_row_12').toggleClass('read'); }
          if (row_ID == 13) { $('table#materials_table .document_row_13').toggleClass('read'); }
          if (row_ID == 14) { $('table#materials_table .document_row_14').toggleClass('read'); }
          if (row_ID == 15) { $('table#materials_table .document_row_15').toggleClass('read'); }
          if (row_ID == 16) { $('table#materials_table .document_row_16').toggleClass('read'); }
          if (row_ID == 17) { $('table#materials_table .document_row_17').toggleClass('read'); }
          if (row_ID == 18) { $('table#materials_table .document_row_18').toggleClass('read'); }
          if (row_ID == 19) { $('table#materials_table .document_row_19').toggleClass('read'); }
          if (row_ID == 20) { $('table#materials_table .document_row_20').toggleClass('read'); }

          if ($(this).hasClass('read')) {
               $(this).html('Mark as unread');
          } else {
               $(this).html('Mark as read');
          }

          if ($('#mark_as').hasClass('read')) {
               $('#mark_as .govuk-notification-banner__title').text('Mark as read successful');
               $('#mark_as .govuk-notification-banner__heading .status').text('read');
          } else {
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
$(document).ready(function() {

     $('#completing_rename, #rename_COMPLETE').hide();

     $('.rename-Document').click(function(){
          var document_title = $(this).closest('.openMe').find('.redact_Document').text();
          $('#rename-Document').val(document_title);
          var rename_document = parseInt($(this).data('rename'));
          if (rename_document == 1) { $('table#materials_table .document_row_1').addClass('rename_document'); }
          if (rename_document == 2) { $('table#materials_table .document_row_2').addClass('rename_document'); }
          if (rename_document == 3) { $('table#materials_table .document_row_3').addClass('rename_document'); }
          if (rename_document == 4) { $('table#materials_table .document_row_4').addClass('rename_document'); }
          if (rename_document == 5) { $('table#materials_table .document_row_5').addClass('rename_document'); }
          if (rename_document == 6) { $('table#materials_table .document_row_6').addClass('rename_document'); }
          if (rename_document == 7) { $('table#materials_table .document_row_7').addClass('rename_document'); }
          if (rename_document == 8) { $('table#materials_table .document_row_8').addClass('rename_document'); }
          if (rename_document == 9) { $('table#materials_table .document_row_9').addClass('rename_document'); }
          if (rename_document == 10) { $('table#materials_table .document_row_10').addClass('rename_document'); }
          if (rename_document == 11) { $('table#materials_table .document_row_11').addClass('rename_document'); }
          if (rename_document == 12) { $('table#materials_table .document_row_12').addClass('rename_document'); }
          if (rename_document == 13) { $('table#materials_table .document_row_13').addClass('rename_document'); }
          if (rename_document == 14) { $('table#materials_table .document_row_14').addClass('rename_document'); }
          if (rename_document == 15) { $('table#materials_table .document_row_15').addClass('rename_document'); }
          if (rename_document == 16) { $('table#materials_table .document_row_16').addClass('rename_document'); }
          if (rename_document == 17) { $('table#materials_table .document_row_17').addClass('rename_document'); }
          if (rename_document == 18) { $('table#materials_table .document_row_18').addClass('rename_document'); }
          if (rename_document == 19) { $('table#materials_table .document_row_19').addClass('rename_document'); }
          if (rename_document == 20) { $('table#materials_table .document_row_20').addClass('rename_document'); }
     });   

});

function documentRename() {
     var documentName = $('#filter_Redactions table tr.active_document a.show-case').text();
     $('#rename-Document').val(documentName);
}

function renameDocument() {
     $('#rename_form').hide();
     $('#completing_rename').show();
     var newDocumentName = $('#rename-Document').val();
     setTimeout(function () {
          $('#discard_successful, #auto_reclassify, #mark_as').hide();
          $("#openRenameModal").addClass("rj-dont-display");
          $("#rename_COMPLETE").show();       
          $('table#materials_table tr.rename_document').find('.show_material').text(newDocumentName);

          $('#filter_Redactions table tr.active_document').find('.show-case').text(newDocumentName);
          $('.document-panel .docSummaryTopPage p.inPageSearchMargins2').text(newDocumentName);
          $('ul#tab-list li.govuk-tabs__list-item--selected a').text(newDocumentName);

          $('table#materials_table tr.rename_document td.title_column').find('strong.govuk-tag').hide();
          $('table#materials_table tr.rename_document td.title_column').prepend(`<strong class="govuk-tag govuk-tag--green">Renamed</strong>`);


     }, 6000)
    // var newDocumentName = $('#rename-Document').val();
    // $('.updated-message p strong').text(newDocumentName);
    // // $('.updated-message .info-text').text('Document has been renamed ' + newDocumentName);
    // $('ul.sticky-tabs li.govuk-tabs__list-item--selected a').text(newDocumentName);
    // $('table tbody tr td.change-DocumentName a.show-case').text(newDocumentName);
    // $('#documentNameHeader .inPageSearchMargins2').text(newDocumentName);   
}

function openRenameModal() {
     $("#openRenameModal").removeClass("rj-dont-display");
}

function closeRenameModal() {
     $("#openRenameModal").addClass("rj-dont-display");
     $('#materials_table tr.govuk-table__row').removeClass('rename_document');
}

// REDACT DOCUMENT
$(document).ready(function() {

     $("input[name=materials_document]").click(function(){
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

     $(".activate_All_Documents, .activate_Statements, .activate_MG_Forms, .activate_Other").click(function(){
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
        $('#tab_content_3').show();
        $('#docCopy').hide();
        $('ul#tab-list').show();
        
        $('ul#new-tabs li').removeClass('govuk-tabs__list-item--selected');
        $('ul#new-tabs li.tab-3-content_link').addClass('govuk-tabs__list-item--selected');

        var redactedDocuments = parseInt($('.redacted_documents').text());
        $('.redacted_documents').text(redactedDocuments + 1);
    });

    $("input[id=searchURNModal]").on("keyup", function (e) {
        if ($(this).val() == "error") {
            $('button.search').attr('onClick','openModal(); searchTerm(); searchError();');
        } else {
            $('button.search').attr('onClick','openModal(); searchTerm();');
        }
    });

    $("input[id=searchURNModal2]").on("keyup", function (e) {
        if ($(this).val() == "error") {
            $('button.search').attr('onClick','openModal(); searchTerm(); searchError();');
        } else {
            $('button.search').attr('onClick','openModal(); searchTerm();');
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
