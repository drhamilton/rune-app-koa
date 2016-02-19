var express = require('express');
var app = express();
var axios = require('axios');
var fs = require('fs');
var util = require('util');
var riotRoutes = require('./modules/riotRoutes')

app.use(express.static('public'));

var getRunes = function(id){
    return axios
                .get(riotRoutes.getRuneRoute(id))
                .then(function(res){
                    return res;
                })
}

var getRawRuneInfo = function(req, res){
    var runeData = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/rune?api_key=df0f2c4b-4e06-40c4-86c8-1731f1dd2d60';
    axios
        .get(runeData)
        .then(function(res){
            var data = JSON.stringify(res.data.data, null, 2);
            fs.writeFile('runes.json', data, function (err) {
                if (err) throw err;
            })
        })
};

//get rune data
app.get('/runes', getRawRuneInfo);

var getRuneData = function(req, res){
    var username = req.params.username;
    var summonerEndpoint = riotRoutes.getSummonerRoute(username);

    axios
        .get(summonerEndpoint)
        .then(function(res) {
            var name = Object.keys(res.data)[0];
            var id = res.data[name].id

            return getRunes(id);
        })
        .then(function(result){
            console.log(util.inspect(result.data, false, null))
            res.send(result.data)
        })
        .catch(function(res){
            console.log('errored')
            console.error('res', res)
        });
};

app.get('/api/:username', getRuneData);
app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App is running on port', app.get('port'));
});
