$(document).ready(function(){

    $('#username').keyup(function () {
        var usernameInput = $('#username').val();
        let query = {username: usernameInput};
        $.get('/checkUsername', query, function(result){
            if(result.username == usernameInput)
            {
                $('#errorReg').text("Username already taken");
                $('#username').css("background-color", "red");
                $('#reg-button').attr ("disabled", true);
            }
            else
            {
                $('#username').css("background-color", "#E3E3E3");
                $('#errorReg').text("");
                $('#reg-button').attr ("disabled", false);
            }
        })
    });
});