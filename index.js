/*
    ____              ____        __     __  __           __  _
   / __ \____ _____  / __ )____  / /_   / / / /___  _____/ /_(_)___  ____ _
  / / / / __ `/ __ \/ __  / __ \/ __/  / /_/ / __ \/ ___/ __/ / __ \/ __ `/
 / /_/ / /_/ / / / / /_/ / /_/ / /_   / __  / /_/ (__  ) /_/ / / / / /_/ /
/_____/\__,_/_/ /_/_____/\____/\__/  /_/ /_/\____/____/\__/_/_/ /_/\__, /
Free Hosting forever!                                            /____/
*/

global.config = require("./config.json");

global.fs = require("fs");
global.chalk = require('chalk');
global.axios = require('axios');
global.pretty = require('prettysize');

//Discord Bot
let db = require("quick.db");
global.Discord = require("discord.js");

global.messageSnipes = new Discord.Collection();
global.fs = require("fs");
global.moment = require("moment");
global.claimed = new db.table("claimed");       //Stores data of who has claimed their premium servers
global.client = new Discord.Client({
    restTimeOffset: 0,
    disableMentions: 'everyone',
    restWsBridgetimeout: 100,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

global.bot = client;

//Event handler
fs.readdir('./bot/discord/events/', (err, files) => {
    files = files.filter(f => f.endsWith('.js'));
    files.forEach(f => {
        const event = require(`./bot/discord/events/${f}`);
        client.on(f.split('.')[0], event.bind(null, client));
        delete require.cache[require.resolve(`./bot/discord/events/${f}`)];
    });
});

//Bot login
client.login(config.DiscordBot.Token);
global.Allowed = ["137624084572798976"];
