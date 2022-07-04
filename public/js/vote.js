$(document).ready(function() {

    /* async vote updates */
    const threadURL = $('.thread > a').attr('href');
    const threadId = threadURL.split("/")[3];

    function addLike() {
        $.post('/action/like', {threadId: threadId}, function (data, status) {
            if (status) {
                // update button
                $('#like-btn').addClass('active');

                // update vote count
                let voteCount = parseInt( $('#votes').text() );
                $('#votes').text(voteCount + 1);
            }
        });
    }

    function removeLike() {
        $.post('/action/removeLike', {threadId: threadId}, function (data, status) {
            if (status) {
                // update button
                $('#like-btn').removeClass('active');

                // update vote count
                let voteCount = parseInt( $('#votes').text() );
                $('#votes').text(voteCount - 1);
            }
        });
    }

    function addDislike() {
        $.post('/action/dislike', {threadId: threadId}, function (data, status) {
            if (status) {
                // update button
                $('#dislike-btn').addClass('active');

                // update vote count
                let voteCount = parseInt( $('#votes').text() );
                $('#votes').text(voteCount - 1);
            }
        });
    }

    function removeDislike() {
        $.post('/action/removeDislike', {threadId: threadId}, function (data, status) {
            if (status) {
                // update button
                $('#dislike-btn').removeClass('active');

                // update vote count
                let voteCount = parseInt( $('#votes').text() );
                $('#votes').text(voteCount + 1);
            }
        });
    }

    /* add btn onclicks */
    $('#like-btn').click(function() {

        if ( $('#like-btn').hasClass('active') )
            removeLike();
        else if ( $('#dislike-btn').hasClass('active') )
            removeDislike();
        else
            addLike();

    });

    $('#dislike-btn').click(function() {

        if ( $('#dislike-btn').hasClass('active') )
            removeDislike();
        else if ( $('#like-btn').hasClass('active') )
            removeLike();
        else
            addDislike();
            
    });

});