$(document).ready(function(){

    $('#title').keyup(function () {
        var subfTitle = $('#title').val();

        // TODO: Check if subf exists na
    });

    $('#actions .light').click( function() {
        history.back() 
    });
    $('#actions .green').click( function() {
        $('form').submit() 
    });

});