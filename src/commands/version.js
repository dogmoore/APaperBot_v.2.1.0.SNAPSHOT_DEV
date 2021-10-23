module.exports = {
    name: 'version',
    description: 'versions',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const config = require('../secrets/config.json')

        if(config.development.dev_mode) {
                message.channel.send(config.development.version)
        } else {
        	message.channel.send(config.main.version)
        }
    }
}
