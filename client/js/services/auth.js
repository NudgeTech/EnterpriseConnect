angular
  .module('app')
  .factory('AuthService', ['EConnectUser', '$q', '$rootScope', function(EConnectUser, $q,
      $rootScope) {
    function login(email, password) {
      return EConnectUser
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
            //current user data to be sent back here. 
              //console.log(response);
                $rootScope.currentUser = {
                    id: response.user.id,
                    tokenId: response.id,
                    clientId : response.user.clientId,
                    userfirstname: response.user.firstname
                 
                }; 

                localStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser));

                console.log($rootScope.currentUser);


        });
    }

    function logout() {
      return User
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
         localStorage.clear();
       });
    }

    return {
      login: login,
      logout: logout
    };
  }]);

