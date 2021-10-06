module.exports = {
    name: 'version',
    description: 'versions',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const config = require('../secrets/config.json')

        message.channel.send(config.development.version)
    }
}