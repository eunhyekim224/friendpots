"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestBody = void 0;
function requestBody(req) {
    req.setEncoding("utf8");
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
            resolve(data);
        });
        req.on("error", (err) => {
            reject(err.message);
        });
    });
}
exports.requestBody = requestBody;
//# sourceMappingURL=requestHandlers.js.map