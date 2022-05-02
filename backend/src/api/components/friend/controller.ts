import { IncomingMessage, ServerResponse } from "http";
import { Friend } from "./Friend";
import { v4 } from "uuid";
import { requestBody } from "../../../services/requestHandlers";

export class FriendController {
    async handleRequest(req: IncomingMessage, res: ServerResponse) {
        if (req.method === "POST") {
            const friendDTO = (await requestBody<FriendDTO>(req)) as FriendDTO;

            const friendId = v4();
            const friend = new Friend(friendId, friendDTO.name);

            const savedFriend = await friend.save(friend);

            res.writeHead(201, { Location: `friends/${friendId}` });
            res.end(JSON.stringify(savedFriend));
        } else if (req.method === "GET") {
            const parsedUrl = new URL(
                req.url as string,
                `http://${req.headers.host}`
            );
            const friendId = parsedUrl.pathname.split("/")[2];
            const friend = new Friend(friendId);

            const retrievedFriend = await friend.getById();
            if (retrievedFriend) {
                res.writeHead(200);
                res.end(JSON.stringify(retrievedFriend));
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
