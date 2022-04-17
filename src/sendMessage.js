const { logCF } = require("./log");
const { client } = require("./client");

function sendMessage(channel, content) {
  channel.send(content).then(m => {
    logCF(
      "Message Send",
      `"${content}" @${client.user.tag}(${client.user.id}) .${channel.guild.name}(${channel.guild.id}) #${channel.name}(${channel.id}) *${m.id}`,
      client
    );
  });
}
module.exports = { sendMessage };
