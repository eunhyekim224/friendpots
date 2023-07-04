import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";

export class NotFoundController {
    handleRequest(req: IncomingMessage, res: ServerResponse, headers: IncomingHttpHeaders) {
        res.writeHead(404, headers);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
}
