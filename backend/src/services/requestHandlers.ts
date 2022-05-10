import { IncomingMessage, ServerResponse } from "http";

export function requestBody(req: IncomingMessage): Promise<string> {
    req.setEncoding("utf8");

    return new Promise((resolve, reject) => {
        let data = "";

        req.on("data", (chunk: string) => {
            data += chunk;
            resolve(data);
        });

        req.on("error", (err) => {
            reject(err.message)
        })
    });
}
