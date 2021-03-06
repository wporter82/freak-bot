module.exports = (client, target, context, msg) => {

    const currentDateTime = new Date();

    return `It's currently: ${currentDateTime}`;

}