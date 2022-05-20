$(document).ready(function(){
    $("#login-btn").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        if(username == "fdoble" && password == "hello123")
            $("#Register").submit();
        else{
            $("input").css({"border-color":"red"});
            $("#error").text("Username or Password is incorrect.");
        }
    })
});