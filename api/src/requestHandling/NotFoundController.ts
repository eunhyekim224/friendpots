import { IncomingMessage, ServerResponse } from "http";

export class NotFoundController {
    handleRequest(req: IncomingMessage, res: ServerResponse) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
}
