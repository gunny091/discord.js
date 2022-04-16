const { Client, Intents, Discord } = require("discord.js");
const fs = require("fs");
const { token } = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const logFilePath = "./log/log.txt";

function log(content) {
  const text = `[${new Date().toString()}] ${content}`;
  console.log(text);

  !fs.existsSync(logFilePath) ? fs.writeFileSync(logFilePath, "") : null;
  fs.appendFile(logFilePath, text + "\n", err => {
    if (err) throw err;
  });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("테스트");
});

client.on("message", msg => {
  log(
    `Message: "${msg.content}" @${msg.author.tag}(${msg.author.id}) ${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id})`
  );

  if (msg.content === "ping") {
    msg.channel.send(`${msg.author} pong`).then(msg => {
      console.log(`Sent massage: "${msg.content}" to ${msg.channel}`);
    });
  }
});

client.login(token);
