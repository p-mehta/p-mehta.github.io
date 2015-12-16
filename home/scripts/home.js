/**
 * File: home.js
 * Date: Dec 15, 2015
 * Author: Pratik Mehta
 * 
 */

var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('mainController', ['$scope', '$location', 
                                    function($scope, $location) {
	$scope.message = 'Dev in progress...';
	
	$scope.slides = [];
	
	var slidePath = "images/slides/";
	$scope.slides.push({ image: slidePath + 'BigSur.jpg' });
	$scope.slides.push({ image: slidePath + 'SF.jpg' });
    
}]);