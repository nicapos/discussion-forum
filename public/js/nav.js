function toggleNav(bOpen) {
    if (bOpen) {
        document.getElementsByTagName("nav")[0].style.width = "200px";
        document.getElementById("profile-img").style.width = "50px";
        document.getElementById("profile-img").style.height = "50px";

        document.querySelector("nav > button").setAttribute("onclick", "toggleNav(false)");
    } else {
        document.getElementsByTagName("nav")[0].style.width = "60px";
        document.getElementById("profile-img").style.width = "35px";
        document.getElementById("profile-img").style.height = "35px";

        document.querySelector("nav > button").setAttribute("onclick", "toggleNav(true)");
    }
}

/* Makes subitems visible if bVisible = true */
function toggleSubitems(bVisible) {
    const subitems = document.querySelectorAll("#nav-grp > a:not(:first-child)");
    for (let i = 0; i < subitems.length; i++) {
        if (bVisible)
            subitems[i].style.display = "block";
        else
            subitems[i].style.display = "none";
    }
}
