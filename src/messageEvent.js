import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const { ownerId } = require("../config.json");
import { onAdminCommand } from "./admincommands.js";
import { onCommand } from "./commands.js";
import { logCF } from "./log.js";
import { errMsg } from "./timeOutMsg.js";

export function msgEvent(client) {
  client.on("messageCreate", msg => {
    let color = "#000000";
    if (msg.author.id === client.user.id) return;
    if (msg.author.bot) {
      color = "#777777";
    }
    let content = msg.content;
    if (!content || content === "") {
      content += "[Empty Message]";
    }
    let atch = "";
    if (msg.attachments) {
      const attachments = msg.attachments;
      attachments.forEach((v, k) => {
        atch += v.url + "\n";
      });
    }
    logCF(
      "Message Send",
      msg.content,
      `@${msg.author.tag}(${msg.author.id}) .${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id}) *${msg.id}`,
      color,
      atch
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
    let color = "#0000FF";
    if (newMsg.author.bot) {
      color = "#7777FF";
    }
    logCF(
      "Message Update",
      `${newMsg.content}\n=>\n${oldMsg.content}`,
      `@${newMsg.author.tag}(${newMsg.author.id}) .${newMsg.guild.name}(${newMsg.guild.id}) #${newMsg.channel.name}(${newMsg.channel.id}) *${newMsg.id}`,
      color
    );
  });
  client.on("messageDelete", msg => {
    let color = "#FF0000";
    if (msg.author.bot) {
      color = "#FF7777";
    }
    logCF(
      "Message Delete",
      msg.content,
      `@${msg.author.tag}(${msg.author.id}) .${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id}) *${msg.id}`,
      color
    );
  });
}
