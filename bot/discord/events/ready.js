module.exports = async (client) => {
    console.log(chalk.magenta('[DISCORD] ') + chalk.green(client.user.username + " has logged in!"));

    //Auto Activities List
    const activities = [{
        "text": "users claim their free premium servers",
        "type": "WATCHING"
    }
    ];

    setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.text, {
            type: activity.type
        });
    }, 30000);

};
