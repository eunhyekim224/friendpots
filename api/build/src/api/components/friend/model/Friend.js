"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friend = void 0;
const Store_1 = require("../../../../services/Store");
class Friend {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    save(friend) {
        const friendStorePath = "./api/store/friends.json";
        const store = new Store_1.Store();
        return store.write(friendStorePath, friend);
    }
    getById() {
        const friendStorePath = "./api/store/friends.json";
        const store = new Store_1.Store();
        return store.read(friendStorePath, this.id);
    }
}
exports.Friend = Friend;
//# sourceMappingURL=Friend.js.map