import { Friend } from '../friend/Friend';
import { Friends } from '../friend/Friends';
import { Store } from '../Store';
import { User } from './User';

export class Users {
    userStorePath = __dirname + `/../../store/users.json`;

    store = new Store<User>(this.userStorePath);
    friends = new Friends();

    save(user: User): Promise<User> {
        return this.store.write(user);
    }

    getById(id: string): Promise<User> {
        return this.store.read(id);
    }
}