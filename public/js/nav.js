$(document).ready(function() {

    var bOpenNav = false;
    var bShowSubitems = false;

    function toggleNav() {
        if (bShowSubitems)
            toggleSubitems();

        bOpenNav = !bOpenNav;
        $("nav").css("width", bOpenNav ? "200px" : "60px");
        $("#profile-img").css({
            "width": bOpenNav ? "50px" : "35px",
            "height": bOpenNav ? "50px" : "35px"
        });
    }

    function toggleSubitems() {
        if (!bOpenNav)
            toggleNav();

        bShowSubitems = !bShowSubitems;
        $('#createSubf').css("display", (bShowSubitems ? "block" : "none"));
        $('#searchSubf').css("display", (bShowSubitems ? "block" : "none"));
    }

    function toggleProfile() {
        if (!bOpenNav)
            toggleNav();
        else {
            var username = $('#profile-slot #username').text();
            location.href = '/user/' + username;
        }
    }

    $("nav > button").click(toggleNav);
    $("#nav-grp").click(toggleSubitems);
    $("nav img").click(toggleProfile);
})
