module.exports = (client, target, context, msg) => {
    var sides = msg.split(/ (.+)/)[1];
    if (sides) {sides = sides.split(' ')[0];}
    sides = parseInt(sides);

    if (!sides || sides.length == 0) {
        return `You have to specify how many sides on the die. Try !roll 20`;
    }

    if (sides < 2) {
        return `You can't roll a die with ${sides} sides. Try !roll 20`;
    }

    var roll = Math.floor(Math.random() * sides) + 1;
    var user = (context['display-name'] == '')? context.username : context['display-name'];

    return `${user} rolled a ${roll} on a d${sides}`;

}