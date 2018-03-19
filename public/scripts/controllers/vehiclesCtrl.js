'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:FormsWizardCtrl
 * @description
 * # FormsWizardCtrl
 * Controller of the authApp
 */
app
    // .controller('loginCtrl', function ($scope, $state, loginSvc, socialLoginService, socialAuth, toaster, ngCart) {
    .controller('vehicleCtrl', function ($scope,vehiclesSvc) {
                vehiclesSvc.get(function(response){
                    $scope.vehicleList=response.data
                    $scope.message='Test Message'
                })
    })