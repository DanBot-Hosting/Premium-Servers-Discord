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
        let blacklisted = [
            '739231758087880845', '786363228287664190',
            '738839334333186068', '738840097218101309',
            '738844675372482720', '738846229919825992',
            '738548111323955270', '739175011721413009',
            '738785336187945051', '793547999753666620',
            '853645123748495382'
        ]
        //Channel checker

        if ((blacklisted.includes(message.channel.id)) && (message.member.roles.cache.find(x => x.id === '748117822370086932') == null && message.member.roles.cache.find(x => x.id === '778237595477606440') == null) &&
            !(message.channel.id === '738548111323955270' && command === 'info')) return;

        if (message.member.roles.cache.some(r => r.id == "788193704014905364")) {
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
