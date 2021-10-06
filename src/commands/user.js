const Discord = require("discord.js");
module.exports = {
    name: 'user',
    description: 'The user based commands',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const moment = require('moment');
        const {footer, BotOwner, Prefix, dev_prefix, dev_mode} = require('../config.json');

        let timestamp = moment().format('MMM-DD-YYYY');
        let subcommand = args[0];
        let tagged_member = message.mentions.users.first();
        let all_count;
        let bot_count;
        let user_count;
        let avatarURL;
        let creation_date_raw;
        let creation_date_1;
        let creation_date;
        let user_info;

        let prefix;
        if(dev_mode) {
            prefix = dev_prefix;
        } else {
            prefix = Prefix;
        }

        if (tagged_member !== undefined) {
            avatarURL = tagged_member.displayAvatarURL({dynamic: true});
            creation_date_raw = tagged_member.createdTimestamp.toString();
            creation_date_1 = moment.unix(creation_date_raw / 1000).format('llll').toString();
            creation_date = creation_date_1.substring(0, creation_date_raw.length + 4);

            user_info = new Discord.MessageEmbed()
                .setColor('#c70606')
                .setImage(avatarURL)
                .setTitle(`User info for ${tagged_member.username}`)
                .addFields(
                    {name: `Username:`, value: tagged_member.username, inline: true},
                    {name: `Tag:`, value: tagged_member.tag, inline: true},
                    {name: `UserID:`, value: tagged_member.id},
                    {name: `Account created at:`, value: creation_date},
                )
                .setTimestamp()
                .setFooter(footer + BotOwner);
        }

        const member_count = message.guild.members.fetch().then(members => {
            all_count = members.size;
            bot_count = members.filter(member => member.user.bot).size;
            user_count = members.filter(member => !member.user.bot).size;

            const user_help = new Discord.MessageEmbed()
                .setColor('#c70606')
                .setTitle('User Help')
                .addField(`${prefix}user count`, 'Gives the current count of the server', false)
                .addField(`${prefix}user info`, 'Gives the info of the tagged user', false)
                .setFooter(footer + BotOwner)
                .setTimestamp();

            const user_count_embed = new Discord.MessageEmbed()
                .setColor('#c70606')
                .setTitle(`User Count for ${message.guild.name}`)
                .setImage('')
                .addField('Total count', `${all_count}`, false)
                .addField('User count', `${user_count}`, false)
                .addField('Bot count', `${bot_count}`, false)
                .setFooter(footer + BotOwner)
                .setTimestamp();

            if (subcommand === undefined) {
                message.channel.send(user_help)
                logger.debug(`Command user help was issued in guild ${message.guild.name} by ${message.author.tag}`)
            } else if (subcommand === 'count') {
                message.channel.send(user_count_embed)
                logger.debug(`Command user count was issued in guild ${message.guild.name} by ${message.author.tag}`)
            } else if (subcommand === 'info' || subcommand === 'details') {
                message.channel.send(user_info);
                logger.debug(`Command user info was issued in guild ${message.guild.name} by ${message.author.tag}`)
            }
        })
    }
}

