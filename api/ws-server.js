import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ host: "0.0.0.0", port: 3001 });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
  const interval = setInterval(() => {
    ws.send("hello world");
  }, 1000);
  ws.on("close", () => {
    clearInterval(interval); // ← also add this, you had a memory leak
    console.log("Client disconnected");
  });
  ws.onerror = function () {
    console.log("Some Error occurred");
  };
});
