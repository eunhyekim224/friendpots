import { IncomingMessage, ServerResponse } from "http";
import { Friend, FriendState } from "./Friend";
import { v4 } from "uuid";
import { requestBody } from "../requestHandling/requestHandlers";
import { Friends } from "./Friends";
import { Users } from "../user/Users";

export class FriendController {
    async handleRequest(req: IncomingMessage, res: ServerResponse) {
        const parsedUrl = new URL(
            req.url as string,
            `http://${req.headers.host}`
        );

        if (req.method === "POST") {
            const action = parsedUrl.pathname.split("/")[3];

            if (action) {
                const friendId = parsedUrl.pathname.split("/")[2];
                const friends = new Friends();

                switch (action) {
                    case "water":
                        if (friendId) {
                            const friend = await friends.getBy(friendId);

                            await friend.water();

                            res.end(JSON.stringify(friend));
                        }
                        break;
                    case "archive":
                        if (friendId) {
                            const friend = await friends.getBy(friendId);

                            await friend.archive();

                            res.writeHead(200);
                            res.end();
                        }
                        break;
                    default:
                        res.writeHead(404);
                        res.end();
                }
            } else {
                const requestData = await requestBody(req);

                req.on("end", async () => {
                    const friendDTO = JSON.parse(requestData) as FriendDTO;

                    const friendId = v4();
                    const currentDate = new Date().toISOString();
                    const currentState = FriendState.HEALTHY;

                    const friend = new Friend(
                        friendId,
                        friendDTO.userId,
                        friendDTO.name,
                        friendDTO.careLevel,
                        currentDate,
                        currentState,
                    );

                    const friends = new Friends();

                    const savedFriend = await friends.save(friend);

                    res.writeHead(201, {
                        Location: `/friends/${friendId}`,
                    });
                    res.end(JSON.stringify(savedFriend));
                });
            }
        } else if (req.method === "GET") {
            const parsedUrl = new URL(
                req.url as string,
                `http://${req.headers.host}`
            );

            const userId = parsedUrl.searchParams.get("userId");
            const friendId = parsedUrl.pathname.split("/")[2];

            let friendData;
            const friends = new Friends();

            if (userId) {
                friendData = await friends.getAllBy(userId);
            }

            if (friendId) {
                friendData = await friends.getBy(friendId);
            }

            if (friendData) {
                res.writeHead(200);
                res.end(JSON.stringify(friendData));
            } else {
                res.writeHead(404);
                res.end();
            }
            res.end();
        }
    }
}

export type FriendDTO = {
    name: string;
    userId: string;
    careLevel: string;
};
