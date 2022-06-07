"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const mocha_1 = require("mocha");
const assert_1 = __importDefault(require("assert"));
mocha_1.describe("Friend", () => {
    mocha_1.describe("Request to create a new friend", () => {
        mocha_1.it("should create a new friend", () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const testFriendDto = { name: "New Test Friend" };
            const requestOptions = {
                method: "POST",
                body: JSON.stringify(testFriendDto),
                headers: { "Content-Type": "application/json" },
            };
            // Act
            const createNewFriendResponse = yield node_fetch_1.default("http://localhost:8000/friends", requestOptions);
            const testFriend = yield createNewFriendResponse.json();
            const getFriendResponse = yield node_fetch_1.default(`http://localhost:8000/${createNewFriendResponse.headers.get("Location")}`);
            const createdFriend = yield getFriendResponse.json();
            // Assert
            const postFriendIsSuccessful = createNewFriendResponse.status === 201;
            const getFriendIsSuccessful = getFriendResponse.status === 200;
            assert_1.default.strictEqual(postFriendIsSuccessful, true);
            assert_1.default.strictEqual(getFriendIsSuccessful, true);
            assert_1.default.deepStrictEqual(testFriend, createdFriend);
        }));
    });
});
//# sourceMappingURL=friends.spec.js.map