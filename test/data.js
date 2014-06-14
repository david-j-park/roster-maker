var nconf = require('nconf'), should = require('should');
nconf.file({
	file : 'config/config.json'
});
var data = require('../lib/data')(nconf.get('DBURL'));

describe('Data testing.', function() {

	var team; 
	
	it('Should save a team.', function(done) {
		data.saveTeam({
			name : 'Green Machine',
			players : [ {
				lastName : 'Park',
				firstName : 'Ethan',
				number : 8,
				parent : 'David Park'
			}, {
				lastName : 'Goss',
				firstName : 'Jack',
				parent : 'Coach Gerry',
				number : -1
			} ]
		}, function(t) {
			t.players.length.should.eql(2);
			t._id.should.be.ok;
			team = t;
			done();
		});
	});
	
	it('Should delete a team.', function(done){
		data.deleteTeam(team, function(result){
			result.should.be.ok;
			done();
		});
	});

});