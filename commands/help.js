const {SlashCommandBuilder, EmbedBuilder, codeBlock, bold  } = require('discord.js');
const {interactionType} = require("../utils/interactionType.js")
const {help} = require("../utils/helper.js")

const createEmbed = () => {
    return new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("Commands for SCP")
        .setDescription(help())
        
}

async function replyFunction(interactionDiscord, messageDiscord) {
    await interactionDiscord?.deferReply() 

    const res = interactionType(interactionDiscord,messageDiscord)

    const embed = createEmbed()

    const message = await res.send({
        embeds: [embed],
    })

}

module.exports = { 
    data: new SlashCommandBuilder()
            .setName("help")
            .setDescription("show all commands"),
   
        execute: async (interaction) =>  await replyFunction(interaction, undefined),
        run: async (message) =>  await replyFunction(undefined, message)
}