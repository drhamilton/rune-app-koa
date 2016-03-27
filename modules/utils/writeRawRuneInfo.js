module.exports = function(req, res){
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

