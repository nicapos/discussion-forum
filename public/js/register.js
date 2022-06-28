
$(document).ready(function(){

    $('#username').keyup(function () {
        // your code here
        var usernameInput = $('#username').val();
        let query = {username: usernameInput};
        $.get('/checkUsername', query, function(result){
            if(result.username == usernameInput)
            {
                $('#errorReg').text("Reference number already in the database");
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
    
    $('#reg-button').click(function (){
        console.log('clicked');
        var username = $('#username').val();
        var email = $('#email').val();
        var pw = $('#password').val();
        var confirmPw= $('#cpw').val();

        if(username != "" && email != "" && pw != "" && confirmPw != "")
        {
            if(pw != confirmPw)
            {
                $('#errorReg').text("Password do not match");
                $('#password').css("background-color", "red");
                $('#cpw').css("background-color", "red");
            }
            else{
                let query = {username: username, email: email, password: pw};   
                $.get('/addUser', query);
                $('#password').css("background-color", "#E3E3E3");
                $('#cpw').css("background-color", "#E3E3E3");
                $('#errorReg').text("");
                $("#register-form").attr('action','/login')
                $("#register-form").submit();            }
        }
    })
});