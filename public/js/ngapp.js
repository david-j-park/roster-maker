var app = angular.module('SortFiddle', ['ngRoute','ui.sortable']);

var positions = [{name: 'First Base', abbr: '1B', infield: true},
                 {name: 'Second Base', abbr: '2B', infield: true},
                 {name: 'Third Base', abbr: '3B', infield: true},
                 {name: 'Shortstop', abbr: 'SS', infield: true},
                 {name: 'Pitcher\'s Helper', abbr: 'PH', infield: true},
                 {name: 'Infield Rover', abbr: 'IR', infield: true},
                 {name: 'Left Field', abbr: 'LF', infield: false},
                 {name: 'Right Field', abbr: 'RF', infield: false},
                 {name: 'Center Field', abbr: 'CF', infield: false},
                 {name: 'Outfield Rover', abbr: 'OR', infield: false}];

function getPlayers(){
	var p = localStorage.getItem("Players");
	if (p != null) return JSON.parse(p);
	return [];
}

function savePlayers(p){
	localStorage.setItem("Players", angular.toJson(p));
}

function shuffle(array) {
	  var currentIndex = array.length
	    , temporaryValue
	    , randomIndex
	    ;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
}

app.config(['$routeProvider', function($routeProvider){
      $routeProvider.when('/list', {
          templateUrl: 'partials/list',
          controller: 'ListCtrl'
      })
      .when('/positions', {
          templateUrl: 'partials/positions',
          controller: 'PosCtrl'
      })
      .when('/game', {
    	  templateUrl: 'partials/game',
    	  controller: 'GameCtrl'
      })
      .otherwise({
          redirectTo: '/list'
      });
}]);

app.controller('ListCtrl', ['$scope', function($scope){
    $scope.players = getPlayers();
    
    $scope.newPlayer = "";
    
    $scope.addPlayer = function(){
        $scope.players.push({name: $scope.newPlayer});
        $scope.newPlayer = "";
        savePlayers($scope.players);
    }
}]);

app.controller('PosCtrl', ['$scope', function($scope){
    $scope.positions = positions;
    
}]);

app.controller('GameCtrl', ['$scope', function($scope){
	
	$scope.players = getPlayers();
	$scope.innings = [];
	$scope.addInning = function(){
		var p = positions.slice(0);
		while (p.length < $scope.players.length) p.push({name: 'Bench', abbr: 'BENCH', infield: false});
		var i = {number: $scope.innings.length + 1, positions: p};
		$scope.innings.push(i);
	}
	
	$scope.shuffle = function(inning){
		shuffle($scope.innings[inning].positions)
	}
	
	//add one inning by default
	$scope.addInning();
}]);