const {codeBlock} = require("discord.js")

const helper = [
    '?register:: register a new researcher in SCP Foundation',      
    '?sp:: spawn a random anomalie, only to authorized personal!!!',
    '?pf:: shows researcher documentation',
    '?allscp: shows all anomalies to be contained',
    '?rank :: shows the most efficient researchers in Foundation',  
    '?scps:: shows all contained anomalies by a researcher',        
    '?scprank:: shows the rank of anomalies'
  ]

function help() {
    let aux = ""
    helper.forEach(h => aux+=codeBlock(h))

    return aux
}

module.exports = { help }

