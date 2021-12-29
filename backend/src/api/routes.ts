import { IncomingMessage, ServerResponse } from "http";
import {
    postHandler,
    getHandler,
    noResponse,
} from "../services/requestHandlers";
import { FriendController, FriendDTO } from "./components/friend/controller";
import { Friend } from "./components/friend/model/Friend";

export function handler(req: IncomingMessage, res: ServerResponse) {
    console.log(req)
    let parsedUrl = new URL(req.url as string);

    const friendController = new FriendController();

    if (parsedUrl.pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello World");
    } else if (parsedUrl.pathname === "/friends") {
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
