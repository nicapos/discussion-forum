$(document).ready(function(){
    $("#login-btn").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();

        $.get('/checkUsername', {username: username}, function(result){
            if(result.username == username && result.password == password)
            {
                console.log('success');
                $("#login-form").attr('action','/home')
                $("#login-form").submit();
            }
            else
            {
                $("#login-error").text("Username or Password does not match");
            }
        })
    })
});