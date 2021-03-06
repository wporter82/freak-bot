module.exports = (client, target, context, msg) => {
    if (context.emotes === null) { 

        const emoteText = msg.split(/ (.+)/)[1];

        if (emoteText !== undefined) {
            return `${emoteText} is not a Twitch emote. Try !emoteURL FrankerZ`;
        } else {
            return "You have to give me an emote to analyse. Try !emoteURL FrankerZ";
        }
    }
    const emoteID = Object.keys(context.emotes)[0];
    const emoteURL = `https://static-cdn.jtvnw.net/emoticons/v2/${emoteID}/default/dark/3.0`;

    return `${emoteURL}`;

}