import { Store } from "../../../Store";

export class Friend {
    id;
    name;

    constructor(id: string, name?: string) {
        this.id = id;
        this.name = name;
    }

    save(friend: Friend): Promise<Friend> {
        const friendStorePath = "./backend/store/friends.json";

        const store = new Store();
        return store.write<Friend>(friendStorePath, friend);
    }

    getById(): Promise<Friend> {
        const friendStorePath = "./backend/store/friends.json";

        const store = new Store();
        return store.read<Friend>(friendStorePath, this.id);
    }
}
