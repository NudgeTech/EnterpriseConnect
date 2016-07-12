module.exports = function(Message) {

	Message.observe('before save', function (ctx, next) {
		  if (ctx.instance) {
		    ctx.instance.date_created = new Date();
		    ctx.instance.complete = false;
		  } else {
		    ctx.data.date_created = new Date();
		    ctx.data.complete = false;
		  }
		  next();
	});

	Message.complete = function(messageID, cb){
		var response;
		var messageID = messageID;

		//find the message to update
		Message.findById(messageID, function(err, message) {
	  			if(!message){
	  				console.log(messageID);
	  				console.log ("This Message has been removed or does not exisit");
	  			}else{
	  				message.updateAttributes({
	  					id: message.id,
	  					complete: true
	  				}, function(err) {
		  					console.log("error check");
		  					if(err){
		  						console.log("error occured");
		  					}else{

		  						console.log("no error");	  						
		  					}

	  				});

  			}

  		});
		
		cb(null, response);
	};

	//expose the method through REST
    Message.remoteMethod('complete', {
        accepts: {
            arg: 'messageID',
            type: 'string'
        },
        returns: {
            arg: 'response',
            type: 'string'
        },
        http: {
            path: '/complete',
            verb: 'post'
        }
    });

};
