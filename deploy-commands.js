const {Routes, REST } = require("discord.js")


const dotenv = require('dotenv')
dotenv.config()

const {TOKEN, CLIENT_ID, GUILD_ID} = process.env


//importação dos comandos
const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = []

for (const file of commandFiles) {
    const command = require(`${commandsPath}/${file}`);
	commands.push(command.data.toJSON())
}

const rest = new REST({version: "10"}).setToken(TOKEN);

(async() => {
    try {
        console.log("Started refreshing application (/) commands.")
        const data = await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            {body: commands}
        )

        console.log("Successfully reloaded application (/) commands.")
    } catch (error) {
        console.error(error)
    }
})()


