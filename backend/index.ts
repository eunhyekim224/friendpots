import http, { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

const hostname = "127.0.0.1";
const port = 8000;

function handler(req: IncomingMessage, res: ServerResponse) {
  console.log(req.url);
  const parsedUrl = new URL(req.url as string, `http://${hostname}:${port}`);

  if (parsedUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World");
  } else if (parsedUrl.pathname === "/friend") {
    // write to file
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("No such path exists");
  }
}

const server = http.createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
