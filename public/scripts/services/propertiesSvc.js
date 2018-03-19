// Articles service used for communicating with the articles REST endpoints
angular.module('authApp').factory('propertiesSvc', ['$resource',
    function ($resource) {
        return $resource('https://oauth.voltuswave.com/properties', {
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
