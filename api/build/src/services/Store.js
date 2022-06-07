"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const fs_1 = __importDefault(require("fs"));
class Store {
    read(path, id) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const allItems = JSON.parse(data);
                    const itemToRetrieve = allItems.find((item) => item.id === id);
                    resolve(itemToRetrieve);
                }
            });
        });
    }
    write(path, itemToStore) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const allItems = JSON.parse(data);
                    allItems.push(itemToStore);
                    const allItemsJson = JSON.stringify(allItems);
                    fs_1.default.writeFileSync(path, allItemsJson);
                }
                resolve(itemToStore);
            });
        });
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map