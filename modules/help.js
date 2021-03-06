var fs = require('fs');

module.exports = {
    helpString: "",

    toString: () => {
        return this.helpString;
    },

    init: () => {
        this.helpString = 'The following commands are available: ';
        this.helpString += '!help (get help for commands)';
        // this.helpString += ' | !quit (terminate bot)';
        // this.helpString += ' | !join (tell bot to listen in a new channel)';
        // this.helpString += ' | !part (tell bot to leave a channel)';
        // this.helpString += ' | !say (tell bot to speak in a channel)';

        fs.readdirSync('./commands/').forEach((file) => {
            this.helpString += ` | !${file.replace(/\.js$/, '')}`;
        });

    }
}