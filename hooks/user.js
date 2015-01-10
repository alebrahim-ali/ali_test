var  http 		= require('http')
	, _ 	 	= require('underscore')
	, hook 		= {}
	, Q 		= require("q")
	, db;

exports.run = function(options){
	db = options.db;
}
exports.newUser = function(client,profile){

}
exports.login = function(session,callback){
	var options = {}
	,promiseRel = {}
	,json = {}
	,promises = [];
	options.one = true;
	options.select = {"login":0,"ip":0,"__v":0}
	//console.log("start with session: ",session)
	if(session.i){
		promiseRel.i = Q.defer();
		promises.push(promiseRel.i.promise); 
		db.read("instance",{"_id":session.i},options,function(e0,d0){

			json.error 		= e0;
			json.result.i 	= d0;
			promiseRel.i.resolve({key:"i",result:d0})
		})
	}
	if(session.c){
		promiseRel.c = Q.defer();
		promises.push(promiseRel.c.promise); 
		db.read("client",{"_id":session.c},options,function(e0,d0){

			json.error 		= e0;
			json.result.c 	= d0;
			promiseRel.c.resolve({key:"c",result:d0})
		})
	}
	if(session.p) {
		promiseRel.p = Q.defer();

		promises.push(promiseRel.p.promise); 
		db.read("profile",{"_id":session.p},options,function(e0,d0){

			json.error 		= e0;
			json.result.p 	= d0;
			promiseRel.p.resolve({key:"p",result:d0})
		})
	}
		json.result = {}
		
	if(!_.has(session,"auth"))
		json.error = "Not Logged in";

			
	Q.allSettled(promises)
	.then(function(results){
		results.forEach(function (result) {
			//console.log("done with",result.value.key)
			json.result[result.value.key] = result.value.result;
		})
		callback(json)

	})

}
exports.logout = function(session){
}
exports.app = function(session,callback){

	
	callback({})
}