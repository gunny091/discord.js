export function isThisCommand(msgContent, _command) {
  const command = `t/${_command}`;
  const commandLength = command.length;
  return (
    (msgContent.length > commandLength + 1 &&
      msgContent.substring(0, commandLength) === command) ||
    msgContent === command
  );
}
export function getCommandArgv(msgContent, command) {
  const commandLength = `t/${command}`.length;
  if (isThisCommand(msgContent, command)) {
    return msgContent.substring(commandLength + 1).split(" ");
  }
}
export function getCommandArgvOneString(msgContent, command) {
  const commandLength = `t/${command}`.length;
  if (isThisCommand(msgContent, command)) {
    return msgContent.substring(commandLength + 1);
  }
}
