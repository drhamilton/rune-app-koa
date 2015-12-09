var express = require('express');
var app = express();
var request = require('superagent');

app.use(express.static('public'));

app.get('/api', function (req, res) {
    var data = {
        greeting: 'bubber ducky'
    };

    // request
    //     .get()
    //     .end(function(err, res){
    //
    //     });

    res.send(data);
});

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App is running on port', app.get('port'));
});
