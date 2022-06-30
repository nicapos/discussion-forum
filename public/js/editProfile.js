$(document).ready(function(){ 

    /* Get initial values */
    const username = $('.col h2').text();
    const name = $('#name').val();
    const aboutMe = $('#edit-about').val();
    const myInterests = $('#edit-interests').val();

    function checkValuesChanged() {
        // Remove msg text (if any)
        $('#msg').text('');

        // Check if profile info has changed
        if ($('#edit-name').val() == name && $('#edit-about').val() == aboutMe && $('#edit-interests').val() == myInterests)
            $('#change_profile').prop("disabled", true);
        else
            $('#change_profile').prop("disabled", false);
    }

    $('#edit-name').keyup(checkValuesChanged);
    $('#edit-about').keyup(checkValuesChanged);
    $('#edit-interests').keyup(checkValuesChanged);

    /* asynchronously update profile */
    $('#change_profile').click(function() {
        var query = {
            name: $('#edit-name').val(),
            bio: $('#edit-about').text(),
            interests: $('#edit-interests').text()
        };

        $.post(location.href, query, function(data, status){
            if (status) {
                // Saved changes
                $('#change_profile').prop('disabled', true);
                $('#msg').text('Your changes have been saved.');
            }
        });
    });

    /* buttons setup */
    $('#view-profile').click(function() {
        location.href = '/user/' + username;
    });

    $('#edit-account').click(function() {
        location.href = '/settings';
    });

    $('#cancel').click(function() {
        location.href = '/user/' + username;
    });

});