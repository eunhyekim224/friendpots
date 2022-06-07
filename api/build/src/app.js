"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const routes_1 = require("./api/routes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
const server = http_1.default.createServer(routes_1.handler);
server.listen(port, () => {
    console.log(`Server running on ${port}`);
});
//# sourceMappingURL=app.js.map