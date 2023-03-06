
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
const axios = require('axios');
const fetch = require('node-fetch')

module.exports = {
    name: 'avatar',
    aliases: ["pp", "pfp", "av"],
    execute: async (client, message, args, embed, author, channel, guild) => {
	if (!message.guild) return;
  const row = new MessageActionRow()
  .addComponents(
      new MessageSelectMenu()
      .setCustomId('banner')
      .setPlaceholder('Bannerini görüntülemek için tıklayınız.')
      .addOptions([
          {
              label: 'Banner',
              description: 'Belirtilen kullanıcının bannerini görüntülemek için tıklayınız.',
              value: 'banner',
          }
      ]),
  );
let üye = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author

async function bannerXd(user, client) {
  const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
  if(!response.data.banner) return `https://tenor.com/view/haa%C3%B6yle-bi%C5%9Fi-yok-gif-18741586`
  if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
  else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)

}

let msg = await message.channel.send({ content: `${üye.displayAvatarURL({ dynamic: true, size: 4096 })}`, components: [row] })
var filter = (menu) => menu.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (menu) => {
    if(menu.values[0] === "banner") {
        let banner = await bannerXd(üye.id, client)
        menu.reply({content: `${banner}`, ephemeral: true })
          }
})
},
  };