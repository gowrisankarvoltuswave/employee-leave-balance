/**
 * Created by CR6 on 28-04-2017.
 */
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('authApp').factory('usersSvc', ['$resource', 'Config',
    function ($resource, Config) {
        return $resource(Config.url + 'users/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            },
            delete: {
                method: 'DELETE'
            },
            create: {
                method: 'POST'
            },
            get: {
                method: 'GET', isArray: false
            }
        });
    }
]);
