module.exports = async (client, message) => {
    const Discord = require('discord.js');

    let asa = '386356830449827851';
    if (message.author.id === asa) {
        if (message.content.includes('fair enough')) {
            await message.channel.send('what\'s fair enough gay boy?')
        }
    }
}