// Articles service used for communicating with the articles REST endpoints
angular.module('authApp').factory('vehiclesSvc', ['$resource',
    function ($resource) {
        return $resource('https://oauth.voltuswave.com/vehicles', {
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
