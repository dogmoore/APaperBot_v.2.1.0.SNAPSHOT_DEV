const Discord = require('discord.js');
const config = require('../secrets/config.json');
const perm = require('../secrets/permissions.json');
module.exports = {
    name: 'Help',
    description: 'Help Command',
    async execute(client, message, args) {
        let prefix = config.main.prefix
        if(config.development.dev_mode) {
            prefix = config.development.prefix
        }

        const helpEmbed = Discord.MessageEmbed

        let success = false

        if (message.author.id === perm.bypass.owner) {
            //code
        } else {
            perm.bypass.admin.forEach(ID => {
                if (message.author.id === ID) {
                    //code
                    success = true
                }
            })
            perm.bypass.panel.forEach(ID => {
                if (message.author.id === ID) {
                    //code
                    success = true
                }
            })
            perm.main.admin.forEach(ID => {
                if (message.author.roles === ID) { //NEED TO FIX
                    //code
                    success = true
                }
            })
            perm.main.tester.forEach(ID => {
                if (message.author.roles === ID) { //NEED TO FIX
                    //code
                    success = true
                }
            })
            perm.main.moderator.forEach(ID => {
                if (message.author.roles === ID) { //NEED TO FIX
                    //code
                    success = true
                }
            })
        }
        if(!success) { //DEFAULT HELP

        }
    }
}