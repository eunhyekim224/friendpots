import fetch from "node-fetch";
import { describe, it } from "mocha";
import assert from "assert";
import { v4 as uuidv4 } from "uuid";

type FriendDTO = {
    userId: string;
    name: string;
};

describe("Friends", () => {
    describe("Request to create a new friend", () => {
        it("should create a new friend", async () => {
            // Arrange
            const testFriendDto: FriendDTO = {
                userId: `${uuidv4()}@gmail.com}`,
                name: "New Test Friend",
            };

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

            const getFriendsResponse = await fetch(
                `http://localhost:8000/friends?userId=${testFriendDto.userId}`
            );

            const friends = await getFriendsResponse.json();

            // Assert
            const postFriendIsSuccessful =
                createNewFriendResponse.status === 201;
            const getFriendIsSuccessful = getFriendsResponse.status === 200;

            assert.strictEqual(postFriendIsSuccessful, true);

            assert.strictEqual(getFriendIsSuccessful, true);

            assert.deepStrictEqual(testFriend, friends[0]);
        });
    });
});
