const Discord = require('discord.js');
const config = require('../secrets/config.json');
const perm = require('../custom modules/permissions/permissions.json');
const fs = require('fs')
module.exports = {
    name: 'logger',
    description: 'messes with logger',
    async execute(client, message, args) {
        let subcommand;
        let subcommand2 = null;
        let msg1 = message.content;
        let msg;
        if(config.development.dev_mode) {
            msg = msg1.substring(13)
        } else {
            msg = msg1.substring(14)
        }
        let fileArgs = msg.split(';')
        try {
            subcommand = args[1].toLowerCase()
            subcommand2 = args[2].toLowerCase()
        } catch (e) {

        }
        let path = '../Bot_Logs/'
        if(message.author.id === perm.bypass.owner) {
            let command = args[0].toLowerCase();
            if(command === "delete") {
                if(subcommand === "all") {
                    logger.console('logger test delete all')
                } else {
                    logger.console('logger test delete else')
                }
            }
            else if(command === 'new') {
                if(subcommand2 === null) {
                    //code
                } else {
                    fs.writeFile(path + fileArgs[0]+'.txt', fileArgs[1].toString(), function (err) {
                        if(err == null) {
                            logger.info('File created')
                        } else {
                            logger.error(err)
                        }
                    })
                }
            }
            else if(command === 'read') {
                if(subcommand === 'files') {
                    fs.readdir(path, (err, file) => {
                        file.forEach(file => {
                            message.channel.send(file)
                        })
                    })
                }
            } else {
                //code
            }
        } else {
            //code
        }
    }
}