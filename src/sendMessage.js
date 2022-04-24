import { logCF } from "./log.js";
import { client } from "./client.js";

export function sendMessage(channel, content) {
  channel.send(content).then(m => {
    logCF(
      "Message Send",
      `"${content}" @${client.user.tag}(${client.user.id}) .${channel.guild.name}(${channel.guild.id}) #${channel.name}(${channel.id}) *${m.id}`
    );
  });
}
