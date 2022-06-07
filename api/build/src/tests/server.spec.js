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
const assert_1 = __importDefault(require("assert"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const mocha_1 = require("mocha");
mocha_1.describe("Nodejs server", () => {
    mocha_1.it('should return "Welcome to FriendPots!"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield node_fetch_1.default("http://localhost:8000");
        const serverMsg = yield response.text();
        assert_1.default.strictEqual(serverMsg, "Welcome to FriendPots!");
    }));
});
//# sourceMappingURL=server.spec.js.map