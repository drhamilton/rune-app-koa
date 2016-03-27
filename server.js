var express = require('express');
var app = express();
var axios = require('axios');
var fs = require('fs');
var util = require('util');
var riotRoutes = require('./modules/riotRoutes')
var writeRawRuneInfo = require('./modules/utils/writeRawRuneInfo')
app.use(express.static('public'));

var getRunes = function(id){ 
  return axios 
    .get(riotRoutes.getRuneRoute(id))
    .then(function(res){
      return res;
    })
}


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

//app.get('/runes', getRawRuneInfo);
app.get('/api/:username', getRuneData);
app.set('port', (process.env.PORT || 7000));

var server = app.listen(app.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App is running on port', app.get('port'));
});
