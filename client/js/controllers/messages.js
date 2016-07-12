
//567e77fbddc83d46ce0a0ddd GDF client id (this will be obtained when a user logs in)

angular
  .module('app')
        .controller('MessageInfoController', ['$scope', '$state','$stateParams', '$rootScope', 'Client', 'Site', 'Message', 'EConnectUser', 'Location', function($scope,
            $state, $stateParams, $rootScope, Client, Site, Message, EConnectUser, Location) {

                 var LocationID = $stateParams.id;
                //API call gets the client, sites and locations details for id 567e77fbddc83d46ce0a0ddd
                 var clientId = $scope.currentUser.clientId;
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
                           // console.log(siteID);

                             function getSiteName(){
                                Site 
                                  .findById({id : siteID})
                                  .$promise
                                  .then(function(results){
                                      $scope.site = results;
                                     // console.log(results);
                                  });
                              }getSiteName();

                        });

                }getSiteID();

               



              //API to get nudges for the provided location ID

            $scope.messages = [];
           // $scope.createdbynames = [];
           // $scope.createdfornames =[];
       
                function getMessages(){
                    Location
                      .find({
                          filter: {
                              where: {id: LocationID},
                               include : [
                                        {
                                          "relation": "messages",
                                          "scope": "EConnectUser"
                                        }                        
                                     ]
                          }
                      })
                       .$promise
                          .then(function(results) {
                                console.log("results: " + JSON.stringify(results));
                            
                              $scope.messages = results[0].messages;

                              angular.forEach($scope.messages, function(item){
                                console.log(JSON.stringify(item));
                                console.log("======");


                                      Client.econnectUsers
                                        .findById( {id: clientId,

                                            fk: item.econnectUserId
                                        }
                                              
                                              
                                        )
                                        .$promise
                                        .then(function(userresults) {
                                //console.log(JSON.stringify(userresults));
                                //console.log("======");
                                item.createdForUser = userresults;
                            
                                           //$scope.createdfornames.push({name : results.firstname + " " + results.lastname});
                                            //$scope.nudges.push({createdforname:  userresults.firstname + " " + userresults.lastname});
                                            
                                        });

                                       
                                 
                                  
                              });


                                        console.log($scope.messages);
                             
                            
                         });
                    

                } getMessages();  


            

            //Add Nudge
              $scope.addMessage = function() {}

                //TODO: must check that the beacon minor ID doesnt exisit to prevent duplicates. 
                //
                ///////////////
                                
         
              
      }])
      .controller('DeleteMessageController', ['$scope', '$state', 'Message',  '$stateParams', function($scope,
            $state,  Message, $stateParams) {

                       
                      //};//getClientDetails();
      }]);      
      
     
          

