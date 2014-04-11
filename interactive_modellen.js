var fs = require('fs');
var csv = require('csv');
var http = require('http');
var exec = require('exec');
var async = require('async');
var mkpath = require('mkpath');
var crypto = require('crypto');

var DOWNLOAD_DIR = './Interactieve modellen/';

csv()
.from.path(__dirname+'/shizzle.txt.csv', { delimiter: '`', escape: '"' })
.to.array( function(data){

	var i = 0;

	async.eachLimit(data, 30, function(row, callback){

		var file_name = row[0];
		var dir = DOWNLOAD_DIR + row[1] + '/';

		mkpath.sync(dir);

		fs.writeFile(dir + file_name, row[2], function(){
			callback();
			console.log(++i, "Saved file " + dir+file_name);
		});
	});
});