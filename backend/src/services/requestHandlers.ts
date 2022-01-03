import { IncomingMessage, ServerResponse } from 'http';

type GetCallback<T> = {
    (req: IncomingMessage, reqUrl: URL): Promise<T>;
};

type PostCallback<T> = {
    (postedData: T): Promise<T>;
};

export function postHandler<T>(
    req: IncomingMessage,
    res: ServerResponse,
    callback: PostCallback<T>
) {
    req.setEncoding("utf8");
    let data = "";
    req.on("data", (chunk: string) => {
        data += chunk;
    });
    req.on("end", async () => {
        const postedData = JSON.parse(data) as T;
        const postResponse = await callback(postedData);
        res.end(JSON.stringify(postResponse));
    });
}

export async function getHandler<T>(
    req: IncomingMessage,
    res: ServerResponse,
    reqUrl: URL,
    callback: GetCallback<T>
) {
    const getResponse = await callback(req, reqUrl);
    if (getResponse) {
        res.writeHead(200);
        res.end(JSON.stringify(getResponse));
    } else {
        res.writeHead(404);
        res.end();
    }
    res.end();
}

export function noResponse(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
}
