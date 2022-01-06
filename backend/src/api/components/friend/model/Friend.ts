import { IncomingMessage } from 'http';
import { Store } from '../../../../services/Store';
import { FriendDTO } from '../controller';
import { Friends } from './Friends';

export class Friend {
    id;
    name;

    friendStorePath = "./backend/store/friends.json";

    constructor(id: string, name: string) {
        this.name = name;
        this.id = id;
    }

    createNewFriend(friendData: FriendDTO): Promise<Friend> {
        const newFriend =new Friends().create(friendData.name);
 
        const store = new Store();
        return store.write<Friend>(this.friendStorePath, newFriend);
    }

    getFriend(req: IncomingMessage, reqUrl: URL): Promise<Friend> {
        const friendId = reqUrl.pathname.split("/")[2];

        const store = new Store();
        return store.read<Friend>(this.friendStorePath, friendId);
    }
}
