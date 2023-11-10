// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, IntentsBitField, GatewayDispatchEvents } = require('discord.js');

const {prefix} = require('./config.json')
const dotenv = require('dotenv')
dotenv.config()

const {TOKEN, CLIENT_ID, GUILD_ID} = process.env

//importação dos comandos
const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildMembers] });


client.commands = new Collection()

//configuration of slash commands
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//configuration for events
const files = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
// Loop over each file
for (const file of files) {
  // Split the file at its extension and get the event name
  const eventName = file.split(".")[0];
  // Require the file
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}



// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


//listenner 
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) {
		console.error("command not found")
		return
	}
	try {		
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: error, ephemeral: true });
	}
});





client.login(TOKEN);


