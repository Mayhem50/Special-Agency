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
    
    router.get('/chats/:role/:id', jwtauth, function (req, res) {
        if (req.params.role == 'sponsor') {
            Chat.find({ '_sponsor' : req.params.id }).populate('_mission').populate('_agent').exec(function (err, chats) {
                if (err) { return res.sendStatus(500); }                
                if (!chats) { return res.sendStatus(500); }
                return res.json({
                    result: chats,
                    method: 'GET',
                    success : true
                });
            });
        }
        if (req.params.role == 'agent') {
            Chat.find({ '_agent' : req.params.id }).populate('_mission').populate('_sponsor').exec(function (err, chats) {
                if (err) { return res.sendStatus(500); }                
                if (!chats) { return res.sendStatus(500); }
                return res.json({
                    result: chats,
                    method: 'GET',
                    success : true
                });
            });
        }
    });
    
    return router;
}