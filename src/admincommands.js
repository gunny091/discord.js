const {
  isThisCommand,
  getCommandArgv,
  getCommandArgvOneString,
} = require("./commandBase");
const { getMsg } = require("./getMsg");

function onAdminCommand(msg, client) {
  if (isThisCommand(msg.content, "exec")) {
    try {
      eval(getCommandArgvOneString(msg.content, "exec"));
      msg.channel.send("complete");
    } catch (e) {
      msg.channel.send(String(e));
    }
  }
  if (isThisCommand(msg.content, "logout")) {
    msg.channel.send("logout");
    setTimeout(() => {
      process.exit(2);
    }, 1000);
  }
  if (isThisCommand(msg.content, "setstatus")) {
    client.user.setActivity(getCommandArgvOneString(msg.content, "setstatus"));
    msg.channel.send("complete");
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
      msg.channel.send(String(error));
    }
    if (noErr) {
      getMsg(channelId, messageId, client)
        .then(m => {
          m.delete();
        })
        .catch(error => {
          msg.channel.send(String(error));
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
      msg.channel.send(String(error));
    }
    if (msgToSend && noErr) {
      client.channels
        .fetch(channelId)
        .then(c => {
          c.send(msgToSend);
        })
        .catch(error => {
          msg.channel.send(String(error));
        });
    }
  }
}
module.exports = { onAdminCommand };
