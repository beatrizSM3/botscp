// add player in 
const {Player} = require('../service/playerService')
const {SlashCommandBuilder } = require('discord.js');
//const {interactionType} = require("../utils/interactionType.js")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("register")
            .setDescription("register researcher in SCP Foundation"),
            
            execute: async (interaction) => {
                const response = await Player.add(
                    interaction.user.id, interaction.guildId, interaction.user.username
                )

                await interaction.reply(response)
            },
            run: async (message) => {
                const response = await Player.add(
                    message.author.id, message.guild.id, message.author.username
                )

                await message.channel.send(response)
            }

}






