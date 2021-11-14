import http, { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { Friend, FriendDTO } from "./models/Friend";
import { createNewFriend, getFriend } from "./services/friend";
import { getHandler, noResponse, postHandler } from "./utils/httpHandlers";

const hostname = "127.0.0.1";
const port = 8000;

function handler(req: IncomingMessage, res: ServerResponse) {
  let parsedUrl = new URL(req.url as string, `http://${hostname}:${port}`);

  console.log(parsedUrl);

  if (parsedUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World");
  } else if (parsedUrl.pathname === "/friends" && req.method === "POST") {
    postHandler<FriendDTO>(req, res, (f) => createNewFriend(f));
  } else if (
    parsedUrl.pathname.split("/")[1] === "friends" &&
    req.method === "GET"
  ) {
    getHandler<Friend>(req, res, parsedUrl, () => getFriend(req, parsedUrl));
  } else {
    noResponse(req, res);
  }
}

const server = http.createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});
