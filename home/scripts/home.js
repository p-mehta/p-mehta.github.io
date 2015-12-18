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
			type: '=ngModel',
			sml: '=sml'
		},
		link: function($scope, element, attrs) {
			
		}
	};
}]);

myApp.directive('slideShow', [function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: 'fragments/slideOverlay.html',
		scope: {
			slides: '=slides'
		},
		link: function($scope, element, attrs) {
			$scope.close = function() {
				$scope.$parent.closeSlideShow();
			};
			
			$scope.interval = 10000;
			
			$scope.start = function() {
				$scope.interval = 10000;
			};
			
			$scope.stop = function() {
				$scope.interval = 0;
			};
		}
	};
}]);

myApp.controller('mainController', ['$scope', '$location', '$timeout', '$filter',
                                    function($scope, $location, $timeout, $filter) {
	$scope.message = 'Dev in progress...';
	
	$scope.activeTab = 'home';
	
	$scope.setActive = function(tab) {
		$scope.activeTab = tab;
		
		$timeout(function() {
			$("html, body").animate({scrollTop: $('section.active').offset().top }, "slow");
		});
	};
	
	$scope.albums = [
	                 { name: 'SF', images: [
	                                        { image: 'images/slides/SF.jpg'}
	                                        ] },
                    { name: 'BigSur', images: [
                                               { image: 'images/slides/BigSur.jpg'}
                                               ] }
	                 ];
	
	$scope.currAlbum = [];
	$scope.showSlideShow = false;
	
	$scope.showAlbum = function(albumName) {
		var album = $filter('filter')($scope.albums, {name: albumName}, true);
		if (album) {
			$scope.currAlbum = album[0].images;
		}
		$scope.showSlideShow = true;
	};
	
	$scope.closeSlideShow = function() {
		$scope.currAlbum = [];
		$scope.showSlideShow = false;
	};
	
	$scope.type = {
			li: 'linkedin',
			fb: 'facebook'
	};
	
	var init = function() {
		$scope.setActive('home');
	};
	
	init();
}]);