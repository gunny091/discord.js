import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const { consoleChannel } = require("../config.json");
import { client } from "./client.js";
import { Message, MessageEmbed } from "discord.js";

import fs from "fs";
const msgLogFilePath = "./log/msglog.txt";

export function logCF(name, content, meta, discordEmbedColor = "#000000") {
  const text = `| ${new Date().toString()} [${name}] "${content.replaceAll(
    "\n",
    " "
  )}" ${meta}`;
  const discordMessage = new MessageEmbed()
    .setTitle(name)
    .setColor(discordEmbedColor)
    .addFields(
      { name: "Content", value: content },
      { name: "Info", value: meta }
    );
  console.log(text);

  !fs.existsSync(msgLogFilePath) ? fs.writeFileSync(msgLogFilePath, "") : null;
  fs.appendFile(msgLogFilePath, text + "\n", err => {
    if (err) throw err;
  });

  client.channels
    .fetch(consoleChannel)
    .then(c => {
      c.send({ embeds: [discordMessage] });
    })
    .catch(() => {});
}
