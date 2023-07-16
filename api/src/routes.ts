import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { FriendController } from "./friend/FriendController";
import { NotFoundController } from "./requestHandling/NotFoundController";
import { RootController } from "./requestHandling/RootController";

export function handler(req: IncomingMessage, res: ServerResponse) {

    const headers: IncomingHttpHeaders = {
        // "Access-Control-Allow-Origin": "http://friendpots.com",
        // "Access-Control-Allow-Methods": "*",
        // // "Access-Control-Max-Age": "2592000", // 30 days
    };

    const { pathname: resource } = new URL(
        req.url as string,
        `http://${req.headers.host}`
    );

    return controller(resource).handleRequest(req, res, headers);
}

const controller = (urlPathname: string) => {
    const paths = urlPathname.split("/");
    const mainResource = paths[1];

    let controller;

    switch (mainResource) {
        case "friends":
            controller = new FriendController();
        break;
        case '':
            controller = new RootController();
        break;
        default:
            controller = new NotFoundController();
    }

    return controller;
};
