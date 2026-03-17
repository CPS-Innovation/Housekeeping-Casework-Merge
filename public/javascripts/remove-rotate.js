// ====================================================== Remove

function pageActions() {
    // var pageCount = $(this).attr("data-page");
    // $('.page-counter strong').text(pageCount);



    setTimeout(function(parent) {
        $('#changeDocument .page').append(`
            <div class="page-counter new">
                <p>Page: <span><span class="number">1</span>/<strong>2</strong></span></p>
                <button onclick="return deleteThisPage(this), closeDiv(this), noRotate(this);" class="delete-page"><span class="icon delete"></span>Delete</button>
            </div>
        `);

        const elements = document.querySelectorAll('.page-counter');
        const count = elements.length;
        $('#changeDocument .page strong').html(count);

        $('.page[data-page-number="1"] .page-counter.new .number').html('1');
        $('.page[data-page-number="2"] .page-counter.new .number').html('2');
        $('.page[data-page-number="3"] .page-counter.new .number').html('3');
        $('.page[data-page-number="4"] .page-counter.new .number').html('4');
        $('.page[data-page-number="5"] .page-counter.new .number').html('5');
        $('.page[data-page-number="6"] .page-counter.new .number').html('6');

        // var pageNumber = $(parent).closest('.page').attr('data-page-number');
        // alert(pageNumber);

    }, 2000);
}

function closeDiv(spn) {
    spn.parentNode.style.display = "none";
}


// var hide = function(el){
//     var latitude = $(el).children('.coordinates').data('latitude');
//     var alert_this = $(el).children('.coordinates').data('latitude');
//     alert(alert_this);
// }

var deleteThisPage = function(parent) {
    // parent.parentNode.
    var pageNumber = $(parent).closest('.page').attr('data-page-number');
    var pageAction = "<div class='delete-page-action'>" + 
        "<div class='govuk-form-group'>" + 
            "<label class='govuk-label' for='delete-page-reason'>Sort by</label>" +
            "<select class='govuk-select' id='delete-page-reason' name='delete-page-reason' onClick='return activateButton()'>" +
                "<option disabled selected>-- Select reason --</option>" +
                "<option value='MG11 Backsheet'>MG11 Backsheet</option>" +
                "<option value='Contains personal data'>Contains personal data</option>" +
                "<option value='Blank page'>Blank page</option>" +
            "</select>" +
        "</div>" +
        "<button id='confrim-delete-page-action' disabled='disabled' aria-disabled='true' class='govuk-button govuk-button--disabled' data-module='govuk-button' type='button'>Continue</button>" +
        "<button id='' class='cancel-delete-page non-button' data-module='govuk-button' type='button' onclick='closeDeleteAction(this)'>Cancel</button>" +
    "</div>";

    if (pageNumber == 1) { 
        $('.page[data-page-number="1"]').addClass('delete-this-page');
        $('.page[data-page-number="1"]').append(pageAction);
    } else if (pageNumber == 2) { 
        $('.page[data-page-number="2"]').addClass('delete-this-page');
        $('.page[data-page-number="2"]').append(pageAction);
    } else if (pageNumber == 3) { 
        $('.page[data-page-number="3"]').addClass('delete-this-page');
        $('.page[data-page-number="3"]').append(pageAction);
    } else if (pageNumber == 4) { 
        $('.page[data-page-number="4"]').addClass('delete-this-page');
        $('.page[data-page-number="4"]').append(pageAction);
    } else if (pageNumber == 5) { 
        $('.page[data-page-number="5"]').addClass('delete-this-page');
        $('.page[data-page-number="5"]').append(pageAction);
    } else if (pageNumber == 6) { 
        $('.page[data-page-number="6"]').addClass('delete-this-page');
        $('.page[data-page-number="6"]').append(pageAction);
    }

}

function activateButton() {
    $('#confrim-delete-page-action').removeAttr('disabled').removeAttr('aria-disabled').removeClass('govuk-button--disabled').attr('onClick', 'return completeDelete(this)');
}

// let el_down = document.getElementById("gfg");

var completeDelete = function(parent) {
    $('.page-counter.new').show();
    var pageNumberToRemove = $(parent).closest('.page').attr('data-page-number');
    var pageContent = "<div class='delete-page-content'>" + 
        "<div class='content'>" + 
            "<span class='page-deleted'></span>" +
            "<h2 class='govuk-heading-xl'>Page selected for deletion</h2>" +
            "<p class=''>Click <strong>“save and submit”</strong> to remove the page from the document</p>" +
        "</div>" +
    "</div>";

    var redactionFooter = "<div class='redaction-footer delete-page-footer'>" +
        "<span class='removeRedactions looks-like-a-link-underline' onClick='return removeRedactions(this)'>Remove all redactions</span>" +
        "<span id='data-count' data-count='1'>There is 1 redaction</span>" +
        "<span class='viewRedactions looks-like-a-link-underline'> - views redactions</span>" +
        "<button class='govuk-button saveAndFinishButton' onClick='return triggerRedactionActions();'>Save and submit all redactions</button>" +
    "</div>";

    if (pageNumberToRemove == 1) { 
        // $('.page[data-page-number="1"]').removeClass('delete-this-page');
        $('.page[data-page-number="1"] .delete-page-action').hide();
        $('.page[data-page-number="1"] .page-counter.new .delete-page').html('Cancel');
        $('.page[data-page-number="1"]').append(pageContent);
    } else if (pageNumberToRemove == 2) { 
        // $('.page[data-page-number="2"]').removeClass('delete-this-page');
        $('.page[data-page-number="2"] .delete-page-action').hide();
        $('.page[data-page-number="2"] .page-counter.new .delete-page').html('Cancel');
        $('.page[data-page-number="2"]').append(pageContent);
    } else if (pageNumberToRemove == 3) { 
        // $('.page[data-page-number="3"]').removeClass('delete-this-page');
        $('.page[data-page-number="3"] .delete-page-action').hide();
        $('.page[data-page-number="3"] .page-counter.new .delete-page').html('Cancel');
        $('.page[data-page-number="3"]').append(pageContent);
    } else if (pageNumberToRemove == 4) { 
        // $('.page[data-page-number="4"]').removeClass('delete-this-page');
        $('.page[data-page-number="4"] .delete-page-action').hide();
        $('.page[data-page-number="4"] .page-counter.new .delete-page').html('Cancel');
        $('.page[data-page-number="4"]').append(pageContent);
    } else if (pageNumberToRemove == 5) { 
        // $('.page[data-page-number="5"]').removeClass('delete-this-page');
        $('.page[data-page-number="5"] .delete-page-action').hide();
        $('.page[data-page-number="5"] .page-counter.new .delete-page').html('Cancel');
        $('.page[data-page-number="5"]').append(pageContent);
    } else if (pageNumberToRemove == 6) { 
        // $('.page[data-page-number="6"]').removeClass('delete-this-page');
        $('.page[data-page-number="6"] .delete-page-action').hide();
        $('.page[data-page-number="6"] .page-counter.new .delete-page').html('Cancel');
        $('.page[data-page-number="6"]').append(pageContent);
    }

    $('#pdf-root').prepend(redactionFooter);

    var deletionReason = $('#delete-page-reason').val();
    var deletionReasonAnswer = "<li><b>1</b> - " + deletionReason +"</li>";
    $('#redaction-summary ul').append(deletionReasonAnswer);
}

var removeRedactions = function(parent) {
    $('.redaction-footer.delete-page-footer').hide();
    $('.page').removeClass('delete-this-page');

    $('div.Highlight, #marqueeTool, .AreaHighlight, .AreaHighlight__part').remove();

    $('#changeDocument .page .page-counter.new button').attr('onclick', 'return deleteThisPage(this), closeDiv(this), noRotate(this)').html('<span class="icon delete"></span>Delete</button>');
}

var closeDeleteAction = function(parent) {
    $('.page-counter.new').show();

    var pageNumber = $(parent).closest('.page').attr('data-page-number');
    if (pageNumber == 1) { 
        $('.page[data-page-number="1"]').removeClass('delete-this-page');
        $('.page[data-page-number="1"] .delete-page-action').hide();
    } else if (pageNumber == 2) { 
        $('.page[data-page-number="2"]').removeClass('delete-this-page');
        $('.page[data-page-number="2"] .delete-page-action').hide();
    } else if (pageNumber == 3) { 
        $('.page[data-page-number="3"]').removeClass('delete-this-page');
        $('.page[data-page-number="3"] .delete-page-action').hide();
    } else if (pageNumber == 4) { 
        $('.page[data-page-number="4"]').removeClass('delete-this-page');
        $('.page[data-page-number="4"] .delete-page-action').hide();
    } else if (pageNumber == 5) { 
        $('.page[data-page-number="5"]').removeClass('delete-this-page');
        $('.page[data-page-number="5"] .delete-page-action').hide();
    } else if (pageNumber == 6) { 
        $('.page[data-page-number="6"]').removeClass('delete-this-page');
        $('.page[data-page-number="6"] .delete-page-action').hide();
    }
}

function triggerRedactionActions() {
    $('#redactionModal').removeClass("rj-dont-display");
    setTimeout(function () {
        $("#saving-panel").hide();
        $(".success-banner").show();
        $("#redaction-log-button").removeClass('govuk-button--disabled').removeAttr('aria-disabled');
        document.getElementById("redaction-log-button").disabled = false;
    }, 5000)
    setTimeout(function () {
        $(".success-banner").slideUp();
    }, 10000)
    setTimeout(function () {
        $(".success-banner").slideUp();
    }, 15000)
}

function deletePageDocument() {
    $('.redaction-footer.delete-page-footer').hide();
    $('.page.delete-this-page').hide();

    const elements = document.querySelectorAll('.page-counter');
    const count = elements.length-1;
    $('#changeDocument .page strong').html(count);

    $('.page[data-page-number="1"] .page-counter.new .number').html('1');
    $('.page[data-page-number="2"] .page-counter.new .number').html('1');
    $('.page[data-page-number="3"] .page-counter.new .number').html('2');
    $('.page[data-page-number="4"] .page-counter.new .number').html('3');
    $('.page[data-page-number="5"] .page-counter.new .number').html('4');
    $('.page[data-page-number="6"] .page-counter.new .number').html('5');

}

function noRotate() {
    $('.remove-rotate-pages-modal').attr('onClick', 'return openDisabledRotate();');
}

function openDisabledRotate() {
    $("#warningModalRotate").removeClass("rj-dont-display");
}
function closeDisabledRotate() {
    $("#warningModalRotate").addClass("rj-dont-display");
}

// ====================================================== Rotate

function openRotatePagesModal() {
    var rotateButton = "<button onclick='return rotateThisPage(this);' class='rotate-page'><span class='icon rotate'></span>Rotate page</button>";
    $('.page-counter.new button.delete-page').hide();
    $('.page-counter.new').append(rotateButton);

}

// function closeDiv2(spn) {
//     spn.parentNode.style.display = "none";
// }

var rotateThisPage = function(parent) {
    var rotatePageNumber = $(parent).closest('.page').attr('data-page-number');
    var pageRotateAction = "<div class='rotate-page-content'>" + 
        "<div class='content'>" + 
            "<div class='wrapper'>" +
                "<div class='rotate-controls'>" +
                    "<button id='' class='rotate-button rotate-left' data-module='govuk-button' type='button' onClick='return rotateLeft(this), onClick();'><span></span>Rotate page left</button>" +
                    "<span class='page-rotated'></span>" +
                    "<button id='' class='rotate-button rotate-right' data-module='govuk-button' type='button' onClick='return rotateRight(this), onClick();'>Rotate page right<span></span></button>" +
                "</div>" +
            "</div>" +
            "<h2 class='govuk-heading-xl'>Rotate page <span></span></h2>" +
            "<p class=''>Click <strong>“save and submit”</strong> to submit changes to CMS</p>" +
            "<button id='' class='cancel-rotate-page non-button' data-module='govuk-button' type='button' onClick='return cancelRotate(this);'>Cancel</button>" +
        "</div>" +
    "</div>";

    if (rotatePageNumber == 1) { 
        $('.page[data-page-number="1"]').addClass('rotate-this-page');
        $('.page[data-page-number="1"]').append(pageRotateAction);
        $('.page[data-page-number="1"] .page-counter.new .rotate-page').html('Cancel');
        $('.page[data-page-number="1"] .page-counter.new .rotate-page').attr('onclick', 'return cancelRotate(this)');
    } else if (rotatePageNumber == 2) { 
        $('.page[data-page-number="2"]').addClass('rotate-this-page');
        $('.page[data-page-number="2"]').append(pageRotateAction);
        $('.page[data-page-number="2"] .page-counter.new .rotate-page').html('Cancel');
        $('.page[data-page-number="2"] .page-counter.new .rotate-page').attr('onclick', 'return cancelRotate(this)');
    } else if (rotatePageNumber == 3) { 
        $('.page[data-page-number="3"]').addClass('rotate-this-page');
        $('.page[data-page-number="3"]').append(pageRotateAction);
        $('.page[data-page-number="3"] .page-counter.new .rotate-page').html('Cancel');
        $('.page[data-page-number="3"] .page-counter.new .rotate-page').attr('onclick', 'return cancelRotate(this)');
    } else if (rotatePageNumber == 4) { 
        $('.page[data-page-number="4"]').addClass('rotate-this-page');
        $('.page[data-page-number="4"]').append(pageRotateAction);
        $('.page[data-page-number="4"] .page-counter.new .rotate-page').html('Cancel');
        $('.page[data-page-number="4"] .page-counter.new .rotate-page').attr('onclick', 'return cancelRotate(this)');
    } else if (rotatePageNumber == 5) { 
        $('.page[data-page-number="5"]').addClass('rotate-this-page');
        $('.page[data-page-number="5"]').append(pageRotateAction);
        $('.page[data-page-number="5"] .page-counter.new .rotate-page').html('Cancel');
        $('.page[data-page-number="5"] .page-counter.new .rotate-page').attr('onclick', 'return cancelRotate(this)');
    } else if (rotatePageNumber == 6) { 
        $('.page[data-page-number="6"]').addClass('rotate-this-page');
        $('.page[data-page-number="6"]').append(pageRotateAction);
        $('.page[data-page-number="6"] .page-counter.new .rotate-page').html('Cancel');
        $('.page[data-page-number="6"] .page-counter.new .rotate-page').attr('onclick', 'return cancelRotate(this)');
    }

}

var cancelRotate = function(parent) {
    var rotatePageNumberCancel = $(parent).closest('.page').attr('data-page-number');

    if (rotatePageNumberCancel == 1) { 
        $('.page[data-page-number="1"]').removeClass('rotate-this-page');
        $('.page[data-page-number="1"] .rotate-page-content').hide();
        $('.page[data-page-number="1"] .page-counter.new .rotate-page').html('<span class="icon rotate"></span> Rotate page');
        $('.page[data-page-number="1"] .page-counter.new .rotate-page').attr('onclick', 'return rotateThisPage(this)');
    } else if (rotatePageNumberCancel == 2) { 
        $('.page[data-page-number="2"]').removeClass('rotate-this-page');
        $('.page[data-page-number="2"] .rotate-page-content').hide();
        $('.page[data-page-number="2"] .page-counter.new .rotate-page').html('<span class="icon rotate"></span> Rotate page');
        $('.page[data-page-number="2"] .page-counter.new .rotate-page').attr('onclick', 'return rotateThisPage(this)');
    } else if (rotatePageNumberCancel == 3) { 
        $('.page[data-page-number="3"]').removeClass('rotate-this-page');
        $('.page[data-page-number="3"] .rotate-page-content').hide();
        $('.page[data-page-number="3"] .page-counter.new .rotate-page').html('<span class="icon rotate"></span> Rotate page');
        $('.page[data-page-number="3"] .page-counter.new .rotate-page').attr('onclick', 'return rotateThisPage(this)');
    } else if (rotatePageNumberCancel == 4) { 
        $('.page[data-page-number="4"]').removeClass('rotate-this-page');
        $('.page[data-page-number="4"] .rotate-page-content').hide();
        $('.page[data-page-number="4"] .page-counter.new .rotate-page').html('<span class="icon rotate"></span> Rotate page');
        $('.page[data-page-number="4"] .page-counter.new .rotate-page').attr('onclick', 'return rotateThisPage(this)');
    } else if (rotatePageNumberCancel == 5) { 
        $('.page[data-page-number="5"]').removeClass('rotate-this-page');
        $('.page[data-page-number="5"] .rotate-page-content').hide();
        $('.page[data-page-number="5"] .page-counter.new .rotate-page').html('<span class="icon rotate"></span> Rotate page');
        $('.page[data-page-number="5"] .page-counter.new .rotate-page').attr('onclick', 'return rotateThisPage(this)');
    } else if (rotatePageNumberCancel == 6) { 
        $('.page[data-page-number="6"]').removeClass('rotate-this-page');
        $('.page[data-page-number="6"] .rotate-page-content').hide();
        $('.page[data-page-number="5"] .page-counter.new .rotate-page').html('<span class="icon rotate"></span> Rotate page');
        $('.page[data-page-number="6"] .page-counter.new .rotate-page').attr('onclick', 'return rotateThisPage(this)');
    }
}

var rotateLeft = function(parent) {

    var angle = ($(parent).parent().find('.page-rotated').data('angle'));
    if (!angle) {
        angle = -90;
    } else {
        angle = angle-90;
    }
    $(parent).parent().find('.page-rotated').css({'transform': 'rotate(' + angle + 'deg)'});
    $(parent).parent().find('.page-rotated').data('angle', angle);

    $(parent).parent().parent().parent().find('h2 span').html(angle + '&deg; left');

    const clicks = 0;

}

var rotateRight = function(parent) {

    var angle = ($(parent).parent().find('.page-rotated').data('angle'));
    if (!angle) {
        angle = 90;
    } else {
        angle = angle+90;
    }
    $(parent).parent().find('.page-rotated').css({'transform': 'rotate(' + angle + 'deg)'});
    $(parent).parent().find('.page-rotated').data('angle', angle);

    $(parent).parent().parent().parent().find('h2 span').html(angle + '&deg; right');
}

var clicks = 0;

var rotationFooter = "<div class='redaction-footer rotate-page-footer'>" +
    "<span class='removeRedactions looks-like-a-link-underline' onClick='return removeRotations(this)'>Remove all rotations</span>" +
    "<span id='data-count' data-count='1'>There is 1 rotation</span>" +
    "<button class='govuk-button saveAndFinishButton' onClick='return triggerRotationActions(this);'>Save and submit all rotations</button>" +
"</div>";

function onClick() {
    clicks += 1;
    if (clicks == 1) {
        $('#pdf-root').prepend(rotationFooter);
    } else if (clicks > 1) {

    } else { 
        $('#pdf-root').hide('.redaction-footer.rotate-page-footer');
    }
};

var removeRotations = function(parent) {
    $('.redaction-footer.rotate-page-footer').hide();
    $('.page').removeClass('rotate-this-page');
    $('.rotate-page-content').hide();

    $('#changeDocument .page .page-counter.new button').attr('onclick', 'return rotateThisPage(this);').html('<span class="icon rotate"></span>Rotate page');
}

var triggerRotationActions = function(parent) {
    $('#confirmRotatePages').removeClass('rj-dont-display');
    $('.saving-panel-remove-rotate').show();
    $('.success-banner-remove-rotate, .govuk-modal-dialogue__close').hide();
    setTimeout(function(parent) {
        $('.saving-panel-remove-rotate').hide();
        $('.success-banner-remove-rotate, .govuk-modal-dialogue__close').show();
    }, 3000);
}

function closetriggerRotationActions() {
    $('#confirmRotatePages').addClass('rj-dont-display');

    $('.page').removeClass('rotate-this-page');
    $('.rotate-page-content').hide();
    $('#pdf-root .redaction-footer.rotate-page-footer').hide();
    $('#changeDocument .page .page-counter.new button').attr('onclick', 'return deleteThisPage(this), closeDiv(this), noRotate(this);').html('<span class="icon delete"></span>Delete');

}



$(document).ready(function () {


})

$(document).ready(function () {




})
