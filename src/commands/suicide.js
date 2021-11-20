const Discord = require('discord.js');
const config = require('../secrets/config.json');
module.exports = {
    name: 'suicide',
    description: 'suicide',
    async execute(client, message, args) {
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max))
        }

        let jelly = '793674144910147616'; // jelly's guild ID
        let dog = '759170742154690560'; // dog's guild ID
        let taggedMember = message.mentions.members.first()

        let generalResp = ["was too gay for their own good and exploded", "found oil outside of America", "got shot and died of lead poisoning", "sent a pixelated dick pic", "became a superhero with a cape", "trolled life",
            "greatly misunderstood the term *choker*", "pressed *ALT + F4*", "used the forbidden bathbomb", "went to meet their savior, Satan", "tried to delete Discord from their devices", "tried to spill government secrets",
            "didn\'t commit suicide in their cell after running a pedo ring for the top 1%", "tried watching anime in public", "fell out of the world", "flew a kite with a brass key tied to it in a thunderstorm",
            "insulted Putin", "wanted to see what flavor electricity was", "harassed Thanos", "didn\'t share their ramen", "cyber-bullied Trump", "microwaved metal", "tried to taste human brains"];
        let mixResp = ["got tickled by jelly", "insulted jellyFish", "got on Jelly\'s bad side"];
        let jellyResp = ["tried to sleep with Cix", "decided to fuck Axton without Jelly"];
        let dogResp = ["insulted Fatal", "tried sleeping with Paper", "tried sleeping with Piper", "decided to meet Destiny\'s parents", "deicded to meet Waffle\'s parents"];

        let generalRand = getRandomInt(generalResp.length)
        let mixRand = getRandomInt(mixResp.length)
        let jellyRand = getRandomInt(jellyResp.length)
        let dogRand = getRandomInt(dogResp.length)

        let oneOfFour = getRandomInt(4)

        let resp = '';

        if(message.guild.id === dog && message.guild.id === jelly) {
            if(oneOfFour === 1) {
                resp = mixResp.at(mixRand)
            } else {
                resp = generalResp.at(generalRand)
            }
        }
        else if(message.guild.id === dog) {
            if(oneOfFour === 1) {
                resp = dogResp.at(dogRand)
            } else {
                resp = generalResp.at(generalRand)
            }
        }
        else if(message.guild.id === jelly) {
            if(oneOfFour === 1) {
                resp = jellyResp.at(jellyRand)
            } else {
                resp = generalResp.at(generalRand)
            }
        } else {
            resp = generalResp.at(generalRand)
        }
        if(resp !== '') {
            if(taggedMember === undefined) {
                message.reply(resp)
                logger.command('suicide', message.author.tag, message.guild.name)
            } else {
                message.channel.send(`${taggedMember} ${resp}`)
                logger.command('suicide', taggedMember, message.guild.name)
            }
        }
    }
}