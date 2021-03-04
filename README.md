# Freak-Bot

This is a simple twitch chat bot that runs via node

## Install and Running

* A .env file is required that contains the following:

        BOT_USERNAME=<username>
        CHANNEL_NAME=<channel name>
        OAUTH_TOKEN=<oauthtoken>

You must have the OAuth Token in order to use this bot: https://twitchapps.com/tmi/

    $ npm install
    $ node index.js