const {
  SlashCommandBuilder,
  codeBlock,
  bold,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const { theme } = require("../config.json");
const {no_image,warning,classes} = require("../utils/utilsScp.json")
const { SCP } = require("../service/scpService.js");
const { Player } = require("../service/playerService.js");
const {interactionType} = require("../utils/interactionType.js")

// const path = require('path');

// const baseNoImage = '../images/no_image.png';
// const warning = '../images/warning.jpg'
// const absoluteNoImagePath = path.resolve(__dirname, baseNoImage)
// const absoluteWarningPath = path.resolve(__dirname, warning);

//const file = new AttachmentBuilder('../images/no_image.png');

// console.log(absoluteNoImagePath)

const createEmbed = (data) => {
  return new EmbedBuilder()
    .setDescription(codeBlock(`${data.item}\t${data.name}`))
    .setColor(parseInt(theme["scp-embed-color"]))
    .setThumbnail(
      warning
    )
    .setImage(
      data.image || no_image
    )
    .addFields(
      {
        name: bold("CLASS"),
        value: `\t${classes[data.objectClass]}` || classes["default"],
        inline: true,
      },
      { name: bold("CLAIMS"), value: `${data.claims}`, inline: true },
      { name: bold("SCPOINTS"), value: `${data.scpoints}`, inline: true }
    );
};

async function baseFunction(interactionDiscord, messageDiscord) {
  await interactionDiscord?.deferReply();
  const data = await SCP.random();

  const embed = createEmbed(data);
  const res = interactionType(interactionDiscord,messageDiscord)

  const message =  await res.send({
    content: "spawn a random scp",
    embeds: [embed],
    fetchReply: true
  });

  await message.react("🔒");

  const filter = (reaction, user) => {
    return (
      (["◀️", "▶️", "⏪", "⏩"].includes(reaction.emoji.name) &&
        user.id === interactionDiscord?.interaction.user.id) ||
      messageDiscord?.author.id
    );
  };

  const collector = message.createReactionCollector(filter, {
    filter: filter,
    time: 100000,
    errors: "time",
  });

  message
    .awaitReactions({ filter: filter, max: 1, time: 100000, errors: "time" })
    .then(async (collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === "🔒") {
        console.log("aaa");
      }
    })
    .catch((collected) => {
      console.log(collected);
      collector.stop();
    });

  collector.on("collect", async (reaction, user) => {
    if (user.bot) return;

    console.log(`Collected ${reaction.emoji.name} from ${user}`);

    if (reaction.emoji.name === "🔒") {
      response = await Player.addScp(user.id, message.guildId, data.item)
        .then(
          async () => await Player.updateXp(user.id, message.guildId),
          await Player.updateScpoints(user.id, message.guildId, data.item),
          await SCP.updateclaim(data.item, "item")
        )
        .catch((error) => {
          message.channel.send({
            embeds: [new EmbedBuilder().setDescription(error)],
            ephemeral: true,
          });
        })
        .finally(collector.stop());

      message.channel.send({
        embeds: [new EmbedBuilder().setDescription(response)],
        ephemeral: true,
      });
    }
  });

  collector.on("end", (collected, reason) => {
    console.log(`Collected ${collected.size} items`);
    console.log(`Reason: ${reason}`);

    if (collected.size == 0) {
      message.edit({
        embeds: [
          new EmbedBuilder().setDescription(
            "The time has run out, the scp scaped"
          ),
        ],
      });
    }
  });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription(
      "a random scp will be spawned, only authorized personnel may use this..."
    ),

  execute: async (interaction) => await baseFunction(interaction, undefined),
  run: async (message) => await baseFunction(undefined, message),
};
