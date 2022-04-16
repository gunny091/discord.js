const { Client, Intents } = require("discord.js");
const { token, ownerId } = require("./config.json");
const { msgEvent } = require("./src/messageEvent.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("테스트");
});

msgEvent(client);

client.login(token);
