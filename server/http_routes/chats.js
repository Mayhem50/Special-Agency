var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var Chat = require('../models/chat');
var Mission = require('../models/mission');

var router = express.Router();

module.exports = function () {
    router.post('/chats', jwtauth, function (req, res) {
        console.log('Create a chat');
        console.log(req.query.chat);
        
        var chat = new Chat(req.body.chat);
        
        chat.save(function (err) {
            if (err) {
                console.log('Error in Saving chat: ' + err);
                throw err;
            }
        });
        
        res.json({
            method : 'POST',
            success: true
        });
    });
    
    router.get('/chats:data', function (req, res) {
        Chat.find({ '_mission' : req.params.data.mission, '_sponsor' : req.params.data.user }, function (err, chats) {
            if (err) { return res.sendStatus(500); }
            
            if (!conversations) {
                Chat.find({ '_mission' : req.params.data.mission, '_agent' : req.params.data.user }, function (err, chats) {
                    if (err) { return res.sendStatus(500); }

                    return res.json({
                        'chats': chats,
                        method: 'POST',
                        success : true
                    });
                });
            }
            
            return res.json({
                'chats': chats,
                method: 'POST',
                success : true
            });
        });
    });
    
    return router;
}