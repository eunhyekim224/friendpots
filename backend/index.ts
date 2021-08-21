import http, { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import fs from "fs";
import { v4 } from "uuid";

const hostname = "127.0.0.1";
const port = 8000;

class Friends {
  create(name: string) {
    return new Friend(v4(), name);
  }
}

class Friend {
  id;
  name;

  constructor(id: string, name: string) {
    this.name = name;
    this.id = id;
  }
}

type FriendDTO = {
  name: string;
};

type GetCallback<T> = {
  (req: IncomingMessage, reqUrl: URL): Promise<T>;
};

type PostCallback<T> = {
  (postedData: T): Promise<T>;
};

function createNewFriend(friendData: FriendDTO): Promise<Friend> {
  const newFriend = new Friends().create(friendData.name);

  // store friend to a file
  return new Promise((resolve, reject) => {
    fs.readFile("store/friends.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const allFriends = JSON.parse(data);
        allFriends.push(newFriend);

        const allFriendsJson = JSON.stringify(allFriends);
        fs.writeFileSync("store/friends.json", allFriendsJson);
      }
    });
    resolve(newFriend);
  });
}

function getFriend(req: IncomingMessage, reqUrl: URL): Promise<Friend> {
    const friendId = reqUrl.pathname.split("/")[2];
  console.log(friendId, "friendId");

  return new Promise((resolve, reject) => {
    fs.readFile("store/friends.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const allFriends = JSON.parse(data);
        const friendToRetrieve = allFriends.find(
          (friend: Friend) => friend.id === friendId
        );
        console.log("FRIEND", friendToRetrieve);
        resolve(friendToRetrieve);
      }
    });
  });
}

function postHandler<T>(
  req: IncomingMessage,
  res: ServerResponse,
  callback: PostCallback<T>
) {
  req.setEncoding("utf8");
  let data = "";
  req.on("data", (chunk: string) => {
    data += chunk;
  });
  req.on("end", async () => {
    const postedData = JSON.parse(data) as T;
    const postResponse = await callback(postedData);
    res.end(JSON.stringify(postResponse));
  });
}

async function getHandler<T>(
  req: IncomingMessage,
  res: ServerResponse,
  reqUrl: URL,
  callback: GetCallback<T>
) {
  const getResponse = await callback(req, reqUrl);
  if (getResponse) {
    res.writeHead(200);
    res.end(JSON.stringify(getResponse));
  } else {
    res.writeHead(404);
    res.end();
  }
  res.end();
}

function noResponse(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
}

function handler(req: IncomingMessage, res: ServerResponse) {
  let parsedUrl = new URL(req.url as string, `http://${hostname}:${port}`);

  console.log(parsedUrl);

  if (parsedUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World");

  } else if (parsedUrl.pathname === "/friends" && req.method === "POST") {
    postHandler<FriendDTO>(req, res, (f) => createNewFriend(f));

  } else if (parsedUrl.pathname.split("/")[1] === "friends" && req.method === "GET") {
    getHandler<Friend>(req, res, parsedUrl, () => getFriend(req, parsedUrl));
    
  } else {
    noResponse(req, res);
  }
}

const server = http.createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});
