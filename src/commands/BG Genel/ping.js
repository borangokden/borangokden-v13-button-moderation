const db = require("quick.db");
const config = require("../../../config.json")

module.exports = {
    name: "ping",
    aliases: ["pong"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        message.reply({ embeds: [embed.setDescription(`Anlık ping: " ${client.ws.ping} ms"`)] });
    } 
}