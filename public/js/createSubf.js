$(document).ready(function(){

    $('#title').keyup(function () {
        var title = $('#title').val();
        var subforumName = title.trim().toLowerCase().replaceAll(' ','-');

        let query = {
            subforumName: subforumName
        };

        $.get('/checkSubforum', query, function(result){
            if(result.subforumName == subforumName){
                $('#submitSubforum').attr ("disabled", true);
                $('#error').text('Subforum Title is taken');
            }
            else{
                $('#submitSubforum').attr ("disabled", false);
                $('#error').text("");
            }
        })
    });

    $('#actions .light').click( function() {
        history.back() 
    });
    $('#actions .green').click( function() {
        $('form').submit() 
    });

});