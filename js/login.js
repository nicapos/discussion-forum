$(document).ready(function(){
    $("#login-btn").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        
        if(username == "charlie" && password == "hello123")
        {
            $("#login-form").attr('action','home.html')
            $("#login-form").submit();
        }
        else{
            $("input").css({"border-color":"red"});
            $("#error").text("Username or Password is incorrect.");
        }

        
    })
});