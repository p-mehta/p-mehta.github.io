/**
 * File: home.js
 * Date: Dec 15, 2015
 * Author: Pratik Mehta
 * 
 */

var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.directive('linkSocial', [function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: 'fragments/social.html',
		scope: {
			type: '=type'
		},
		link: function($scope, element, attrs) {
			
		}
	};
}]);

myApp.controller('mainController', ['$scope', '$location', '$timeout', 
                                    function($scope, $location, $timeout) {
	$scope.message = 'Dev in progress...';
	
	$scope.activeTab = 'home';
	
	$scope.setActive = function(tab) {
		$scope.activeTab = tab;
		
		$timeout(function() {
			$("html, body").animate({scrollTop: $('section.active').offset().top }, "slow");
		});
	};
	
	$scope.album = [
	                {src: 'images/slides/BigSur.jpg'},
	                {src: 'images/slides/SF.jpg'},
	                {src: 'images/slides/BigSur.jpg'},
	                {src: 'images/slides/SF.jpg'}
	                ];
	
	var init = function() {
		$scope.setActive('home');
	};
	
	init();
}]);