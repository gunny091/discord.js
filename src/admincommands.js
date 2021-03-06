import {
  isThisCommand,
  getCommandArgv,
  getCommandArgvOneString,
} from "./commandBase.js";
import { compMsg, errMsg, timeoutMsg } from "./timeOutMsg.js";
import { getMsg } from "./getMsg.js";
import { sendMessage } from "./sendMessage.js";

export function onAdminCommand(msg, client) {
  if (isThisCommand(msg.content, "exec")) {
    try {
      eval(getCommandArgvOneString(msg.content, "exec"));
      compMsg(msg.channel);
    } catch (e) {
      errMsg(msg.channel, e);
    }
  }
  if (isThisCommand(msg.content, "logout")) {
    timeoutMsg(msg.channel, "logout", 1000);
    setTimeout(() => {
      process.exit(2);
    }, 5000);
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
      getMsg(channelId, messageId)
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
      getMsg(channelId, messageId)
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
