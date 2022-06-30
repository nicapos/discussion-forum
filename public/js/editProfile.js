$(document).ready(function(){ 

    /* Get initial values */
    const name = $('#name').val();
    const aboutMe = $('#edit-about').val();
    const myInterests = $('#edit-interests').val();

    function checkValuesChanged() {
        // Check if profile info has changed
        if ($('#edit-name').val() == name && $('#edit-about').val() == aboutMe && $('#edit-interests').val() == myInterests) {
            $('#change_profile').prop("disabled", true);
        } else {
            $('#change_profile').prop("disabled", false);
        }
    }

    $('#edit-name').keyup(checkValuesChanged);
    $('#edit-about').keyup(checkValuesChanged);
    $('#edit-interests').keyup(checkValuesChanged);

    /* asynchronously update profile */
    $('#change_profile').click(function() {
        var query = {
            name: $('#edit-name').val(),
            bio: $('#edit-about').val(),
            interests: $('#edit-interests').val()
        };

        $.post(location.href, query, function(data, status){
            if (status) {
                // Saved changes
                $('#change_profile').prop("disabled", true);
            }
        });
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