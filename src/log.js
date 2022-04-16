const fs = require("fs");
const msgLogFilePath = "./log/msglog.txt";

function logCF(name, content) {
  const text = `| ${new Date().toString()} [${name}] ${content}`;
  console.log(text);

  !fs.existsSync(msgLogFilePath) ? fs.writeFileSync(msgLogFilePath, "") : null;
  fs.appendFile(msgLogFilePath, text + "\n", err => {
    if (err) throw err;
  });
}
module.exports = { logCF };
