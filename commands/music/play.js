const { createEmbed, colors } = require("../../utils/embedHandler");

module.exports = {
  name: "play",
  aliases: ["p"],
  category: "music",
  description: "Play a song or add it to queue",

  async execute(client, message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send({ embeds: [createEmbed(null, "❌ Join a voice channel first.", colors.error)] });

    const query = args.join(" ");
    if (!query)
      return message.channel.send({ embeds: [createEmbed(null, "❌ Provide a song name or URL.", colors.error)] });

    let player = client.manager.players.get(message.guild.id);

    if (!player) {
      player = await client.manager.createPlayer({
        guildId: message.guild.id,
        voiceId: voiceChannel.id,
        textId: message.channel.id,
        deaf: true
      });
    }

    const result = await client.manager.search(query, message.author);

    if (!result.tracks.length)
      return message.channel.send({ embeds: [createEmbed(null, "❌ No results found.", colors.error)] });

    const track = result.tracks[0];
    player.queue.add(track);

    if (!player.playing && !player.paused) {
      player.play();
    }

    const embed = createEmbed(
      null,
      `**[${track.title}](${track.uri})**`,
      "#2B2D31",
      { text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() },
      { name: "Added to Queue", iconURL: client.user.displayAvatarURL() },
      track.thumbnail,
      [
        { name: "Author", value: `\`${track.author}\``, inline: true },
        { name: "Duration", value: `\`${Math.floor(track.length / 60000)}:${Math.floor((track.length / 1000) % 60).toString().padStart(2, "0")}\``, inline: true },
        { name: "Queue", value: `\`${player.queue.length}\``, inline: true }
      ]
    );

    message.channel.send({ embeds: [embed] });
  }
};
