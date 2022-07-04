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

    $('#like-btn').click(function() {
        // 1. Update UI
       toggleVoteBtns( $('#like-btn').hasClass('active') ? 0 : 1 );

        // 2. Update model
        // TODO
    });

    $('#dislike-btn').click(function() {
        // 1. Update UI
       toggleVoteBtns( $('#dislike-btn').hasClass('active') ? 0 : -1 );

        // 2. Update model
        // TODO
    });

});