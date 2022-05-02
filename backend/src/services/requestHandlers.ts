import { IncomingMessage, ServerResponse } from "http";

export function requestBody<T>(req: IncomingMessage): T | void {
    req.setEncoding("utf8");
    let data = "";
    req.on("data", (chunk: string) => {
        data += chunk;
    });
    req.on("end", async () => {
        return JSON.parse(data) as T;
    });
}
