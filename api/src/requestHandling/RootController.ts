import { IncomingMessage, ServerResponse } from "http";

export class RootController {
    handleRequest(req: IncomingMessage, res: ServerResponse) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to FriendPots!");
    }
}
