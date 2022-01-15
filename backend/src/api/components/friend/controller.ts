import { IncomingMessage, ServerResponse } from "http";
import { Friend, FriendFactory } from "./model/Friend";
import { Friends } from "./model/Friends";
import { Store } from "../../../services/Store";
import { getHandler, postHandler } from "../../../services/requestHandlers";

export class FriendController {
    async handleRequest(req: IncomingMessage, res: ServerResponse) {
        const parsedUrl = new URL(
            req.url as string,
            `http://${req.headers.host}`
        );

        if (req.method === "POST") {
            req.setEncoding("utf8");

            let data = "";

            req.on("data", (chunk: string) => {
                data += chunk;
            });

            req.on("end", async () => {
                const friendDTO = JSON.parse(data) as FriendDTO;

                const friend = new FriendFactory(friendDTO).create();

                const createdFriend = await friend.save(friend);
                
                res.writeHead(201);
                res.end(JSON.stringify(createdFriend));
            });
        } else if (req.method === "GET") {
            const friendId = parsedUrl.pathname.split("/")[2];
            const friend = new Friend(friendId);

            const retreivedFriend = friend.getById(req, parsedUrl);
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
