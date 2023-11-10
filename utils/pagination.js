
let currentPage = 0;
let counter = 0;

async function pagination(userID, message,data,embed) {
    
  await message.react("⏪");
  await message.react("◀️");
  await message.react("▶️");
  await message.react("⏩");

  const filter = (reaction, user) => {
    return (
      ["◀️", "▶️", "⏪", "⏩"].includes(reaction.emoji.name) &&
      user.id === userID
    );
  };

  const collector = message.createReactionCollector(filter, { time: 15000 });

  message
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === "▶️") {
        message.reply("you reacted with a thumbs up.");
      } else {
        message.reply("you reacted with a thumbs down.");
      }
    })
    .catch((collected) => {
      message.reply("you reacted with neither a thumbs up, nor a thumbs down.");
    });

  collector.on("collect", async (reaction, user) => {
    if (user.bot) return;
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

    let new_sliceddata = data.slice(counter, counter + 8);
    if (reaction.emoji.name === "▶️") {
      counter = counter + 8;
      currentPage++;
      sliceddata = data.slice(counter, counter + 8);
    }
    if (reaction.emoji.name === "◀️" && currentPage != 0) {
      counter = counter - 8;
      currentPage--;
      sliceddata = data.slice(counter, counter + 8);
    }

    if (reaction.emoji.name === "⏪" && currentPage != 0) {
      currentPage = 0;
      counter = 0;
      sliceddata = data.slice(counter, counter + 8);
    }
    if (
      reaction.emoji.name === "⏩" &&
      currentPage < Math.ceil(data.length / 8)
    ) {
      currentPage = Math.ceil(data.length / 8) - 1;
      counter = currentPage * 8;
      sliceddata = data.slice(counter, counter + 8);
      console.log(currentPage, counter);
    }

    embed.data.fields = [];

    sliceddata.forEach((scp) => {
      embed.addFields(
        { name: `${scp.item}`, value: "\u200B", inline: true },
        { name: `${scp.name}`, value: "\u200B", inline: true },
        { name: `${scp.scpoints}`, value: "\u200B", inline: true }
      );
    });

    await message.edit({
      content: " rank of scp registered in the foundation",
      embeds: [embed],
    });
    // await message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} items`);
  });

  
}

module.exports = {pagination}