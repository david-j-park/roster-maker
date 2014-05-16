/**
 * Data access routes
 */

var mongoose = require('mongoose'), Schema = mongoose.Schema();

module.exports = function(dburl){
	
	var player = new Schema({
		firstName: String,
		lastName: String,
		parent: String,
		notes: String,
		number: number
	});
	
	var Team = mongoose.model('Team', {
		name: String,
		players: [player]
	});
	
	var Game = mongoose.model('Game', {
		team: {ref: 'Team'},
		opponent: String,
		date: Date,
		lineup: [player],
		innings: []
	});
	
	var db = mongoose.connect(dburl);
	db.once('connect', function(){ console.log('Connected to Mongo');})
	
	return {
		
	}
}