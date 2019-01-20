const request = require('sync-request');

exports.login = (login,password) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmail = emailRegex.test(login);
    if(!isEmail) {
      return false;
    }
    
    
   let loginResp = request.post( global.config.stellitepay.url + '/login',{ json: {
        'email':login,
		'password':password,
		'key':global.config.stellitepay.merchant_key
   } });

   const loginRespJson = JSON.parse(loginResp.getBody('utf8'));
 
  if(loginRespJson.status !== 'success'){
		return false;
  }
  
  const sessionid = loginRespJson.message.access_token;
  
   let userResp = request.get( global.config.stellitepay.url + '/user',{ headers: {
	  	'Authorization: Bearer ' .sessionid,
		'Content-Type: application/json',
   } });
    
   const userRespJson = JSON.parse(userResp.getBody('utf8'));
  
   if(!userRespJson.status){
   		return false;
   }
   
   return userRespJson.message.address;
}
