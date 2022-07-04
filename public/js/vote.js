$(document).ready(function() {

    /*
        Store vote value as int from -1 to 1 where:
         1  Liked thread
         0  No vote
        -1  Disliked thread
    */
    var vote = 0;

    // Get initial value of vote
    if ( $('#like-btn').hasClass('active') )
        vote = 1;
    else if ( $('#dislike-btn').hasClass('active') )
        vote = -1;


    function toggleVoteBtns(vote) {
        switch (vote) {
            case 1: 
                $('#like-btn').addClass('active');
                $('#dislike-btn').removeClass('active');
                break;
            case -1:
                $('#dislike-btn').addClass('active');
                $('#like-btn').removeClass('active');
                break;
            default: // assumes vote == 0
                $('#like-btn').removeClass('active');
                $('#dislike-btn').removeClass('active');
        }
    }

    var threadURL = $('.thread > a').attr('href');
    var threadId = threadURL.split("/")[3];

    $('#like-btn').click(function() {

        if ( $('#like-btn').hasClass('active') ) {
            // Remove like vote
            $.post('/action/removeLike', {threadId: threadId}, function (data, status) {
                if (status)
                    toggleVoteBtns(0);
            });
        }
        else {
            // Add like vote
            $.post('/action/like', {threadId: threadId}, function (data, status) {
                if (status)
                    toggleVoteBtns(1);
            });
        }
        
    });

    $('#dislike-btn').click(function() {
        if ( $('#dislike-btn').hasClass('active') ) {
            // Remove dislike vote
            $.post('/action/removeDislike', {threadId: threadId}, function (data, status) {
                if (status)
                    toggleVoteBtns(0);
            });
        }
        else {
            // Add dislike vote
            $.post('/action/dislike', {threadId: threadId}, function (data, status) {
                if (status)
                    toggleVoteBtns(-1);
            });
        }
    
    });

});