import http from "http";
import zlib from "zlib";

// Create an HTTP server that listens on port 8000
const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    const chunks: Array<Uint8Array> = [];

    req.on("data", (chunk) => {
      console.log("Received data chunk:", chunk.toString());
      chunks.push(chunk);
    });

    req.on("end", () => {
      // Decompress the gzipped body
      zlib.gunzip(Buffer.concat(chunks), (err, buffer) => {
        if (err) {
          console.error("Error decompressing body:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          console.log(buffer.toString());
          res.writeHead(200, { "Content-Type": "text/plain" });
          const now = Date.now().toString();
          console.log(now);
          res.end(now);
        }
      });
    });
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
});

// Start the server
server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
