import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { FriendController } from "./friend/FriendController";
import { NotFoundController } from "./requestHandling/notFoundController";
import { RootController } from "./requestHandling/RootController";

export function handler(req: IncomingMessage, res: ServerResponse) {
    const { pathname: resource } = new URL(
        req.url as string,
        `http://${req.headers.host}`
    );

    return controller(resource).handleRequest(req, res);
}

const controller = (urlPathname: string) => {
    const resources = urlPathname.split("/");
    const mainResource = resources[1];

    let controller;

    switch (mainResource) {
        case "friends":
            controller = new FriendController();
        case "/":
            controller = new RootController();
        default:
            controller = new NotFoundController();
    }

    return controller;
};
