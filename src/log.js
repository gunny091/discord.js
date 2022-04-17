const { consoleChannel } = require("../config.json");

const fs = require("fs");
const msgLogFilePath = "./log/msglog.txt";

function logCF(name, content, client) {
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
module.exports = { logCF };
