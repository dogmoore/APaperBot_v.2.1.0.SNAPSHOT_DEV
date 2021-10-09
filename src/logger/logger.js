const Discord = require('discord.js');
const moment = require('moment');
const fs = require('fs')
const colors = require('colors')
const config = require('../secrets/config.json') //everything should be either config.logging or config.embed
const color = require('./color.json') //NEED TO FINISH MAKING

let client = Discord.Client;

let time = moment().format('LTS');//sets the time format for all logs
let headerTime = moment().format('MMM Do YYYY');//sets the time format for header and file naming

colors.setTheme({
    default: color.default,
    warn: color.warn,
    debug: color.debug,
    error: color.error,
    critical: [color.error, 'bgWhite', 'underline'],
    success: color.success
})

function SaveToFIle(type, msg) {
    let header = `APAPERBOT LOG ${headerTime}`;//MAKE THIS FANCY
    let path = '../Bot_Logs'
    let log = `[${type.toUpperCase()}|${time}] ${msg}\n`;

    if(!fs.existsSync(path)) {
        fs.mkdir(path, function (err) {
            console.error(`[ERROR|${time}] FAILED TO MAKE LOG FOLDER!\n${err}`)
        })
        fs.writeFile(path + `/${headerTime}_log.txt`, `${header}\n\n${log}`, function (err) {
            console.error(`[ERROR|${time}] FAILED TO MAKE LOG FILE!\n${err}`)
        })
    } else {
        fs.appendFile(path + `/${headerTime}_log.txt`, log, function (err) {
            if (err !== null) {
                console.error(`[ERROR|${time}] FAILED TO LOG EVENT TO FILE!\n${err}`)
            }
        })
    }
}

function SaveToChannel(msg) {
    if(config.logging.SaveToChannel) {
        let channelID;
        if (config.logging.logChannel === '') {
            channelID = config.logging.devChannel
        } else {
            channelID = config.logging.logChannel
        }
        const ChannelLog = new Discord.MessageEmbed()//WRITE THIS LATER
        //client.on('ready', () => {
            //let channelLog = client.channels.cache.find(channel => channel.id === channelID)
        //})
    }
}

class logger {
    constructor(STF, STC) {
        this.STF = config.logging.SaveToFile
        this.STC = config.logging.SaveToChannel
    }
    info(log) {
        if(config.logging.info) {
            if (this.STF) {
                SaveToFIle('info', log)
            }
            if (this.STC) {
                SaveToChannel(log)
            }
            console.log(`[INFO|${time}] ${log}`.default)
            }
        }
    debug(log) {
        if(config.logging.debug) {
            if (this.STF) {
                SaveToFIle('debug', log)
            }
            if (this.STC) {
                SaveToChannel(log)
            }
            console.log(`[DEBUG|${time}] ${log}`.debug)
        }
    }
    warn(log) {
        if(config.logging.warn) {
            if (this.STF) {
                SaveToFIle('warning', log)
            }
            if (this.STC) {
                SaveToChannel(log)
            }
            console.log(`[WARNING|${time}] ${log}`.warn)
        }
    }
    error(log) {
        if(config.logging.error) {
            if (this.STF) {
                SaveToFIle('error', log)
            }
            if (this.STC) {
                SaveToChannel(log)
            }
            console.log(`[ERROR|${time}] ${log}`.error)
        }
    }
    critical(log) {
        if(config.logging.critical) {
            if (this.STF) {
                SaveToFIle('critical', log)
            }
            if (this.STC) {
                SaveToChannel(log)
            }
            console.log(`[CRITICAL|${time}] ${log}`.critical)
        }
    }
    success(log) {
        if(config.logging.success) {
            if (this.STF) {
                SaveToFIle('success', log)
            }
            if (this.STC) {
                SaveToChannel(log)
            }
            console.log(`[SUCCESS|${time}] ${log}`.success)
        }
    }
    console(log) {
        if(config.logging.console) {
            if (this.STF) {
                SaveToFIle('console', log)
            }
            if (this.STC) {
                SaveToChannel(log)
            }
            console.log(`[CONSOLE|${time}] ${log}`.default)
        }
    }
    command(log) {
        if(config.logging.command) {
            if (this.STF) {
                SaveToFIle('command', log)
            }
            if(this.STC) {
                SaveToChannel(log)
            }
            console.log(`[COMMAND|${time}] ${log}`.default)
        }
    }
    startUp(log) {
        if(config.logging.startUp) {
            if (this.STF) {
                SaveToFIle('start-up', log)
            }
            if(this.STC) {
                SaveToChannel(log)
            }
            console.log(`[START-UP|${time}] ${log}`.default)
        }
    }
}

module.exports = logger;