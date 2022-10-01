import path, { dirname } from "path";
import { Store } from "../Store";
import { Friend } from "./Friend";

export class Friends {
    friendStorePath = __dirname + `/../../store/friends.json`;

    store = new Store<Friend>(this.friendStorePath);

    save(friend: Friend): Promise<Friend> {
        return this.store.write(friend);
    }

    getById(id: string): Promise<Friend> {
        return this.store.read(id);
    }
}
