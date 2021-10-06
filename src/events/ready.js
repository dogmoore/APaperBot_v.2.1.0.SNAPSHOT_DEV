const config = require('../secrets/config.json');
module.exports = async client => {
    let userTag = client.user.tag;

    console.log('\n****************');
    if(config.development.dev_mode) {
        console.log('\n*DEVELOPMENT MODE ENABLED*\n');
        await client.user.setActivity('IN DEVELOPMENT', {type: 'PLAYING', status: 'active'});
    }
    else {
        if(config.development.dev_mode) {
            await client.user.setActivity('IN DEVELOPMENT', {type: 'PLAYING', status: 'active'});
        } else {
            await client.user.setActivity('with Paper\'s head', {type: 'PLAYING', status: 'active'});
        }
    }
    if(config.development.dev_mode) {
        console.log(`Username: ${config.development.bot.name}`);
        console.log(`ID: ${config.development.bot.id}`);
        console.log(`Tag: ${userTag}`);
        console.log(`prefix: ${config.development.prefix}`);
        console.log(`Version: ${config.development.version}`);
        console.log(`(Pterodactyl Bot Online)`);
        console.log('****************');
    } else {
        console.log(`Username: ${config.main.bot.name}`);
        console.log(`ID: ${config.main.bot.id}`);
        console.log(`Tag: ${userTag}`);
        console.log(`prefix: ${config.main.prefix}`);
        console.log(`Version: ${config.main.version}`);
        console.log(`(Pterodactyl Bot Online)`);
        console.log('****************');
    }
}
