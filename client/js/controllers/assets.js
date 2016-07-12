
//567e77fbddc83d46ce0a0ddd GDF client id (this will be obtained when a user logs in)

angular
  .module('app')
        .controller('AssetInfoController', ['$scope', '$state','$stateParams', '$rootScope', 'Client', 'Site', 'Location', 'Asset', 'EConnectUser', function($scope,
            $state, $stateParams, $rootScope, Client, Site, Location, Asset, EConnectUser) {


              var LocationID = $stateParams.id;
               var clientId = $scope.currentUser.clientId;
                //API call gets the client, sites and locations details for id 567e77fbddc83d46ce0a0ddd
                $scope.clients = []; //returns an array
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

                 //TWO FUnCTIONS TO GET BACK THE SITE OBJECT
                var siteID;
                $scope.site = {};
                function getSiteID(){
                    Location
                        .findById({ id: LocationID})
                        .$promise
                        .then(function(results){
                          
                            siteID = results.siteId;
                            console.log(siteID);

                             function getSiteName(){
                                Site 
                                  .findById({id : siteID})
                                  .$promise
                                  .then(function(results){
                                      $scope.site = results;
                                      console.log(results);
                                  });
                              }getSiteName();

                        });

                }getSiteID();


              //API to get nudges for the provided location ID

            $scope.assets = [];
           
                function getAssets(){
                    Location
                      .find({
                          filter: {
                              where: {id: LocationID},
                               include : [
                                        {
                                          "relation": "assets"
                                          
                                        }                        
                                     ]
                          }
                      })
                       .$promise
                          .then(function(results) {
                            
                              $scope.assets = results;
                              console.log(results);
                             
                          });

                } getAssets(); 
            
            //Add Asset
              $scope.addAsset = function() {

                //TODO: must check asset does not exisit already somehow - name check or ID to asset model
                      //TODO: must check that the beacon minor ID doesnt exisit to prevent duplicates. 
                //
                ///////////////
                        Location.assets
                          .create(
                          {id: LocationID},

                          {
                              Name: $scope.location.assets.name,
                              Description: $scope.location.assets.description,
                              Type: $scope.location.assets.type,
                              locationId: LocationID

                          })
                          .$promise
                          .then(function() {
                            $scope.newAsset = '';
                        
                             $state.go('assets', {}, { reload: true });
                          });
                    
                      
              };            
         
              
      }])
      .controller('DeleteAssetController', ['$scope', '$state', 'Asset',  '$stateParams', function($scope,
            $state,  Asset, $stateParams) {


                        $scope.asset = {};
                        $scope.locationId; 


                        //grab the site Id for the location to delete so that the site can be refreshed 
                        function getAssetDetails() {
                          Asset
                            .findById({id: $stateParams.id })
                            .$promise
                            .then(function(results) {
                              $scope.asset = results;
                              $scope.locationId = $scope.asset.locationId;
                              console.log(results);
                            });
                        } getAssetDetails();

                        
                    

                        Asset
                          .deleteById({id: $stateParams.id})
                          .$promise
                          .then(function() {
                             $state.go('assets', {id : $scope.locationId}, { reload: true });
                          });
                      
      }]);      
      
     
          

