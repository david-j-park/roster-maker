/**
 * Data access routes
 */

var mongoose = require('mongoose'), Schema = mongoose.Schema;

module.exports = function(dburl){
	
	var player = new Schema({
		firstName: String,
		lastName: String,
		parent: String,
		notes: String,
		number: Number
	});
	
	var inning = new Schema({
		positions: [String]
	});
	
	var Team = mongoose.model('Team', {
		name: String,
		players: [player]
	});
	
	var Game = mongoose.model('Game', {
		team: {type: Schema.Types.ObjectId, ref: 'Team'},
		opponent: String,
		date: Date,
		lineup: [player],
		innings: [inning]
	});
	
	mongoose.connect(dburl);
	var db = mongoose.connection;
	db.once('connect', function(){ console.log('Connected to Mongo');})
	
	return {
		savePlayer: function(team, player, cb){
			Team.findOne({"_id": team._id}, function(err, t){
				if (!t) throw new Error('Team not found!');
				if (err) throw err;
				var p = t.players.id(player._id);
				if (!p) t.players.push(player);
				else {
					for (var x in player){
						p[x] = player[x];
					}
				}
				t.save(function(err, result){
					return cb(err || p);
				});
			});
		},
		saveTeam: function(team, cb){
			Team.findOne({"_id": team._id}, function(err, t){
				if (!t) t = new Team(team);
				t.save(function(err, data){
					if (err) console.log(err);
					cb(err || data);
				})
			});
		},
		deleteTeam: function(team, cb){
			Team.remove(team, function(err, result){
				cb(err || result);
			});
		},
		saveGame: function(game, cb){
			Game.findOne({_id: game._id}, function(err, g){
				if (!g) g = new Game(game);
				else {
					for (var x in game){
						g[x] = game[x];
					}
				}
				g.save(function(err, data){
					cb(err || data);
				});
			});
		},
		saveInning: function(gameid, inningIn, cb){
			Game.findOne({_id: gameid}, function(err, g){
				var i;
				if (inningIn._id){
					i = g.innings.id(inningIn._id);
					for (var x in inningIn){
						i[x] = inningIn[x];
					}
				}
				else g.innings.push(inningIn);
				g.save(function(err, data){
					cb(err || data.innings);
				})
			})
		},
		removeInning: function(gameid, inningId, cb){
			Game.findOne({_id: gameid}, function(err, g){
				g.innings.id(inningId).remove();
				g.save(function(err, data){
					cb(err || data.innings);
				});
			});
		}
	}
	
	
	
	
	
}