import * as http from 'http';
import mediaTypes from "./media-types.js"

console.log(mediaTypes);

const server = http.createServer((req, res) => {

});

server.listen(9001, "127.0.0.1", () => {
    const addr = server.address();
    console.log(`http://${addr.address}:${addr.port}`);
})