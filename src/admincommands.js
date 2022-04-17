const {
  isThisCommand,
  getCommandArgv,
  getCommandArgvOneString,
} = require("./commandBase");
const { getMsg } = require("./getMsg");
const { sendMessage } = require("./sendMessage");

function onAdminCommand(msg, client) {
  if (isThisCommand(msg.content, "exec")) {
    try {
      eval(getCommandArgvOneString(msg.content, "exec"));
      sendMessage(msg.channel, "complete");
    } catch (e) {
      sendMessage(msg.channel, String(e));
    }
  }
  if (isThisCommand(msg.content, "logout")) {
    sendMessage(msg.channel, "logout");
    setTimeout(() => {
      process.exit(2);
    }, 1000);
  }
  if (isThisCommand(msg.content, "setstatus")) {
    client.user.setActivity(getCommandArgvOneString(msg.content, "setstatus"));
    sendMessage(msg.channel, "complete");
  }
  if (isThisCommand(msg.content, "delmsg")) {
    let noErr = false;
    let channelId;
    let messageId;
    try {
      const argv = getCommandArgv(msg.content, "delmsg");
      channelId = argv[0];
      messageId = argv[1];
      noErr = true;
    } catch (error) {
      sendMessage(msg.channel, String(error));
    }
    if (noErr) {
      getMsg(channelId, messageId, client)
        .then(m => {
          m.delete();
        })
        .catch(error => {
          sendMessage(msg.channel, String(error));
        });
    }
  }
  if (isThisCommand(msg.content, "sendmsg")) {
    let noErr = false;
    let channelId = undefined;
    let msgToSend = undefined;
    try {
      const argv = getCommandArgv(msg.content, "sendmsg");
      channelId = argv[0];
      msgToSend = argv.slice(1, argv.length).join(" ");
      noErr = true;
    } catch (error) {
      sendMessage(msg.channel, String(error));
    }
    if (msgToSend && noErr) {
      client.channels
        .fetch(channelId)
        .then(c => {
          sendMessage(c, msgToSend);
        })
        .catch(error => {
          sendMessage(msg.channel, String(error));
        });
    }
  }
}
module.exports = { onAdminCommand };
