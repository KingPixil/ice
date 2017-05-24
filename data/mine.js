var request = require('request');
var forismatic = require('forismatic-node')();
var fs = require('fs');
var hexu = require('hexu');


var quotes = fs.readFileSync(__dirname + "/data.txt").toString().split("\n") || [];
module.exports.quotes = quotes;

// console.log(hexu.blue("*** Ice is mining data ***"));
function pushData(cb) {
  
  quotes = quotes.filter(function(item, pos) {
    return quotes.indexOf(item) === pos;
  })
  fs.writeFile(__dirname + '/data.txt', quotes.join("\n"), function (err) {
    cb();
  });
}

function mineData() {
  request('http://quote.machinu.net/api', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);
        if(obj.text.split(" ").length <= 7 && obj.text.split(" ").length >= 3) {
          console.log(hexu.green("\t Success \u2713 => ") + "Mined Data: " + obj.text);
          quotes.push(obj.text);
        }
      }
  });

  // forismatic.getQuote(function (err, quote) {
  //   if(err) {
  //     throw err;
  //   }
  //   if(quote.quoteText.split(" ").length <= 7) {
  //     console.log(hexu.green("\t Success \u2713 => ") + "Mined Data: " + quote.quoteText);
  //     quotes.push(quote.quoteText);
  //   }
  // });
}

setInterval(mineData, 1000);
setInterval(() => {pushData(function() {})}, 60 * 1000);


process.on('SIGINT', function() {
    pushData(function() {
      process.exit();
    });
});
