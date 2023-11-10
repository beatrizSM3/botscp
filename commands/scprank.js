const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require("discord.js");
const {theme} = require('../config.json')
const { SCP } = require('../service/scpService.js')
const {pagination} = require("../utils/pagination.js")
const {interactionType} = require("../utils/interactionType.js")

//demora muito pra responder o banco de dados !!!!
let createEmbed = () => {
    return new EmbedBuilder()
        .setColor(parseInt(theme["scp-rank-embed-color"]))
        .setDescription(codeBlock(`Item\tName${"\t".repeat(6)}Value`));
}

async function baseFunction(interactionDiscord, messageDiscord) {

    await interactionDiscord?.deferReply() 

    const data = await SCP.scprank(100, "item, name, scpoints")
    let sliceddata = data.slice(0, 8)

    //console.log(sliceddata,'ssssss')
    const embed = createEmbed();
    const res = interactionType(interactionDiscord, messageDiscord)

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
        .setName("scprank")
        .setDescription("SCP top 100 Ranking"),
    
        execute: async (interaction) =>  await baseFunction(interaction, undefined),
        run: async (message) =>  await baseFunction(undefined, message)
}