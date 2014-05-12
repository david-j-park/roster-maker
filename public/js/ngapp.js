var app = angular.module('SortFiddle', ['ngRoute','ui.sortable']);

app.config(['$routeProvider', function($routeProvider){
      $routeProvider.when('/list', {
          templateUrl: 'partials/list',
          controller: 'ListCtrl'
      })
      .otherwise({
          redirectTo: '/list'
      });
}]);

app.controller('ListCtrl', ['$scope', function($scope){
    $scope.players = [
        {name: "David"},
        {name: "Ethan"},
        {name: "Anthony"}
    ];
    
    $scope.newPlayer = "";
    
    $scope.addPlayer = function(){
        $scope.players.push({name: $scope.newPlayer});
        $scope.newPlayer = "";
    }
}])