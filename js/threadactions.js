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

    $("#actions > button:first-child").click(toggleReplyBox);
    $(".thread-actions > a:nth-child(3)").click(toggleReplyBox);

    $("#close-btn").click(toggleShareActions);
    $(".thread-actions > a:nth-child(4)").click(toggleShareActions);

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
})