
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var mongodb= require("mongodb");
var MongoClient = mongodb.MongoClient;
var urldb = 'mongodb://urlshort:78292725@ds127993.mlab.com:27993/israelmarmar';     
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
 
 var db;

// Initialize connection once
MongoClient.connect(urldb, function(err, database) {
  if(err) throw err;

  db = database;


});


app.use("/", express.static(__dirname + '/'));

function encod(string){
	return Base64.encode(string).replace(/\+|\/|=/gi,"");
}

router.get('/apijson', function (req, res) {
	var array=[];
	

  db.collection("polls").find().toArray(function(err, result) {
    if (err) throw err;
	
	res.json(result);
  });

});


router.get('/polls/:id', function (req, res) {
	

  db.collection("polls").findOne({_id: req.params.id},function(err, result) {
    if (err) throw err;

	
		if(result)
		res.setHeader("Set-Cookie", ["json="+JSON.stringify(result)]);
	res.sendFile("/poll.html",{root: __dirname});

    
  });

	
});

router.get('/vote/:id', function (req, res) {
	var option=req.query.opt;
var resp=res;

 var myquery = { _id: req.params.id };
 var newvalues={};
  
  db.collection("polls").findOne(myquery,function(err, result) {
	  if (err) throw err;
	  
	  
	  
	  for(var i=0;i<result.chart.length;i++){
		 if(result.chart[i].option==option){
		  result.chart[i].freq=result.chart[i].freq+1;
	  newvalues=result;
		 }
	  }
	  
		db.collection("polls").findOne({userip: req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress},function(err, result) {
			if (err) { 
			resp.json({msg:"Error: You can only vote once a poll. [user-or-ip-voted]"});
			return;
			};
			
		});

		console.log(newvalues);
  db.collection("polls").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
	
		 db.collection("uservote").insertOne({userip: req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress, idpoll: req.params.id}, function(err, res) {
		if (err) throw err;
		});
		
    resp.json({msg: "You've voted for: " +option});
    
  });
  
  });


	
});

router.get('/', function (req, res) {
	res.sendFile("/index.html",{root: __dirname});
});
	

//app.listen(port, function () {
// console.log("ligado");
//});



app.use('/', router);
