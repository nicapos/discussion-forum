$(document).ready(function(){

    $('#edit-btn').click(function () {
        location.href = location.href + '/edit';
    });

    /* Fill 'name' with 'username' if 'name' is blank */
    if ( !$('.col > h1').text() ) {
        var username = $('.col > h2').text();
        $('.col > h1').text(username);
    }

    /* Fill 'About Me' if empty */
    if ( !$('#about-me').text() ) {
        const placeholder = 'This user hasn\'t added their description.';
        $('#about-me').text(placeholder);
        $('#about-me').css({
            'color': 'grey',
            'font-style': 'italics'
        });
    }

    /* Fill 'My Interests' if empty */
    if ( !$('#my-interests').text() ) {
        const placeholder = 'This user hasn\'t added their interests.';
        $('#my-interests').text(placeholder);
        $('#my-interests').css({
            'color': 'grey',
            'font-style': 'italics'
        });
    }

});