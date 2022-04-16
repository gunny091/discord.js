function onCommand(msg, client) {
  if (msg.content === "ping") {
    msg.channel.send(`${msg.author} pong`).then(msg => {
      console.log(`Sent massage: "${msg.content}" to ${msg.channel}`);
    });
  }
}
module.exports = { onCommand };
