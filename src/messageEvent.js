import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const { ownerId } = require("../config.json");
import { onAdminCommand } from "./admincommands.js";
import { onCommand } from "./commands.js";
import { logCF } from "./log.js";
import { errMsg } from "./timeOutMsg.js";

export function msgEvent(client) {
  client.on("messageCreate", msg => {
    if (msg.author.bot) return;
    if (msg.author.id === client.user.id) return;

    logCF(
      "Message Send",
      `"${msg.content}" @${msg.author.tag}(${msg.author.id}) .${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id}) *${msg.id}`
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
    if (msg.author.bot) return;
    if (msg.author.id === client.user.id) return;
    logCF(
      "Message Update",
      `"${oldMsg.content}" => "${newMsg.content}" @${newMsg.author.tag}(${newMsg.author.id}) .${newMsg.guild.name}(${newMsg.guild.id}) #${newMsg.channel.name}(${newMsg.channel.id}) *${newMsg.id}`
    );
  });
  client.on("messageDelete", msg => {
    if (msg.author.bot) return;
    if (msg.author.id === client.user.id) return;
    logCF(
      "Message Delete",
      `"${msg.content}" @${msg.author.tag}(${msg.author.id}) .${msg.guild.name}(${msg.guild.id}) #${msg.channel.name}(${msg.channel.id}) *${msg.id}`
    );
  });
}
