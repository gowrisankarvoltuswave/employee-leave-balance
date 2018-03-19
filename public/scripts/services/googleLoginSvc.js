/**
 * Created by CR6 on 28-04-2017.
 */
'use strict';
angular.module('authApp')
.service('googleAuthSvc',function($http,$q,Config){

    this.googleloginmethod=function(){
        var dfd=$q.defer()
        $http({
            method:'GET',
            url:Config.url + 'googlepassport',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    
        })
        .then(function(response){
            dfd.resolve(response.data)
            console.log(response)
        })
        .catch(function(response){
            dfd.reject(response)

        })
        return dfd.promise;
    }
})


//Articles service used for communicating with the articles REST endpoints
// angular.module('authApp').factory('socialAuth', ['$resource', 'Config',
//     function ($resource, Config) {
//         return $resource(Config.url + 'facebook', {
//             username: '@username'
//         }, {
//             update: {
//                 method: 'PUT'
//             },
//             delete: {
//                 method: 'DELETE'
//             },
//             create: {
//                 method: 'POST'
//             },
//             get: {
//                 method: 'GET', isArray: false
//             }
//         });
//     }
// ]);
