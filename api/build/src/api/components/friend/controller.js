"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendController = void 0;
const Friend_1 = require("./Friend");
const uuid_1 = require("uuid");
const requestHandlers_1 = require("../../../services/requestHandlers");
const Friends_1 = require("./Friends");
class FriendController {
    handleRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.method === "POST") {
                const requestData = yield requestHandlers_1.requestBody(req);
                req.on("end", () => __awaiter(this, void 0, void 0, function* () {
                    const friendDTO = JSON.parse(requestData);
                    const friendId = uuid_1.v4();
                    const friend = new Friend_1.Friend(friendId, friendDTO.name);
                    const friends = new Friends_1.Friends();
                    const savedFriend = yield friends.save(friend);
                    res.writeHead(201, { Location: `friends/${friendId}` });
                    res.end(JSON.stringify(savedFriend));
                }));
            }
            else if (req.method === "GET") {
                const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
                const friendId = parsedUrl.pathname.split("/")[2];
                const friend = new Friend_1.Friend(friendId);
                const retrievedFriend = yield friend.getById();
                if (retrievedFriend) {
                    res.writeHead(200);
                    res.end(JSON.stringify(retrievedFriend));
                }
                else {
                    res.writeHead(404);
                    res.end();
                }
                res.end();
            }
        });
    }
}
exports.FriendController = FriendController;
//# sourceMappingURL=controller.js.map