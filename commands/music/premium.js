const { EmbedBuilder } = require("discord.js");
const User = require("../../database/models/User");

module.exports = {
  name: "premium",
  category: "music",
  description: "Check your premium status and upgrade options",

  async execute(client, message, args) {
    const user = await User.findOne({ userId: message.author.id });
    const isPremium = user?.isPremium || false;

    const embed = new EmbedBuilder()
      .setColor(isPremium ? "#FFD700" : "#5865F2")
      .setTitle("💎 Bot Premium")
      .setDescription(isPremium 
        ? "✅ You are a **Premium Member**! Enjoy your ads-free experience and exclusive commands." 
        : "Upgrade to Premium to unlock exclusive features and support the bot development!")
      .addFields(
        { name: "🚀 Benefits", value: "• Ads-free experience\n• Access to `enhance` command\n• 24/7 mode capability\n• Priority support", inline: false },
        { name: "💰 How to upgrade?", value: "Contact the bot developer or use the dashboard to subscribe!", inline: false }
      )
      .setFooter({ text: `Status: ${isPremium ? "Premium" : "Free User"}`, iconURL: message.author.displayAvatarURL() });

    message.channel.send({ embeds: [embed] });
  },
};
