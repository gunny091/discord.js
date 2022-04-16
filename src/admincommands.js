function onAdminCommand(msg, client) {
  if (msg.content.length > 7 && msg.content.substring(0, 6) === "t/exec") {
    try {
      eval(msg.content.substring(7));
      msg.channel.send("complete");
    } catch {
      msg.channel.send("error");
    }
  }
  if (msg.content === "t/logout") {
    msg.channel.send("logout");
    setTimeout(() => {
      process.exit(2);
    }, 1000);
  }
  if (
    msg.content.length > 12 &&
    msg.content.substring(0, 11) === "t/setstatus"
  ) {
    client.user.setActivity(msg.content.substring(12));
    msg.channel.send("complete");
  }
  if (msg.content.length > 9 && msg.content.substring(0, 8) === "t/delmsg") {
    let error = false;
    try {
      const channelId = msg.content.substring(9).split(" ")[0];
      const messageId = msg.content.substring(9).split(" ")[1];
      client.channels
        .fetch(channelId)
        .then(c => {
          const channel = c;
          if (channel.isText) {
            channel.fetch();
            channel.messages
              .fetch(messageId)
              .then(m => {
                m.delete();
              })
              .catch(() => {
                error = true;
              })
              .then(() => {
                if (error) {
                  msg.channel.send("error");
                }
              });
          }
        })
        .catch(() => {
          error = true;
        });
    } catch {
      error = true;
    }
  }
}
module.exports = { onAdminCommand };
