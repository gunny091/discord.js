const { token } = require("./config.json");
const { client } = require("./src/client");
const { msgEvent } = require("./src/messageEvent.js");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("테스트");
});

msgEvent(client);

client.login(token);
