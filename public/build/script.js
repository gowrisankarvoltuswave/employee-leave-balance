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
    .controller('loginCtrl', function ($scope, $state, loginSvc,socialAuth,googleAuthSvc) {
        /*Modal*/
            
        $scope.login=function (obj) {
            loginSvc.create(obj,function (response) {
                if(response.success){
                    window.sessionStorage.setItem('token',response.token)
                    $state.go('vehicles')
                }
                else{
                    alert('error')
                }
            });
        };
        // $scope.socialAuthbtn=function(){
        //     socialAuth.get(function(response){
        //         console.log(response)
        //     })
        // }
        $scope.socialAuthbtn=function(){
            socialAuth.fblogin()
            .then(function(response){
                console.log(response)
            })
        }
        $scope.googleAuthbtn=function(){
            googleAuthSvc.googleloginmethod()
            .then(function(response){
                // window.open(response.url, "myWindow", 'width=800,height=600');
                // window.open(response.url, "_self");
                console.log(response)
            })
        }

        $scope.data=[
            {'id':1,'name':'John','position':['Jr Asst','Sr Asst','BD','GM'],'office':['TCS','Wipro','Infosys','IBM'],'salary':65000},
            {'id':2,'name':'David','position':['Jr Asst','Sr Asst','BD','GM'],'office':['TCS','Wipro','Infosys','IBM'],'salary':50000},
            {'id':3,'name':'Ravi','position':['Sr Developer'],'office':['TCS'],'salary':35000},
            {'id':4,'name':'Alekya','position':['GM'],'office':['IBM'],'salary':25000},
            {'id':5,'name':'Saahithi','position':['HR'],'office':['Wipro'],'salary':35000},
            {'id':6,'name':'Niranjan','position':['BD'],'office':['Genpact'],'salary':45000},
            {'id':7,'name':'Neeraja','position':['AGM'],'office':['Infosys'],'salary':95000}

        ]
        // $scope.login=function (obj) {
        //     loginSvc.userlogin(obj)
        //     .then(function (response) {
        //         if(response.success){
        //             $state.go('vehicles')
        //         }
        //         else{
        //             alert('error')
        //         }
        //     });
        // };














{/* <table ng-controller="ctrl">
    <tr ng-click="rowClicked(obj)" ng-repeat="obj in data">
        <td>
            <input type="checkbox" ng-model="selectedObjs" value="{{obj}}"
                         ng-checked="obj.selected" 
                         ng-click="toggleObjSelection($event, obj.description)">
                
            </input>
        </td>
        <td>{{obj.id}}</td>
        <td>{{obj.name}}</td>
         <td>
         <span ng-if="obj.position.length>1"><select ng-model="selectposition" ng-options="item for item in  obj.position" ng-init="selectposition=obj.position[0]" ></select></span>
         <span ng-if="obj.position.length==1">{{obj.position[0]}}</span>

         </td>
        <td>
          
          
           <span ng-if="obj.position.length>1"><select ng-model="selectoffice" ng-options="item for item in  obj.office" ng-init="selectoffice=obj.office[0]" ></select></span>
         <span ng-if="obj.office.length==1">{{obj.position[0]}}</span>
          
          
        </td>
        <td>{{obj.salary}}</td>

    </tr>
</table> */}








       /* $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
            socialAuth.create(userDetails, function (response) {
                if (response.success == false) {
                    if($scope.languageMessage=='en'){
                        $scope.invalidcredentials = 'Please enter valid credentials';
                    }
                    else{
                        $scope.invalidcredentials = 'الرجاء إدخال بيانات اعتماد صالحة';
                    }
                }
                else {
                    window.localStorage.setItem('user', JSON.stringify(response.data));
                    window.localStorage.setItem('usertype', 'user');
                    // $window.sessionStorage.user=()
                    $rootScope.user = response.data.id;
                    $scope.fbId = response.data.id;
                    if (response.data.id && !response.data.mobile) {
                        $('#fbsignin').modal('show');
                    }
                    else if (response.data.id && response.data.mobile) {
                        var test = Auth.isLoggedIn();
                        if (Auth.isLoggedIn()) {
                            $scope.refreshPage()
                        }
                    }
                    $scope.refreshPage = function () {
                        $('#signin').modal('hide');
                        $('.modal-backdrop').remove();
                        $('.modal-open').css("overflow", "auto")
                        $state.go('checkout', {val: true})
                    }
                    $scope.refreshPage()
                }
            })
            console.log(userDetails)
        });
        $scope.fbnumberupdated = function (obj) {
            usersSvc.update({id: $scope.fbId}, obj, function (response) {
                if (response.success) {
                    toaster.pop('success', response.message);
                    $('#fbsignin').modal('hide');
                    $('.modal-backdrop').remove();
                    $('.modal-open').css("overflow", "auto")
                }
                else {
                    toaster.pop('error', response.message);
                }
            })
        }

        $rootScope.$on('event:social-sign-out-success', function (event, logoutStatus) {
            console.log(logoutStatus)
        })
*/

    });

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

angular.module('authApp')
.service('APIInterceptor',function($http){
    this.request=function(){
        $http.defaults.headers.post['x-access-token'] = window.sessionStorage.getItem('token');
    }
})
/**
 * Created by CR6 on 28-04-2017.
 */
'use strict';
// angular.module('authApp')
// .service('loginSvc',function($http,$q){

//     this.userlogin=function(obj){
//         var dfd=$q.defer()
//         $http({
//             method:'POST',
//             url:'http://192.168.1.231:3001/users',
//             data:obj,
//             // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    
//         })
//         .then(function(response){
//             dfd.resolve(response)
//             $http.defaults.headers.post['token'] =response.token;

//         })
//         .catch(function(response){
//             dfd.reject(response)

//         })
//         return dfd.promise;
//     }
// })

//Articles service used for communicating with the articles REST endpoints
angular.module('authApp').factory('loginSvc', ['$resource', 'Config',
    function ($resource, Config) {
        return $resource(Config.url + 'users', {
            username: '@username'
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
                method: 'GET', isArray: false,
                headers: {
                    'Authorization': 'dfgasdfjhkjhk3452i34hpiuhasd9f435kjkad'
                }
            }
        });
    }
]);

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

/**
 * Created by CR6 on 28-04-2017.
 */
'use strict';
angular.module('authApp')
.service('socialAuth',function($http,$q,Config){

    this.fblogin=function(){
        var dfd=$q.defer()
        $http({
            method:'GET',
            url:Config.url + 'sociallogin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    
        })
        .then(function(response){
            dfd.resolve(response)
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
var app=angular.module('authApp');
app.service('Config',function(){
  this.url="https://oauth.voltuswave.com/"
});
/*
app.config(function(socialProvider){
    // socialProvider.setGoogleKey("YOUR GOOGLE CLIENT ID");
    // socialProvider.setLinkedInKey("YOUR LINKEDIN CLIENT ID");
    socialProvider.setFbKey({appId: "212390719297592", apiVersion: "v2.10"});
    // socialProvider.setFbKey({appId: "477514545964493", apiVersion: "v2.10"});
});*/
