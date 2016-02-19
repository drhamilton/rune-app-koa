var domain = 'https://na.api.pvp.net/api/lol/na/v1.4';
var key    = 'df0f2c4b-4e06-40c4-86c8-1731f1dd2d60';

module.exports = {
    getRuneRoute: function(id){
        return `${domain}/summoner/${id}/runes?api_key=${key}`;
    },

    getSummonerRoute: function(username){
        return `${domain}/summoner/by-name/${username}?api_key=${key}`;
    }
}
