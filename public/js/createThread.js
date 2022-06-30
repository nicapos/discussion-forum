$(document).ready(function () {
    $('#postThread').click(function(){
        //Gets data from editable content to textarea to send to POST request
        $("#bodyContent").val($("#content").text());
        $("#title").val($("#threadTitle").text());


        if($("#bodyContent").val() && $("#title").val()){
            $('form').submit();
        }
        else{
            //TODO Error
            $("#error").text("Please fill-up title and body");
        }
    });
});