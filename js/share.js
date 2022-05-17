
const currentURL = window.location.href;
const copyLinkBox = document.getElementById("link");

copyLinkBox.innerHTML = currentURL;
document.getElementById("url").value = currentURL;

function shareToTwitter() {
    document.getElementById("twitter-share").submit();
}