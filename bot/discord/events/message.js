module.exports = (client, message) => {

    if (message.author.bot) return; // to stop bots from creating accounts, tickets and more.
    if (message.channel.type === "dm") return; //stops commands working in dms
    const prefix = config.DiscordBot.Prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandargs = message.content.split(' ').slice(1).join(' ');
    const command = args.shift().toLowerCase();
    console.log(chalk.magenta("[DISCORD] ") + chalk.yellow(`[${message.author.username}] [${message.author.id}] >> ${prefix}${command} ${commandargs}`));
    try {

        if (message.member.roles.cache.some(r => r.id == "898041754564046869")) {
            if (command === "server") {
                //Cooldown setting
                if (!args[0]) {
                    let commandFile = require(`../commands/${command}/help.js`);
                    commandFile.run(client, message, args);
                } else {
                    let commandFile = require(`../commands/${command}/${args[0]}.js`);
                    commandFile.run(client, message, args);
                }
            } else {
                let commandFile = require(`../commands/${command}.js`);
                commandFile.run(client, message, args);
            }
        }
    } catch (err) {
        console.log(err)
    }
};
