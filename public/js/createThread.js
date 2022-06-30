$(document).ready(function () {

    //TODO Get subforum name from URL
    $('#postThread').click(function(){
        console.log(location.href);
        $.post(location.href, {subforumName: "lol"}, function(data, status){
            if(status){
                //Message posted

                window.location.href = '/home'; //use subforum view route
                console.log('redirected');
            }
        });
    })
});