const {EmbedBuilder, codeBlock, SlashCommandBuilder} = require("discord.js")
const {theme} = require("../config.json")
const {Player} = require("../service/playerService.js")
const {pagination} = require("../utils/pagination.js")
const {interactionType} = require("../utils/interactionType.js")

let createEmbed = () => {
    return new EmbedBuilder()
        .setColor(parseInt(theme["scp-rank-embed-color"]))
        .setDescription(codeBlock(`Name\t\tscpoints`))
}


async function baseFunction(interactionDiscord, messageDiscord) {
  await interactionDiscord?.deferReply() 

  const data = await Player.playerRank(100,"name,scpoints")
    
  let sliceddata = data.slice(0, 8);
  const embed = createEmbed();

  const res = interactionType(interactionDiscord, messageDiscord)

  sliceddata.forEach((player) =>
    embed.addFields(
      { name: `${player.name}`, value: " ", inline: true },
      { name: `${player.scpoints}`, value: " ", inline: true },
      {name:" ",value:" "} 
    )
  );

  const message = await res.send({
    content: "shows all player scps",
    embeds: [embed],
    fetchReply: true
  });

  await pagination(res.user.id,message,data,embed)

}

module.exports = {
    data: new SlashCommandBuilder()
      .setName("rank")
      .setDescription("show top 100 players rank"),
  
    execute: async (interaction) => await baseFunction(interaction),
    run: async (message) => await baseFunction(undefined, message)
  
  
}