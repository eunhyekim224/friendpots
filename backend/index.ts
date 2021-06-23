import http from "http";

const hostname = "127.0.0.1";
const port = 8000;

// functio

const server = http.createServer((req, res) => {
    res.end()
});

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
