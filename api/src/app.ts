import http from "http";
import { handler } from './api/routes';
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.PORT as string);

const server = http.createServer(handler);

server.listen(port, () => {
    console.log(`Server running on ${port}`);
});
