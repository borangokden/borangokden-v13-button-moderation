const config = require("../../../config.json");

module.exports = {
    name: "sil",
    aliases: ["temizle", "sil"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!args[0]) return message.reply({ embeds: [embed.setDescription("1-100 arasında bir rakam belirtiniz.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (isNaN(args[0])) return message.reply({ embeds: [embed.setDescription("Geçerli bir sayı belirt!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        await channel.bulkDelete(args[0]);
        message.channel.send({ content: (`Sunucuda ${author} tarafından ${args} adet mesaj silindi.`)}).then((e) => setTimeout(() => { e.delete(); }, 3000));
    }
}