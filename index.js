require('dotenv').config();
const tmi = require('tmi.js');

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

var thereYetTime = 0;

client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);

client.connect();

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

function onMessageHandler(target, context, msg, self) {
    if (self) { return; }

    const commandName = msg.trim();

    if (commandName.startsWith('!')) {
        if (commandName === '!dice') {
            const num = rollDie();
            const user = (context['display-name'] == '')? context.username : context['display-name'];
            
            client.say(target, `${user} rolled a ${num} on a d6`);

            console.log(`* Executed ${commandName} command`);

        } else if (commandName.match(/^\![Dd]?[1-9]\d*$/)) {
            const sides = commandName.match(/\d+/)[0];
            const num = rollDie(sides);
            const user = (context['display-name'] == '')? context.username : context['display-name'];

            client.say(target, `${user} rolled a ${num} on a d${sides}`);

            console.log(`* Executed ${commandName} command`);

        } else if (commandName === '!time') {
            const currentDateTime = new Date();

            client.say(target, `It's currently: ${currentDateTime}`);

            console.log(`* Executed ${commandName} command`);

        } else if (commandName === '!arewethereyet') {
            let currentTimestamp = Date.now();

            if (thereYetTime == 0) {
                client.say(target, `No, stop asking!`);
                thereYetTime = currentTimestamp;
            } else {
                let elapsedTime = millisToHHMMSS(currentTimestamp - thereYetTime);
                
                client.say(target, `No, stop asking! It's only been ${elapsedTime} since you last asked!`);
                
                thereYetTime = currentTimestamp;
            }

            console.log(`* Executed ${commandName} command`);

        } else if (commandName.startsWith('!emoteURL')) {
            if (context.emotes == null) { return; }
            const emoteID = Object.keys(context.emotes)[0];
            const emoteURL = `https://static-cdn.jtvnw.net/emoticons/v2/${emoteID}/default/dark/3.0`;

            client.say(target, `${emoteURL}`);

            console.log(`* Executed ${commandName} command`);

        } else {
            console.log(`* Unknown command ${commandName}`);
        }
    }

    function rollDie(sides = 6) {
        return Math.floor(Math.random() * sides) + 1;
    }

    function millisToHHMMSS(millis) {
        var seconds = millis / 1000;
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - (hours * 3600)) / 60);

        if (hours < 10) { hours = `0${hours}`;}
        if (minutes < 10) { minutes = `0${minutes}`;}
        if (seconds < 10) { seconds = `0${seconds}`;}

        return `${hours}:${minutes}:${seconds}`;
    }
}