var test = require('tape')
var riotRoutes = require('../modules/riotRoutes')
var getPastGames = require('../modules/getPastGames')
var getCurrentGame = require('../modules/getCurrentGame')

test('test routes', function(t) {
    t.plan(2)

    t.equal('https://na.api.pvp.net/api/lol/na/v1.4/summoner/123/runes?api_key=df0f2c4b-4e06-40c4-86c8-1731f1dd2d60', riotRoutes.getRuneRoute(123))
    t.equal('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/diz?api_key=df0f2c4b-4e06-40c4-86c8-1731f1dd2d60', riotRoutes.getSummonerRoute('diz'))
})

test('it should get the past 10 games', function(t) {
  t.plan(1)

  var pastGames = getPastGames();

  t.equal(pastGames.length, 10)
})

test('it should get the current game', function(t) {
  t.plan(1)
  
  var currentGame = getCurrentGame();

  t.equal(currentGame, true);
})
