import fetch from "node-fetch";
import { describe, it } from 'mocha';
import assert from 'assert';

type Friend = {
    id?: string,
    name: string
}

describe("Friend", () => {
  describe("Request to create a new friend", () => {
    it("should create a new friend", async () => {

        // Arrange
        const testFriendDto: Friend = { name: "New Test Friend" };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(testFriendDto),
            headers: { 'Content-Type': 'application/json' }
        }

        // Act
        const createNewFriendResponse = await fetch("http://localhost:8000/friends", requestOptions);
        const testFriend = await createNewFriendResponse.json();
      
        const getFriendResponse = await fetch(`http://localhost:8000/friends/${testFriend.id}`);
        const createdFriend = await getFriendResponse.json();

        // Assert
        const postFriendIsSuccessful = createNewFriendResponse.status === 201;
        const getFriendIsSuccessful = getFriendResponse.status === 200;

        assert.strictEqual(getFriendIsSuccessful, true);
        assert.strictEqual(postFriendIsSuccessful, true);

        assert.deepStrictEqual(testFriend, createdFriend)
    });
  });
});
