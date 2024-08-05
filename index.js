const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const TOKEN = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// setting up the commands and events:
client.commands = new Collection();
client.events = new Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
})

client.login(TOKEN)






