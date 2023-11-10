
const {EmbedBuilder, codeBlock, SlashCommandBuilder, userMention} = require("discord.js")
const {theme} = require("../config.json")
const {Player} = require("../service/playerService.js")
const {pagination} = require("../utils/pagination.js")
const {interactionType} = require("../utils/interactionType.js")


let createEmbed = () => {
  return new EmbedBuilder()
      .setColor(parseInt(theme["scp-rank-embed-color"]))
      .setDescription(codeBlock(`Item\tName${"\t".repeat(6)}Value`));
}

async function baseFunction(interactionDiscord,messageDiscord) {
  await interactionDiscord?.deferReply() 

  const res = interactionType(interactionDiscord,messageDiscord)


  const data = await Player.playerScps(res.user.id,res.user.guild,"item,name,scpoints")
 
  let sliceddata = data.slice(0, 8);
  const embed = createEmbed();

  sliceddata.forEach((scp) =>
    embed.addFields(
      { name: `${scp.item}`, value: "\u200B", inline: true },
      { name: `${scp.name}`, value: "\u200B", inline: true },
      { name: `${scp.scpoints}`, value: "\u200B", inline: true }
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
      .setName("playerscp")
      .setDescription("show player scp collection"),
  
    execute: async (interaction) => await baseFunction(interaction,undefined),
    run: async (message) => await baseFunction(undefined, message)
  
  
}