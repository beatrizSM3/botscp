

function interactionType(interactionDiscord,messageDiscord){
    
    const response = {
        user: {
        id: '',
        guild: ''
        },
        send: function() {}
    }

  if (interactionDiscord) {
    response.user.id = interactionDiscord.user.id;
    response.user.guild = interactionDiscord.guildId;
    response.send = async function (options) {
      return interactionDiscord.editReply(options);
    };
  } else {
    response.user.id = messageDiscord.author.id;
    response.user.guild = messageDiscord.guild.id;
    response.send = async function (options) {
      return messageDiscord.channel.send(options);
    };
  }

  return response

}

module.exports = {interactionType}