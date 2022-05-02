import { IncomingMessage, ServerResponse } from "http";
import { Friend } from "./model/Friend";
import { v4 } from "uuid";

export class FriendController {
    async handleRequest(req: IncomingMessage, res: ServerResponse) {
        if (req.method === "POST") {
            req.setEncoding("utf8");

            let data = "";

            req.on("data", (chunk: string) => {
                data += chunk;
            });

            req.on("end", async () => {
                const friendDTO = JSON.parse(data) as FriendDTO;

                const friendId = v4();
                const friend = new Friend(friendId, friendDTO.name);

                const savedFriend = await friend.save(friend);

                res.writeHead(201, { Location: `friends/${friendId}` });
                res.end(JSON.stringify(savedFriend));
            });
        } else if (req.method === "GET") {
            const parsedUrl = new URL(
                req.url as string,
                `http://${req.headers.host}`
            );
            const friendId = parsedUrl.pathname.split("/")[2];
            const friend = new Friend(friendId);

            const retreivedFriend = await friend.getById();
            if (retreivedFriend) {
                res.writeHead(200);
                res.end(JSON.stringify(retreivedFriend));
            } else {
                res.writeHead(404);
                res.end();
            }
            res.end();
        }
    }
}

export type FriendDTO = {
    name: string;
};
