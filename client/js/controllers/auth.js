angular
  .module('app')
  .controller('LoginController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {

                  $scope.login = function() {
                    AuthService.login($scope.econnectuser.email, $scope.econnectuser.password)
                      .then(function() {
                        $state.go('dashboard');
                      });
                  };
    }]);