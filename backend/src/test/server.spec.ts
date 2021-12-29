import assert from "assert";
import fetch from "node-fetch";

describe("Nodejs server", () => {
  it('should return "Hello World"', async() => {
    const response = await fetch("http://localhost:8000");
    const serverMsg = await response.text();
    assert.strictEqual(serverMsg, "Hello World");
  });
});
