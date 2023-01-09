import { Store } from "../Store";
import { Friend } from "./Friend";

export class Friends {
    friendStorePath = "C:/Users/kimeu/AppData/Local/FriendPots/friends.json";

    store = new Store<Friend>(this.friendStorePath);

    save(friend: Friend): Promise<Friend> {
        return this.store.write(friend);
    }

    update(friend:Friend): Promise<Friend> {
        return this.store.update(friend);
    }

    async getById(id: string): Promise<Friend> {
        const savedFriend = await this.store.read(id);

        const friend = new Friend(
            id,
            savedFriend.userId,
            savedFriend.name,
            savedFriend.hardiness,
            savedFriend.dateOfFullHealth,
            savedFriend.state,
        );

        const newState = await friend.currentState();

        return new Friend(
            id,
            savedFriend.userId,
            savedFriend.name,
            savedFriend.hardiness,
            savedFriend.dateOfFullHealth,
            newState
        );
    }

    async getAllBy(userId: string): Promise<Friend[]> {
        const savedFriends = await this.store.readByUser(userId);

        const savedFriendsPromises = savedFriends.map(async friend => {
            const friendObj = new Friend(
                friend.id,
                friend.userId,
                friend.name,
                friend.hardiness,
                friend.dateOfFullHealth,
                friend.state
            );

            const newState = await friendObj.currentState();

            return new Friend(
                friend.id,
                friend.userId,
                friend.name,
                friend.hardiness,
                friend.dateOfFullHealth,
                newState,
            );
        })

        return await Promise.all(savedFriendsPromises);
    }
}
