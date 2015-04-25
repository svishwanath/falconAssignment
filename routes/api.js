var express = require('express');
var router = express.Router();
var PublishModel = require('../jsonblob_data/PublishModel');
var publishData = require('../jsonblob_data/publishData');
var graphData = require('../jsonblob_data/reachData');
var socketio = require("socket.io");

router.socket = null; 
router.socketServer = function(server){
    router.io = socketio.listen(server);
};
router.use(function(req, res, next) {
    next();
});

/* API */

router.route('/publish')
     .get(function(req, res) {
        res.json({response:publishData, status:"OK"});
    })
	   .post(function(req, res) {
        var publish = new PublishModel(req.body);         publish.save();
        router.io.sockets.emit('newPublish',req.body);
        res.json({responde: 'publish created', status:"OK"});

    });

router.route('/publish/:publish_id')
    .get(function(req, res) {
        var idPublish = req.params.publish_id;
        var response = [];
        var i;
        for(i = 0; i < publishData.length; i++){
            if(publishData[i].id == idPublish) {
                response = publishData[i];
            }
        }
        res.json({response:response, status: "OK"});
    })
    .put(function(req, res) {
        var idPublish = req.params.publish_id;
        for(i = 0; i < publishData.length; i++){
            if(publishData[i].id == idPublish) {
                publishData[i] = req.body;
                res.json({reponse:"Update item", status:"OK"});
                return;
            }
        }
        res.json({reponse:"error", status:"fail"});
        //Change publish with the req.body
    })
    .delete(function(req, res){
        var idPublish = req.params.publish_id;
        var i;
        for(i = 0; i < publishData.length; i++){
            if(publishData[i].id == idPublish) {
                publishData.splice(i,1);
                response = "Element with id: " + idPublish + " deleted";
            }
        }

        res.json({response:response, status: "OK"});
    });

router.route('/graph')
    .get(function(req, res) {
        res.json({response:graphData, status:"OK"});
    })
    .post(function(req, res) {

        var saveObj = {};
        saveObj[req.body.typePost] = [{ "timestamp": req.body.time, "value":req.body.value}];

        graphData.push(saveObj);

        router.io.sockets.emit('newGraphValue',graphData);
        res.json({responde: 'publish created', status:"OK"});
    });
module.exports = router;
