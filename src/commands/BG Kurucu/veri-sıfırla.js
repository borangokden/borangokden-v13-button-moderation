const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const config = require("../../../config.json")

module.exports = {
    name: "sıfırla",
    aliases: ["sicil-sıfırla", "veri-sıfırla"],
    execute: async (client, message, args, embed, author, channel) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için geçerli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    var Sicil = new MessageButton()
    .setLabel("Sicilini Sıfırla")
    .setCustomId("sicil_sıfırla")
    .setStyle("SUCCESS")
    .setEmoji(config.emojis.yes)

    var Bb = new MessageButton()
    .setLabel("İşlemi İptal Et!")
    .setCustomId("iptal")
    .setStyle("DANGER")
    .setEmoji(config.emojis.no)

    const row = new MessageActionRow()
    .addComponents([Sicil, Bb])


embed.setDescription(`
${member.toString()} kullanıcısının hangi verisini sıfırlamak istiyorsanız butonlar ile etkileşime geçiniz.

\`\`\`NOT: Bu işlem geri alınamaz!!\`\`\`
`)

    let msg = await message.channel.send({ embeds: [embed], components: [row] });
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {



  if(button.customId === "sicil_sıfırla") {
    await button.deferUpdate();
    let sicil = db.delete(`sicil_${member.id}`) || [];
    const sicill = new MessageEmbed()
    .setDescription(`${member.toString()} kullanıcısının sicil geçmişi ${message.author} tarafından başarıyla temizlendi.`) 

msg.edit({
  embeds: [sicill],
  components : []
})  

    }

 if(button.customId === "iptal") {   
    await button.deferUpdate();
    const iptal = new MessageEmbed()
    .setDescription(`${member} kullanıcısının verilerini sıfırlama işlemi ${message.author} tarafından iptal edildi.`) 

msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};
