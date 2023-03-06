const Discord = require('discord.js');
module.exports = {
    name: "dm-mesaj",
    aliases: ["dm", "dm-at", "dmmesaj"],
    execute: async (client, message, args, embed, author, channel, guild) => {

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let dmm = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!dmm) return message.reply({content : "Öncelikle geçerli bir kullanıcı belirtmelisin!"})
    let dm = args.slice(1).join(' ');
    if (!dm) return message.reply({content : "Öncelikle yazılacak mesajı belirtmelisin!"})
    message.delete();
    const dmat = new Discord.MessageEmbed()
    
    dmm.send(`${dm}`);
    message.channel.send("Mesajını başarılı bir şekilde bot üzerinden belirtilen kullanıcıya gönderildi!").then((e) => setTimeout(() => { e.delete(); }, 3000));
    
}}