import fs from "fs";
import { IncomingMessage } from 'http';
import { Friend, FriendDTO } from '../models/Friend';
import { Friends } from '../models/Friends';


export function createNewFriend(friendData: FriendDTO): Promise<Friend> {
  const newFriend = new Friends().create(friendData.name);

  // store friend to a file
  return new Promise((resolve) => {
    fs.readFile("store/friends.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const allFriends = JSON.parse(data);
        allFriends.push(newFriend);

        const allFriendsJson = JSON.stringify(allFriends);
        fs.writeFileSync("store/friends.json", allFriendsJson);
      }
    });
    resolve(newFriend);
  });
}

export function getFriend(req: IncomingMessage, reqUrl: URL): Promise<Friend> {
  const friendId = reqUrl.pathname.split("/")[2];
  console.log(friendId, "friendId");

  return new Promise((resolve, reject) => {
    fs.readFile("store/friends.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const allFriends = JSON.parse(data);
        const friendToRetrieve = allFriends.find(
          (friend: Friend) => friend.id === friendId
        );

        resolve(friendToRetrieve);
      }
    });
  });
}
