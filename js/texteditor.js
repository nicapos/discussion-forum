function createLink() {
    var url = prompt("Enter URL");
    document.execCommand("createLink", false, url);
    updateAnchors();
}

function setInfoText(msg) {
    var infoTxt = document.getElementById("info-text");
    infoTxt.textContent = msg;
}

function clearInfoText() {
    var infoTxt = document.getElementById("info-text");
    infoTxt.innerHTML = "&nbsp;";
}

/* Show link as info text when hovering over anchor in editor */
function updateAnchors() {
    var editor = document.getElementById("editor");
    var anchors = editor.getElementsByTagName("a");

    for (let i = 0; i < anchors.length; i++) {
        anchors[i].onmouseover = function() {
            setInfoText(anchors[i].href);
        };
        anchors[i].onmouseout = function() {
            clearInfoText();
        };
    }
}