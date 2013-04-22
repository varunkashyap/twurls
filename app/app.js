var urlsApp = angular.module('urlsApp', [], function($routeProvider, $locationProvider){
	$routeProvider.when("/", {
		controller: UrlsController,
		templateUrl: 'partials/main.html'
	});
});


function UrlsController($scope, $http){

	$scope.loadData = function(startNumber, offsetNumber){
		console.log("Loading data: " , startNumber, " - ", offsetNumber);
		$http.jsonp(
			"https://script.google.com/macros/s/AKfycbzG0kuhJYMn6FbAJSaErbHQgA5FIKTybGsEu9pEYWTn1aJj3OI/exec?cb=JSON_CALLBACK",
			{
				params:{
					op: 'get',
					start: startNumber,
					limit: offsetNumber
				}
			}).success(function(resObj){

				$scope.twitUrls = resObj.results;
				$scope.start = startNumber;
				$scope.limit = offsetNumber;
				$scope.total = resObj.total;

			}).error(function(){
				console.log("Error ", arguments);
			});

	};

	$scope.removeData = function(index){
		var twitUrlToDelete = $scope.twitUrls[index];
		console.log("Removing entry for: ", twitUrlToDelete);

		$http.jsonp(
			"https://script.google.com/macros/s/AKfycbzG0kuhJYMn6FbAJSaErbHQgA5FIKTybGsEu9pEYWTn1aJj3OI/exec?cb=JSON_CALLBACK",
			{
				params:{
					op: 'delete',
					url: twitUrlToDelete.url
				}
			}).success(function(resObj){
				$scope.twitUrls.splice(index, 1);
			}).error(function(){
				console.log("Error ", arguments);
			});
	};

	$scope.init = function(){
		$scope.loadData(0, 25);
	};

	$scope.loadPrevPage = function(){
		$scope.loadData($scope.start - $scope.limit, $scope.limit);
	};

	$scope.loadNextPage = function(){
		$scope.loadData($scope.start + $scope.limit, $scope.limit);
	};

	$scope.removeEntry = function(index){
		$scope.removeData(index);
	};

	$scope.init();
}