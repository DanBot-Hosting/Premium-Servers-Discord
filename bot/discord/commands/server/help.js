exports.run = async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
        .addField('__**Commands**__', 'Claim your free donator server: `' +
            config.DiscordBot.Prefix + 'server claim `')
    await message.channel.send(embed)
}
