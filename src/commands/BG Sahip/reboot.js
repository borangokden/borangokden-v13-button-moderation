const config = require("../../../config.json");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "reboot",
    aliases: ["yenile"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(message.author.id !== (config.bot.owner)) return message.reply({ embeds: [embed.setDescription(`Geliştirici değilsin (bg)!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (!args[0]) {
      await message.reply({ content: `Bot yeniden başlatıldı.`})
      process.exit(0) 
    }

  },
};