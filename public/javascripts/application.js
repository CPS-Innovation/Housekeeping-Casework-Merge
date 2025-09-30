/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// document.addEventListener('DOMContentLoaded', function() {
//     // Check for the presence of a unique ID
//     var uniqueElement = document.getElementById('RJpage');
//     if (!uniqueElement) {


// Floating footer
$(document).ready(function () {
    if ($('main').hasClass('case-files')) {
        // $('body').addClass('float');
        $('html').addClass('case-files');
    }

    // $('.show-case').on("click", function (e) {
    //     $('#navbar2').show();
    // });

    // $('.searchModal').on("click", function (e) {
    //    var nameValue = document.getElementById("searchURNModal").value;
    //    alert('nameValue');
    // });    

    // Get form element
    var form=document.getElementById("searchFormTest");
    function submitForm(event){
       //Preventing page refresh
       event.preventDefault();
    }

  //Calling a function during form submission.
  form.addEventListener('submit', submitForm);

})

// $(window).click(function() {
//     $('.more-options').removeClass('show');
// });

$(window).scroll(function() {
    if ($('#navbar2 li').length == 3) {
        $('#navbar2').addClass('no-list');
    } else if ($('#navbar2 li').length >= 4) {
        $('#navbar2').removeClass('no-list');
    }
    // if ($(this).scrollTop()>25) {
    //     $('.search-bar-wrapper').hide();
    // } else {
    //     $('.search-bar-wrapper').show();
    // }

    if ($(this).scrollTop()>135) {
        $('.updated-message').addClass('sticky');
    } else {
        $('.updated-message').removeClass('sticky');
    }

    // if ($(this).scrollTop()>135) {
    //     // alert('working');
    //     $('#navbar').addClass('sticky');
    // } else {
    //     $('#navbar').removeClass('sticky');
    // }

});

// $(function(){
//     $(window).scroll(function(){
//         if ($('#navbar').hasClass('sticky')) {
//             $('.page-counter').addClass('sticky');
//         } else {
//             $('.page-counter').removeClass('sticky');
//         }
//     });
// });

// =================================== Header =================================== //

$(document).ready(function () {

    // Settings 
    $(".username").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass('open');

        $('.user-settings').toggle();
    });

    $('input[name=colourScheme]').on("change", function() {
        if ($('input[id=colourScheme__White]').is(':checked')) {
            $('.govuk-template').addClass('White');
            $('.govuk-template').removeClass('SoftGrey Grey Dark');
        } else if ($('input[id=colourScheme__SoftGrey]').is(':checked')) {
            $('.govuk-template').addClass('SoftGrey');
            $('.govuk-template').removeClass('White Grey Dark');
        } else if ($('input[id=colourScheme__Grey]').is(':checked')) {
            $('.govuk-template').addClass('Grey');
            $('.govuk-template').removeClass('White SoftGrey Dark');
        } else if ($('input[id=colourScheme__Dark]').is(':checked')) {
            $('.govuk-template').addClass('Dark');
            $('.govuk-template').removeClass('White SoftGrey Grey');
        }       
    });

    $('input[name=colourOverlay]').on("change", function() {
        if ($('input[id=colourOverlay__Pink]').is(':checked')) {
            $('.govuk-template').prepend(`<div class="pinkOverlay"></div>`);
            $('.greenOverlay, .blueOverlay, .yellowOverlay').remove();
        } else if ($('input[id=colourOverlay__Green]').is(':checked')) {
            $('.govuk-template').prepend(`<div class="greenOverlay"></div>`);
            $('.pinkOverlay, .blueOverlay, .yellowOverlay').remove();
        } else if ($('input[id=colourOverlay__Blue]').is(':checked')) {
            $('.govuk-template').prepend(`<div class="blueOverlay"></div>`);
            $('.pinkOverlay, .greenOverlay, .yellowOverlay').remove();
        } else if ($('input[id=colourOverlay__Yellow]').is(':checked')) {
            $('.govuk-template').prepend(`<div class="yellowOverlay"></div>`);
            $('.pinkOverlay, .blueOverlay, .greenOverlay').remove();
        } else if ($('input[id=colourOverlay__Remove]').is(':checked')) {
            $('.pinkOverlay, .blueOverlay, .greenOverlay, .yellowOverlay').remove();
        }

        if ($('input[name=colourHue]').is(':checked')) {
            $('.pinkOverlay, .greenOverlay, .blueOverlay, .yellowOverlay').addClass('changeHue');
        }      
    });

    $('input[name=colourHue]').on("change", function() {
        if ($(this).is(':checked')) {
            $('.pinkOverlay, .greenOverlay, .blueOverlay, .yellowOverlay').addClass('changeHue');
        } else {
            $('.pinkOverlay, .greenOverlay, .blueOverlay, .yellowOverlay').removeClass('changeHue');
        }
    });

})

$(document).mouseup(function(e) {
    var container = $(".user-settings");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        $('.username').removeClass('open');
    }

    var containerV2 = $(".notifications-panel");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV2.is(e.target) && containerV2.has(e.target).length === 0) {
        containerV2.hide();
        $('.notifications').removeClass('open');
    }

    var containerV3 = $(".sort-documents-nav");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV3.is(e.target) && containerV3.has(e.target).length === 0) {
        $('.sort-documents-nav').removeClass('open');
        $('.sort-documents').removeClass('open');
    }

    var containerV4 = $(".notifications-panel");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV4.is(e.target) && containerV4.has(e.target).length === 0) {
        containerV4.hide();
        $('.notifications').removeClass('open');
    }

    var containerV5 = $(".notifications-panel-STICKY");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV5.is(e.target) && containerV5.has(e.target).length === 0) {
        containerV5.hide();
        $('.notifications-STICKY').removeClass('open');
    }

    var containerV6 = $(".tasks-panel");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV6.is(e.target) && containerV6.has(e.target).length === 0) {
        containerV6.hide();
        $('.tasks').removeClass('open');
    }

    var containerV7 = $(".tasks-panel-STICKY");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV7.is(e.target) && containerV7.has(e.target).length === 0) {
        containerV7.hide();
        $('.tasks-STICKY').removeClass('open');
    }

    var containerV8 = $("#searchFormTest2 .searchForm-inner");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV8.is(e.target) && containerV8.has(e.target).length === 0) {
        containerV8.hide();
        $('#searchFormTest2 .search-button').removeClass('open');
    }

    var containerV9 = $(".more-options");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV9.is(e.target) && containerV9.has(e.target).length === 0) {
        $(containerV9).removeClass('show');
        $('.document-nav').removeClass('show');
    }

    var containerV10 = $(".third-level");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV10.is(e.target) && containerV10.has(e.target).length === 0) {
        $(containerV10).hide();
        $('.dropdown').removeClass('active');
    }

    var containerV11 = $(".searchForm-inner-wrapper");

    // if the target of the click isn't the container nor a descendant of the container
    if (!containerV11.is(e.target) && containerV10.has(e.target).length === 0) {
        $(containerV11).hide();
        $('#search-document').removeClass('active');
    }


});

// =================================== NAVIGATION =================================== //
$(document).ready(function () {

    if ($('#image-wrapper').hasClass('A-Dashboard')) {
        $('#global-navigation ul li').removeClass('current');
        $('#global-navigation ul li.dashboard').addClass('current');
    }

    if ($('#image-wrapper').hasClass('C-my-tasks')) {
        $('#global-navigation ul li').removeClass('current');
        $('#global-navigation ul li.my-tasks').addClass('current');
    }

    if ($('#image-wrapper').hasClass('D-my-cases')) {
        $('#global-navigation ul li').removeClass('current');
        $('#global-navigation ul li.my-cases').addClass('current');
    }

    if ($('#image-wrapper').hasClass('I-CMS-Classic')) {
        $('#global-navigation ul li').removeClass('current');
        $('#global-navigation ul li.cms-classic').addClass('current');
    }

    if ($('#image-wrapper').hasClass('J-CMS-Modern')) {
        $('#global-navigation ul li').removeClass('current');
        $('#global-navigation ul li.cms-modern').addClass('current');
    }

    if ($('#cps-casework-concept').hasClass('concept')) {
        // $('main.case-files').css('top','-5em');
        // $('#left-column').css('top','14em');
        $('.cps-bar-wrapper').hide();
        $('.blueBoxCPS').hide();
    }

    if ($('#cps-casework-concept').hasClass('concept-search')) {
        $('main.search-results').css('top','-2em');
    }

    if ($('main').hasClass('non-branded')) {
        $('.govuk-width-container').addClass('over-ride');
        $('main').addClass('over-ride');
    }    

    // if ($('#cps-casework-concept').hasClass('concept-search')) {
    //     // $('main#main-content').css('top','-2em');
    //     $('main.case-files').css('padding-top','0 !important');
    // }

    $('#secondary-navigation .dropdown').click(function() {
        $(this).toggleClass('active');
        $('.third-level').show();
    });

    $('.third-level-trigger').click(function(e) {
        e.preventDefault();
    });

    

})

// =================================== Drag and drop =================================== //

$(document).ready(function () {
    addDragAndDrop("accordion-tbody-reviews");
    addDragAndDrop("accordion-tbody-case-overview");
    addDragAndDrop("accordion-tbody-statements");
    addDragAndDrop("accordion-tbody-exhibits");
    addDragAndDrop("accordion-tbody-forensics");
    addDragAndDrop("accordion-tbody-unused-materials");
    addDragAndDrop("accordion-tbody-defendant");
    addDragAndDrop("accordion-tbody-court-preparation");
    addDragAndDrop("accordion-tbody-communication");
    addDragAndDrop("accordion-tbody-uncategorised");
    addDragAndDrop("tab-list")
});

function addDragAndDrop(rootId){
    const root = document.getElementById(rootId);

    const dragonDrop = new DragonDrop(root, {
        handle: false,
        announcement: {
            grabbed: el => `${el.querySelector('span').innerText} grabbed`,
            dropped: el => `${el.querySelector('span').innerText} dropped`,
            reorder: (el, items) => {
                const pos = items.indexOf(el) + 1;
                const text = el.querySelector('span').innerText;
                return `The rankings have been updated, ${text} is now ranked #${pos} out of ${items.length}`;
            },
            cancel: 'Reranking cancelled.'
        }
    });
}

$(document).ready(function () {
    $('input[name=submitReorder]').change(function() {
        if ($(this).is(':checked')) {
            $('#sumbittedReorder').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','closeReorder()');
        }       
    });
})

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

// =================================== Loading page =================================== //

setInterval(function() {
    var data = parseFloat($('#documents-loaded-number').text()) + 1;
    $('#documents-loaded-number').html(data);

    var data2 = parseFloat($('#documents-loaded-number-2').text()) + 1;
    $('#documents-loaded-number-2').html(data2);

    var data3 = parseFloat($('#documents-loaded-number-3').text()) + 1;
    $('#documents-loaded-number-3').html(data2);

}, 1000);


// function resetCaseScreen() {
//     alert('working');
//     $('#left-column table tbody tr.govuk-table__row.document-holder').css('opacity','1');
// }

// =================================== Search Document =================================== //
function searchDocument() {
    $('.search-document').addClass('active');
    $('.searchForm-inner-wrapper').show();
}

function searchDocumentResult() {
    $('#searchHeaderDisplay').css('display','inline-block');
    $('#documentNameHeader').hide();
    $('.search-document').removeClass('active');
    $('.searchForm-inner-wrapper').hide();
    // $('#pdf-root').attr('data-pdf-url','/public/files/searchResults/MCLOVEMG3.pdf');
    // $('#pdf-root').setAttribute('data-pdf-url' , 'Next');
    // document.getElementById("data-count-SR").innerHTML="There are 30 redactions";

    // $('.suggested-redactions-panel').show();
    // $(".suggested-redactions").html('Turn <strong>OFF</strong> Potential redactions');

    // var d = document.getElementById("pdf-root");
    // d.setAttribute('data-pdf-url' , 'Next');
    $('#pdf-root .canvasWrapper, #pdf-root .textLayer').hide();
    $('#pdf-root .PdfHighlighter').addClass('documentSwap');
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/searchResults/MCLOVEMG3-SEARCH-1.jpg' id='search-1' onClick='searchDocumentResultStep2()' />";
} 

function searchDocumentResultStep2() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/searchResults/MCLOVEMG3-SEARCH-2.jpg' id='search-2' />";
} 

// =================================== Document filter =================================== //
$(document).ready(function () {
    $('.accordion-controls').append(``);    
})

// =================================== Tabs =================================== //
$(document).ready(function () {
    $("#new-tabs .tab-link").on("click", function (e) {
        e.preventDefault();
        $('#new-tabs .list-item').removeClass('list-item--selected');
        $(this).parent().addClass('list-item--selected');
    });

    $("#new-tabs .sent-plan-link").on("click", function (e) {
        $('.panel').hide();
        $('#sent-plan').show();
    });

    $("#new-tabs .draft-plan-link").on("click", function (e) {
        $('.panel').hide();
        $('#draft-plan').show();
    });
    
})



// =================================== Back to top =================================== //
// $(document).ready(function () {

//     $("#backToTop").hide(); // hide the fixed navbar initially

//     var topofDiv = $("#caseFilesCol").offset().top; //gets offset of header
//     var height = $("#caseFilesCol").outerHeight(); //gets height of header

//     $(window).scroll(function(){
//         if($(window).scrollTop() > (topofDiv + height)){
//            $("#backToTop").show();
//         }
//         else{
//            $("#backToTop").hide();
//         }
//     });

// })
 
// =================================== Redaction log =================================== //
// $("#redaction-log, .hidden-select").hide();
$(".hidden-select").hide();

// function showHideRedaction() {
//     setTimeout(function() {
//         $("#saving-panel").show();
//         // $(".success-banner").hide();        
//         // $("#redaction-log").show();
//         alert('working');
//     }, 5000);
    // setTimeout(function() {
    //     $("#saving-panel").hide();
    //     $(".success-banner").addClass('test');
    //     alert('10000');
    // }, 10000);
    // setTimeout(function() {
    //     $(".success-banner").slideUp();
    //     alert('15000');
    // }, 15000);
// }

function disableRotateRemove() {
    $('.remove-rotate-pages-modal').attr('onClick','openWarningModalRedaction()');
}

$(document).ready(function () {

    $(".delete").on("click", function (e) {
        e.preventDefault();
        $(this).closest('.govuk-grid-row').remove();
    });

    $(".edit-item").on("click", function (e) {
        e.preventDefault();
        $(this).closest('p').addClass('hide');
        $(this).parent().parent().find('.hidden-select').addClass('show');
    });

    $(".edit-item-doctype").on("click", function (e) {
        e.preventDefault();
        $(this).parent().addClass('hide');
        $(this).parent().parent().find('.hidden-select').addClass('show');
    });

    $('.mg-11-group').hide();
    $('.non-mg-11-group').show();

    $(".mg-11-doc").on("click", function (e) {
        document.getElementById("confirm-Remove-Rotate-Pages").onclick = working;
        $('.mg-11-group').show();
        $('.non-mg-11-group').hide();
    });

    $('.mg11-removed').hide();
    $('.pages-removed').hide();

    $("input[name='confirmRemovePages-NON-RL']").on("change", function (e) {
        if ($(this).val() == 'Yes') {
            $('#confirm-Remove-Rotate-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled');
        } else {
            $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
        }  
    });

    $("input[name=confirmRemovePages-RL]").on("change", function (e) {
        if ($('input[id=confirmRemovePages-RL-Yes]').is(':checked') && $('input[name=confirmBacksheetPage-RL]').is(':checked')) {
            $('#confirm-Remove-Rotate-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled');
        } else {
            $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
        }
    })

    $("input[name=confirmBacksheetPage-RL]").on("change", function (e) {
        if ($('input[id=confirmRemovePages-RL-Yes]').is(':checked') && $('input[name=confirmBacksheetPage-RL]').is(':checked')) {
            $('#confirm-Remove-Rotate-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled');
        } else {
            $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
        }
    })

    // $("input[name='']").on("change", function (e) {
    //     alert($(this).val() + $("input[name='confirmBacksheetPage-RL']").val());
    //     if ($(this).val() == 'Yes' && $("input[name='confirmBacksheetPage-RL']") == 'Yes') {
    //         $('#confirm-Remove-Rotate-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled');
    //     } else if ($(this).val() == 'Yes' && $("input[name='confirmBacksheetPage-RL']") == 'No') {
    //         $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
    //     } else if ($(this).val() == 'No' && $("input[name='confirmBacksheetPage-RL']") == 'Yes') {
    //         $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
    //     } else {
    //         $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
    //     }  
    // });

    // $("input[name='confirmBacksheetPage-RL']").on("change", function (e) {
    //     alert($(this).val() + $("input[name='confirmRemovePages-RL']").val());
    //     if ($(this).val() == 'Yes' && $("input[name='confirmRemovePages-RL']") == 'Yes') {
    //         $('#confirm-Remove-Rotate-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled');
    //     } else if ($(this).val() == 'Yes' && $("input[name='confirmRemovePages-RL']") == 'No') {
    //         $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
    //     } else if ($(this).val() == 'No' && $("input[name='confirmRemovePages-RL']") == 'Yes') {
    //         $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
    //     } else {
    //         $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').attr('disabled','disabled');
    //     }  
    // });

    $("#confirm-Remove-Rotate-Pages").on("click", function (e) {
        // if ($('input[id="confirmBacksheetPage"]:checked').length > 0) {
        if ($('input[id=confirmBacksheetPage-RL-Yes]').is(':checked')) {
            $('.mg11-removed').show();
            $('.pages-removed').hide();
        } else {
            $('.mg11-removed').hide();
            $('.pages-removed').show();
        }
    });

})

function working() {
    $('#redactionModalREMOVE').removeClass('rj-dont-display');
};

function countChar1(val) {
    var len = val.value.length;
    if (len >= 400) {
        val.value = val.value.substring(0, 400);
    } else {
        $('#charNum1').text(400 - len);
    }
};

function countChar2(val) {
    var len = val.value.length;
    if (len >= 400) {
        val.value = val.value.substring(0, 400);
    } else {
        $('#charNum2').text(400 - len);
    }
};

function countChar3(val) {
    var len = val.value.length;
    if (len >= 400) {
        val.value = val.value.substring(0, 400);
    } else {
        $('#charNum3').text(400 - len);
    }
};

function countChar4(val) {
    var len = val.value.length;
    if (len >= 400) {
        val.value = val.value.substring(0, 400);
    } else {
        $('#charNum4').text(400 - len);
    }
};

function countChar5(val) {
    var len = val.value.length;
    if (len >= 400) {
        val.value = val.value.substring(0, 400);
    } else {
        $('#charNum5').text(400 - len);
    }
};

function countChar6(val) {
    var len = val.value.length;
    if (len >= 400) {
        val.value = val.value.substring(0, 400);
    } else {
        $('#charNum6').text(400 - len);
    }
};

// =================================== Tooltip =================================== //
function toggleTooltip1() {
    $('.tooltiptext-1').toggleClass('active');
    $('.tooltiptext-2').removeClass('active');
}

function closeToggleTooltip1() {
    $('.tooltiptext-1').removeClass('active');
}

function toggleTooltip2() {
    $('.tooltiptext-2').toggleClass('active');
    $('.tooltiptext-1').removeClass('active');
}

function closeToggleTooltip2() {
    $('.tooltiptext-2').removeClass('active');
}

// var tooltip = document.querySelector('.tooltip')

// tooltip.addEventListener('click', function() {
//     if (this.classList.contains('active')) {
//         this.classList.remove('active');
//     } else {
//         this.classList.add('active');
//     }  
// });


// =================================== Document viewer =================================== //
/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function toggleClass() {
    $('.dropbtn').toggleClass('open');
}

function myFunction() {
    // $('.dropdown-content').toggle('show');
    // document.getElementsByClassName("dropdown-content").classList.toggle("show");
    // $("dropdown-content").toggle("show");
    document.getElementById("myDropdown1").classList.toggle("show");
    // document.getElementById("myDropdown2").classList.toggle("show");
    $(".myDropdown2").toggleClass("show");
}

// // Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function documentTarget() {
    $(".myDropdown2").removeClass("show");
    $(".dropbtn").removeClass("open");

}

function NewTab() {
    window.open("https://www.figma.com/proto/5ZMJ5RMTX8zNoawzlH0OFW/CPS-CaseReview-master?node-id=2003-83323&source=email_invite&starting-point-node-id=2003%3A83323&t=N9LEJOZd4wCvUiBw-1", "_blank");
}

function NewTab2() {
    window.open("https://www.figma.com/proto/Oemk95xWfmYbNzgi6grtdO/CM?page-id=595%3A6946&node-id=729-4169&viewport=-1533%2C504%2C0.3&t=y6f4KoKfmwqMAjwQ-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=729%3A4169", "_blank");
}

// =================================== Emails viewer =================================== //

function email() {

    $(".email-document").on("click", function (e) {
        if ($('#documentNameHeader > p.inPageSearchMargins2:contains("VADER, 45GD0702322, 22/08/2023")').length > 0) {
            $('#documentNameHeader > p.inPageSearchMargins2:contains("VADER, 45GD0702322, 22/08/2023")').prepend( "<span class='icon-new email-white'>email</span>" );
            $('#documentNameHeader > p.inPageSearchMargins2:contains("VADER, 45GD0702322, 22/08/2023")').parent().append(`
                <div class="attachments">
                    <p class="">4 attachments:</p>
                    <span class="openMe"><a href="" class="document show-case" data-doc="CM01.pdf" data-count="3">Case overview and officer comments</a></span>,
                    <span class="openMe"><a href="" class="document show-case" data-doc="MG05MCLOVE.pdf">MG05 MCLOVE</a></span>,
                    <span class="openMe"><a href="" class="document show-case" data-doc="MG06_3June.pdf">MG06 3 June</a></span>,
                    <span class="openMe"><a href="" class="document show-case" data-doc="MG06_10june.pdf">MG06 10 june</a></span>
                </div>
            `);
        }
    });

    $(".email-document-V2").on("click", function (e) {
        if ($('#documentNameHeader > p.inPageSearchMargins2:contains("SCOTT, 12564Y7EH, 02/09/2021")').length > 0) {
            $('#documentNameHeader > p.inPageSearchMargins2:contains("SCOTT, 12564Y7EH, 02/09/2021")').prepend( "<span class='icon-new email-white'>email</span>" );
            $('#documentNameHeader > p.inPageSearchMargins2:contains("SCOTT, 12564Y7EH, 02/09/2021")').parent().append(`
                <div class="attachments error">
                    <p class="">2 attachments:</p>
                    <span class="openMe">Attachments only available on CMS</span>
                </div>
            `);
        }
    });


}

// function activateLink() {
    // $('.redaction-footer').addClass("test");
    // document.getElementById('data-count').addClass("test");
    //     <a href="">Test</a>
    // `);
// }


// =================================== Document history =================================== //
// $(document).ready(function () {
//     $(".document-history-V1 ").on("click", function (e) {
//         // if ($('ul.sticky-tabs li').data('tab-id') == 'View%20document') {
//         //     alert('working');
//         // }
//         if ($('ul.sticky-tabs li a').text() == 'View document') {
//             alert('working');
//         }
//     });
// })

$(document).ready(function () {
    $('.document-history-V1-OPEN').hide();
})

function documentID() {
    $(".document-history-V1 ").on("click", function (e) {
        $(this).hide();
        $('.document-history-V1-OPEN').show();
        if ($('#documentNameHeader > p.inPageSearchMargins2:contains("View document")').length > 0) {
            $('ul.sticky-tabs li a:contains("View document")').text( "MCLOVE MG3 - V1" );
            $('#documentNameHeader > p.inPageSearchMargins2').addClass( "old-document" );
            $('#documentNameHeader > p.inPageSearchMargins2:contains("View document")').text( "MCLOVE MG3 - V1" );
            $('#documentNameHeader > p.inPageSearchMargins2:contains("MCLOVE MG3 - V1")').append( `<br><span>19 May 2020, 11:32</span>` );
            $('#documentNameHeader > p.inPageSearchMargins2:contains("MCLOVE MG3 - V1")').parent().append(`
                <div class="attachments history">
                    <span class="openMe">Would you like to restore this version?</span>
                    <button class="govuk-button govuk-button--white" data-module="govuk-button" type="button" onclick="openConfirmModal()" data-module="govuk-button">Restore</button>
                </div>
            `);
        }


        // if ($('ul.sticky-tabs li a').text() == 'View%20document') {
        //     alert('working');
        // }
    });
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
    // $('#searchResultsPanel').hide();

    // setTimeout(function() {
    //     $('#searchLoadingPanel').hide();
    //     $('#searchResultsPanel').show();
    // }, 20000);

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


// =================================== Window size & Document filter change =================================== //
$(document).ready(function () {

    var documentsRead = 0;
    var documentsUnread = 24;

    $(".show-case").on("click", function (e) {
        // $('.window-size').show();
        var pageCount = $(this).attr("data-page");
        $('.page-counter').addClass('show');
        $('.page-counter strong').text(pageCount);

        $(this).parent().parent().parent().removeClass('unreadDocument');

        $(this).addClass('read');
        documentsRead += 1;
        documentsUnread -= 1;
        $('#read').text(documentsRead);
        $('#unread').text(documentsUnread);

        var documentTitle = $(this).text();
        $('.document-title').text(documentTitle);
        $('#document-title-notes').text(documentTitle);
        $('.document-title-7').text(documentTitle);

        // buttonHome.addEventListener("click", function() {
        //     
        //     alert(CountButtonHomeClicks);
        // });

        $('table tbody tr td').removeClass('current')
        $(this).parent().parent().parent().addClass('current');

    });

    $(".notes-link").on("click", function (e) {
        var documentTitle = $(this).parent().parent().find('.show-case').text();
        $('#document-title-notes').text(documentTitle);
        $('#document-title-notes-New').text(documentTitle);
        $('.document-title-10').text(documentTitle);
    });

})

function documentTitle() {
    // $('#selectedTab').find('a').addClass('test');
    var docTitle = $('#selectedTab').find('a').text();
    $('.document-title').text(docTitle);
    $('#document-title-2').text(docTitle);
    $('#document-title-3').text(docTitle);
    $('#document-title-4').text(docTitle);
    $('.document-title-5').text(docTitle);
    $('.document-title-6').text(docTitle);
    $('.document-title-7').text(docTitle);
    $('.document-title-8').text(docTitle);
    $('.document-title-9').text(docTitle);
}

function showUnread() {
    // Get the checkbox
    var checkBox = document.getElementById("filterDocuments-Unread");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        $('.accordion table tbody tr td').hide();
        $('.accordion table tbody tr td.unreadDocument').show();
    }
}

function showRead() {
    // Get the checkbox
    var checkBox = document.getElementById("filterDocuments-Read");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        $('.accordion table tbody tr td').show();
        $('.accordion table tbody tr td.unreadDocument').hide();
    }
}

function showAll() {
    // Get the checkbox
    var checkBox = document.getElementById("filterDocuments-All");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        $('.accordion table tbody tr td').show();
        $('.accordion table tbody tr td.unreadDocument').show();
    }
}


function windowSizeChange() {
    $('.window-size').toggleClass('close');
    $('#left-column').toggleClass('show-menu');
    $('#left-column-top').toggleClass('show-menu');
    $('#right-column').toggleClass('show-menu');
    $('#navbar2 ul.navbar.sticky-tabs').toggleClass('full-width');
}

function windowSizeChangeText() {
    var x = document.getElementById("window-size");
    if (x.innerHTML === "<span>View full screen</span>") {
        x.innerHTML = "<span>Exit full screen</span>";
    } else {
        x.innerHTML = "<span>View full screen</span>";
    }
}

// =================================== SEARCH =================================== //

function selectAll1(source) {
    checkboxes = document.getElementsByName('search-group-1');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll2(source) {
    checkboxes = document.getElementsByName('search-group-2');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll3(source) {
    checkboxes = document.getElementsByName('search-group-3');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll4(source) {
    checkboxes = document.getElementsByName('search-group-4');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll5(source) {
    checkboxes = document.getElementsByName('search-group-5');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll6(source) {
    checkboxes = document.getElementsByName('search-group-6');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll7(source) {
    checkboxes = document.getElementsByName('search-group-7');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll8(source) {
    checkboxes = document.getElementsByName('search-group-8');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll9(source) {
    checkboxes = document.getElementsByName('search-group-9');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}

function selectAll10(source) {
    checkboxes = document.getElementsByName('search-group-10');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll11(source) {
    checkboxes = document.getElementsByName('search-group-11');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll12(source) {
    checkboxes = document.getElementsByName('search-group-12');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll13(source) {
    checkboxes = document.getElementsByName('search-group-13');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}
function selectAll14(source) {
    checkboxes = document.getElementsByName('search-group-14');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}

$(document).ready(function () {

    $('input[name="searchDocumentType"]').click(function() {
        if ($('input[name="searchDocumentType"]:checked').length > 0) {
            $('.details .search-item').hide();
            $('input[name="searchDocumentType"]:checked').each(function() {
                $('div[data-group*=' + this.value + ']').fadeIn();
            });
        } else {
            $('.details .search-item').fadeIn();
        }
    });

    $('input[name="searchDocumentCategory"]').click(function() {
        if ($('input[name="searchDocumentCategory"]:checked').length > 0) {
            $('.details .search-item').hide();
            $('input[name="searchDocumentCategory"]:checked').each(function() {
                $('div[data-group*=' + this.value + ']').fadeIn();
            });
        } else {
            $('.details .search-item').fadeIn();
        }
    }); 

    var items = $('.search-item');
    var itemsList = $('#search-results-list');

    $('#sort').change( function() {
        if($(this).val() == 1){
           sortAsc();
        }
        else if($(this).val() == 2){
            sortDesc();
        }
    });

    function sortAsc(){
        itemsList.empty();
        items.sort(function(a, b){
          return $(a).data('items')-$(b).data('items')
        });
        itemsList.append(items);
    }
    function sortDesc(){
        itemsList.empty();
        items.sort(function(a, b){
          return $(b).data('items')-$(a).data('items')
        });
        itemsList.append(items); 
    }  

    $('.search-redaction-footer').hide();

    // Drop down
    $('#search-redaction-type-1').change(function() {
        if ($('input[name=search-group-1]').is(':checked')) {
            $('.redact-all-button-1').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('#search-redaction-type-2').change(function() {
        if ($('input[name=search-group-2]').is(':checked')) {
            $('.redact-all-button-2').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('#search-redaction-type-3').change(function() {
        if ($('input[name=search-group-3]').is(':checked')) {
            $('.redact-all-button-3').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('#search-redaction-type-4').change(function() {
        if ($('input[name=search-group-4]').is(':checked')) {
            $('.redact-all-button-4').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('#search-redaction-type-5').change(function() {
        if ($('input[name=search-group-5]').is(':checked')) {
            $('.redact-all-button-5').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('#search-redaction-type-6').change(function() {
        if ($('input[name=search-group-6]').is(':checked')) {
            $('.redact-all-button-6').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('#search-redaction-type-7').change(function() {
        if ($('input[name=search-group-7]').is(':checked')) {
            $('.redact-all-button-7').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('#search-redaction-type-8').change(function() {
        if ($('input[name=search-group-8]').is(':checked')) {
            $('.redact-all-button-8').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('#search-redaction-type-9').change(function() {
        if ($('input[name=search-group-9]').is(':checked')) {
            $('.redact-all-button-9').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });

    // Checkboxes
    $('input[name=search-group-1]').change(function() {
        if ($('#search-redaction-type-1').val()) {
            $('.redact-all-button-1').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('input[name=search-group-2]').change(function() {
        if ($('#search-redaction-type-2').val()) {
            $('.redact-all-button-2').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('input[name=search-group-3]').change(function() {
        if ($('#search-redaction-type-3').val()) {
            $('.redact-all-button-3').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('input[name=search-group-4]').change(function() {
        if ($('#search-redaction-type-4').val()) {
            $('.redact-all-button-4').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('input[name=search-group-5]').change(function() {
        if ($('#search-redaction-type-5').val()) {
            $('.redact-all-button-5').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('input[name=search-group-6]').change(function() {
        if ($('#search-redaction-type-6').val()) {
            $('.redact-all-button-6').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('input[name=search-group-7]').change(function() {
        if ($('#search-redaction-type-7').val()) {
            $('.redact-all-button-7').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('input[name=search-group-8]').change(function() {
        if ($('#search-redaction-type-8').val()) {
            $('.redact-all-button-8').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });
    $('input[name=search-group-9]').change(function() {
        if ($('#search-redaction-type-9').val()) {
            $('.redact-all-button-9').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
            // $('.search-redaction-footer').show();
        }       
    });

    // Search suggestions - Checkboxes
    $('input[name=search-group-10]').change(function() {
        if ($('#search-redaction-type-10').val()) {
            $('.redact-all-button-10').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
        }       
    });
    $('input[id=search-group-10-select-all]').change(function() {
        $('.redact-all-button-10').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
    });

    $('input[name=search-group-11]').change(function() {
        if ($('#search-redaction-type-11').val()) {
            $('.redact-all-button-11').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
        }       
    });
    $('input[id=search-group-11-select-all]').change(function() {
        $('.redact-all-button-11').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
    });

    $('input[name=search-group-12]').change(function() {
        if ($('#search-redaction-type-12').val()) {
            $('.redact-all-button-12').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
        }       
    });
    $('input[id=search-group-12-select-all]').change(function() {
        $('.redact-all-button-12').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
    });

    $('input[name=search-group-13]').change(function() {
        if ($('#search-redaction-type-13').val()) {
            $('.redact-all-button-13').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
        }       
    });
    $('input[id=search-group-13-select-all]').change(function() {
        $('.redact-all-button-13').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
    });

    $('input[name=search-group-14]').change(function() {
        if ($('#search-redaction-type-14').val()) {
            $('.redact-all-button-14').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
        }       
    });
    $('input[id=search-group-14-select-all]').change(function() {
        $('.redact-all-button-14').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','openRedactAllModal()');
    });
    // $('.search-redact-button').click(function() {

    // });   

})

// =================================== SEARCH SUGGESTIONS =================================== //
$(document).ready(function () {
    $('.eoin-mcLove, .shelagh-mcLove, .lucy-doyle, .phone-number').hide();
})

function openEoin() {
    $('.eoin-mcLove').show();
    $('.shelagh-mcLove, .lucy-doyle, .phone-number').hide();

    $('.search-suggestion').text('Eoin McLove');
}

function openShelagh() {
    $('.shelagh-mcLove').show();
    $('.eoin-mcLove, .lucy-doyle, .phone-number').hide();

    $('.search-suggestion').text('Shelagh McLove');
}

function openLucy() {
    $('.lucy-doyle').show();
    $('.eoin-mcLove, .shelagh-mcLove, .phone-number').hide();

    $('.search-suggestion').text('Lucy Doyle');
}

function openAllPeople() {
    $('.eoin-mcLove, .shelagh-mcLove, .lucy-doyle').show();
    $('.phone-number').hide();

    $('.search-suggestion').text('Eoin McLove, Shelagh McLove, Lucy Doyle');
}

function openPhone() {
    $('.eoin-mcLove, .shelagh-mcLove, .lucy-doyle').hide();
    $('.phone-number').show();

    $('.search-suggestion').text('07734679952');
}


// =================================== FEEDBACK LOOP =================================== //
$(document).ready(function () {
    $('#feedbackBad-button').hide();
    
    $("input[name=feedbackSurvey-Satisfaction]").on("change", function (e) {
        if ($('input[id=feedbackSurvey-Satisfaction-Dissatisfied]').is(':checked') || $('input[id=feedbackSurvey-Satisfaction-Very-dissatisfied]').is(':checked')) {
            $('#feedbackBad-button').show();
            $('#feedbackGood-button').hide();
        } else {
            $('#feedbackGood-button').removeClass('govuk-button--disabled').removeAttr('disabled');
        }
    })

})

// =================================== PIPELINE REFRESH =================================== //

$(document).ready(function () {

    $('#page-refresh-2, #alert2, #page-refresh-3, #alert3').hide();

    // $('.search-PII, #searchResultsPanel').hide();
    $('.search-PII').hide();

    setTimeout(function () {
        $('.search-PII').show();
        $('#alert').addClass('alert');
        $('.loading-PII').hide();
        $('#header-alert').text('2 new documents');
        // $('#searchLoadingPanel').hide();
        // $('#searchResultsPanel').show();
    }, 20000)

    setTimeout(function () {
        $('#push-notification').show();
    }, 24000)


    $("#page-refresh").on("click", function (e) {
        var documentsRead = 0;
        var documentsUnread = 21;

        documentsUnread += 2;
        $('#all').text(documentsUnread);
        $('#unread').text(documentsUnread);

        e.preventDefault();
        // $('#hidden-section').show().attr("aria-expanded", "true");
        $('#hidden-documents').attr("aria-expanded", "true");
        $('#hidden-documents').find(".hidden-section").addClass('new');
        $('#hidden-documents').find(".hidden-section td").addClass('newDocument');
        $('#hidden-documents').find(".accordion-section-header .statements").text('7');
        document.getElementById("hidden-documents").scrollIntoView();

        $('#hidden-documents-2').attr("aria-expanded", "true");
        $('#hidden-documents-2').find(".hidden-section").addClass('new');
        $('#hidden-documents-2').find(".holder").hide();
        $('#hidden-documents-2').find(".hidden-section td").addClass('newDocument');
        $('#hidden-documents-2').find(".accordion-section-header").removeClass('no-documents');
        $('#hidden-documents-2').find(".accordion-section-header .defendants").text('1');

        document.getElementById("date-stamp").innerHTML = formatAMPM();
        function formatAMPM() {
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
            days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+' '+d.getDate()+'/'+months[d.getMonth()]+'/'+d.getFullYear()+' '+hours+':'+minutes+ampm;
        }

    });

    $("#alert").on("click", function (e) {
        var documentsRead = 0;
        var documentsUnread = 21;

        documentsUnread += 2;
        $('#all').text(documentsUnread);
        $('#unread').text(documentsUnread);

        e.preventDefault();
        // $('#hidden-section').show().attr("aria-expanded", "true");
        $('#hidden-documents').attr("aria-expanded", "true");
        $('#hidden-documents').find(".hidden-section").addClass('new');
        $('#hidden-documents').find(".hidden-section td").addClass('newDocument');
        $('#hidden-documents').find(".accordion-section-header .statements").text('7');
        document.getElementById("hidden-documents").scrollIntoView();

        $('#hidden-documents-2').attr("aria-expanded", "true");
        $('#hidden-documents-2').find(".hidden-section").addClass('new');
        $('#hidden-documents-2').find(".holder").hide();
        $('#hidden-documents-2').find(".hidden-section td").addClass('newDocument');
        $('#hidden-documents-2').find(".accordion-section-header").removeClass('no-documents');
        $('#hidden-documents-2').find(".accordion-section-header .defendants").text('1');

        document.getElementById("date-stamp").innerHTML = formatAMPM();
        function formatAMPM() {
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
            days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+' '+d.getDate()+'/'+months[d.getMonth()]+'/'+d.getFullYear()+' '+hours+':'+minutes+ampm;
        }

    });


    $("#page-refresh-2").on("click", function (e) {
        e.preventDefault();
        // $('#hidden-section').attr("aria-expanded", "false");
        $('#hidden-section-2').attr("aria-expanded", "true");
        $('#hidden-section-3').attr("aria-expanded", "true");
        document.getElementById("hidden-section-3").scrollIntoView();

        $('table tbody tr td .govuk-tag.govuk-tag--yellow').css('display','inherit');
        $('table tbody tr td .govuk-tag.govuk-tag--orange').css('display','inherit');

        $('#push-notification-2').hide();
        $('#alert2').removeClass('alert');

        $('.updated-message').show();

        document.getElementById("date-stamp").innerHTML = formatAMPM();
        function formatAMPM() {
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
            days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+' '+d.getDate()+'/'+months[d.getMonth()]+'/'+d.getFullYear()+' '+hours+':'+minutes+ampm;
        }

        setTimeout(function () {
            $('#push-notification-3, #page-refresh-3').show();
            $('#page-refresh-2').hide();
            $('#alert2').hide();
            $('#alert3').show().addClass('alert');
            $('#header-alert').text('1 document discarded');
        }, 15000)        

    });

    $("#alert2").on("click", function (e) {
        e.preventDefault();
        $('#hidden-section').attr("aria-expanded", "false");
        $('#hidden-section-2').attr("aria-expanded", "true");
        $('#hidden-section-3').attr("aria-expanded", "true");
        document.getElementById("hidden-section-3").scrollIntoView();

        $('table tbody tr td .govuk-tag.govuk-tag--yellow').css('display','inherit');
        $('table tbody tr td .govuk-tag.govuk-tag--orange').css('display','inherit');

        $('.updated-message').show();

        $('#push-notification-2').hide();
        $('#alert2').removeClass('alert');

        document.getElementById("date-stamp").innerHTML = formatAMPM();
        function formatAMPM() {
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
            days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+' '+d.getDate()+'/'+months[d.getMonth()]+'/'+d.getFullYear()+' '+hours+':'+minutes+ampm;
        }

        setTimeout(function () {
            $('#push-notification-3, #page-refresh-3').show();
            $('#page-refresh-2').hide();
            $('#alert2').hide();
            $('#alert3').show().addClass('alert');
            $('#header-alert').text('1 document discarded');
        }, 15000)        

    });

    $("#page-refresh-3").on("click", function (e) {
        e.preventDefault();
        $('.updated-message').hide();
        $('.discarded-message').show();
    });

    $("#alert3").on("click", function (e) {
        e.preventDefault();
        $('.updated-message').hide();
        $('.discarded-message').show();
    });

})


function newDocument() {
    $('#new-documents').html(function(i, val) { return +val-1 });
    if ($('#new-documents').html() == '1') {
        $('#plural').hide();
        $('#header-alert').text('1 new document');
    } else if ($('#new-documents').html() == '0') {
        $('#push-notification').hide();
        $('#alert').removeClass('alert');
        $('#header-alert').text('No document updates');
        // $('#hidden-section .govuk-tag').hide();
        setTimeout(function () {
            $('#push-notification-2, #alert2').show();
            $('#page-refresh-2').show();
            $('#page-refresh, #alert').hide();
            $('#alert2').addClass('alert');
            $('#header-alert').text('3 document updates');
        }, 15000)
    }
}


// =================================== SUGGESTED REDACTIONS =================================== //
$(document).ready(function () {
    $('.suggested-redactions').hide();
})


function suggestedRedactions() {
    $('.suggested-redactions-panel').show();
    $(".suggested-redactions").html('Turn <strong>OFF</strong> Potential redactions');

    // var d = document.getElementById("pdf-root");
    // d.setAttribute('data-pdf-url' , 'Next');
    $('#pdf-root .canvasWrapper, #pdf-root .textLayer').hide();
    $('#pdf-root .PdfHighlighter').addClass('documentSwap');
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/MCLOVEMG3-SR-1.jpg' id='suggested-1' onClick='suggestedRedactionsStep2()' />";
    $('#pdf-root').prepend(`
        <div class="redaction-footer">
            <span class="removeRedactions looks-like-a-link-underline">Remove all redactions</span>
            <span id="data-count-SR" data-count="30">There are 30 redactions</span>
            <span class="viewRedactions looks-like-a-link-underline"> - views redactions</span>
            <button class="govuk-button saveAndFinishButton" onClick="sumbitSuggestedRedactions()">Save and submit all redactions</button>
        </div>
    `);
}

function suggestedRedactionsStep2() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/MCLOVEMG3-SR-2.jpg' id='suggested-2' onClick='suggestedRedactionsStep3()' />";
    $('#redaction-summary-list-DUMMY').html(`
        <li id="suggested-NamedIndividuals"><b>25</b> - Named individuals</li>
        <li><b>2</b> - Email addresses</li>
        <li><b>2</b> - Previous convictions</li>
        <li><b>1</b> - Date of birth</li>
    `);
}

function suggestedRedactionsStep3() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/MCLOVEMG3-SR-3.jpg' id='suggested-3' onClick='suggestedRedactionsStep4()' />";
    document.getElementById("data-count-SR").innerHTML="There are 30 redactions";
    document.getElementById("confirm-suggested-redactions-number").innerHTML="30";
    document.getElementById("SRNumber").innerHTML="(18)";
    $('#redaction-summary-list-DUMMY').html(`
        <li id="suggested-NamedIndividuals"><b>25</b> - Named individuals</li>
        <li><b>2</b> - Email addresses</li>
        <li><b>2</b> - Previous convictions</li>
        <li><b>1</b> - Date of birth</li>
    `);
}

function suggestedRedactionsStep4() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/MCLOVEMG3-SR-4.jpg' id='suggested-4' />";
    document.getElementById("data-count-SR").innerHTML="There are 28 redactions";
    document.getElementById("confirm-suggested-redactions-number").innerHTML="28"; 
    document.getElementById("SRNumber").innerHTML="(16)";
    $('#redaction-summary-list-DUMMY').html(`
        <li id="suggested-NamedIndividuals"><b>23</b> - Named individuals</li>
        <li><b>2</b> - Email addresses</li>
        <li><b>2</b> - Previous convictions</li>
        <li><b>1</b> - Date of birth</li>
    `);    
}


$(document).ready(function () {

    $('.success-banner-DUMMY').hide();

    $("input[name=suggestedRedactions]").on("change", function (e) {
        if ($(this).val() == "Yes") {
            $('#confirm-suggested-redactions').attr('onClick','closeSuggestedRedactions(), openDummyRedactionLog()').removeClass('govuk-button--disabled').removeAttr('disabled', 'aria-disabled');

            setTimeout(function () {
                $('#saving-panel-DUMMY').slideUp();
                $('.success-banner-DUMMY').slideDown();
                $('#redaction-log-button-DUMMY').attr('onClick','closeDummyRedactionLog(), bulkRedactions()').removeClass('govuk-button--disabled').removeAttr('disabled', 'aria-disabled');
            }, 3500);

            setTimeout(function () {
                $('.success-banner-DUMMY').slideUp();
            }, 8000);


        } else if ($(this).val() == "No") {
            $('#confirm-suggested-redactions').attr('onClick','closeSuggestedRedactions()').removeClass('govuk-button--disabled').removeAttr('disabled', 'aria-disabled');
        }
    });

})

function bulkRedactions() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/MCLOVEMG3-SR-5.jpg' id='suggested-5' />";
    $('.suggested-redactions-panel, .redaction-footer').hide();
}


// =================================== ERROR MESSAGES =================================== //

function errorStatus() {
    window.location.href="#redaction-over";

    e.preventDefault();
    e.stopPropagation();     
}

function errorStatus2() {
    window.location.href="#redaction-log";

    e.preventDefault();
    e.stopPropagation();     
}

function errorStatus3() {
    window.location.href="#case-action-plan-modal";

    e.preventDefault();
    e.stopPropagation();     
}

$(document).ready(function () {

    // Redaction log
    $("#redactionLog-ChargeStatus").on("change", function (e) {
        $('#redaction-log-button').attr('onClick','return closeModal2(), deletePageDocument()');
    });

    $("#redaction-log-button").on("click", function (e) {
        if ($('#redactionLog-ChargeStatus').val()) {
            // alert('selected');
        } else {
            $('#charge-error').addClass('govuk-form-group--error');
            $('#charge-issued-error, #redaction-error-summary, #charge-error-list').show();
        }
        $('#pdf-root').addClass('documentRedacted');

        $('table tbody tr td.current .redacted-indicator').prepend(`
            <strong class="govuk-tag tooltip govuk-tag--blue">
                R <span class="tooltiptext">Redacted, <strong id="redacted-time">###</strong>, by "user_name_1983"</span>
            </strong>
        `);

        $('.remove-rotate-pages-modal').attr('onClick','return openRotatePagesModal(), documentTitle()');

        $('.inPageSearchMargins2').addClass('redacted');
        $('.inPageSearchMargins2').append( `<br><span>Redacted, <strong id="redacted-time2">###</strong>, by "user_name_1983"</span>` );

        document.getElementById("redacted-time").innerHTML = formatAMPM();
        function formatAMPM() {
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
                months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
                days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            return days[d.getDay()]+' '+d.getDate()+'/'+months[d.getMonth()]+'/'+d.getFullYear()+' '+hours+':'+minutes+ampm;
        }

        document.getElementById("redacted-time2").innerHTML = formatAMPM();
        function formatAMPM() {
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
                months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
                days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            return days[d.getDay()]+' '+d.getDate()+'/'+months[d.getMonth()]+'/'+d.getFullYear()+' '+hours+':'+minutes+ampm;
        }

    });

    $('#charge-issued-error').show();

    // Over/Under Redaction 
    $("#submit-over-redactions").hide();
    $("#error-over-redactions").show();

    // Error summary
    $('#over-redaction-error-summary').hide();

    // Error list
    $('#over-charge-error-list, #type-error-list, #redactions-type-error-list, #over-redactions-type-error-list').hide();
    $('#over-charge-issued-error').show();

    $("#redactionOver-ChargeStatus").on("change", function (e) {
        if ($(this).val() && $('input[name=redactionUnder-redaction-type]').is(':checked') || $(this).val() && $('input[name=redactionOver-redaction-type]').is(':checked')) {
            $("#submit-over-redactions").show();
            $("#error-over-redactions").hide();
        } else {
            $("#submit-over-redactions").hide();
            $("#error-over-redactions").show();
        }
    });

    $("input[name=redationType]").on("change", function (e) {
        if ($(this).is(':checked') && $('#redactionOver-ChargeStatus').val() && $('input[name=redactionUnder-redaction-type]').is(':checked') || $(this).is(':checked') && $('#redactionOver-ChargeStatus').val() && $('input[name=redactionOver-redaction-type]').is(':checked')) {
            $("#submit-over-redactions").show();
            $("#error-over-redactions").hide();
        }
    });

    $("input[name=redactionUnder-redaction-type]").on("change", function (e) {
        if ($(this).is(':checked') && $('#redactionOver-ChargeStatus').val()) {
            $("#submit-over-redactions").show();
            $("#error-over-redactions").hide();
        }
    });

    $("input[name=redactionOver-redaction-type]").on("change", function (e) {
        if ($(this).is(':checked') && $('#redactionOver-ChargeStatus').val()) {
            $("#submit-over-redactions").show();
            $("#error-over-redactions").hide();
        }
    });

    $("#error-over-redactions").on("click", function (e) {
        $('#over-redaction-error-summary').show();

        // Charge type
        if ($('#redactionOver-ChargeStatus').val()) {
            $('#over-charge-error').removeClass('govuk-form-group--error');
            $('#over-charge-issued-error, #over-charge-error-list').hide();
        } else {
            $('#over-charge-error').addClass('govuk-form-group--error');
            $('#over-charge-issued-error, #over-charge-error-list').show();
        }

        // // Reaction type
        if ($('input[name=redationType]').is(':checked')) {
            $('#over-type-issued-error').removeClass('govuk-form-group--error');
            $('#type-issued-error, #type-error-list').hide();
        } else {
            $('#over-type-issued-error').addClass('govuk-form-group--error');
            $('#type-issued-error, #type-error-list').show();
        }

        // Under-redaction - Type of redactions
        if ($("input[id=redationType-Under]").is(':checked') && $("input[name=redactionUnder-redaction-type]").is(':checked')) { 
            $('#conditional-redationType-Under').removeClass('govuk-form-group--error');
            $('#redation-type-issued-error, #redactions-type-error-list').hide();
        } else if ($("input[id=redationType-Under]").is(':checked')) { 
            $('#conditional-redationType-Under').addClass('govuk-form-group--error');
            $('#redation-type-issued-error, #redactions-type-error-list').show();
        }

        // Over-redaction - Type of redactions
        if ($("input[id=redationType-Over]").is(':checked') && $("input[name=redactionOver-redaction-type]").is(':checked')) { 
            $('#conditional-redationType-Over').removeClass('govuk-form-group--error');
            $('#over-redation-type-issued-error, #over-redactions-type-error-list').hide();
        } else if ($("input[id=redationType-Over]").is(':checked')) { 
            $('#conditional-redationType-Over').addClass('govuk-form-group--error');
            $('#over-redation-type-issued-error, #over-redactions-type-error-list').show();
        }

    });

    $("#redactionLog-return").on("change", function (e) {
        if ($(this).is(':checked')) {
            $('#submit-over-redactions').attr('onClick','openCaseActionModal()');
        } else {
            $('#submit-over-redactions').attr('onClick','closeModalOver()');
        }
    });

    // Case Action Plan
    $('#case-action-plan-button, #CAP-error-status, #CAP-date-error, #CAP-info-error').hide();

    $("#error-case-action-plan").on("click", function (e) {

        $('#CAP-error-status').show();

        if ($('input[id=caseActionPlan-Date-Day]').val()) {
            $('#CAP-date').removeClass('govuk-form-group--error');
            $('#CAP-date .govuk-input').removeClass('govuk-input--error');     
            $('#CAP-date .govuk-error-message').hide();
        } else {
            $('#CAP-date').addClass('govuk-form-group--error');
            $('#CAP-date .govuk-input').addClass('govuk-input--error');  
            $('#CAP-date .govuk-error-message').show();   
        }

        if ($('input[id=caseActionPlan-Date-Month]').val()) {
            $('#CAP-date').removeClass('govuk-form-group--error');
            $('#CAP-date .govuk-input').removeClass('govuk-input--error');     
            $('#CAP-date .govuk-error-message').hide();
        } else {
            $('#CAP-date').addClass('govuk-form-group--error');
            $('#CAP-date .govuk-input').addClass('govuk-input--error');  
            $('#CAP-date .govuk-error-message').show();   
        }

        if ($('input[id=caseActionPlan-Date-Year]').val()) {
            $('#CAP-date').removeClass('govuk-form-group--error');
            $('#CAP-date .govuk-input').removeClass('govuk-input--error');     
            $('#CAP-date .govuk-error-message').hide();
        } else {
            $('#CAP-date').addClass('govuk-form-group--error');
            $('#CAP-date .govuk-input').addClass('govuk-input--error');  
            $('#CAP-date .govuk-error-message').show();   
        }

        if ($('input[id=caseActionPlan-Date-Day]').val() && $('input[id=caseActionPlan-Date-Month]').val() && $('input[id=caseActionPlan-Date-Year]').val()) {
            $('#CAP-date-error').hide();
        } else {
            $('#CAP-date-error').show();
        }

        if ($('input[name=caseActionPlan-SpecificDetails]').is(':checked')) {
            $('#CAP-info').removeClass('govuk-form-group--error');
            $('#CAP-info .govuk-error-message, #CAP-info-error').hide();     
        } else {
            $('#CAP-info').addClass('govuk-form-group--error');
            $('#CAP-info .govuk-error-message, #CAP-info-error').show();     
        }
    });

    $("input[id=caseActionPlan-Date-Day]").on("keyup", function (e) {
        if ($(this).val() && $('input[name=caseActionPlan-SpecificDetails]').is(':checked') && $('#caseActionPlan-Date-Month').val() && $('#caseActionPlan-Date-Year').val()) {
            $('#case-action-plan-button').show();
            $('#error-case-action-plan').hide();
        } else {
            $('#case-action-plan-button').hide();
            $('#error-case-action-plan').show();
        }
    });

    $("input[id=caseActionPlan-Date-Month]").on("keyup", function (e) {
        if ($(this).val() && $('input[name=caseActionPlan-SpecificDetails]').is(':checked') && $('#caseActionPlan-Date-Day').val() && $('#caseActionPlan-Date-Year').val()) {
            $('#case-action-plan-button').show();
            $('#error-case-action-plan').hide();
        } else {
            $('#case-action-plan-button').hide();
            $('#error-case-action-plan').show();
        }
    });

    $("input[id=caseActionPlan-Date-Year]").on("keyup", function (e) {
        if ($(this).val() && $('input[name=caseActionPlan-SpecificDetails]').is(':checked') && $('#caseActionPlan-Date-Day').val() && $('#caseActionPlan-Date-Month').val()) {
            $('#case-action-plan-button').show();
            $('#error-case-action-plan').hide();
        } else {
            $('#case-action-plan-button').hide();
            $('#error-case-action-plan').show();
        }
    });

    $("input[name=caseActionPlan-SpecificDetails]").on("change", function (e) {
        if ($(this).is(':checked') && $('#caseActionPlan-Date-Day').val() && $('#caseActionPlan-Date-Month').val() && $('#caseActionPlan-Date-Year').val()) {
            $('#case-action-plan-button').show();
            $('#error-case-action-plan').hide();
        } else {
            $('#case-action-plan-button').hide();
            $('#error-case-action-plan').show();
        }
    });

    $('#CAP-details-wrapper .govuk-character-count').hide();

})

// =================================== Zoom and Marquee =================================== //
function zoomIn() {
    var pic = document.getElementById("pdf-root").getElementsByClassName( 'PdfHighlighter' )[0];
    var width = pic.clientWidth;
    pic.style.width = width + 100 + "px";
    $("#pdf-root").addClass('zoom');
    // var height = pic.clientHeight;
    // var pic = document.getElementById("test").getElementsByClassName( 'page' )[0];
    // pic.style.height = height + 100 + "px";
}

function zoomOut() {
    var pic = document.getElementById("pdf-root").getElementsByClassName( 'PdfHighlighter' )[0];
    var width = pic.clientWidth;
    pic.style.width = width - 100 + "px";
}


// var z = document.getElementById('zoomPercentage-V1');

// function zoom(e) {
//     var value = e.target.value;
//     // var text = e.options[e.selectedIndex].text;
//     alert(value);
//     // var zoomPercentage = $('#zoomPercentage-V1').find(':selected').val();
//     // if (zoomPercentage == "75") {
//     //     // alert('working');
//     // }
// }


function zoom1(e) {
    var value = e.target.value;
    var pic = document.getElementById("pdf-root").getElementsByClassName( 'PdfHighlighter' )[0];
    var width = pic.clientWidth;
    if (value == '800') {
        pic.style.width = width;
        pic.style.width = width + 800 + "px";
    } else if (value == '400') {
        pic.style.width = width;
        pic.style.width = width + 400 + "px";
    } else if (value == '300') {
        pic.style.width = width;
        pic.style.width = width + 300 + "px";
    } else if (value == '200') {
        pic.style.width = width;
        pic.style.width = width + 200 + "px";
    } else if (value == '175') {
        pic.style.width = width;
        pic.style.width = width + 175 + "px";
    } else if (value == '150') {
        pic.style.width = width;
        pic.style.width = width + 150 + "px";
    } else if (value == '125') {
        pic.style.width = width;
        pic.style.width = width + 125 + "px";
    } else if (value == '100') {
        pic.style.width = width;
    } else if (value == '75') {
        pic.style.width = width;
        pic.style.width = width - 150 + "px";
    } else if (value == '50') {
        pic.style.width = width;
        pic.style.width = width - 200 + "px";
    } else if (value == '25') {
        pic.style.width = width;
        pic.style.width = width - 350 + "px";
    } else if (value == '10') {
        pic.style.width = width;
        pic.style.width = width - 500 + "px";
    }
}

// z.onchange = onChange;
// onChange();

function marqueeOn() {
    $("#marquee").addClass('on');
    $('#pdf-root').prepend('<img src="/public/files/MCLOVEMG3-SR-6.png" id="marqueeTool" onClick="" />')
}

 
// =================================== RENAME & MOVE =================================== //
$(document).ready(function () {

    // Rename
    $(".more-options").on("click", function (e) {
        $('.more-options, .document-nav').removeClass('show');
        $(this).find('.visuallyhidden').hide();
        $(this).parent().toggleClass('show-options');
        $(this).toggleClass('show');
        $(this).siblings('.document-nav').toggleClass('show');
    });

    $(".rename-Document").on("click", function (e) {
        var docNewTitle = $(this).parent().parent().children('.wrapper').find('.show-case').text();
        $('.document-title-10').text(docNewTitle);
        $('#rename-Document').val(docNewTitle);
        $(this).parent().parent().addClass('change-DocumentName');
        $(this).parent().removeClass('show');
        if ($(this).hasClass('renameExhibit')) {
            $('.exhibit-hint-text').show();
        } else {
            $('.exhibit-hint-text').hide();
        }
    });

    // $('#document-renamed').on("click", function (e) {
    //     $('.more-options, .document-nav').removeClass('show');
    //     $('.change-DocumentName .wrapper').prepend(`<strong class="govuk-tag govuk-tag--green" style="display: inherit;">Renamed</strong>`);
    //     // $('.updated-message').show();
    //     $('table tbody tr td').removeClass('show-options');

    //     $('.header-wrapper.rename-header').hide();
    //     $('.saving-panel-rename').show();
    //     $('.rename-close').removeAttr('onClick').attr('aria-disabled', 'true').attr('disabled','true');
    //     $('#document-renamed').removeAttr('onClick').attr('aria-disabled', 'true').attr('disabled','true');
    //     $('.cancel-rename').removeAttr('onClick').attr('aria-disabled', 'true').attr('disabled','true');
    //     setTimeout(function() {
    //         $('.saving-panel-rename, .initial-action').hide();
    //         $('.success-banner-rename, .secondary-action').show();
    //         $('.rename-close').attr('onClick','closeRenameModal()').removeAttr('aria-disabled').removeAttr('disabled');
    //     }, 1500);
    // });

    // Move
    $('.document-groups').hide();

    $(".move-Document").on("click", function (e) {
        var docMoveTitle = $(this).parent().parent().children('.wrapper').find('.show-case').text();
        $('.document-title-11').text(docMoveTitle);
        $(this).parent().parent().addClass('move-Document');
        $(this).parent().parent().removeClass('show');
        $(this).parent().removeClass('show');
    });

    $('#document-moved').on("click", function (e) {
        $('.more-options, .document-nav').removeClass('show');
        // $('.change-DocumentName .wrapper').prepend(`<strong class="govuk-tag govuk-tag--orange" style="display: inherit;">Updated</strong>`);
        // $('.updated-message').show();
        $('table tbody tr td').removeClass('show-options');
    });    

})

// function renameDocument() {
//     var newDocumentName = $('#rename-Document').val();
//     $('.updated-message p strong').text(newDocumentName);
//     // $('.updated-message .info-text').text('Document has been renamed ' + newDocumentName);
//     $('ul.sticky-tabs li.govuk-tabs__list-item--selected a').text(newDocumentName);
//     $('table tbody tr td.change-DocumentName a.show-case').text(newDocumentName);
//     $('#documentNameHeader .inPageSearchMargins2').text(newDocumentName);   
// }

function documentOptionTitle() {
    var docNewTitle = $(this).parent().parent().find('.show-case').text();
    $('.document-title-10').text(docNewTitle);
}

// Group 1 - Reviews
function groupReviews() {
    $('.groupName').text('Review documents');
    $('.document-groups').hide();
    $('#groupReviews').show();
}

// Group 2 - Case overview
function groupCase() {
    $('.groupName').text('Case overview documents');
    $('.document-groups').hide();
    $('#groupCase').show();
}

// Group 3 - Statements
function groupStatements() {
    $('.groupName').text('Statement documents');
    $('.document-groups').hide();
    $('#groupStatements').show();
}

// Group 4 - Exhibits
function groupExhibits() {
    $('.groupName').text('Exhibit documents');
    $('.document-groups').hide();
    $('#groupExhibits').show();
}

// Group 5 - Forensics
function groupForensics() {
    $('.groupName').text('Forensic documents');
    $('.document-groups').hide();
    $('#groupForensics').show();
}

// Group 6 - Unused materials
function groupUnused() {
    $('.groupName').text('Unused material documents');
    $('.document-groups').hide();
    $('#groupUnused').show();
}

// Group 7 - Defendant
function groupDefendant() {
    $('.groupName').text('Defendant documents');
    $('.document-groups').hide();
    $('#groupDefendant').show();
}

// Group 8 - Court preparation
function groupCourt() {
    $('.groupName').text('Court preparation documents');
    $('.document-groups').hide();
    $('#groupCourt').show();
}

// Group 9 - Communications
function groupCommunication() {
    $('.groupName').text('Communication documents');
    $('.document-groups').hide();
    $('#groupCommunication').show();
}

// Group 10 - Uncategorised
function groupUncategorised() {
    $('.groupName').text('Uncategorised documents');
    $('.document-groups').hide();
    $('#groupUncategorised').show();
}

function other1(e) {
    var value = e.target.value;
    if (value == 'Other') {
        $('#conditional-Exhibits').show();
    } else {
        $('#conditional-Exhibits').hide();
    }
}


// =================================== SORT DOCUMENTS =================================== //

$(document).ready(function () {

    $(".sort-documents").on("click", function (e) {
        $(this).toggleClass('open');
        $(this).parent().toggleClass('open');
    });

    $(".sort-Alphabetically").on("click", function (e) {
        $(this).parent().parent().parent().find('.save-DocumentMove').show();
    });

    $(".sort-Date").on("click", function (e) {
        $(this).parent().parent().parent().find('.save-DocumentMove').show();
    });

    $(".sort-Item-Number").on("click", function (e) {
        $(this).parent().parent().parent().find('.save-DocumentMove').show();
    });

    $("#sumbittedReorder").on("click", function (e) {
        $('.save-DocumentMove').hide();
    });

})

// Section 1 - Reviews
function sortReviewAlphabetical() {
    $("#sortReviews tbody tr.alpha-2").insertAfter("#sortReviews tbody tr.alpha-1");
    $("#sortReviews tbody tr.alpha-3").insertAfter("#sortReviews tbody tr.alpha-2");
    $("#sortReviews tbody tr.alpha-4").insertAfter("#sortReviews tbody tr.alpha-3");
    $("#sortReviews tbody tr.alpha-5").insertAfter("#sortReviews tbody tr.alpha-4");
    $("#sortReviews tbody tr.alpha-6").insertAfter("#sortReviews tbody tr.alpha-5");
    $("#sortReviews tbody tr.alpha-7").insertAfter("#sortReviews tbody tr.alpha-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

function sortReviewDate() {
    $("#sortReviews tbody tr.date-2").insertAfter("#sortReviews tbody tr.date-1");
    $("#sortReviews tbody tr.date-3").insertAfter("#sortReviews tbody tr.date-2");
    $("#sortReviews tbody tr.date-4").insertAfter("#sortReviews tbody tr.date-3");
    $("#sortReviews tbody tr.date-5").insertAfter("#sortReviews tbody tr.date-4");
    $("#sortReviews tbody tr.date-6").insertAfter("#sortReviews tbody tr.date-5");
    $("#sortReviews tbody tr.date-7").insertAfter("#sortReviews tbody tr.date-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

// Section 2 - Case overview
function sortCaseAlphabetical() {
    $("#sortCases tbody tr.alpha-2").insertAfter("#sortCases tbody tr.alpha-1");
    $("#sortCases tbody tr.alpha-3").insertAfter("#sortCases tbody tr.alpha-2");
    $("#sortCases tbody tr.alpha-4").insertAfter("#sortCases tbody tr.alpha-3");
    $("#sortCases tbody tr.alpha-5").insertAfter("#sortCases tbody tr.alpha-4");
    $("#sortCases tbody tr.alpha-6").insertAfter("#sortCases tbody tr.alpha-5");
    $("#sortCases tbody tr.alpha-7").insertAfter("#sortCases tbody tr.alpha-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

function sortCaseDate() {
    $("#sortCases tbody tr.date-2").insertAfter("#sortCases tbody tr.date-1");
    $("#sortCases tbody tr.date-3").insertAfter("#sortCases tbody tr.date-2");
    $("#sortCases tbody tr.date-4").insertAfter("#sortCases tbody tr.date-3");
    $("#sortCases tbody tr.date-5").insertAfter("#sortCases tbody tr.date-4");
    $("#sortCases tbody tr.date-6").insertAfter("#sortCases tbody tr.date-5");
    $("#sortCases tbody tr.date-7").insertAfter("#sortCases tbody tr.date-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

// Section 3 - Statements
function sortStatementsAlphabetical() {
    $("#sortStatements tbody tr.alpha-2").insertAfter("#sortStatements tbody tr.alpha-1");
    $("#sortStatements tbody tr.alpha-3").insertAfter("#sortStatements tbody tr.alpha-2");
    $("#sortStatements tbody tr.alpha-4").insertAfter("#sortStatements tbody tr.alpha-3");
    $("#sortStatements tbody tr.alpha-5").insertAfter("#sortStatements tbody tr.alpha-4");
    $("#sortStatements tbody tr.alpha-6").insertAfter("#sortStatements tbody tr.alpha-5");
    $("#sortStatements tbody tr.alpha-7").insertAfter("#sortStatements tbody tr.alpha-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
    $("#sortStatements tbody tr.witness-header").removeClass('show');
}

function sortStatementsDate() {
    $("#sortStatements tbody tr.date-2").insertAfter("#sortStatements tbody tr.date-1");
    $("#sortStatements tbody tr.date-3").insertAfter("#sortStatements tbody tr.date-2");
    $("#sortStatements tbody tr.date-4").insertAfter("#sortStatements tbody tr.date-3");
    $("#sortStatements tbody tr.date-5").insertAfter("#sortStatements tbody tr.date-4");
    $("#sortStatements tbody tr.date-6").insertAfter("#sortStatements tbody tr.date-5");
    $("#sortStatements tbody tr.date-7").insertAfter("#sortStatements tbody tr.date-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
    $("#sortStatements tbody tr.witness-header").removeClass('show');
}

function sortWitness() {
    $("#sortStatements tbody tr.witness-2").insertAfter("#sortStatements tbody tr.witness-1");
    $("#sortStatements tbody tr.witness-3").insertAfter("#sortStatements tbody tr.witness-2");
    $("#sortStatements tbody tr.witness-4").insertAfter("#sortStatements tbody tr.witness-3");
    $("#sortStatements tbody tr.witness-5").insertAfter("#sortStatements tbody tr.witness-4");
    $("#sortStatements tbody tr.witness-6").insertAfter("#sortStatements tbody tr.witness-5");
    $("#sortStatements tbody tr.witness-7").insertAfter("#sortStatements tbody tr.witness-6");
    $("#sortStatements tbody tr.witness-8").insertAfter("#sortStatements tbody tr.witness-7");
    $("#sortStatements tbody tr.witness-9").insertAfter("#sortStatements tbody tr.witness-8");
    $("#sortStatements tbody tr.witness-10").insertAfter("#sortStatements tbody tr.witness-9");
    $("#sortStatements tbody tr.witness-11").insertAfter("#sortStatements tbody tr.witness-10");
    $("#sortStatements tbody tr.witness-12").insertAfter("#sortStatements tbody tr.witness-11");
    $("#sortStatements tbody tr.witness-13").insertAfter("#sortStatements tbody tr.witness-12");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
    $("#sortStatements tbody tr.witness-header").addClass('show');
}

// Section 4 - Exhibits
function sortExhibitAlphabetical() {
    $("#sortExhibits tbody tr.alpha-2").insertAfter("#sortExhibits tbody tr.alpha-1");
    $("#sortExhibits tbody tr.alpha-3").insertAfter("#sortExhibits tbody tr.alpha-2");
    $("#sortExhibits tbody tr.alpha-4").insertAfter("#sortExhibits tbody tr.alpha-3");
    $("#sortExhibits tbody tr.alpha-5").insertAfter("#sortExhibits tbody tr.alpha-4");
    $("#sortExhibits tbody tr.alpha-6").insertAfter("#sortExhibits tbody tr.alpha-5");
    $("#sortExhibits tbody tr.alpha-7").insertAfter("#sortExhibits tbody tr.alpha-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

function sortExhibitDate() {
    $("#sortExhibits tbody tr.date-2").insertAfter("#sortExhibits tbody tr.date-1");
    $("#sortExhibits tbody tr.date-3").insertAfter("#sortExhibits tbody tr.date-2");
    $("#sortExhibits tbody tr.date-4").insertAfter("#sortExhibits tbody tr.date-3");
    $("#sortExhibits tbody tr.date-5").insertAfter("#sortExhibits tbody tr.date-4");
    $("#sortExhibits tbody tr.date-6").insertAfter("#sortExhibits tbody tr.date-5");
    $("#sortExhibits tbody tr.date-7").insertAfter("#sortExhibits tbody tr.date-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

// Section 5 - Forensics

// Section 6 - Unused materials
function sortUnusendAlphabetical() {
    $("#sortUnused tbody tr.alpha-2").insertAfter("#sortUnused tbody tr.alpha-1");
    $("#sortUnused tbody tr.alpha-3").insertAfter("#sortUnused tbody tr.alpha-2");
    $("#sortUnused tbody tr.alpha-4").insertAfter("#sortUnused tbody tr.alpha-3");
    $("#sortUnused tbody tr.alpha-5").insertAfter("#sortUnused tbody tr.alpha-4");
    $("#sortUnused tbody tr.alpha-6").insertAfter("#sortUnused tbody tr.alpha-5");
    $("#sortUnused tbody tr.alpha-7").insertAfter("#sortUnused tbody tr.alpha-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

function sortUnusendDate() {
    $("#sortUnused tbody tr.date-2").insertAfter("#sortUnused tbody tr.date-1");
    $("#sortUnused tbody tr.date-3").insertAfter("#sortUnused tbody tr.date-2");
    $("#sortUnused tbody tr.date-4").insertAfter("#sortUnused tbody tr.date-3");
    $("#sortUnused tbody tr.date-5").insertAfter("#sortUnused tbody tr.date-4");
    $("#sortUnused tbody tr.date-6").insertAfter("#sortUnused tbody tr.date-5");
    $("#sortUnused tbody tr.date-7").insertAfter("#sortUnused tbody tr.date-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

function sortUnusendItem() {
    $("#sortUnused tbody tr.item-2").insertAfter("#sortUnused tbody tr.item-1");
    $("#sortUnused tbody tr.item-3").insertAfter("#sortUnused tbody tr.item-2");
    $("#sortUnused tbody tr.item-4").insertAfter("#sortUnused tbody tr.item-3");
    $("#sortUnused tbody tr.item-5").insertAfter("#sortUnused tbody tr.item-4");
    $("#sortUnused tbody tr.item-6").insertAfter("#sortUnused tbody tr.item-5");
    $("#sortUnused tbody tr.item-7").insertAfter("#sortUnused tbody tr.item-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

// Section 7 - Defendant

// Section 8 - Court preparation

// Section 9 - Communications
function sortCommunicationAlphabetical() {
    $("#sortCommunications tbody tr.alpha-2").insertAfter("#sortCommunications tbody tr.alpha-1");
    $("#sortCommunications tbody tr.alpha-3").insertAfter("#sortCommunications tbody tr.alpha-2");
    $("#sortCommunications tbody tr.alpha-4").insertAfter("#sortCommunications tbody tr.alpha-3");
    $("#sortCommunications tbody tr.alpha-5").insertAfter("#sortCommunications tbody tr.alpha-4");
    $("#sortCommunications tbody tr.alpha-6").insertAfter("#sortCommunications tbody tr.alpha-5");
    $("#sortCommunications tbody tr.alpha-7").insertAfter("#sortCommunications tbody tr.alpha-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

function sortCommunicationDate() {
    $("#sortCommunications tbody tr.date-2").insertAfter("#sortCommunications tbody tr.date-1");
    $("#sortCommunications tbody tr.date-3").insertAfter("#sortCommunications tbody tr.date-2");
    $("#sortCommunications tbody tr.date-4").insertAfter("#sortCommunications tbody tr.date-3");
    $("#sortCommunications tbody tr.date-5").insertAfter("#sortCommunications tbody tr.date-4");
    $("#sortCommunications tbody tr.date-6").insertAfter("#sortCommunications tbody tr.date-5");
    $("#sortCommunications tbody tr.date-7").insertAfter("#sortCommunications tbody tr.date-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

// Section 10 - Uncategorised
function sortUncategorisedAlphabetical() {
    $("#sortUncategorised tbody tr.alpha-2").insertAfter("#sortUncategorised tbody tr.alpha-1");
    $("#sortUncategorised tbody tr.alpha-3").insertAfter("#sortUncategorised tbody tr.alpha-2");
    $("#sortUncategorised tbody tr.alpha-4").insertAfter("#sortUncategorised tbody tr.alpha-3");
    $("#sortUncategorised tbody tr.alpha-5").insertAfter("#sortUncategorised tbody tr.alpha-4");
    $("#sortUncategorised tbody tr.alpha-6").insertAfter("#sortUncategorised tbody tr.alpha-5");
    $("#sortUncategorised tbody tr.alpha-7").insertAfter("#sortUncategorised tbody tr.alpha-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

function sortUncategorisedDate() {
    $("#sortUncategorised tbody tr.date-2").insertAfter("#sortUncategorised tbody tr.date-1");
    $("#sortUncategorised tbody tr.date-3").insertAfter("#sortUncategorised tbody tr.date-2");
    $("#sortUncategorised tbody tr.date-4").insertAfter("#sortUncategorised tbody tr.date-3");
    $("#sortUncategorised tbody tr.date-5").insertAfter("#sortUncategorised tbody tr.date-4");
    $("#sortUncategorised tbody tr.date-6").insertAfter("#sortUncategorised tbody tr.date-5");
    $("#sortUncategorised tbody tr.date-7").insertAfter("#sortUncategorised tbody tr.date-6");
    $('.sort-documents-nav').removeClass('open');
    $('.sort-documents-nav .wrapper').removeClass('open');
}

// =================================== REMOVE PAGES =================================== //

$(document).ready(function(){
        
    $("#page-1, #page-1-new").on("click" ,function(){
        var scrolled=0;
        scrolled=scrolled+200;
        $("html").animate({
            scrollTop: scrolled
        });
    });
    
    $("#page-2, #page-2-new").on("click" ,function(){
        var scrolled=0;
        scrolled=scrolled+1675;
        $("html").animate({
            scrollTop: scrolled
        });
    });

    $("#page-3, #page-3-new").on("click" ,function(){
        var scrolled=0;
        scrolled=scrolled+3155;
        $("html").animate({
            scrollTop: scrolled
        });
    });

    $("#page-4, #page-4-new").on("click" ,function(){
        var scrolled=0;
        scrolled=scrolled+4635;
        $("html").animate({
            scrollTop: scrolled
        });
    });

    $("#page-5, #page-5-new").on("click" ,function(){
        var scrolled=0;
        scrolled=scrolled+6115;
        $("html").animate({
            scrollTop: scrolled
        });
    });

    $("#page-6, #page-6-new").on("click" ,function(){
        var scrolled=0;
        scrolled=scrolled+7590;
        $("html").animate({
            scrollTop: scrolled
        });
    });

    $('.delete-page').click(function() {
        var documentNumber = $(this).parent().parent().parent().find('label span').text();
        $('.page-number-to-remove').text(documentNumber);
        $(this).parent().parent().parent().addClass('remove');
        $("#confirmRemovePage").removeClass("rj-dont-display");
    });

    $('.cancel-delete').click(function() {
        var documentNumber = $("#confirmRemovePage").find('.page-number-to-remove').text();
        if (documentNumber == 'Page 1') {
            $('#editDocument-Page-1').parent().parent().removeClass('remove');
        } else if (documentNumber == 'Page 2') {
            $('#editDocument-Page-2').parent().parent().removeClass('remove');
        } else if (documentNumber == 'Page 3') {
            $('#editDocument-Page-3').parent().parent().removeClass('remove');
        } else if (documentNumber == 'Page 4') {
            $('#editDocument-Page-4').parent().parent().removeClass('remove');
        } else if (documentNumber == 'Page 5') {
            $('#editDocument-Page-5').parent().parent().removeClass('remove');
        }
        // $('.page-number-to-remove').text(documentNumber);
        // $(this).parent().parent().parent().addClass('remove');
        // $("#confirmRemovePage").removeClass("rj-dont-display");
    });


    // $('.delete-multiple-pages').click(function() {
    // });

    // $('input[name=confirmRemovePages-RL]').change(function() {
    //     if ($('input[name="confirmRemovePages-RL"]:checked').length > 0) {
    //         $('#confirm-Remove-Rotate-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled');
    //     }
    // }); 


    $('input[name=confirmRemovePages]').change(function() {
        if ($('#confirmRemovePages-Yes').is(':checked')) {
            // $('#confirm-Remove-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','return closeConfirmRemovePages(), closeRotatePagesModal()');
            $('#confirm-Remove-Rotate-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled');
        } else {
            $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').removeAttr('onClick');
            // $('#confirm-Remove-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').removeAttr('onClick');
        }
    }); 

    $('input[name=confirmRemovePages]').change(function() {
        if ($('#confirmRemovePages-Yes').is(':checked')) {
            // $('#confirm-Remove-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','return closeConfirmRemovePages(), closeRotatePagesModal()');
            $('#confirm-Remove-Rotate-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled');
        } else {
            $('#confirm-Remove-Rotate-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').removeAttr('onClick');
            // $('#confirm-Remove-Pages').addClass('govuk-button--disabled').attr('aria-disabled','true').removeAttr('onClick');
        }
    }); 

    $('.close-rotate-remove').hide();

    $('#confirm-Remove-Rotate-Pages').click(function() {
        $('.saving-panel-remove-rotate').show();
        $('.header-wrapper.remove-rotate-header').hide();
        $(this).removeAttr('onClick').attr('aria-disabled', 'true').attr('disabled','true');
        $('.cancel-rotate').removeAttr('onClick').attr('aria-disabled', 'true').attr('disabled','true');
        setTimeout(function() {
            $('.confirm-Remove-Pages-Message, .remove-rotate-wrapper').hide();
            $('.close-rotate-remove').show();
            $('.saving-panel-remove-rotate, .initial-action').hide();
            $('.success-banner-remove-rotate, .secondary-action').show();
        }, 1500);

        $('#group1-doc1 td .wrapper').prepend(`<strong class="govuk-tag govuk-tag--green" style="display:inline-block !important;">Updated</strong>`);

        $('#saving-panel-REMOVE').show();
        $('.success-banner-REMOVE').hide();

        setTimeout(function() {
            $('#saving-panel-REMOVE').hide();
            $('.success-banner-REMOVE').show();
            $('#redaction-log-button-REMOVE').removeAttr('disabled').removeAttr('aria-disabled').removeClass('govuk-button--disabled').attr('onClick','return closeLogREMOVE(), closeConfirmRemovePages(), closeRotatePagesModal()');
        }, 3000);

        setTimeout(function() {
            $('.success-banner-REMOVE').slideUp();
        }, 6000);
    });

    $('#confirm-Remove-Pages').click(function() {
        $('.button-wrapper-multiple').hide();
        $('.button-wrapper').show();
    });
    

         // $('input[name=confirmRemovePages]').change(function() {
    //     if ($(this).is(':checked') && $.cookie("reportProblem-Document") == '7') {
    //         $('#confirm-Remove-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','return closeConfirmRemovePages(), updateDocument(), updateDocument6()');
    //     } else if ($(this).is(':checked') && $.cookie("reportProblem-Document") == '8') {
    //         $('#confirm-Remove-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','return closeConfirmRemovePages(), updateDocument(), updateDocument7()');
    //     } else if ($(this).is(':checked') && $.cookie("reportProblem-Document") == '9') {
    //         $('#confirm-Remove-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','return closeConfirmRemovePages(), updateDocument(), updateDocument8()');
    //     } else if ($(this).is(':checked') && $.cookie("reportProblem-Document") == '10') {
    //         $('#confirm-Remove-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','return closeConfirmRemovePages(), updateDocument(), updateDocument9()');
    //     } else if ($(this).is(':checked') && $.cookie("reportProblem-Document") == '11') {
    //         $('#confirm-Remove-Pages').removeClass('govuk-button--disabled').attr('aria-disabled','false').removeAttr('disabled').attr('onClick','return closeConfirmRemovePages(), updateDocument(), updateDocument10()');
    //     }
    // });

    $('.multiple-remove').hide();
    $('.page-1, .page-2, .page-3, .page-4, .page-5').hide();

});

// var $pageCheckboxes = $('input[name="editDocument"]');

function countPages() {
    // var countPagesCheckboxes = $('input[name="editDocument"]:checked').length;
    // alert(countPagesCheckboxes);
    $('.single-remove').hide();
    $('.multiple-remove').show();
    if ($('input[id="editDocument-Page-1"]').is(':checked')) {
        $('.page-1').show();
        $('input[id="editDocument-Page-1"]').parent().parent().addClass('remove');
    } else {
        $('.page-1').hide();
    }
    if ($('input[id="editDocument-Page-2"]').is(':checked')) {
        $('.page-2').show();
        $('input[id="editDocument-Page-2"]').parent().parent().addClass('remove');
    } else {
        $('.page-2').hide();
    }
    if ($('input[id="editDocument-Page-3"]').is(':checked')) {
        $('.page-3').show();
        $('input[id="editDocument-Page-3"]').parent().parent().addClass('remove');
    } else {
        $('.page-3').hide();
    }
    if ($('input[id="editDocument-Page-4"]').is(':checked')) {
        $('.page-4').show();
        $('input[id="editDocument-Page-4"]').parent().parent().addClass('remove');
    } else {
        $('.page-4').hide();
    }
    if ($('input[id="editDocument-Page-5"]').is(':checked')) {
        $('.page-5').show();
        $('input[id="editDocument-Page-5"]').parent().parent().addClass('remove');
    } else {
        $('.page-5').hide();
    }

}

function removePageNumber() {
    $('div.remove').remove();
}

function updateDocument() {
    $('#pdf-root .canvasWrapper, #pdf-root .textLayer').hide();
    $('#pdf-root .PdfHighlighter').addClass('documentSwap');
    // $('.updated-message').show();
}

function updateDocument6() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/stmt_BLAYNEE_2034_1_JUNE_mg11_REMOVED.jpg' />";
    $('table tbody tr.document-6 td').prepend(`<strong class="govuk-tag govuk-tag--orange" style="display: inherit;">Updated</strong>`);
    $('.page-counter strong').text('2');
}

function updateDocument7() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/stmt_JONES_1989_1_JUNE_mg11_REMOVED.jpg' />";
    $('table tbody tr.document-7 td').prepend(`<strong class="govuk-tag govuk-tag--orange" style="display: inherit;">Updated</strong>`);
    $('.page-counter strong').text('2');
}

function updateDocument8() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/stmt_Lucy_Doyle_MG11_REMOVED.jpg' />";
    $('table tbody tr.document-8 td').prepend(`<strong class="govuk-tag govuk-tag--orange" style="display: inherit;">Updated</strong>`);
    $('.page-counter strong').text('2');
}

function updateDocument9() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/stmt_Shelagh_McLove_MG11_REMOVED.jpg' />";
    $('table tbody tr.document-9 td').prepend(`<strong class="govuk-tag govuk-tag--orange" style="display: inherit;">Updated</strong>`);
    $('.page-counter strong').text('2');
}

function updateDocument10() {
    document.getElementById("changeDocument").innerHTML="<img src='/public/files/Shelagh_McLove_VPS_mg11_REMOVED.jpg' />";
    $('table tbody tr.document-10 td').prepend(`<strong class="govuk-tag govuk-tag--orange" style="display: inherit;">Updated</strong>`);
    $('.page-counter strong').text('1');
}


// =================================== ROTATE & REMOVE PAGES =================================== //
$(document).ready(function(){

    $(".rotate-IMG-left").click(function(e){
        e.preventDefault();
        var angle = ($(this).parent().parent().find('img').data('angle'));
        if (!angle) {
            angle = -90;
        } else {
            angle = angle-90;
        }
        $(this).parent().parent().find('img').css({'transform': 'rotate(' + angle + 'deg)'});
        $(this).parent().parent().find('img').data('angle', angle);
    });

    $(".rotate-IMG-right").click(function(e){
        // alert($(this).parent().parent().find('img').data('angle'));
        e.preventDefault();
        var angle = ($(this).parent().parent().find('img').data('angle'));
        if (!angle) {
            angle = 90;
        } else {
            angle = angle+90;
        }
        // alert(angle);
        $(this).parent().parent().find('img').css({'transform': 'rotate(' + angle + 'deg)'});
        $(this).parent().parent().find('img').data('angle', angle);
    });

    var $checkboxes = $('input[name="editDocument"]');
        
    $checkboxes.change(function(){
        var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
        // var checkedCheckboxes = $('.number-selected')    
        $('.number-selected').text(countCheckedCheckboxes);
        if (countCheckedCheckboxes >= 2 ) {
            $('.rotate-wrapper .button-wrapper').hide();
            $('.button-wrapper-multiple').show();
        } else {
            $('.rotate-wrapper .button-wrapper').show();
            $('.button-wrapper-multiple').hide();
        }
        
    });

    $("#openRotatePages #openMe.das-cookie-banner.small").on( "scroll", function() {
        $('.button-wrapper-multiple').addClass('sticky');
    });

});

// =================================== INDEX PAGES =================================== //
$(document).ready(function() {
    if (window.location.href.indexOf("new-task") > -1) {
        $('#new-task').attr('aria-expanded','true');
        $('#group10-doc2 td').addClass('current').removeClass('unreadDocument');
    }
});

// =================================== REDACTED DOCUMENT =================================== //
function redactedDocumentV1() {

    $(".redacted-document-V1").on("click", function (e) {
        $('.inPageSearchMargins2').addClass('redacted');
        if ($('#documentNameHeader > p.inPageSearchMargins2:contains("stmt JONES 1989 1 JUNE mg11")').length > 0) {
            $('#documentNameHeader > p.inPageSearchMargins2:contains("stmt JONES 1989 1 JUNE mg11")').append( '<br><span>Redacted, Thu 04 Jun 2023 2:15pm, by "user_name_1983"</span>' );
            $('#documentNameHeader > p.inPageSearchMargins2:contains("stmt JONES 1989 1 JUNE mg11")').parent().addClass('redacted');
        }
    });

}

function redactedDocumentV2() {

    $(".redacted-document-V2").on("click", function (e) {
        $('.inPageSearchMargins2').addClass('redacted');
        if ($('#documentNameHeader > p.inPageSearchMargins2:contains("MCLOVE MG12")').length > 0) {
            $('#documentNameHeader > p.inPageSearchMargins2:contains("MCLOVE MG12")').append( '<br><span>Redacted, Thu 04 Jun 2023 2:18pm, by "Joe_Bloggs_1999"</span>' );
            $('#documentNameHeader > p.inPageSearchMargins2:contains("MCLOVE MG12")').parent().addClass('redacted');
        }
    });

}

// =================================== TRIAGE =================================== //
$(document).ready(function () {
    $('.success-banner-triage, .close-triage, .triage-wrapper').hide();

})

// =================================== RECLASSIFICATION JOURNEY =================================== //
$(document).ready(function() {
    if (window.location.href.indexOf("catergory-Communications") > -1) {
        $('#catergory-Communications').attr('aria-expanded','true');
    }
    if (window.location.href.indexOf("hidden-documents") > -1) {
        $('#hidden-documents').attr('aria-expanded','true');
    }
    if (window.location.href.indexOf("catergory-Exhibits") > -1) {
        $('#catergory-Exhibits').attr('aria-expanded','true');
    }

    $('#saving-to-cms').hide();

    $('#cancelPageLoad').click (function (e) {
        $('#saving-to-cms').show();
    });  

    $('#document_Option_1, #document_Option_2, #document_Option_3, #used_Unused').hide();

    $("#documentType").on("change", function (e) {
        if ($(this).val() == 'MG11' || $(this).val() == 'MG11 (R)') {
            $('#document_Option_1').show();
            $('#document_Option_2, #document_Option_3').hide();
        } else if ($(this).val() == 'MG15 (SDN)' || $(this).val() == 'MG15 (ROTI)' || $(this).val() == 'MG15 (ROVI)' || $(this).val() == 'MG15 (CONI)' || $(this).val() == 'Other Exhibit') {
            $('#document_Option_2').show();
            $('#document_Option_1, #document_Option_3').hide();
        } else if ($(this).val() == 'Asset recovery' || $(this).val() == 'Asset recovery' || $(this).val() == 'Asset recovery 3rd Party' || $(this).val() == 'Complaint' || $(this).val() == 'Correspondence' || $(this).val() == 'Counsel Case Acknowledgement' || $(this).val() == 'Defence Statement' || $(this).val() == 'MG6C' || $(this).val() == 'MG6D' || $(this).val() == 'MG6E' || $(this).val() == 'Other Communication' || $(this).val() == 'PCN3' || $(this).val() == 'SDC' || $(this).val() == 'Service of ABE') {
            $('#document_Option_3').show();
            $('#document_Option_1, #document_Option_2, #used_Unused').hide();
        } else {
            $('#document_Option_3, #used_Unused').show();
            $('#document_Option_1, #document_Option_2').hide();
        }
    });  
  

    // if (document.getElementById("cancelPageLoad")) {
    //     setTimeout("submitForm()", 5000); // set timout 
    // }

    // $('#cancelPageLoad-V1').click (function (e) {
    //     e.preventDefault(); //will stop the link href to call the blog page
    //     $('#saving-to-cms').show();
    //     setTimeout(function () {
    //         window.location.href = "../1-new-designs/C-casefile-1#catergory-Communications"; //will redirect to your blog page (an ex: blog.html)
    //     }, 4000); //will call the function after 2 secs.
    // });    

    // $('#cancelPageLoad-V2').click (function (e) {
    //     e.preventDefault(); //will stop the link href to call the blog page
    //     $('#saving-to-cms').show();
    //     setTimeout(function () {
    //         window.location.href = "../1-new-designs/C-casefile-1#hidden-documents"; //will redirect to your blog page (an ex: blog.html)
    //     }, 4000); //will call the function after 2 secs.
    // });    

    // $('#cancelPageLoad-V3').click (function (e) {
    //     e.preventDefault(); //will stop the link href to call the blog page
    //     $('#saving-to-cms').show();
    //     setTimeout(function () {
    //         window.location.href = "../1-new-designs/C-casefile-1#catergory-Exhibits"; //will redirect to your blog page (an ex: blog.html)
    //     }, 4000); //will call the function after 2 secs.
    // });    

});



// !!!!!! --------------------------------- Date stamp - THIS MUST BE AT THE BOTTOM --------------------------------- !!!!!! //
$(document).ready(function () {
    document.getElementById("date-stamp").innerHTML = formatAMPM();
    function formatAMPM() {
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
            days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+' '+d.getDate()+'/'+months[d.getMonth()]+'/'+d.getFullYear()+' '+hours+':'+minutes+ampm;
    }

    document.getElementById("date-stamp-2").innerHTML = formatAMPM();
    function formatAMPM() {
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
            days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+' '+d.getDate()+'/'+months[d.getMonth()]+'/'+d.getFullYear()+' '+hours+':'+minutes+ampm;
    }

})

// } else {
//         console.log('This is the page with the unique ID. Additional scripts from application.js will not run.');
//     }
// });