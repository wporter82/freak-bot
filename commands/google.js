var serp = require('serp');

module.exports = (client, target, context, msg) => {
    var query = msg.split(/ (.+)/)[1];
    
    if (!query || query.length == 0) {
        return `No search terms given. Try !google alttp`;
    }
    
    var search = serp.search({
        host: 'google.com',
        qs: {
            q: query,
            filter: 0,
            pws: 0
        },
        num: 3
    }).then((res) => {
        var results = `Here are the top 3 Google results for the search "${query}":`;

        for (var i = 0; i < res.length; i++) {
            var params = res[i].url.split("&");

            for (var x = 0; x < params.length; x++) {
                if (params[x].split("=")[0] === 'url') {
                    results += ` | ${i+1}: ${res[i].title} - ${params[x].split("=")[1]}`;
                }
            }
        }

        return results;

    }).catch((err) => {
        console.error(err);
        return err;
    });

    return search;
   
}