const db = require('../models/db.js');
const Image = require('../models/ImageModel.js');

const imageController = {
    postUpload: function (req, res) {
        // req.file is the name of your file in the form above, here 'edit_profile_photo'
        // req.body will hold the text fields, if there were any 
        // console.log(req.file, req.body);
    
        var query = {
            name: req.file.originalname,
            contentType: req.file.mimetype,
            size: req.file.size,
            data: req.file.buffer
        };
    
        db.insertOne(Image, query, function(flag) {
            console.log('Flag: '+flag);
            res.send(flag);
        });
    },

    getImage: function (req, res) {
        var query = {name: req.params.name};
        var projection = "name contentType size data";

        db.findOne(Image, query, projection, function(result) {
            var imgData = JSON.parse(JSON.stringify(result));
            var buf = Buffer.from(imgData.data.data);

            /*var img = {
                name: imgData.name,
                contentType: imgData.contentType,
                data: buf.toString('base64')
            };
            res.render('image', img);*/
 
            res.writeHead(200, {
                'Content-Type': imgData.contentType,
                'Content-Length': imgData.size
            });
            res.end(buf);
        });
    }
}

module.exports = imageController;