import { logCF } from "./log.js";
import { client } from "./client.js";

export function compMsg(channel) {
  channel.send("complete").then(m => {
    setTimeout(() => {
      m.delete();
    }, 20 * 1000);
    logCF(
      "Timeout Message Send",
      "complete",
      ` @${client.user.tag}(${client.user.id}) .${channel.guild.name}(${channel.guild.id}) #${channel.name}(${channel.id}) *${m.id}`,
      "#FFFF00"
    );
  });
}
export function errMsg(channel, error) {
  channel.send(String(error)).then(m => {
    setTimeout(() => {
      m.delete();
    }, 20 * 1000);
    logCF(
      "Timeout Message Send",
      String(error),
      `"@${client.user.tag}(${client.user.id}) .${channel.guild.name}(${channel.guild.id}) #${channel.name}(${channel.id}) *${m.id}`,
      "#FFFF00"
    );
  });
}
export function timeoutMsg(channel, content, time = 20000) {
  channel.send(content).then(m => {
    setTimeout(() => {
      m.delete();
    }, time);
    logCF(
      "Timeout Message Send",
      content,
      `@${client.user.tag}(${client.user.id}) .${channel.guild.name}(${channel.guild.id}) #${channel.name}(${channel.id}) *${m.id}`,
      "#FFFF00"
    );
  });
}
