import {
  isThisCommand,
  getCommandArgv,
  getCommandArgvOneString,
} from "./commandBase.js";
import { sendMessage } from "./sendMessage.js";

export function onCommand(msg, client) {
  if (msg.content === "ping") {
    sendMessage(msg.channel, `${msg.author} pong`);
  }
  if (isThisCommand(msg.content, "say")) {
    sendMessage(msg.channel, getCommandArgvOneString(msg.content, "say"));
  }
}
