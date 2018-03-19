app.factory('authInterceptor', function ($rootScope, $q, $window, $injector) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (window.sessionStorage.getItem('token')) {
                var token = window.sessionStorage.getItem('token')
                config.headers['x-access-token'] = token;
            }


            return config;
        },
        response: function (response) {
            if (response.data.status === 401) {

            }

            return response || $q.when(response);

        }
    };
});
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});