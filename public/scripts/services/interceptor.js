angular.module('authApp')
.service('APIInterceptor',function($http){
    this.request=function(){
        $http.defaults.headers.post['x-access-token'] = window.sessionStorage.getItem('token');
    }
})