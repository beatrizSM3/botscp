
const  { prefix }  =  require('../config.json')
const {Player} = require('../service/playerService.js')
//const client = require('../index.js')

module.exports = async (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    // // Ignore messages not starting with the prefix (in config.json)
    if (!message.content.startsWith(prefix)) return;

    
    //console.log(message)
    response = Player.playerbyid(message.author.id, message.guildId) 
    console.log(response)
    if ( response == "not found") {
      message.channel.send("You're not in foundation!")
      return
    }

    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    //console.log(command)
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    //console.log(cmd)
    // // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // // Run the command
    await cmd.run(message);
  };