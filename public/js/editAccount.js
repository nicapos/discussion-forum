$(document).ready(function(){
    const username = $('nav > #profile-slot > #username').text();

    /* Buttons Setup */
    $('#view-profile').click( function() {
        location.href = '/user/' + username;
    });

    $('#delete-account').click( function() {
        const confirmationMsg = 'Are you sure you want to delete your account?\n(After confirmation, this action cannot be undone.)';
        if ( confirm(confirmationMsg) )
            location.href = '/delete';
    });

    /* Form Setup */
    $('#new_username').attr('placeholder', username);

    /* Change Username */
    $('#new_username').keyup(function () {
        if ( $('#new_username').val() == username ) {
            $('#msg1').text('New username must not be the same as the current username.');
            $('#change_username').addClass('disabled');
            $('#change_username').removeClass('green');
        } else if ( !$('#new_username').val() ) {
            $('#change_username').addClass('disabled');
            $('#change_username').removeClass('green');
        } else {
            $('#msg1').text('');
            $('#change_username').removeClass('disabled');
            $('#change_username').addClass('green');
        }
    });

    $('#change_username').click(function () {
        if (!this.hasClass('disabled')) {
            // TODO: Change username
        }
    });

    /* Change Password */
    $('#confirm_password').keyup(function () {
        if ( $('#new_password').val() != $('#confirm_password').val() ) {
            $('#msg2').text('The passwords do not match.');
            $('#change_password').addClass('disabled');
            $('#change_password').removeClass('green');
        } else {
            $('#msg2').text('');
            $('#change_password').removeClass('disabled');
            $('#change_password').addClass('green');
        }
    });

    $('#change_password').click(function () {
        if (!this.hasClass('disabled')) {
            // TODO: Change password
        }
    });
});