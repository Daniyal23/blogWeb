
var Busboy = require("busboy");
var path = require("path");
var fs = require("fs");
var sha1 = require("sha1");

function delet(req, callback) {
    //console.log("in delete folder");
    fs.unlink("./assets/" + req.file.filename, (err) => {
        if (err) {
            // console.log("failed to delete local image:" + err);
        } else {
            //console.log('successfully deleted local image');
        }
    });
}
module.exports = delet;