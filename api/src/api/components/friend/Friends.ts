import { Store } from '../../../Store';
import { Friend } from './Friend';

export class Friends {
    save(friend: Friend): Promise<Friend> {
        const friendStorePath = "./api/store/friends.json";

        const store = new Store();
        return store.write<Friend>(friendStorePath, friend);
    }
}
