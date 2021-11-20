const Discord = require('discord.js');
const nodeactyl = require('nodeactyl'); //paperbot server id: 0f68686b
const config = require('../secrets/config.json')
const bypassCheck = require('../custom modules/permissions/bypassCheck')
const PetroClient = new nodeactyl.NodeactylClient(config.Ptero.url, config.Ptero.apiKey);
const petroApp = new nodeactyl.NodeactylApplication(config.Ptero.url, config.Ptero.apiKey);

/*
    TO DO:
    - wrong permission embed
    - ptero logging color
    - a working file
    - add to modules?

 */

module.exports = {
    name: 'ptero',
    description: 'Pterodactyl server control',
    async execute(client, message, args) {
        let subcommand = args[0].toLowerCase();  //primary sub-commands
        let arg1 = args[1] // secondary sub-commands and misc
        let arg2 = args[2] // misc

        let check = new bypassCheck()

        let prefix;
        if(config.development.dev_mode) {
            prefix = config.development.prefix
        } else {
            prefix = config.main.prefix
        }
        if(prefix === undefined || prefix === null) return logger.critical('PTERO FILE ERROR PREFIX NOT DEFINED')

        let PermTest = {
            owner: config.main.owner.id,
            panelAdmin: check.PanelBypass(),
            test: function() {
                return true
                //if(message.author.id === this.owner) return true
            }
        }

        let argError =  new Discord.MessageEmbed()
            .setColor(config.embed.colors.error.syntax)
            .setTitle('Argument Error')
            .setURL('https://bit.ly/2JMYqCD')
            .setThumbnail('https://i.imgur.com/8lRaG6L.png')
            .addField("Please add either a server ID or an accepted subcommand", `\`help\` is always an accepted sub-command\nIf there is a mistake please let ${config.main.owner.tag} know`, false)
            .setTimestamp()
            .setFooter(config.embed.footer);

        if(PermTest) { // create perm error embed
            if (subcommand === "list") {
                if(arg1 === undefined) {
                    await message.channel.send(argError)
                    return;
                }
                if (arg1.toLowerCase() === "help") {
                    await message.channel.send(`Format is: \`${prefix}server list [help|all]\``)
                }
                if (arg1.toLowerCase() === "all") {
                    petroApp.getAllServers().then(servers => {servers.forEach(x => message.author.send(x))}).catch();
                }
            } else if (subcommand === "details") {
                if(arg1 === undefined) {
                    await message.channel.send(argError)
                    return;
                }
                if(arg1.toLowerCase() === "help") {
                    await message.channel.send(`Format is: \`${prefix}server details [help|server id]\``)
                } else {
                    try {
                        logger.console(petroApp.getServerDetails(arg1))
                    } catch (e) {
                        logger.error(e)
                    }
                }
            } else if(subcommand === "restart") {
                if(arg1 === undefined) {
                    await message.channel.send(argError)
                    return;
                }
                if (arg1.toLowerCase() === "help") {
                    await message.channel.send(`Format is: \`${prefix}server restart [help|server id]\``)
                } else {
                    try {
                        await PetroClient.restartServer(arg1.toString())
                        await message.channel.send("Command confirmed, attempting to restart server");
                        logger.debug(`restart issued for server ${arg1}`)
                    } catch (e) {
                        logger.error(e)
                    }
                }
            } else if(subcommand === "stop") {
                if(arg1 === undefined) {
                    await message.channel.send(argError)
                    return;
                }
                if(arg1.toLowerCase() === "help") {
                    await message.channel.send(`Format is: \`${prefix}server stop [help|kill|now|server id]\``)
                }
                if (arg1.toLowerCase() === "kill" || arg1.toLowerCase() === "now") {
                    if(arg2 === undefined) {
                        await message.channel.send(argError)
                        return;
                    }
                    try {
                        await PetroClient.killServer(arg2)
                        await logger.debug(`killed server ${arg2}`)
                        await message.channel.send(`Command confirmed, attempting to kill server ${arg2}`)
                    } catch (e) {
                        logger.error(e)
                    }
                } else {
                    try {
                        await PetroClient.stopServer(arg2)
                        await logger.debug(`stopping server ${arg2}`)
                        await message.channel.send(`Command confirmed, attempting to stop server ${arg2}`)
                    } catch (e) {
                        logger.error(e)
                    }
                }
            } else if(subcommand === "user") { //only will use DM
                if(arg1 === undefined) {
                    await message.channel.send(argError)
                    return;
                }
                if(arg1 === "help") {
                    await message.channel.send(`Format is: \`${prefix}server stop [help|details|all] [username]\`\n***THIS ONE IS SENT TO DM ONLY***`)
                }
                if(arg1 === "details") {
                    try{
                        //code
                    } catch (e) {
                        logger.error(e)
                    }
                } else if(arg1 === "all") {
                    try {
                        //code
                    } catch (e) {
                        logger.error(e)
                    }
                }
            } else if(subcommand === "start") {
                if (arg1 === undefined) {
                    await message.channel.send(argError)
                    return;
                }
                if (arg1 === "help") {
                    await message.channel.send(`Format is: \`${prefix}server start [help|server id]\``)
                }
                else {
                    try {
                        await message.channel.send("Command confirmed, attempting to start server");
                        await PetroClient.startServer(arg1);
                    }
                    catch (e) {
                        logger.error(e)
                    }
                }
            } else if(subcommand === "status") {

            } else if(subcommand === "usage") { //dm is option(might need extra args param
                let arg3 = args[2] // dm argument

            } else if(subcommand === "help") {

            } else {

            }
        } else {
            message.reply("Sorry you don't have the proper permissions to use any server commands") // INSERT PERM ISSUE EMBED HERE
        }
    }
}