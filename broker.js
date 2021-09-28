const aedes = require("aedes")();
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const port = 8888;

ws.createServer({ server: httpServer }, aedes.handle);

httpServer.listen(port, () => {
  console.log("HTTP Server started and listening on port", port);
});

aedes.on("subscribe", function (subscriptions, client) {
  const newTopic = subscriptions[subscriptions.length - 1].topic;
  console.log(`New Subscription! - "${newTopic}" by "${client.id}"`);
});

aedes.on("publish", (packet) => {
  console.log(packet.payload.toString());
});
