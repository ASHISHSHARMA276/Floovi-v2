const fs = require("fs");

module.exports = (client) => {
  const folders = ["music", "devs"];

  for (const folder of folders) {
    const files = fs
      .readdirSync(`./commands/${folder}`)
      .filter((f) => f.endsWith(".js"));

    for (const file of files) {
      const command = require(`../commands/${folder}/${file}`);
      client.commands.set(command.name, command);
      console.log(`Loaded command: ${command.name}`);
    }
  }
};
