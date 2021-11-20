const {Client, Collection} = require('discord.js');
const token = require('./secrets/token.json');
const fs = require('fs');
const config = require('./secrets/config.json');

const client = new Client();
client.commands = new Collection();


const log = require('../../NivalisMC_discord/discord/src/custom modules/logger/logger');
global.logger = global.logger || new log();

//checks folder EVENTS for javascript files
let a = 1;
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        logger.startUp(`attempting to load event: ${eventName}!`)
        a = a + 1;
        client.on(eventName, event.bind(null, client));
    });
    logger.success('loaded all events!');
});

//checks folder COMMANDS for javascript files
fs.readdir("./commands/", (err, files) => {
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        logger.critical("can't find commands!")
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        logger.startUp(`attempting to load command: ${props.name}!`)
        client.commands.set(props.name, props);
        a = a + 1;
    });
    logger.success('loaded all commands!')
});

//checks folder REPLIES for javascript files
fs.readdir("./replies/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const replies = require(`./replies/${file}`);
        let replyName = file.split(".")[0];
        logger.startUp(`attempting to load reply: ${replyName}!`);
        a = a + 1;
        client.on("message", replies.bind(null, client));
    });
    logger.success('loaded all replies!');
});

if (config.development.dev_mode) {
    client.login(token.Dev_Token);
} else {
    client.login(token.Main_Token);
}
