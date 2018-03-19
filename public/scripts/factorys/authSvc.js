

  app.factory('Auth', function($resource,$rootScope,$window, $q,Config){


    /**
     *  User profile resource
     */
    // var Profile = $resource(Config.url+'login/login', {}, {
    //   login: {
    //     method: "POST",
    //     isArray : false,
    //     transformRequest: transformRequestAsFormPost,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    //     }
    //   }
    // });

    var auth = {};

    /**
     *  Saves the current user in the root scope
     *  Call this in the app run() method
     */
    auth.init = function(){
      if (auth.isLoggedIn()){
        $rootScope.users = auth.currentUser();
      }
    };

    // auth.login = function(username, password){
    //   return $q(function(resolve, reject){
    //     Profile.login({username:username,password:password}).$promise
    //       .then(function(response) {
    //         if(data=!null){
    //           $sessionStorage.user = response.data;
    //           $rootScope.user = $sessionStorage.user;
    //           resolve();
    //         }
    //         else {
    //           $scope.error="error"
    //         }
    //       }, function() {
    //         reject();
    //       });
    //
    //   });
    // };
    // auth.logout = function() {
    //   delete $sessionStorage.user;
    //   delete $rootScope.user;
    // };


    auth.checkPermissionForView = function(view) {
      if (!view.requiresAuthentication) {
        return true;
      }

      return userHasPermissionForView(view);
    };


    var userHasPermissionForView = function(view){
      if(!auth.isLoggedIn()){
        return false;
      }

      if(!view.permissions || !view.permissions.length){
        return true;
      }

      return auth.userHasPermission(view.permissions);
    };


    auth.userHasPermission = function(permissions){
      if(!auth.isLoggedIn()){
        return false;
      }

      var found = false;
      angular.forEach(permissions, function(permission, index){
        var data=angular.fromJson(window.localStorage.getItem('user'))

        if (data.permissions.indexOf(permission) >= 0){
          // if ($sessionStorage.user.indexOf(permission) >= 0){
          found = true;
          return;
        }
      });
      return found;
    };

    auth.currentUser = function(){
      return  $window.sessionStorage.user;
    };
    auth.isLoggedIn = function(){
      var data=angular.fromJson(window.localStorage.getItem('user'))
      return  data != null;
    };


    return auth;
  });
