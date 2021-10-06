const Discord = require("discord.js");
const config = require("../secrets/config.json");
const perm = require("../secrets/permissions.json")
const permError = new Discord.MessageEmbed()
    .setColor(config.embed.colors.error.permission)
    .setTitle('Permissions Error')
    .setURL('https://bit.ly/2JMYqCD')
    .setThumbnail('https://i.imgur.com/8lRaG6L.png')
    .addField("You do not have the proper permissions for this", `If this is a mistake please let ${config.main.owner.tag} know`, true)
    .setTimestamp()
    .setFooter(config.embed.footer);

function typing_timer(msg) {
    let WPM = 80
    return ((msg.length*13.3)/WPM)*1000
}

module.exports = async (client, message) => {
    if(message.author.bot) return
    if(message.content.includes('testing')) {
        //if(message.author.id === perm.bypass.owner) { //looks for the paperbot node [OWNER | TESTER] found in permissions file
            let msg = message.content;
            //await message.channel.send(typing_timer(msg) + 'ms')
        //} else {
        //    await message.channel.send(permError)
        //}
    }
}