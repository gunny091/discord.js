function isThisCommand(msgContent, _command) {
  const command = `t/${_command}`;
  const commandLength = command.length;
  return (
    (msgContent.length > commandLength + 1 &&
      msgContent.substring(0, commandLength) === command) ||
    msgContent === command
  );
}
function getCommandArgv(msgContent, command) {
  if (isThisCommand(msgContent, command)) {
    return msgContent.substring(commandLength + 1).split(" ");
  }
}
function getCommandArgvOneString(msgContent, command) {
  if (isThisCommand(msgContent, command)) {
    return msgContent.substring(commandLength + 1);
  }
}
module.exports = { isThisCommand, getCommandArgv, getCommandArgvOneString };
