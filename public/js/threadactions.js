$(document).ready(function() {

    /* toggle hidden elements */
    var bShowReply = false;
    var bShowShares = false;

    function toggleReplyBox() {
        bShowReply = !bShowReply;
        $("#text-editor").css("display", bShowReply ? "block" : "none");
        $("#replies").css("paddingTop", bShowReply ? "25px" : "0");
    }

    function toggleShareActions() {
        bShowShares = !bShowShares;
        $("#share-actions").css("display", bShowShares ? "block" : "none");
    }

    $("#actions > .light").click(toggleReplyBox);
    $("#reply-btn").click(toggleReplyBox);

    $("#close-btn").click(toggleShareActions);
    $("#share-btn").click(toggleShareActions);

    /* for share actions */
    const currentURL = window.location.href;

    $("#link").html(currentURL); // add current url to Share > Copy Link

    // for Twitter
    const twtForm = $("<form></form>").attr("action", "https://twitter.com/intent/tweet");

    twtForm.append( /* tweet content */
        $("<input>").attr({
            "type": "hidden",
            "name": "text",
            "value": "Check out this thread from discussiq!"
        })
    );

    twtForm.append( /* tweet share URL */
        $("<input>").attr({
            "type": "hidden",
            "name": "text",
            "value": currentURL
        })
    );

    twtForm.insertBefore("#twitter-share");
    $("#twitter-share").click(function() {
        twtForm.submit()
    });

    // for Facebook
    const fbForm = $("<form></form>").attr("action", "https://www.facebook.com/sharer.php");

    fbForm.append( /* fb share URL */
        $("<input>").attr({
            "type": "hidden",
            "name": "u",
            "value": currentURL
        })
    );

    fbForm.insertBefore("#fb-share");
    $("#fb-share").click(function() {
        fbForm.submit()
    });

    // for Email
    const mailForm = $("<form></form>").attr("action", "mailto:");

    mailForm.append(
        $("<input>").attr({
            "type": "hidden",
            "name": "body",
            "value": currentURL
        })
    );

    fbForm.insertBefore("#mail-share");
    $("#mail-share").click(function() {
        fbForm.submit()
    });

    $('#postReply').click(function(){
        $('#reply').val($('#content').text());

        if($('#reply').val() != ""){
            $('form').submit();
        }
    })

    $('#content').keyup(function(){
        if($('#content').text() == "")
            $('#postReply').prop("disabled", true);
        else
            $('#postReply').prop("disabled", false);
        console.log($('#content').text());
    })
})
