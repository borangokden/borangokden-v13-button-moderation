const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const config = require("../../../config.json")

module.exports = {
    name: "kilit",
    aliases: ["kilitle", "kanal"],
    execute: async (client, message, args, embed, author, channel) => {
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için geçerli bir yetkiniz olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const ownerr = client.users.cache.get(config.bot.owner);

    var Ac = new MessageButton()
    .setLabel("Kanalın Kilidini Aç")
    .setCustomId("kilit_ac")
    .setStyle("SECONDARY")


    var Kapat = new MessageButton()
    .setLabel("Kanalı Kilitle")
    .setCustomId("kilit_kapat")
    .setStyle("SECONDARY")

    var Iptal = new MessageButton()
    .setLabel("İşlemi İptal Et!")
    .setCustomId("iptal_button")
    .setStyle("DANGER")
    .setEmoji(config.emojis.no)

    const row = new MessageActionRow()
    .addComponents([Kapat, Ac, Iptal])


embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setColor("BLACK").setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
embed.addField(`KANAL KİLİTLEME İŞLEMLERİ!`,`

Aşağı da ki butonlarla etkileşime geçebilirsiniz.
`)

    let msg = await message.channel.send({ embeds: [embed], components: [row] });
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "kilit_kapat") {
        await button.deferUpdate();
        const guild = message.guild
        let everyone = guild.roles.cache.find(r => r.name === "@everyone");
        message.channel.permissionOverwrites.edit(everyone.id, {
            SEND_MESSAGES: false
        });
        const kilitkapat = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor({name: message.member.displayName, iconURL: author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: (config.bot.BotFooter) , iconURL: ownerr.avatarURL({ dynamic: true, size: 2048 })})
      .setDescription(`<#${message.channel.id}> kanalının kilidi kapatıldı.`)

msg.edit({
  embeds : [kilitkapat],
  components : []
})
      
      }

  if(button.customId === "kilit_ac") {
    await button.deferUpdate();
    const guild = message.guild
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    message.channel.permissionOverwrites.edit(everyone.id, {
        'SEND_MESSAGES': null,

    })
    const kilitac = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor({name: message.member.displayName, iconURL: author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: (config.bot.BotFooter) , iconURL: ownerr.avatarURL({ dynamic: true, size: 2048 })})
    .setDescription(`<#${message.channel.id}> kanalının kilidi açıldı.`) 

msg.edit({
  embeds: [kilitac],
  components : []
})  
    }

 if(button.customId === "iptal_button") {   
    await button.deferUpdate();
    const iptal = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor({name: message.member.displayName, iconURL: author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: (config.bot.BotFooter) , iconURL: ownerr.avatarURL({ dynamic: true, size: 2048 })})
    .setDescription(`${message.author} tarafından kanal kilitleme işlemi iptal edildi.`) 

msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};
