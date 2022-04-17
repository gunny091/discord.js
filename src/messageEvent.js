const { onAdminCommand } = require("./admincommands.js");
const { onCommand } = require("./commands.js");
const { logCF } = require("./log.js");
const { ownerId } = require("../config.json");
const { errMsg } = require("./timeOutMsg.js");

function msgEvent(client) {
  client.on("messageCreate", msg => {
    if (msg.author.bot) return;
    if (msg.author.id === client.user.id) return;

    logCF(
      "Message Send",
      `"${msg.content}" @${msg.author.tag}(${msg.author.id}) .${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id}) *${msg.id}`
    );
    try {
      onCommand(msg, client);
      if (msg.author.id === ownerId) {
        onAdminCommand(msg, client);
      }
    } catch (error) {
      errMsg(msg.channel, error);
    }
  });
  client.on("messageUpdate", (oldMsg, newMsg) => {
    logCF(
      "Message Update",
      `"${oldMsg.content}" => "${newMsg.content}" @${newMsg.author.tag}(${newMsg.author.id}) .${newMsg.guild.name}(${newMsg.guild.id}) #${newMsg.channel.name}(${newMsg.channel.id}) *${newMsg.id}`
    );
  });
  client.on("messageDelete", msg => {
    logCF(
      "Message Delete",
      `"${msg.content}" @${msg.author.tag}(${msg.author.id}) .${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id}) *${msg.id}`
    );
  });
}
module.exports = { msgEvent };
