const Discord = require('discord.js')
const config = require('../secrets/config.json')
const filter = require('../secrets/word-filter.json')

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

/**
 *
 * @param message DiscordMessage
 */

function filterMSG(message) {
    let wordFound = false
    let msg = message.content.toLowerCase()
    let replyMSG = 10
    let reply = '';

    this.finish = () => {
        if(message.guild.id === "793674144910147616") {
            switch(getRandomInt(replyMSG + 1)) {
                case 0:
                    reply = '';
                    break;
                case 1:
                    reply = '';
                    break;
                case 2:
                    reply = '';
                    break;
                case 3:
                    reply = '';
                    break;
                case 4:
                    reply = '';
                    break;
                case 5:
                    reply = '';
                    break;
                case 6:
                    reply = '';
                    break;
                case 7:
                    reply = '';
                    break;
                case 8:
                    reply = '';
                    break;
                case 9:
                    reply = '';
                    break;
                case 10:
                    reply = '';
                    break;
                default:
                    reply = '';
                    break;
            }
        }
        wordFound = true;
        logger.reply('Word Filter', message.guild.name, message.author.tag, msg)
    }

    if(message.author.bot) return

    for(let swearWord of filter.swear) {
        if(new RegExp(swearWord).test(msg)) {
            wordFound = true;
            break;
        }
    }

    if(wordFound) return this.finish()

    for(let racistWord of filter.racist) {
        if(new RegExp(racistWord).test(msg)) {
            wordFound = true;
            break;
        }
    }

    if(wordFound) return this.finish()

    for(let bypassWord of filter.bypass) {
        if(new RegExp(bypassWord).test(msg)) {
            wordFound = false;
            break;
        }
    }

    if(wordFound) return this.finish()
}

module.exports = (client, message) => {
    if(config.modules.filter) {
        filterMSG(message)
    }
}