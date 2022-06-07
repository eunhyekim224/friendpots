"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const url_1 = require("url");
const controller_1 = require("./components/friend/controller");
function handler(req, res) {
    const { pathname } = new url_1.URL(req.url, `http://${req.headers.host}`);
    if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to FriendPots!");
    }
    else {
        const selectedController = controller(pathname);
        if (selectedController) {
            return selectedController.handleRequest(req, res);
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: "Route not found" }));
        }
    }
}
exports.handler = handler;
const controller = (urlPathname) => {
    const resources = urlPathname.split("/");
    const mainResource = resources[1];
    let controller;
    switch (mainResource) {
        case "friends":
            controller = new controller_1.FriendController();
    }
    return controller;
};
//# sourceMappingURL=routes.js.map