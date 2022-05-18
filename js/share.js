
const currentURL = window.location.href;

/* add current url to share -> copy link */
document.getElementById("link").innerHTML = currentURL;

/* add form with params for "share to twitter" */
const twtForm = document.createElement("form");
twtForm.action = "https://twitter.com/intent/tweet";

const twtMsg = document.createElement("input");
twtMsg.type = "hidden";
twtMsg.name = "text";
twtMsg.value = "Check out this thread from <Forum Name>!"; // temporary msg, pls change if u know an alternative HAHAHA

const twtURL = document.createElement("input");
twtURL.type = "hidden";
twtURL.name = "url";
twtURL.value = currentURL;

twtForm.appendChild(twtMsg);
twtForm.appendChild(twtURL);
document.getElementById("twitter-share").insertAdjacentElement("beforebegin", twtForm);

/*
    OUTPUT:
    <form id="twitter-share" action="https://twitter.com/intent/tweet">
        <input type="hidden" name="text" value="Check out this thread from ForumName!" />
        <input type="hidden" name="url" value="" />
    </form>
*/

function shareToTwitter() {
    twtForm.submit();
}