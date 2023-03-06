const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "unban",
  aliases: ["unyargı", "unyarra", "uncu", "yasaklama-kaldır"],
  execute: async (client, message, args, author, channel, guild) => {
  
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.ban.staff)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için geçerli yetkin bulunmamakta!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
 
let user = args[0]
if(!user) return message.reply({ content: "Geçerli bir ID yazmalısın." })

let reason = args.slice(1).join(" ")
if (!reason) return message.reply({ content: "Ban kaldırma sebebi yazmalısınız." })

message.guild.members.unban(user, reason)
  
const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .addField("İşlem:", "Ban Kaldırma")
    .addField("ID:", `${user}`)
    .addField("Kaldıran", `${message.author.username}#${message.author.discriminator}`)
    .addField("Sebep", reason)
return message.channel.send({ embeds: [embed] })
 
}
}

