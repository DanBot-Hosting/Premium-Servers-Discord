exports.run = async (client, message, args) => {

    //Deny if already claimed
    if (claimed.get(message.author.id) != null) {
        message.reply("You have already claimed your free premium servers. Check back at a later date to see if you can claim anymore!");
        return;
    }

    axios({
        url: "http://danbot.host/external/prem",
        method: 'POST',
        followRedirect: true,
        maxRedirects: 5,
        headers: {
            "password": config.externalPassword,
            "user": message.author.id
        },
        data: {
            "user": message.author.id
        }
    }).then(response => {

        message.reply('You have claimed for 4 **FREE** premium servers. Enjoy!')
        claimed.set(message.author.id, { claimed: true })
    }).catch(err => {console.log(err); message.reply('error while claiming servers. Main DBH bot might be down :(') });
}
