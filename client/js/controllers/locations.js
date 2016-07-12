
//567e77fbddc83d46ce0a0ddd GDF client id (this will be obtained when a user logs in)

angular
  .module('app')
        .controller('LocationInfoController', ['$scope', '$state', '$rootScope', '$stateParams', 'Client', 'Site', 'EConnectUser', function($scope,
            $state, $rootScope, $stateParams, Client, Site, EConnectUser) {

             $scope.clients = []; //returns an array
              var clientId = $rootScope.currentUser.clientId;


                       function getClientDetails() {
                          Client
                            .find({
                                  filter: {
                                    where: {id: clientId },
                                  }
                              })
                            .$promise
                            .then(function(results) {
                              $scope.clients = results;
                              console.log(results);
                            });
                        } getClientDetails();


            $scope.locations = [];
            var siteID = $stateParams.id;
                function getlocations(){
                    Site
                      .find({
                          filter: {
                              where: {id: siteID},
                               include : [
                                        {
                                          "relation": "locations"
                                        }                        
                                     ]
                          }
                      })
                       .$promise
                          .then(function(results) {
                            $scope.newLocation = '';
                              $scope.locations = results;
                              console.log(results);
                           // $scope.siteForm.content.$setPristine();
                             $scope.newLocation = '';
                           // $('.focus').focus();
                            //getClientDetails();
                             
                          });

                } getlocations();   


            //Add Location
              $scope.addLocation = function() {

                //TODO: must check that the beacon minor ID doesnt exisit to prevent duplicates. 
                //
                ///////////////
                        Site.locations
                          .create(
                          {id: siteID},

                          {
                              locationname: $scope.site.locations.locationname,
                              beaconminor: $scope.site.locations.beaconminor,
                              siteId: siteID

                          })
                          .$promise
                          .then(function() {
                            $scope.newLocation = '';
                           // $scope.siteForm.content.$setPristine();
                            
                            //$('.focus').focus();
                            //getClientDetails();
                             $state.go('locations', {}, { reload: true });
                          });
              };            
         
              
      }])
      .controller('DeleteLocationController', ['$scope', '$state', 'Location',  '$stateParams', function($scope,
            $state,  Location, $stateParams) {

                        $scope.locations = {};
                        $scope.siteId; 


                        //grab the site Id for the location to delete so that the site can be refreshed 
                        function getLocationDetails() {
                          Location
                            .findById({id: $stateParams.id })
                            .$promise
                            .then(function(results) {
                              $scope.locations = results;
                              $scope.siteId = $scope.locations.siteId;
                              console.log(results);
                            });
                        } getLocationDetails();

                        
                    

                        Location
                          .deleteById({id: $stateParams.id})
                          .$promise
                          .then(function() {
                              //client id needs to be stored somewhere...
                             $state.go('locations', {id : $scope.siteId}, { reload: true });
                          });
                      //};//getClientDetails();
      }]);      
      
     
          

