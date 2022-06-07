"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friends = void 0;
const Friend_1 = require("./Friend");
const uuid_1 = require("uuid");
class Friends {
    create(name) {
        return new Friend_1.Friend(uuid_1.v4(), name);
    }
}
exports.Friends = Friends;
//# sourceMappingURL=Friends.js.map