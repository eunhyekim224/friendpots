import { IncomingMessage } from "http";
import { Store } from "../../../../services/Store";
import { FriendDTO } from "../controller";
import { Friends } from "./Friends";
import { v4 } from "uuid";

export class Friend {
    id;
    name;

    constructor(id: string, name = "") {
        this.id = id;
        this.name = name;
    }

    save(friend: Friend): Promise<Friend> {
        const friendStorePath = "../../../../../store/friends.json";

        const store = new Store();
        return store.write<Friend>(friendStorePath, friend);
    }

    getById(req: IncomingMessage, reqUrl: URL): Promise<Friend> {
        const friendStorePath = "../../../../../store/friends.json";

        const store = new Store();
        return store.read<Friend>(friendStorePath, this.id);
    }
}

export class FriendFactory {
    friendDTO;

    constructor(friendDTO: FriendDTO) {
        this.friendDTO = friendDTO;
    }

    create() {
        return new Friend(v4(), this.friendDTO.name);
    }
}
