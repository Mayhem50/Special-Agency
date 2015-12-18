var mongoose = require('mongoose');

var FavoriteMission = mongoose.Schema({
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    _mission : { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }
});

module.exports = mongoose.model(
    'Favorite-Mission', FavoriteMission
);
