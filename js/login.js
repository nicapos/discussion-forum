$(document).ready(function(){
    $("#login-btn").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();

        var home =""
        var valid = 1;
        
        if(username == "fdoble" && password == "hello123")
            home = "home.html"; 
        else if(username == "annika1" && password == "password2")
            home = "home2.html"
        else if(username == "julia2" && password == "bye12")
            home = "home3.html";
        else if(username == "charlie1" && password == "woof")
            home = "home4.html";
        else if(username == "admin" && password == "1234")
            home = "home5.html";  

        else{
            valid = 0;
            $("input").css({"border-color":"red"});
            $("#error").text("Username or Password is incorrect.");
        }

        if(valid == 1)
        {
            $("#login-form").attr('action',home)
            $("#login-form").submit();
        }
    })
});