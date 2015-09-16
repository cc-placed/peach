// node main.js <username> <password>

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var j = request.jar();
var peach_url = 'https://www.peachd.com/accounts/signIn';

request({url: peach_url, jar: j}, function(error, response, html) {
	var coo = j.getCookieString(peach_url);

	var $ = cheerio.load(html);
	var csrf_input = $('input[name=csrfmiddlewaretoken]');
	var csrf = csrf_input[0].attribs.value;

	var credentials = {
		csrfmiddlewaretoken: csrf,
		identification: process.argv[2],
		password: process.argv[3]
	};

	request.post({
		uri: 'https://www.peachd.com/accounts/signIn',
		jar: j,
		// what else is needed beyond this referer header?
		headers: { 'referer': 'https://www.peachd.com/accounts/signIn' }
	}, function(err, res, body) {
		console.log(err);
		console.log(res);
		console.log(body);
	});
});

