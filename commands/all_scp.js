const { EmbedBuilder, codeBlock, SlashCommandBuilder } = require("discord.js");
const { theme } = require("../config.json");
const { SCP } = require("../service/scpService");
const {pagination} = require("../utils/pagination.js")
const {interactionType} = require("../utils/interactionType.js")

let createEmbed = () => {
  return new EmbedBuilder()
    .setColor(parseInt(theme["scp-all-embed-color"]))
    .setDescription(codeBlock(`Item\tName${"\t".repeat(6)}Value`));
};

async function baseFunction(interactionDiscord, messageDiscord) {
  await interactionDiscord?.deferReply() 

  const data = await SCP.allscp("item, name, scpoints");
  let sliceddata = data.slice(0, 8);

  const embed = createEmbed();

  const res = interactionType(interactionDiscord,messageDiscord)

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

};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("allscp")
    .setDescription("show all scp"),

  execute: async (interaction) => await baseFunction(interaction),
  run: async (message) => await baseFunction(undefined, message)


  }
;
