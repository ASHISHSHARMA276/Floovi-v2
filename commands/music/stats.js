const { EmbedBuilder } = require("discord.js");
const { colors } = require("../../utils/embedHandler");

module.exports = {
  name: "stats",
  category: "info",
  description: "Shows team and bot information",

  async execute(client, message) {

    const totalUsers = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );

    const embed = new EmbedBuilder()
      .setColor(colors?.primary || "#2f3136")
      .setAuthor({
        name: "Floovi Information Panel",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(
        `**<:xieron_developer:1476136808549974016> _Developer_**\n` +
        `**[1] Unstoppable \`</>\`**\n` +
        `**Status: ● Online**\n` +
        `**Activity: None**\n\n` +

        `**<:owner:1476150785837367296> _Owner_**\n` +
        `**[1] Ashish**\n` +
        `**[2] Unstoppable**\n\n` +

        `**<:support:1476195851310203023> _Team_**\n` +
        `**[1] Royal**\n\n` +

        `━━━━━━━━━━━━━━━━━━\n\n` +

        `**<:graph:1476197153843183726> _Bot Information_**\n` +
        `**Bot Username : ${client.user.username}**\n` +
        `**Servers : ${client.guilds.cache.size}**\n` +
        `**Users : ${totalUsers}**\n` +
        `**Ping : ${client.ws.ping} ms**`
      )
      .setFooter({
        text: `Requested By : ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};