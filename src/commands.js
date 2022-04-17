const {
  isThisCommand,
  getCommandArgv,
  getCommandArgvOneString,
} = require("./commandBase");

function onCommand(msg, client) {
  if (msg.content === "ping") {
    msg.channel.send(`${msg.author} pong`);
  }
  if (isThisCommand(msg.content, "say")) {
    msg.channel.send(getCommandArgvOneString(msg.content, "say"));
  }
}
module.exports = { onCommand };
