const {
  isThisCommand,
  getCommandArgv,
  getCommandArgvOneString,
} = require("./commandBase");
const { compMsg, errMsg, timeoutMsg } = require("./timeOutMsg");
const { getMsg } = require("./getMsg");
const { sendMessage } = require("./sendMessage");

function onAdminCommand(msg, client) {
  if (isThisCommand(msg.content, "exec")) {
    try {
      eval(getCommandArgvOneString(msg.content, "exec"));
      compMsg(msg.channel);
    } catch (e) {
      errMsg(msg.channel, e);
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
    compMsg(msg.channel);
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
      errMsg(msg.channel, error);
    }
    if (noErr && channelId && messageId) {
      getMsg(channelId, messageId, client)
        .then(m => {
          m.delete();
          compMsg(msg.channel);
        })
        .catch(error => {
          errMsg(msg.channel, error);
        });
    }
  }
  if (isThisCommand(msg.content, "replymsg")) {
    let noErr = false;
    let channelId;
    let messageId;
    let msgToReply;
    try {
      const argv = getCommandArgv(msg.content, "replymsg");
      channelId = argv[0];
      messageId = argv[1];
      msgToReply = argv.slice(2, argv.length).join(" ");
      noErr = true;
    } catch (error) {
      compMsg.errMsg(msg.channel, error);
    }
    if (noErr && channelId && messageId && msgToReply) {
      getMsg(channelId, messageId, client)
        .then(m => {
          m.reply(msgToReply);
        })
        .catch(error => {
          errMsg(msg.channel, error);
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
      errMsg(msg.channel, error);
    }
    if (channelId && msgToSend && noErr) {
      client.channels
        .fetch(channelId)
        .then(c => {
          sendMessage(c, msgToSend);
        })
        .catch(error => {
          errMsg(msg.channel, error);
        });
    }
  }
}
module.exports = { onAdminCommand };
