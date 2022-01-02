import { IncomingMessage } from 'http';
import { Friend } from './model/Friend';
import { Friends } from './model/Friends';
import fs from "fs";

export class FriendController {

    createNewFriend(friendData: FriendDTO): Promise<Friend> {
        const newFriend = new Friends().create(friendData.name);

        // store friend to a file
        return new Promise((resolve, reject) => {
            fs.readFile("./backend/store/friends.json", "utf8", (err, data) => {
                if (err) {
                    throw err;
                } else {
                    const allFriends = JSON.parse(data);
                    allFriends.push(newFriend);

                    const allFriendsJson = JSON.stringify(allFriends);
                    fs.writeFileSync("./backend/store/friends.json", allFriendsJson);
                }
            });
            resolve(newFriend);
        });
    }

    getFriend(req: IncomingMessage, reqUrl: URL): Promise<Friend> {
        const friendId = reqUrl.pathname.split("/")[2];
        
        return new Promise((resolve, reject) => {
            fs.readFile("./backend/store/friends.json", "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const allFriends = JSON.parse(data);
                    const friendToRetrieve = allFriends.find(
                        (friend: Friend) => friend.id === friendId
                    );
                    console.log("FRIEND", friendToRetrieve);
                    resolve(friendToRetrieve);
                }
            });
        });
    }
}

export type FriendDTO = {
    name: string;
};