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

myApp.controller('mainController', ['$scope', '$location', '$timeout', '$filter', '$window',
                                    function($scope, $location, $timeout, $filter, $window) {
	$scope.message = 'Dev in progress...';
	
	$scope.activeTab = {
			home: true,
			resume: false,
			others: false,
			contact: false
	};
	
	var setActiveTab = function(tab) {
		angular.forEach($scope.activeTab, function(value, key) {
			if (key == tab) {
				$scope.activeTab[key] = true;
			} else {
				$scope.activeTab[key] = false;
			}
		});
	};
	
	var onScroll = function() {
		var scrollPos = angular.element($window).scrollTop() + $window.innerHeight/2;
	    $('section').each(function () {
	        var currLink = $(this);
	        var contactElem = $('section.contactSection');
	        if (contactElem.position().top < scrollPos + contactElem.height() ) { 
        		$('section').removeClass('active');
        		contactElem.addClass('active');
        		setActiveTab('contact');
    		} else if (currLink.position().top <= scrollPos && currLink.position().top + currLink.height() > scrollPos) {
	            $('section').removeClass('active');
	            currLink.addClass('active');
	    		if (currLink.hasClass('othersSection')) {
	    			setActiveTab('others');
	    		}
	    		if (currLink.hasClass('resumeSection')) {
	    			setActiveTab('resume');
	    		}
	    		if (currLink.hasClass('homeSection')) {
	    			setActiveTab('home');
	    		}
	        } else {
	            currLink.removeClass('active');
	        }
	        $scope.$apply();
	    });
    };
	
	$scope.setActive = function(tab) {
		if ($scope.activeTab == tab) { return; }
		angular.element($window).off('scroll');
		setActiveTab(tab);
		$timeout(function() {
			$('html, body').animate({scrollTop: $('section.active').offset().top }, 'slow', 'swing', function() {
				window.location.hash = $('section.active');
				angular.element($window).on('scroll', onScroll);
			});
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
		angular.element($window).on('scroll', onScroll);
	};
	
	init();
}]);