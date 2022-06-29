/*
    defines an object which contains functions executed as callback
    when a client requests for `success` paths in the server
*/
const successController = {

    /*
        executed when the client sends an HTTP GET request `/success`
        as defined in `../routes/routes.js`
    */
    getSuccess: function (req, res) {

        /*
            when passing values using HTTP GET method
            the values are stored in the req.query object
            Example url: `http://localhost/success?fName=A&lName=B&idNum=123`
            To retrieve the value of parameter `fName`: req.query.fName
        */
        var details = {
            username: req.query.username,
        };

        // checks if a user is logged-in by checking the session data
        if(req.session.username) {

            /*
                sets `details.flag` to true
                to display the profile and logout tabs in the nav bar

                sets the value of `details.name` to `req.session.name`
                to display the name of the logged-in user
                in the profile tab of the nav bar

                sets the value of `details.uidNum` to `req.session.idNum`
                to provide the link the profile of the logged-in user
                in the profile tab of the nav bar

                these values are rendered in `../views/partials/header.hbs`
            */
            details.flag = true;
            details.username = req.session.username;
            res.redirect('/home');
        }

        // else if a user is not yet logged-in
        else
            /*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
            details.flag = false;

        // render `../views/success.hbs`
    }

}

/*
    exports the object `successController` (defined above)
    when another script exports from this file
*/
module.exports = successController;
