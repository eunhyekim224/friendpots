"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friends = void 0;
const Store_1 = require("../../../Store");
class Friends {
    save(friend) {
        const friendStorePath = "./api/store/friends.json";
        const store = new Store_1.Store();
        return store.write(friendStorePath, friend);
    }
}
exports.Friends = Friends;
//# sourceMappingURL=Friends.js.map