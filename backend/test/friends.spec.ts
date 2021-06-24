import assert from "assert";
import fetch from "node-fetch";

type Friend = {
    id?: string,
    name: string
}

describe("Friend", () => {
  describe("Request to create a new friend", () => {
    it("should create a new friend with a name and ID", async () => {

        const newFriend: Friend = { name: "New Friend" };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(newFriend),
            headers: { 'Content-Type': 'application/json' }
        }
        const createNewFriendResponse = await fetch("http://localhost:8000/friend", requestOptions);
        console.log(createNewFriendResponse)
        const { id: newFriendId } = await createNewFriendResponse.json();
        
        // Make a request to get the newly created friend

        const friendResponse = await fetch(`http://localhost:8000/friend/${newFriendId}`);
        const friend = await friendResponse.json();

        assert.strictEqual(friend.name, newFriend.name)
    });
  });
});

// function checkStatus(res) {
//     if (res.ok) { // res.status >= 200 && res.status < 300
//         return res;
//     } else {
//         throw MyCustomError(res.statusText);
//     }
// }
 