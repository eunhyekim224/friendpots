import { IncomingMessage, ServerResponse } from "http";
import { Friend } from "./model/Friend";
import { Friends } from "./model/Friends";
import { Store } from "../../../services/Store";
import { getHandler, postHandler } from "../../../services/requestHandlers";

export class FriendController {
    friendStorePath = "./backend/store/friends.json";

    handleRequest(req: IncomingMessage, res: ServerResponse) {
        const parsedUrl = new URL(
            req.url as string,
            `http://${req.headers.host}`
        );

        if (req.method === "POST") {
            postHandler<FriendDTO>(req, res, (f) => this.createNewFriend(f));
        
        } else if (req.method === "GET") {
            getHandler<Friend>(req, res, parsedUrl, () =>
                this.getFriend(req, parsedUrl)
            );
        }
    }
}

export type FriendDTO = {
    name: string;
};
