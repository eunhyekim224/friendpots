import http, { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import fs from "fs";

const hostname = "127.0.0.1";
const port = 8000;

function createNewFriend(reqUrl: URL, friendData: any) {
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
        fs.writeFileSync('store/friends.json', allFriendsJson)
      }
    }
  );
}

function getFriend(req: any, reqUrl: URL) {
  // go and find the friend item
}

function getHandler(req: any, res: any, reqUrl: URL, callback: any) {
  const getResponse = callback(req, reqUrl);
  if (getResponse) {
    res.writeHead(200);
    res.end(JSON.stringify(getResponse));
  } else {
    res.writeHead(404);
    res.end();
  }
  res.end();
}

function postHandler(req: any, res: any, reqUrl: URL, callback: any) {
  req.setEncoding("utf8");
  let data = "";
  req.on("data", (chunk: string) => {
    data += chunk;
  });
  req.on("end", () => {
    const postedData = JSON.parse(data);
    callback(reqUrl, postedData);
    res.end();
  });
}

function noResponse(req: any, res: any) {
  res.writeHead(404);
  res.write("Sorry, but we have no response..\n");
  res.end();
}

function handler(req: any, res: ServerResponse) {
  let parsedUrl = new URL(req.url as string, `http://${hostname}:${port}`);

  const router: any = {
    "POST/friend": () => postHandler(req, res, parsedUrl, createNewFriend),
    "GET/friend/:id": getHandler(req, res, parsedUrl, getFriend),
    default: noResponse,
  };

  let redirectedFunction =
    router[req.method + parsedUrl.pathname] || router["default"];

  redirectedFunction();
}

const server = http.createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
