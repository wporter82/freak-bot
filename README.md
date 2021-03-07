# Freak-Bot

This is a simple but extensible Twitch chat bot that runs via nodejs

Watch me building it live on [Twitch](https://twitch.tv/freakzombie) or see the past streams on [Youtube](https://youtube.com/playlist?list=PL_eqRphNyF_Sc3QijRRFqZAnV5pWQW_is).

# Setup

You have to create a file named `.env` that contains the following:

``` ini
BOT_USERNAME=<username>
CHANNEL_NAME=<channel name>
OAUTH_TOKEN=<oauthtoken>
```

You must have the OAuth token for your account in order to use this bot: [Twitch TMI](https://twitchapps.com/tmi/)

More info can be found at [Getting Started with Chatbots & IRC](https://dev.twitch.tv/docs/irc).

This will use your Twitch account if you are already logged in but you can create a new account just for your bot and use that for the username and OAuth token.

Install all dependencies needed:

    $ npm install

# Running

Once you have the `.env` file filled in, run the following command to start running locally:

    $ npm start

You should see the following output to let you know that the bot is connected:

    > freak-bot@0.1.0 start
    > node index.js
    
    * Connected to irc-ws.chat.twitch.tv:443

`NOTE:` The server you connect to could be different than above.

# Usage

The following commands are available by default but more can be added with scripts in the commands folder

> `!help` - Displays available commands

> `!time` - Gets the current time on the system the bot is running on and displays in the chat

> `!roll <number>` - Rolls a die with `<number>` of sides and mentions the user along with what they rolled

> `!google <search query>` - Returns the top 3 Google results

> `!emoteURL <Twitch emote>` - Gets a direct link to the image file used to display the specified emote