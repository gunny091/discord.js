const { Client, Intents } = require("discord.js");
const fs = require("fs");
const { token, ownerId } = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const msgLogFilePath = "./log/msglog.txt";

function log(name, content) {
  const text = `${new Date().toString()} [${name}] ${content}`;
  console.log(text);

  !fs.existsSync(msgLogFilePath) ? fs.writeFileSync(msgLogFilePath, "") : null;
  fs.appendFile(msgLogFilePath, text + "\n", err => {
    if (err) throw err;
  });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("테스트");
});

client.on("messageCreate", msg => {
  if (msg.author.bot) return;
  if (msg.author.id === client.user.id) return;

  log(
    "Message Send",
    `"${msg.content}" @${msg.author.tag}(${msg.author.id}) .${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id}) *${msg.id}`
  );

  if (msg.content === "ping") {
    msg.channel.send(`${msg.author} pong`).then(msg => {
      console.log(`Sent massage: "${msg.content}" to ${msg.channel}`);
    });
  }
  if (msg.author.id === ownerId) {
    if (msg.content.length > 7 && msg.content.substring(0, 6) === "t/exec") {
      try {
        eval(msg.content.substring(7));
        msg.channel.send("complete");
      } catch {
        msg.channel.send("error");
      }
    }
    if (msg.content === "t/logout") {
      msg.channel.send("logout");
      process.exit(2);
    }
    if (
      msg.content.length > 12 &&
      msg.content.substring(0, 11) === "t/setstatus"
    ) {
      client.user.setActivity(msg.content.substring(12));
      msg.channel.send("complete");
    }
  }
});
client.on("messageUpdate", (oldMsg, newMsg) => {
  log(
    "Message Update",
    `"${oldMsg.content}" => "${newMsg.content}" @${newMsg.author.tag}(${newMsg.author.id}) .${newMsg.guild.name}(${newMsg.guild.id}) #${newMsg.channel.name}(${newMsg.channel.id}) *${newMsg.id}`
  );
});
client.on("messageDelete", msg => {
  log(
    "Message Delete",
    `"${msg.content}" @${msg.author.tag}(${msg.author.id}) .${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id}) *${msg.id}`
  );
});

client.login(token);
