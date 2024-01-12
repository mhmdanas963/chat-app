const net = require("node:net");
const readLine = require("node:readline/promises");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const client = net.createConnection({ host: "127.0.0.1", port: 4080 }, () => {
  console.log("Connected to server");

  const ask = async () => {
    const message = await rl.question("Enter the message > ");

    await moveCursor(0, -1);
    await clearLine(0);

    client.write(message);
  };

  ask();

  client.on("data", async (data) => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);

    console.log(data.toString("utf-8"));
    ask();
  });
});

client.on("end", () => {
  console.log("Connection ended");
});
