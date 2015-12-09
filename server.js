var express = require('express');
var app = express();
var request = require('superagent');

app.use(express.static('public'));

app.get('/api', function (req, res) {
    var url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
    var username = 'RiotSchmick';
    var key = 'df0f2c4b-4e06-40c4-86c8-1731f1dd2d60';
    var api = url + username + '?api_key=' + key;

    request
        .get(api)
        .end(function(err, resp){
            var name = Object.keys(resp.body)[0];
            var id = resp.body[name].id

            var data = {
                id: id
            };

            res.send(data);
        });
});

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App is running on port', app.get('port'));
});
