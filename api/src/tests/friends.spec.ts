import fetch from "node-fetch";
import { describe, it } from "mocha";
import assert from "assert";

type FriendDTO = {
    name: string;
};

describe("Friends", () => {
    describe("Request to create a new friend", () => {
        it("should create a new friend", async () => {
            // Arrange
            const testFriendDto: FriendDTO = { name: "New Test Friend" };

            const requestOptions = {
                method: "POST",
                body: JSON.stringify(testFriendDto),
                headers: { "Content-Type": "application/json" },
            };

            // Act
            const createNewFriendResponse = await fetch(
                "http://localhost:8000/friends",
                requestOptions
            );
            const testFriend = await createNewFriendResponse.json();

            const getFriendResponse = await fetch(
                `http://localhost:8000/${createNewFriendResponse.headers.get(
                    "Location"
                )}`
            );

            console.log('location', createNewFriendResponse.headers.get('Location'))

            const createdFriend = await getFriendResponse.json();

            // Assert
            const postFriendIsSuccessful =
                createNewFriendResponse.status === 201;
            const getFriendIsSuccessful = getFriendResponse.status === 200;

            assert.strictEqual(postFriendIsSuccessful, true);

            assert.strictEqual(getFriendIsSuccessful, true);

            assert.deepStrictEqual(testFriend, createdFriend);
        }); 
    });
});
