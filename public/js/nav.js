$(document).ready(function() {

    var bOpenNav = false;
    var bShowSubitems = false;

    function toggleNav() {
        bOpenNav = !bOpenNav;
        $("nav").css("width", bOpenNav ? "200px" : "60px");
        $("#profile-img").css({
            "width": bOpenNav ? "50px" : "35px",
            "height": bOpenNav ? "50px" : "35px"
        });
    }

    function toggleSubitems() {
        bShowSubitems = !bShowSubitems;
        $('#createSubf').css("display", (bShowSubitems ? "block" : "none"));
        $('#searchSubf').css("display", (bShowSubitems ? "block" : "none"));
    } 

    $("nav > button").click(toggleNav);
    $("#nav-grp").click(toggleSubitems);
})
