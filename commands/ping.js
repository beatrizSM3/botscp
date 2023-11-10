const {SlashCommandBuilder } = require('discord.js');
const {interactionType} = require("../utils/interactionType.js")

async function ping(interactionDiscord,messageDiscord) {
	const res = interactionType(interactionDiscord,messageDiscord)
	await res.send('Pong!');
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
        
	execute : async (interaction) => await ping(interaction, undefined),
	run: async (message) => await ping(undefined, message),
};