import http, { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import fs from "fs";

const hostname = "127.0.0.1";
const port = 8000;

type Friend = {
    id?: string,
    name: string
}

type GetCallback = {
    <T>(req: IncomingMessage, reqUrl: URL): T
}

function createNewFriend(friendData: Friend) {
  // store friend to a file
  fs.readFile(
    "store/friends.json",
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        const allFriends = JSON.parse(data);
        allFriends.push(friendData);
        const allFriendsJson = JSON.stringify(allFriends);
        fs.writeFileSync("store/friends.json", allFriendsJson);
      }
    }
  );
}

function getHandler<T>(req: IncomingMessage, res: ServerResponse, reqUrl: URL, callback: GetCallback) {
  const getResponse = callback<T>(req, reqUrl);
  if (getResponse) {
    res.writeHead(200);
    res.end(JSON.stringify(getResponse));
  } else {
    res.writeHead(404);
    res.end();
  }
  res.end();
}

function postHandler(req: IncomingMessage, res: ServerResponse, callback: any) {
  req.setEncoding("utf8");
  let data = "";
  req.on("data", (chunk: string) => {
    data += chunk;
  });
  req.on("end", () => {
    const postedData = JSON.parse(data);
    callback(postedData);
    res.end();
  });
}

function noResponse(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(404);
  res.write("Sorry, but the resource doesn't exist..\n");
  res.end();
}

function handler(req: IncomingMessage, res: ServerResponse) {
  let parsedUrl = new URL(req.url as string, `http://${hostname}:${port}`);

  switch (parsedUrl.pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");
      break;
    case "/friend":
      postHandler(req, res, createNewFriend);
      break;
    default: noResponse(req, res);
  }
}

const server = http.createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
