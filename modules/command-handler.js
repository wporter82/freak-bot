var fs = require('fs');
var help = require('./help.js');

module.exports = (client, target, context, msg) => {
    var internalCommands = {};
    
    var command = String(msg.split(' ')[0]).replace('!', '').trim();
    var argument = msg.substring(String(msg.split(' ')[0]).length).trim();

    // load modules from the commands dir
    function externalCommand(command) {

        if (fs.existsSync(`./commands/${command}.js`)) {

            var output = require(`../commands/${command}.js`)(client, target, context, msg);
            
            if (output && typeof(output) === 'string') {
            
                client.say(target, output);
                console.log(`* ${context.username} Executed "${msg}" command`);
            
            } else if (output && typeof(output) === 'object') {
            
                output.then((result) => {
            
                    client.say(target, result);
                    console.log(`* ${context.username} Executed "${msg}" command`);
            
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }

    internalCommands.help = () => {
        client.say(target, help.toString());
    }

    if(msg.length > 2 && msg[0] == '!') {
        
        if (typeof internalCommands[command] === 'function') {
        
            internalCommands[command](command, argument);
        
        } else {
  
            externalCommand(command);
  
        }
    }

};