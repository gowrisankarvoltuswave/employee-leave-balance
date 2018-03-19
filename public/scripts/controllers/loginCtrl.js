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
