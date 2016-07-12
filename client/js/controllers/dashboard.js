
//567e77fbddc83d46ce0a0ddd GDF client id (this will be obtained when a user logs in)

angular
  .module('app')
        .controller('SiteInfoController', ['$scope', '$state', '$rootScope', 'EConnectUser', 'Client', 'Site', function($scope,
            $state, $rootScope, EConnectUser, Client, Site) {
                  $scope.clients = []; //returns an arrayt
                
                  //var clientid = "567e77fbddc83d46ce0a0ddd";
                  var clientId = $rootScope.currentUser.clientId;
                    
                       function getClientDetails() {
                          Client
                            .find({
                                  filter: {
                                    where: {id:  clientId},
                                     include : [
                                        {
                                          "relation": "sites",
                                          "scope": {"include": ["locations"]}
                                        }                        
                                     ]
                                  }
                              })
                            .$promise
                            .then(function(results) {
                              $scope.clients = results;

                              console.log(results);
                            });
                        } getClientDetails();


              //Add Site
              $scope.addSite = function() {
                        Client.sites
                          .create(
                              {id: clientId},

                          {
                              sitename: $scope.client.sites.sitename,
                              beaconmajor: $scope.client.sites.beaconmajor,
                              clientId: clientId

                          })
                          .$promise
                          .then(function() {
                            $scope.newSite = ''
                           // $scope.siteForm.content.$setPristine();
                   
                              $state.go('dashboard', {}, { reload: true });
                            //$('.focus').focus();
                          
                          });
              };


         
              
      }])
     .controller('DeleteSiteController', ['$scope', '$state', 'Site',  '$stateParams', function($scope,
            $state,  Site, $stateParams) {

                        Site
                          .deleteById({id: $stateParams.id})
                          .$promise
                          .then(function() {
                           
                             $state.go('dashboard', {}, { reload: true });
                          });
                      //};//getClientDetails();
      }]);      
          

