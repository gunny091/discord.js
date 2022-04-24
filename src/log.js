import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const { consoleChannel } = require("../config.json");
import { client } from "./client.js";

const fs = require("fs");
const msgLogFilePath = "./log/msglog.txt";

export function logCF(name, content) {
  const text = `| ${new Date().toString()} [${name}] ${content}`;
  console.log(text);

  !fs.existsSync(msgLogFilePath) ? fs.writeFileSync(msgLogFilePath, "") : null;
  fs.appendFile(msgLogFilePath, text + "\n", err => {
    if (err) throw err;
  });

  client.channels
    .fetch(consoleChannel)
    .then(c => {
      c.send(text);
    })
    .catch(() => {});
}
