const { logCF } = require("./log");
const { client } = require("./client");

function sendMessage(channel, content) {
  channel.send(content).then(m => {
    logCF(
      "Message Send",
      `"${content}" @this(964673407868350474) .${channel.guild.name}(${channel.guild.id}) #${channel.name}(${channel.id}) *${m.id}`,
      client
    );
  });
}
module.exports = { sendMessage };
