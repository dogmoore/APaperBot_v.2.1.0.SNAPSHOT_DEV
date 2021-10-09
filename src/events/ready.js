const config = require('../secrets/config.json');
module.exports = async client => {
    let userTag = client.user.tag;

    logger.info('****************\n');
    if(config.development.dev_mode) {
        logger.info('*DEVELOPMENT MODE ENABLED*\n');
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
        logger.info(`Username: ${config.development.bot.name}`);
        logger.info(`ID: ${config.development.bot.id}`);
        logger.info(`Tag: ${userTag}`);
        logger.info(`prefix: ${config.development.prefix}`);
        logger.info(`Version: ${config.development.version}`);
        logger.info(`(Pterodactyl Bot Online)`);
        logger.info('****************');
    } else {
        logger.info(`Username: ${config.main.bot.name}`);
        logger.info(`ID: ${config.main.bot.id}`);
        logger.info(`Tag: ${userTag}`);
        logger.info(`prefix: ${config.main.prefix}`);
        logger.info(`Version: ${config.main.version}`);
        logger.info(`(Pterodactyl Bot Online)`);
        logger.info('****************');
    }
}
