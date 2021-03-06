var assert = require('assert');
var help = require('../modules/help');

describe('Commands', () => {
    describe('roll', () => {
        it('should return a valid roll', () => {
            assert.match(require('../commands/roll')({},"serverName",{username:'username','display-name':''},"!roll 6"), /username rolled a [1-6] on a d6/);
        });
        it('should return a valid roll', () => {
            assert.match(require('../commands/roll')({},"serverName",{username:'username','display-name':'DisplayName'},"!roll 20"), /DisplayName rolled a (.+) on a d20/);
        });
        it('should return a usage message', () => {
            assert.strictEqual(require('../commands/roll')({},"serverName",{username:'username','display-name':''},"!roll"), "You have to specify how many sides on the die. Try !roll 20");
        });
    });

    describe('time', () => {
        it('should return the current time', () => {
            assert.strictEqual(require('../commands/time')({},"serverName",{},"!time"), `It's currently: ${new Date()}`);
        });
    });

    describe('emoteURL', () => {
        it('should return the URL for an emote', () => {
            assert.strictEqual(require('../commands/emoteURL')({},"serverName",{emotes:{65:[]}},"!emoteURL FrankerZ"), 'https://static-cdn.jtvnw.net/emoticons/v2/65/default/dark/3.0');
        });
        it('should tell us that there is no emote', () => {
            assert.strictEqual(require('../commands/emoteURL')({},"serverName",{emotes:null},"!emoteURL"), 'You have to give me an emote to analyse. Try !emoteURL FrankerZ');
        });
        it('should tell us that the emote is not valid', () => {
            assert.strictEqual(require('../commands/emoteURL')({},"serverName",{emotes:null},"!emoteURL SourPls"), 'SourPls is not a Twitch emote. Try !emoteURL FrankerZ');
        });
    });

    describe('google', () => {
        it('should get the top 3 google results', async () => {
            const search = await require('../commands/google')({say:(t,m)=>{}},"serverName",{},"!google alttp");
            assert.match(search, /Here are the top 3 Google results for the search "alttp":/);
        });
    });
});

describe('Modules', () => {
    describe('help', () => {
        it('should return undefined', () => {
            assert.strictEqual(help.init(), undefined);
        });
        it('should return help message', () => {
            assert.strictEqual(help.toString(), "The following commands are available: !help (get help for commands) | !emoteURL | !google | !roll | !time");
        });
    });

    describe('command-handler', () => {
        it('should print out a valid dice roll', () => {
            var response = "";
            require('../modules/command-handler')({say:(t,m)=>{response = m;}},"",{'display-name':'DisplayName',username:'username'},"!roll 20");
            assert.match(response, /DisplayName rolled a (.+) on a d20/);
        });
    });
});