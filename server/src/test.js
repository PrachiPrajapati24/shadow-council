const generateRoomCode =
  require("./utils/generateRoomCode");

const code = generateRoomCode();

console.log(code);
console.log(code.length);