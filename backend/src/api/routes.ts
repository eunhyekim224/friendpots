import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import {
    postHandler,
    getHandler,
    noResponse,
} from "../services/requestHandlers";
import { FriendController, FriendDTO } from "./components/friend/controller";
import { Friend } from "./components/friend/model/Friend";

// get the path
// use it to retrieve the controller that i need
// extract the body

// route's job is directing requests to the correct controller/handler

export function handler(req: IncomingMessage, res: ServerResponse) {
    const parsedUrl = new URL(req.url as string, `http://${req.headers.host}`);

    if (parsedUrl.pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to FriendPots!");

    } else if (parsedUrl.pathname.includes("/friends")) {
        const friendController = new FriendController();
        return friendController.handleRequest(req, res);
        
    } else {
        noResponse(req, res);
    }
}
