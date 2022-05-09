import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { FriendController } from "./components/friend/controller";

export function handler(req: IncomingMessage, res: ServerResponse) {
    const { pathname } = new URL(
        req.url as string,
        `http://${req.headers.host}`
    );

    if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to FriendPots!");
    } else {
        const selectedController = controller(pathname);

        if (selectedController) {
            return selectedController.handleRequest(req, res);
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: "Route not found" }));
        }
    }
}

const controller = (urlPathname: string) => {
    const resources = urlPathname.split("/");
    const mainResource = resources[1];

    let controller;

    switch (mainResource) {
        case "friends":
            controller = new FriendController();
    }

    return controller;
};
