import zlib from "node:zlib";

import _fetch from "node-fetch";

// Workaround https://github.com/DefinitelyTyped/DefinitelyTyped/issues/60924
declare var fetch: typeof _fetch;

// fetch("http://localhost:8000", {
//   headers: { "Content-Encoding": "gzip" },
//   method: "POST",
//   body: zlib.gzipSync("Hello, World!\n"),
// })
//   .then((res) => res.text())
//   .then(console.log);

async function main() {
  const now = () => Date.now().toString();
  const start = now();
  await fetch("http://localhost:8000", {
    headers: { "Content-Encoding": "gzip" },
    method: "POST",
    body: zlib.gzipSync(now()),
  })
    .then((res) => res.text())
    .then((res) => {
      console.log("Ping", +res - +start);
      console.log("Pong", +now() - +res);
      console.log("");
    });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  main();
}

main();
