import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { FriendController } from "./components/friend/controller";

export function handler(req: IncomingMessage, res: ServerResponse) {
    const parsedUrl = new URL(req.url as string, `http://${req.headers.host}`);

    if (parsedUrl.pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to FriendPots!");
    } else if (parsedUrl.pathname.includes("/friends")) {
        const friendController = new FriendController();
        return friendController.handleRequest(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
}
