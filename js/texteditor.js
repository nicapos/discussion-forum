function createLink() {
    var url = prompt("Enter URL");
    if (url.includes("http://") || url.includes("https://")) {
        document.execCommand("createLink", false, url);
    } else {
        document.execCommand("createLink", false, "http://" + url);
    }
    updateAnchors();
}

function changeColor() {
    var colorHex = prompt("Enter color (in hex form)");
    document.execCommand('styleWithCSS', false, true);
    document.execCommand("foreColor", false, colorHex);
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