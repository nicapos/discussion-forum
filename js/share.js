
const currentURL = window.location.href;
const sampleURL = "http://google.com"

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

function shareToTwitter() {
    twtForm.submit();
}

/* add form with params for "share to facebook" */
const fbForm = document.createElement("form");
fbForm.action = "https://www.facebook.com/sharer.php";

const fbURL = document.createElement("input");
fbURL.type = "hidden";
fbURL.name = "u";
fbURL.value = sampleURL;

fbForm.appendChild(fbURL);
document.getElementById("fb-share").insertAdjacentElement("beforebegin", fbForm);

function shareToFacebook() {
    fbForm.submit();
}