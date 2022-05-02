/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementsByTagName("nav")[0].style.width = "200px";
    document.getElementsByTagName("button")[0].style.display = "none";
    document.getElementsByTagName("button")[1].style.display = "block";

    /* change profile image size */
    document.getElementById("profile-img").style.width = "50px";
    document.getElementById("profile-img").style.height = "50px";
}

function closeNav() {
    document.getElementsByTagName("nav")[0].style.width = "60px";
    document.getElementsByTagName("button")[0].style.display = "block";
    document.getElementsByTagName("button")[1].style.display = "none";

    /* change profile image size */
    document.getElementById("profile-img").style.width = "35px";
    document.getElementById("profile-img").style.height = "35px";
}