const db = require('../models/db.js');
const Image = require('../models/ImageModel.js');

const imageController = {
    postUpload: function (req, res) {
        var user = req.session.username;

        // Check if profile img exists for user
        db.findOne(Image, {name: user}, null, function(exists){
            if (exists) {
                var query = {
                    $set: {
                        "contentType": req.file.mimetype,
                        "size": req.file.size,
                        "data": req.file.buffer
                    }
                };

                db.updateOne(Image, {name: user}, query, function(flag) {
                    //res.send(flag);
                });
            } else {
                var query = {
                    name: user,
                    contentType: req.file.mimetype,
                    size: req.file.size,
                    data: req.file.buffer
                };

                db.insertOne(Image, query, function(flag) {
                    res.send(flag);
                });
            }
        })
    },

    getImage: function (req, res) {
        var query = {name: req.params.name};
        var projection = "name contentType size data";

        db.findOne(Image, query, projection, function(result) {
            if (result) {
                var imgData = JSON.parse(JSON.stringify(result));
                var buf = Buffer.from(imgData.data.data);
    
                res.writeHead(200, {
                    'Content-Type': imgData.contentType,
                    'Content-Length': imgData.size
                });
                res.end(buf);
            } else {
                res.redirect('/resources/unknown.jpeg')
            }
        });
    }
}

module.exports = imageController;