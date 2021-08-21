import assert from "assert";
import fetch from "node-fetch";

type Friend = {
    id?: string,
    name: string
}

describe("Friend", () => {
  describe("Request to create a new friend", () => {
    it("should create a new friend", async () => {

        const testFriendDto: Friend = { name: "New Test Friend" };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(testFriendDto),
            headers: { 'Content-Type': 'application/json' }
        }
        const createNewFriendResponse = await fetch("http://localhost:8000/friends", requestOptions);
        const testFriend = await createNewFriendResponse.json();
      
        // Make a request to get the created friend to check it's there
        const friendResponse = await fetch(`http://localhost:8000/friends/${testFriend.id}`);
        const createdFriend = await friendResponse.json();

        console.log(testFriend, createdFriend)
        assert.deepStrictEqual(testFriend, createdFriend)
    });
  });
});
