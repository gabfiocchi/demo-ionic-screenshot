// Ionic Starter App
'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('testCtrl', ['cordovaScreenshot', '$scope', function(cordovaScreenshot,$scope){
  $scope.takeScreen = function() {
    cordovaScreenshot.capture().then(function(capture) {
      console.debug('path to file in controller', capture);
    });
  };

}])
.service('cordovaScreenshot', ['$q', function ($q){
    return {
        capture: function (filename, extension, quality){
            extension = extension || 'jpg';
            quality = quality || '100';

            var defer = $q.defer();

            navigator.screenshot.save(function (error, res){
                if (error) {
                    console.error(error);
                    defer.reject(error);
                } else {
                    ionic.Platform.isIOS() ? res.filePath : 'file:///' + res.filePath;
                    console.log('screenshot saved in: ', ionic.Platform.isIOS() ? res.filePath : 'file:///' + res.filePath);
                    defer.resolve(res.filePath);
                }
            }, extension, quality, filename);

            return defer.promise;
        }
    };
}]);
