/**
 * File: home.js
 * Date: Dec 15, 2015
 * Author: Pratik Mehta
 * 
 */

var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('mainController', ['$scope', '$location', '$timeout', 
                                    function($scope, $location, $timeout) {
	$scope.message = 'Dev in progress...';
	
	$scope.activeTab = 'home';
	$scope.setActive = function(tab) {
		$scope.activeTab = tab;
		
		$timeout(function() {
			$("html, body").animate({scrollTop: $('section.active').offset().top}, "slow");
		});
	};
	
}]);