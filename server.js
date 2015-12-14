var express = require('express');
var app = express();
var request = require('superagent');
var axios = require('axios');
var Q = require('q');
var fs = require('fs');

app.use(express.static('public'));

var domain = 'https://na.api.pvp.net/api/lol/na/v1.4';
var key = 'df0f2c4b-4e06-40c4-86c8-1731f1dd2d60';

function getRuneRoute(id){
    return domain +  `/summoner/${id}/runes` + '?api_key=' + key;
}

function getSummonerRoute(username){
    return domain + '/summoner/by-name/' + username + '?api_key=' + key;
}

//get rune data
app.get('/runes', function(req, res) {
    axios.
        get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/rune?api_key=df0f2c4b-4e06-40c4-86c8-1731f1dd2d60')
        .then(function(res){
            var data = JSON.stringify(res.data.data, null, 2);
            fs.writeFile('runes.json', data, function (err) {
                if (err) throw err;
            });
        })
});

app.get('/api/:username', function (req, res) {
    var username = req.params.username;
    var summonerEndpoint = getSummonerRoute(username);

    var getRunes = function(id){
        return axios
                .get(getRuneRoute(id))
                .then(function(res){
                    return res;
                });
    }

    axios
        .get(summonerEndpoint)
        .then(function(res){
            var name = Object.keys(res.data)[0];
            var id = res.data[name].id

            var data = {
                id: id
            };

            return data;
        })
        .then(function(res) {
            return getRunes(res.id);
        })
        .then(function(result){
            res.send(result.data)
        })
        .catch(function(res){
            console.log('errored');
            console.error('res', res)
        });
});

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App is running on port', app.get('port'));
});
