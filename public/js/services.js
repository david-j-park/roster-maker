var datasvc = angular.module('RosterData', ['ngResource']);

datasvc.factory('Player', ['$resource', function($resource){
	return $resource('/api/player/:playerid', {}, {});
}])