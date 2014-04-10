var fs = require('fs');
var csv = require('csv');
var http = require('http');
var exec = require('exec');
var async = require('async');
var mkpath = require('mkpath');

var DOWNLOAD_DIR = './downloads/';

csv()
.from.path(__dirname+'/opdrachten.csv', { delimiter: ';', escape: '"' })
.to.array( function(data){

	async.eachLimit(data, 30, function(row, callback){
		var file_name = row[0];
		var dir = DOWNLOAD_DIR + row[2] + '/';

		mkpath.sync(dir);

		var url = "";

		var file = fs.createWriteStream(dir + file_name);
		http.get(url + row[0], function(res) {
	    	res.on('data', function(data) {
	    			file.write(data);
	        	}).on('end', function() {
	            	file.end();
	            	console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
	            	callback();
	        	});
	    	});

	});
});