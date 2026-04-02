// ====================================================== Remove

function pageActions() {
    // var pageCount = $(this).attr("data-page");
    // $('.page-counter strong').text(pageCount);

    var $container = $('#changeDocument');
    if ($container.length === 0) {
        $container = $('#pdf-root');
    }

    setTimeout(function(parent) {
        $container.find('.page').append(`
            <div class="page-counter new">
                <p>Page: <span><span class="number">1</span>/<strong>2</strong></span></p>
                <button onclick="return deleteThisPage(this), closeDiv(this), noRotate(this);" class="delete-page"><span class="icon delete"></span>Delete</button>
            </div>
        `);

        const elements = document.querySelectorAll('.page-counter');
        const count = elements.length;
        $container.find('.page strong').html(count);

        $container.find('.page[data-page-number="1"] .page-counter.new .number').html('1');
        $container.find('.page[data-page-number="2"] .page-counter.new .number').html('2');
        $container.find('.page[data-page-number="3"] .page-counter.new .number').html('3');
        $container.find('.page[data-page-number="4"] .page-counter.new .number').html('4');
        $container.find('.page[data-page-number="5"] .page-counter.new .number').html('5');
        $container.find('.page[data-page-number="6"] .page-counter.new .number').html('6');

        // var pageNumber = $(parent).closest('.page').attr('data-page-number');
        // alert(pageNumber);

    }, 250);
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
    var $page = $(parent).closest('.page');
    var pageNumber = $page.attr('data-page-number');
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

    $page.addClass('delete-this-page');
    $page.append(pageAction);
}

function activateButton() {
    $('#confrim-delete-page-action').removeAttr('disabled').removeAttr('aria-disabled').removeClass('govuk-button--disabled').attr('onClick', 'return completeDelete(this)');
}

// let el_down = document.getElementById("gfg");

var completeDelete = function(parent) {
    $('.page-counter.new').show();
    var $page = $(parent).closest('.page');
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

    $page.find('.delete-page-action').hide();
    $page.find('.page-counter.new .delete-page').html('Cancel');
    $page.append(pageContent);

    if ($('.redaction-footer.delete-page-footer').length === 0) {
        $('#pdf-root').prepend(redactionFooter);
    } else {
        $('.redaction-footer.delete-page-footer').show();
    }

    var deletionReason = $('#delete-page-reason').val();
    var deletionReasonAnswer = "<li><b>1</b> - " + deletionReason +"</li>";
    $('#redaction-summary ul').append(deletionReasonAnswer);
}

var removeRedactions = function(parent) {
    $('.redaction-footer.delete-page-footer').hide();
    $('.page').removeClass('delete-this-page');

    $('div.Highlight, #marqueeTool, .AreaHighlight, .AreaHighlight__part').remove();

    var $btn = $('#changeDocument .page .page-counter.new button');
    if ($btn.length === 0) {
        $btn = $('#pdf-root .page .page-counter.new button');
    }
    $btn.attr('onclick', 'return deleteThisPage(this), closeDiv(this), noRotate(this)').html('<span class="icon delete"></span>Delete</button>');
}

var closeDeleteAction = function(parent) {
    $('.page-counter.new').show();
    var $page = $(parent).closest('.page');
    $page.removeClass('delete-this-page');
    $page.find('.delete-page-action').hide();
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
    var $container = $('#changeDocument');
    if ($container.length === 0) {
        $container = $('#pdf-root');
    }
    $container.find('.page strong').html(count);

    $container.find('.page[data-page-number="1"] .page-counter.new .number').html('1');
    $container.find('.page[data-page-number="2"] .page-counter.new .number').html('1');
    $container.find('.page[data-page-number="3"] .page-counter.new .number').html('2');
    $container.find('.page[data-page-number="4"] .page-counter.new .number').html('3');
    $container.find('.page[data-page-number="5"] .page-counter.new .number').html('4');
    $container.find('.page[data-page-number="6"] .page-counter.new .number').html('5');
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
    var $pages = $('.page-counter.new');
    if ($pages.length === 0) {
        $pages = $('#pdf-root .page-counter.new');
    }

    if ($pages.length === 0) {
        // alert("Please open a document before trying to rotate pages.");
        // Try to initialize page actions if they haven't been already
        pageActions();
        setTimeout(function() {
            var $pagesRetry = $('.page-counter.new');
            if ($pagesRetry.length === 0) {
                $pagesRetry = $('#pdf-root .page-counter.new');
            }

            if ($pagesRetry.length === 0) {
                alert("Please open a document before trying to rotate pages.");
            } else {
                $pagesRetry.find('button.delete-page').hide();
                $pagesRetry.append(rotateButton);
            }
        }, 300);
        return;
    }
    $pages.find('button.delete-page').hide();
    $pages.append(rotateButton);
}

// function closeDiv2(spn) {
//     spn.parentNode.style.display = "none";
// }

var rotateThisPage = function(parent) {
    var $page = $(parent).closest('.page');
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
            "<p style='margin-bottom: 10px;'>Click <strong>“save and submit”</strong> to submit changes to CMS</p>" +
            "<button id='' class='cancel-rotate-page non-button' data-module='govuk-button' type='button' onClick='return cancelRotate(this);'>Cancel</button>" +
        "</div>" +
    "</div>";

    $page.addClass('rotate-this-page');
    $page.append(pageRotateAction);
    $page.find('.page-counter.new .rotate-page').html('Cancel');
    $page.find('.page-counter.new .rotate-page').attr('onclick', 'return cancelRotate(this)');
}

var cancelRotate = function(parent) {
    var $page = $(parent).closest('.page');
    $page.removeClass('rotate-this-page');
    $page.find('.rotate-page-content').hide();
    $page.find('.page-counter.new .rotate-page').html('<span class="icon rotate"></span> Rotate page');
    $page.find('.page-counter.new .rotate-page').attr('onclick', 'return rotateThisPage(this)');
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
    if ($('.redaction-footer.rotate-page-footer').length === 0) {
        $('#pdf-root').prepend(rotationFooter);
    } else {
        $('.redaction-footer.rotate-page-footer').show();
    }
};

var removeRotations = function(parent) {
    $('.redaction-footer.rotate-page-footer').hide();
    $('.page').removeClass('rotate-this-page');
    $('.rotate-page-content').hide();

    var $btn = $('#changeDocument .page .page-counter.new button');
    if ($btn.length === 0) {
        $btn = $('#pdf-root .page .page-counter.new button');
    }
    $btn.attr('onclick', 'return rotateThisPage(this);').html('<span class="icon rotate"></span>Rotate page');
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

    var $btn = $('#changeDocument .page .page-counter.new button');
    if ($btn.length === 0) {
        $btn = $('#pdf-root .page .page-counter.new button');
    }
    $btn.attr('onclick', 'return deleteThisPage(this), closeDiv(this), noRotate(this);').html('<span class="icon delete"></span>Delete');
}



$(document).ready(function () {


})

$(document).ready(function () {




})
