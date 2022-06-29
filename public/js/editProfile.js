$(document).ready(function(){ 

    /* Get initial values */
    const name = $('#name').val();
    const aboutMe = $('#edit-about').val();
    const myInterests = $('#edit-interests').val();

    function checkValuesChanged() {
        // Check if profile info has changed
        if ($('#name').val() == name && $('#edit-about').val() == aboutMe && $('#edit-interests').val() == myInterests) {
            $('#change_profile').addClass('disabled');
            $('#change_profile').removeClass('green');
        } else {
            $('#change_profile').addClass('green');
            $('#change_profile').removeClass('disabled');
        }
    }

    $('#name').keyup(checkValuesChanged);
    $('#edit-about').keyup(checkValuesChanged);
    $('#edit-interests').keyup(checkValuesChanged);

    $('#change_profile').click(function() {
        if (!$('#change_profile').hasClass('disabled')) {
            // TODO: Save changes
        }
    });

    /* buttons setup */
    $('#view-profile').click(function() {
        var username = $('.col h2').text();
        location.href = '/user/' + username;
    });

    $('#edit-account').click(function() {
        location.href = '/settings';
    });

    $('#cancel').click(function() {
        history.back() 
    });

});