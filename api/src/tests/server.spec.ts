import assert from "assert";
import fetch from "node-fetch";
import { describe, it } from "mocha"

describe("Request to root page", () => {
  it('should return "Welcome to FriendPots!"', async() => {
    const response = await fetch("http://localhost:8000");
    const serverMsg = await response.text();
    assert.strictEqual(serverMsg, "Welcome to FriendPots!");
  });
});
