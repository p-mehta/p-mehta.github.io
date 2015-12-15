/**
 * File: home.js
 * Date: Dec 15, 2015
 * Author: Pratik Mehta
 * 
 */

var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('mainController', ['$scope', '$filter', '$timeout', function($scope, $filter, $timeout) {
	$scope.message = 'Dev in progress...';
}]);