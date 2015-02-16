var express = require('express');
var router = express.Router();

// var request = require('request');
var googleapis = require('googleapis');
var drive = googleapis.drive('v2');
var OAuth2 = googleapis.auth.OAuth2;
var config = require('../config/config.js');
var folderID = config.folderID; 
var SERVICE_ACCOUNT_EMAIL = config.SERVICE_ACCOUNT_EMAIL;
var CLIENT_ID = config.CLIENT_ID;
var SERVICE_ACCOUNT_KEY_FILE = config.SERVICE_ACCOUNT_KEY_FILE;
var SCOPE = config.SCOPE;

router.get('/', function(req, res) {

	var jwt = new googleapis.auth.JWT(
		        SERVICE_ACCOUNT_EMAIL,
		        SERVICE_ACCOUNT_KEY_FILE,        
		        null,
		        SCOPE
		    );

	googleapis.options({auth: jwt});

	jwt.authorize(function(err, token) {
		if (err) {
			console.log(err);
			return;
		}

		drive.files.list({q: '"' + folderID + '" in parents', maxResults: 1000}, function (err, resp) {    
		if (!err) {
			
			resp.items.forEach(function (el) {
				var splitThumbnail = el.thumbnailLink.split('=');
				
				splitThumbnail = splitThumbnail[0] + '=w1890-h820';
				el.theImg = splitThumbnail
			});
			
			res.render('index.html', {images: resp} ); //
			}
		});
	});
});

module.exports = router;