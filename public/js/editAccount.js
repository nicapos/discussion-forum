$(document).ready(function(){

    /* Buttons Setup */
    $('#view-profile').click( function() {
        let username = $('nav > #profile-slot > #username').text();
        location.href = '/user/' + username;
    });

    $('#delete-account').click( function() {
        const confirmationMsg = 'Are you sure you want to delete your account?\n(After confirmation, this action cannot be undone.)';
        if ( confirm(confirmationMsg) )
            location.href = '/delete';
    });

    /* Fill 'name' with 'username' if 'name' is blank */
    if ( !$('.col > h1').text() ) {
        let username = $('nav > #profile-slot > #username').text();
        $('.col > h1').text(username);
    }
    
    /* Form Setup */
    let username = $('nav > #profile-slot > #username').text();
    $('#new_username').attr('placeholder', username);

    /* Change Username */
    $('#new_username').keyup(function () {
        var newUsername = $('#new_username').val();
        let query = {username: newUsername};
        const regexp = /^[a-zA-Z0-9_]+$/;

        $('#msg1').css('color', 'red');

        if ( !$('#new_username').val() || $('#new_username').val() == '' )
            $('#change-username').prop("disabled", true);
        else
            $.get('/checkUsername', query, function(result){
                if (result.username == newUsername) {
                    $('#msg1').text('New username is taken');
                    $('#change_username').prop("disabled", true);
                }
                else {
                    let username = $('nav > #profile-slot > #username').text();
                    if ( $('#new_username').val() == username ) {
                        $('#msg1').text('New username must not be the same as the current username.');
                        $('#change_username').prop("disabled", true);

                    } else if ( $('#new_username').val().search(regexp) == -1 ) {
                        $('#msg1').text('Only alphanumeric characters and underscores (_) are accepted.');
                        $('#change_username').prop("disabled", true);

                    }
                    else {  // Passed all checks, is a valid username.
                        $('#msg1').text('');
                        $('#change_username').prop("disabled", false);
                    }
                }
            });
    });

    $('#change_username').click(function() {
        var newUsername = $('#new_username').val();

        $.post(location.href, {newUsername: newUsername}, function(data, status){
            if (status) {
                // Change usernames displayed
                $('nav > #profile-slot > #username').text(newUsername);
                $('.profile-box h2').text(newUsername);

                // Saved changes
                $('#change_username').prop('disabled', true);
                $('#msg1').text('Your changes have been saved.');
                $('#msg1').css('color', 'grey');
            }
        });
    });


    /* Change Password */
    $('#confirm_password').keyup(function () {
        if ( $('#new_password').val() != $('#confirm_password').val() ) {
            $('#msg2').text('The passwords do not match.');
            $('#change_username').attr("disabled", true);
        } else {
            $('#msg2').text('');
            $('#change_username').attr("disabled", false);
        }
    });

});