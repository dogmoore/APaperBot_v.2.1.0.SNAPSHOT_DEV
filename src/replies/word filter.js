const Discord = require('discord.js')
const config = require('../secrets/config.json')
const filter = require('../custom modules/filter/word-filter.json')
const guilds = require('../custom modules/filter/guilds.json')

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

let OneOfFour = getRandomInt(4)

/**
 *
 * @param message DiscordMessage
 */

function filterMSG(message) {
    let wordFound = false
    let msg = message.content.toLowerCase()
    let specialReply = ["Please watch the mother fucking language", "Listen, kid, I know you think its funny or cool to swear, but it isn't", "...Please don't swear, I've asked this before...",
        "Fuck you for using that kind of language", "Do you kiss your mother with that mouth"];
    let GeneralReply = ["Please watch your language"];

    this.finish = () => {
        if(message.guild.id === "793674144910147616") {
            if(OneOfFour === 2) {
                message.channel.send(GeneralReply.at(getRandomInt(GeneralReply.length)))
            } else {
                message.channel.send(specialReply.at(getRandomInt(specialReply.length)))
            }
        } else {
            message.channel.send(GeneralReply.at(getRandomInt(GeneralReply.length)))
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