const {Player} = require('../service/playerService')
const {SlashCommandBuilder, EmbedBuilder, codeBlock, bold  } = require('discord.js');
const  { theme }  =  require('../config.json')
const {interactionType} = require("../utils/interactionType.js")

const addSpaceToTitle = (title) => {
    // Verifica se o título não contém espaço
    if (!title.includes(' ')) {
      // Adiciona um espaço antes de cada letra maiúscula
      return title.replace(/([A-Z])/g, ' $1').trim();
    }
    return title;
  };

const createEmbed = (data, title, avatar) => {
    return new EmbedBuilder()
        .setColor(parseInt(theme['profile-embed-color']))
        .setTitle(`${data.name}`)
        .setDescription(codeBlock(`${title}`))
        .setThumbnail(`${avatar}`)
        .addFields(
            {name: " ", value: " " },
            {name: "Level", value: bold(`${data.level}`),  inline: true},
            {name: "class", value: bold(`${data.className}`), inline: true},
            {name: "scpoints", value: bold(`${data.scpoints} <:scpoints:895521377224888341>`), inline:true}
        )
}

async function replyFunction(interactionDiscord, messageDiscord) {
    await interactionDiscord?.deferReply() 

    const res = interactionType(interactionDiscord,messageDiscord)

    const data = await Player.playerbyid(res.user.id,res.user.guild)
    const avatar = interactionDiscord? interactionDiscord.user.avatarURL(): messageDiscord.author.avatarURL()

    const embed = createEmbed(data, addSpaceToTitle(data.title), avatar)

    const message = await res.send({
        embeds: [embed],
    })

}

module.exports = { 
    data: new SlashCommandBuilder()
            .setName("p")
            .setDescription("show profile of player"),
   
        execute: async (interaction) =>  await replyFunction(interaction, undefined),
        run: async (message) =>  await replyFunction(undefined, message)
}
