import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const { token } = require("./config.json");
import { client } from "./src/client.js";
// const { msgEvent } = require("./src/messageEvent.js");
import { msgEvent } from "./src/messageEvent.js";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("테스트");
});

msgEvent(client);

client.login(token);
