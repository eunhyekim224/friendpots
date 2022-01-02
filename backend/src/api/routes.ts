import { IncomingMessage, ServerResponse } from "http";
import { URL } from 'url';
import {
    postHandler,
    getHandler,
    noResponse,
} from "../services/requestHandlers";
import { FriendController, FriendDTO } from "./components/friend/controller";
import { Friend } from "./components/friend/model/Friend";

export function handler(req: IncomingMessage, res: ServerResponse) {

    const parsedUrl = new URL(req.url as string, `http://${req.headers.host}`);
    const friendController = new FriendController();

    if (parsedUrl.pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello World");
    } else if (parsedUrl.pathname.includes("/friends")) {
        if (req.method === "POST") {
            postHandler<FriendDTO>(req, res, (f) =>
                friendController.createNewFriend(f)
            );
        } else if (req.method === "GET") {
            getHandler<Friend>(req, res, parsedUrl, () =>
                friendController.getFriend(req, parsedUrl)
            );
        }
    } else {
        noResponse(req, res);
    }
}
