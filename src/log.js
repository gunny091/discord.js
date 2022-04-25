import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const { consoleChannel } = require("../config.json");
import { client } from "./client.js";
import { Message, MessageEmbed } from "discord.js";

import fs from "fs";
const msgLogFilePath = "./log/msglog.txt";

export function logCF(
  name,
  content,
  meta,
  discordEmbedColor = "#000000",
  atch = undefined
) {
  try {
    if (!name) {
      name = "[Empty Name]";
    }
    if (!content) {
      content = "[Empty Content]";
    }
    if (!meta) {
      meta = "[No Information]";
    }
    let text = `| ${new Date().toString()} [${name}] "${content.replaceAll(
      "\n",
      " "
    )}" ${meta}`;
    let discordMessage = new MessageEmbed()
      .setTitle(name)
      .setColor(discordEmbedColor)
      .addFields(
        { name: "Content", value: content },
        { name: "Info", value: meta }
      );
    if (atch) {
      discordMessage = discordMessage.addField("Attachments", atch);
      text += " Atch:" + atch.replaceAll("\n", " ");
    }
    discordMessage = discordMessage.addField("Time", new Date().toString());

    console.log(text);

    client.channels
      .fetch(consoleChannel)
      .then(c => {
        c.send({ embeds: [discordMessage] });
      })
      .catch(e => {
        console.log("LOG ERROR: " + String(e));
      });
  } catch (e) {
    console.log("LOG ERROR: " + String(e));
  }
}
