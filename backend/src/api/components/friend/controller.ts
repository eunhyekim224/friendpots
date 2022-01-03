import { IncomingMessage } from "http";
import { Friend } from "./model/Friend";
import { Friends } from "./model/Friends";
import { Store } from "../../../../store/Store";

export class FriendController {
    friendStorePath = "./backend/store/friends.json";

    createNewFriend(friendData: FriendDTO): Promise<Friend> {
        const newFriend = new Friends().create(friendData.name);

        const store = new Store();
        return store.write<Friend>(this.friendStorePath, newFriend);
    }

    getFriend(req: IncomingMessage, reqUrl: URL): Promise<Friend> {
        const friendId = reqUrl.pathname.split("/")[2];

        const store = new Store();
        return store.read<Friend>(this.friendStorePath, friendId);
    }
}

export type FriendDTO = {
    name: string;
};
