const {
  isThisCommand,
  getCommandArgv,
  getCommandArgvOneString,
} = require("./commandBase");
const { sendMessage } = require("./sendMessage");

function onCommand(msg, client) {
  if (msg.content === "ping") {
    sendMessage(msg.channel, `${msg.author} pong`);
  }
  if (isThisCommand(msg.content, "say")) {
    sendMessage(msg.channel, getCommandArgvOneString(msg.content, "say"));
  }
}
module.exports = { onCommand };
