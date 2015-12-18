var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var Chat = require('../models/chat');
var Mission = require('../models/mission');
var Kind = require('../models/kind');

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
    
    router.get('/chats/:id', jwtauth, function (req, res) {
        Chat.find({ $or : [{ '_sponsor' : req.params.id }, { '_agent' : req.params.id }] }, function (err, chats) {
            if (err) { return res.sendStatus(500); }

            return res.json({
                result: chats,
                method: 'GET',
                success : true
            });
        });
    });
    
    router.get('/chats/:mission/:id', jwtauth, function (req, res) {
        Chat.findOne({ '_mission' : req.params.mission, '_agent' : req.params.id }, function (err, chat) {
            if (err) { return res.sendStatus(500); }
            if (!chat) { return res.sendStatus(500); }
            
            return res.json({
                result: chat,
                method: 'GET',
                success : true
            });
        });
    });
    
    return router;
}