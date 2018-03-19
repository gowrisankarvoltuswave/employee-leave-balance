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
    .controller('propertyCtrl', function ($scope,propertiesSvc) {
        propertiesSvc.get(function(response){
            $scope.data=response.data
        })
    })