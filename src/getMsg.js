function getMsg(channelId, messageId, client) {
  return new Promise((resolve, reject) => {
    try {
      client.channels
        .fetch(channelId)
        .then(c => {
          const channel = c;
          if (channel.isText) {
            channel.messages
              .fetch(messageId)
              .then(m => {
                resolve(m);
              })
              .catch(e => {
                reject(e);
              });
          }
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}
module.exports = { getMsg };
