const config = require("../secrets/config.json");
module.exports = {
    name: 'ping',
    description: 'pings the bot',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const config = require('../secrets/config.json');
        const m = await message.channel.send(':loading: **Calculating...**');
        let ping = m.createdTimestamp - message.createdTimestamp;

        m.edit("...")
        m.delete()

        if (isNaN(message.client.ping)) {
            const embed2 = new Discord.MessageEmbed()
                .setColor(config.embed.colors.success)
                .setTitle('Latency')
                .setURL('https://bit.ly/2JMYqCD')
                .setThumbnail('https://i.imgur.com/8lRaG6L.png')
                .setDescription("━━━━━━━━━━━━━━━━━━━━━")
                .addField("Bot Latency", `${ping}ms`, true)
                .addField("API Latency", `Not Available`, true)
                .setTimestamp()
                .setFooter(config.embed.footer);
            await message.channel.send(embed2)
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(config.embed.colors.success)
                .setTitle('Latency')
                .setURL('https://bit.ly/2JMYqCD')
                .setThumbnail('https://i.imgur.com/8lRaG6L.png')
                .setDescription("━━━━━━━━━━━━━━━━━━━━━")
                .addField("Bot Latency", `${ping}ms`, true)
                .addField("API Latency", `${Math.round(message.client.ping)}ms`, true)
                .setTimestamp()
                .setFooter(config.embed.footer);
            await message.channel.send(embed)
        }
        if(config.modules.channelLogging) {
            let channelLog = client.channels.cache.find(channel => channel.id === config.logging.devChannel)
            const log = new Discord.MessageEmbed()
                .setColor(config.embed.colors.logging)
                .setTitle('Command Issued')
                .setURL('https://bit.ly/2JMYqCD')
                .setThumbnail('https://i.imgur.com/8lRaG6L.png')
                .addField(message.author.tag, `Command \`Ping\` used in server ${message.guild.name} and returned \`${ping}ms\``)
                .setTimestamp()
                .setFooter(config.embed.footer);
            //channelLog.send(log)
        }
        logger.command('ping', message.author.tag, message.guild.name, ping)
    }
}
