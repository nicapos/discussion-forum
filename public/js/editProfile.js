$(document).ready(function(){ 

    /* Get initial values */
    const username = $('.col h2').text();
    const name = $('#name').val();
    const aboutMe = $('#edit-about').text();
    const myInterests = $('#edit-interests').text();
    const profileImg = $('#profile-picture').attr('src');

    function activateSubmit(bool) {
        $('#change_profile').prop("disabled", !bool);
        $('#reset').css('display', bool ? 'block' : 'none');
        $('#cancel').css('display', bool ? 'none' : 'block');
    }

    function checkValuesChanged() {
        // Remove msg text (if any)
        $('#msg').text('');

        // Check if profile info has changed
        if (
            $('#edit-name').val() == name && 
            $('#edit-about').text() == aboutMe && 
            $('#edit-interests').text() == myInterests && 
            $('#profile-picture').attr('src') == profileImg
        )
            activateSubmit(false);
        else
            activateSubmit(true);
    }

    /* Show preview of new profile image */
    function readURL(input) {
        if (input.files && input.files[0]) {
            var fr = new FileReader();
    
            fr.onload = function (e) {
                $('#profile-picture').attr('src', e.target.result);
            }
    
            fr.readAsDataURL(input.files[0]);
        }
    }

    $('#edit-name').keyup(checkValuesChanged);
    $('#edit-about').keyup(checkValuesChanged);
    $('#edit-interests').keyup(checkValuesChanged);
    $("#edit-profile-photo").change(function() {
        // Validate uploaded file
        if ( $("#edit-profile-photo")[0].size >= 16777216 ) {
            $('#msg').css('color', 'red');
            $('#msg').text('File exceeds 16 MB.');
            activateSubmit(false);
        } else {
            $('#msg').css('color', 'grey');
            $('#msg').text('');
            activateSubmit(true);

            checkValuesChanged();
            readURL(this);  // Show preview of profile
        }
    });

    /* asynchronously update profile */
    $('#change_profile').click(function() {
        // #1: Update changes to name, bio, and interests
        var query = {
            name: $('#edit-name').val(),
            bio: $('#edit-about').text(),
            interests: $('#edit-interests').text()
        };

        $.post(location.href, query, function(data, status){
            if (status) {
                // #2: Update changes to profile picture, if any
                if ($('#profile-picture').attr('src') != profileImg) {
                    var imgData = new FormData($('#img_form')[0]);
            
                    $.ajax( {
                        url: '/uploadImg',
                        type: 'POST',
                        data: imgData,
                        processData: false,
                        contentType: false
                    } );

                    // Saved changes
                    let newProfileImg = $('#profile-picture').attr('src');
                    $('nav #profile-img').attr('src', newProfileImg);
                }

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

    $('#reset').click(function() {
        $('#name').val(name);
        $('#edit-about').text(aboutMe);
        $('#edit-interests').text(myInterests);
        $('#profile-picture').attr('src', profileImg);

        activateSubmit(false);
    });

});