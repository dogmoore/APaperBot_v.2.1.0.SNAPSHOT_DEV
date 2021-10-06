const Discord = require("discord.js");
const config = require("../secrets/config.json")
const perm = require("../secrets/permissions.json")
module.exports = {
    name: 'say',
    description: 'make the bot talk',
    async execute(client, message, args) {
        let msg = message.content.substring(5);

        const length_Error = new Discord.MessageEmbed()
            .setColor('#c70606')
            .setTitle('Length Error')
            .setURL('https://bit.ly/2JMYqCD')
            .setThumbnail('https://i.imgur.com/8lRaG6L.png')
            .addField('You need to add a message if you want me to say it', '\u200b', false)
            .setTimestamp()
            .setFooter(config.embed.footer);

        const permission_Error = new Discord.MessageEmbed()
            .setColor('#c70606')
            .setTitle('Permission Error')
            .setURL('https://bit.ly/2JMYqCD')
            .setThumbnail('https://i.imgur.com/8lRaG6L.png')
            .addField('You do not have permissions for this command', `Currently only the bot owner \`${config.main.owner.tag}\` has access`, false)
            .setTimestamp()
            .setFooter(config.embed.footer);

        function del() {
            message.delete();
        }

        function typing_timer(msg) {
            let WPM = 80
            return ((msg.length*13.3)/WPM)*1000
        }

        if (!args.length) {
            if (message.author.id === perm.bypass.owner) {
                await message.channel.send(length_Error);
            } else {
                await message.channel.send(permission_Error);
            }
        } else if (message.author.id !== perm.bypass.owner) {
            setTimeout(del, 50);
            await message.channel.send(permission_Error);
        } else if (message.author.id === perm.bypass.owner) {
            setTimeout(del, 50);
            console.log(`Timer is: ${typing_timer(msg)}`)
            await message.channel.startTyping();
            setTimeout(() => {
                message.channel.stopTyping().then(() => {
                    message.channel.send(msg);
                });
            }, typing_timer(msg))
            await message.channel.stopTyping()
            if(config.modules.channelLogging) {
                let channelLog = client.channels.cache.find(channel => channel.id === config.logging.devChannel)
                channelLog.send(`Command say issued in guild ${message.guild.name} by ${message.author.tag} and said ${msg}`)
            }
            logger.debug(`Command say issued in guild ${message.guild.name} by ${message.author.tag} and said ${msg}`)
        }
    }
}