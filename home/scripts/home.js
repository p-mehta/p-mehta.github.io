/**
 * File: home.js
 * Date: Dec 15, 2015
 * Author: Pratik Mehta
 * 
 */

var myApp = angular.module('myApp', ['ngTouch', 'ngAnimate', 'ui.bootstrap']);

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
			$scope.showEmail = function() {
				$scope.$parent.showEmail();
			};
			
			$scope.showLocation = function() {
				$scope.$parent.showLocation();
			};
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
			
			$(document).keyup(function(e) {
				if (!$scope.$parent.showSlideShow) { return; }
				
				var keyCode = e.which || e.keyCode;
				if (keyCode === 37) {
				   // Previous
				   $(".carousel-control.left").click();
				   return false;
				}
				if (keyCode === 39) {
				   // Next
				   $(".carousel-control.right").click();
				   return false;
				}
				if (keyCode === 27) {
					$scope.$parent.closeSlideShow();
					$scope.$apply();
					return false;
				}
			});
		}
	};
}]);

myApp.directive('onInvisible', ['$timeout', function($timeout) {
	return {
	    restrict: 'A',
	    link: function($scope, elem, attrs) {
//	    	var checkVisibility = function() {
//				if (element('.value-entry select').css('display') == 'none') {
//					console.log('onInvisible');
//					$scope.$parent.showMenu = false;
//				} else {
//					$timeout(checkVisibility, 100);
//				}
//	    	};
//	    	$timeout(checkVisibility, 100);
	    	
	    	$scope.$watch(function() {
	    		return elem.css('display');
	    	}, function(newVal, oldVal) {
	    		if (newVal != oldVal && newVal == 'none') {
					console.log('onInvisible');
					$scope.$parent.showMenu = false;
				}
	    	});
	    }
    };
}]);

myApp.controller('mainController', ['$scope', '$location', '$timeout', '$filter', '$window', '$http',
                                    function($scope, $location, $timeout, $filter, $window, $http) {
	$scope.message = 'Dev in progress...';
	
	$scope.activeTab = {
			home: true,
			resume: false,
			others: false,
			contact: false
	};
	
	$scope.showMenu = false;
	$scope.toggleMenu = function($event) {
		$scope.showMenu = !$scope.showMenu;
		$event.stopPropagation();
	};
	
	$scope.openMenu = function($event) {
		$scope.showMenu = true;
		$event.stopPropagation();
	};
	
	$scope.closeMenu = function($event) {
		$scope.showMenu = false;
		$event.stopPropagation();
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
            var scrollPos = angular.element($window).scrollTop();
            console.log('scrollPos: ' + scrollPos);
            var newHeight = angular.element('header').height() - scrollPos;
            angular.element('header').height(newHeight);
        };
/*
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
	            if (currLink.hasClass('contactSection')) {
	    			setActiveTab('contact');
	    		}
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
		if ($scope.showMenu) {
			$scope.showMenu = false;
		}
		
		if ($scope.activeTab == tab) { return; }
		angular.element($window).off('scroll');
		setActiveTab(tab);
		$timeout(function() {
			$('html, body').animate({scrollTop: $('section.active').offset().top }, 'slow', 'swing', function() {
				angular.element($window).on('scroll', onScroll);
			});
		});
	};
*/

        $scope.workEx = [];
        $scope.getWorkEx = function() {
            $http.get('resources/workex.json')
            .success(function(data) {
                if (data && data.length) {
                    $scope.workEx = [].concat(data);
                }
            });
        };

	$scope.albums = [];
	$scope.currAlbum = [];
	$scope.showSlideShow = false;

        $scope.getAlbums = function() {
            $http.get('resources/albums.json')
            .success(function(data) {
                if (data && data.length) {
                    $scope.albums = [].concat(data);
                }
                $scope.loadImages();
            });
        };
	
        $scope.loadImages = function() {
            var imageObj = new Image();

            angular.forEach($scope.albums, function(album, idx) {
                angular.forEach(album.images, function(img, idx) {
                    imageObj.src = img.image;
                });
            });
        };

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
			fb: 'facebook',
			gm: 'gmail',
			loc: 'location'
	};
	
	$scope.contactComponent = '';
	$scope.showEmail = function() {
		$scope.contactComponent = 'email';
	};
	
	$scope.email = {
			to: 'mehta.pratik1985@gmail.com',
			from: '',
			subject: '',
			body: ''
	};
	
	$scope.sendEmail = function() {
		console.log('email from: ' + $scope.email.from + 
						 ' subject: ' + $scope.email.subject + 
						 ' body: ' + $scope.email.body);
	};
	
	$scope.showLocation = function() {
		$scope.contactComponent = 'location';
	};
	
	var onClick = function($event) {
		if ($scope.showMenu) {
			$scope.showMenu = false;
			$event.stopPropagation();
			$scope.$apply();
		}
	};

	var init = function() {
		//$scope.setActive('home');
		angular.element($window).on('click', onClick);

                if ($scope.workEx.length <= 0) {
                    $scope.getWorkEx();
                }

                if ($scope.albums.length <= 0) {
                    $scope.getAlbums();
                } else {
                    $scope.loadImages();
                }
	};
	
	init();
}]);
