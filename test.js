// Simple Javascript example

console.log('Loading client web page ...');
var page = require('webpage').create();
var url = 'http://localhost:3000/client.html';

page.open(url, function (status) {
  //Page is loaded!
  phantom.exit();
  console.log('Done.')
});


console.log('Loading agent web page ...');
var page = require('webpage').create();
var url = 'http://localhost:3000/agent.html';

page.open(url, function (status) {
  //Page is loaded!
  phantom.exit();
  console.log('Done.')
});
