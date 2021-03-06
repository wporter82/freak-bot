require('dotenv').config();
const tmi = require('tmi.js');
const commandHandler = require('./modules/command-handler.js');
var help = require('./modules/help.js');

const opts = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

const client = new tmi.client(opts);

client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
    help.init();
});

client.on('message', onMessageHandler);

client.connect();

function onMessageHandler(target, context, msg, self) {
    if (self) { return; }

    commandHandler(client, target, context, msg);
       
}