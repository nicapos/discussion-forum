$(document).ready(function(){

    $('#username').keyup(function () {
        var usernameInput = $('#username').val();
        let query = {username: usernameInput};
        $.get('/checkUsername', query, function(result){
            if(result.username == usernameInput)
            {
                $('#errorReg').text("Username already taken");
                $('#username').css("border", "2px solid red");
                $('#reg-button').attr ("disabled", true);
            }
            else
            {
                $('#username').css("border", "1px solid #E3E3E3");
                $('#errorReg').text("");
                $('#reg-button').attr ("disabled", false);
            }
        })
    });

    $('#cpw').keyup(function () {
        if ( $('#password').val() != $('#cpw').val() ) {
            $('#errorReg').text("Passwords do not match");
            $('#password').css("border", "2px solid red");
            $('#cpw').css("border", "2px solid red");
            $('#reg-button').attr ("disabled", true);
        } else {
            $('#errorReg').text("");
            $('#password').css("border", "1px solid #E3E3E3");
            $('#cpw').css("border", "1px solid #E3E3E3");
            $('#reg-button').attr ("disabled", false);
        }
    });
});