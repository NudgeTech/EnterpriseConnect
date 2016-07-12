module.exports = function(app) {
  //var User = app.models.User;
  var EConnectUser = app.models.EConnectUser;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;


  //create admin role 

  //check if admin role exisits and if it doesnt create it
  Role.findOne({

      where: { name: "admin"}}, function(err, role){
      if(!role){

          Role.create({
             name: 'admin'
                }, function(err, role) {
                  if (err) throw err;

                  console.log('Created role:', role);

                
              });  

            
      }else if (role){

          var type = role.name;
          console.log('found admin role' + type);
      }


  });

    

    //find user and check if already assigned to admin role or not
   EConnectUser.findOne({
    where: {email: 'mikecrooks83@gmail.com'} 
  }, function(err, user) {

      if(!user){
          
          console.log ("user does not exisit");

      }else if (user){

           console.log ("user exisits");

           //check if admin already? 
            var principalId = user.id;
            console.log(principalId);

           RoleMapping.findOne({
            where: {principalId: principalId}}, function(err, role){
              if(!role){
                  console.log('user is not assigned');
                  //this is where to assign the user to the role if not already assigned. 
                    Role.findOne({
                          where: { name: "admin"}}, function(err, role){
                          if(!role){
                            //role does not exisit
                                
                          }else if (role){

                              role.principals.create({
                                principalType: RoleMapping.user,
                                principalId: principalId
                              }, function(err, principal){
                                    console.log("error in mapping role");
                              });
                          }
                     });


              }else if (role){
                 console.log('user is  assigned');

                
              }

           });

        
        

      }


  });
          
       
            
        

  



   

}