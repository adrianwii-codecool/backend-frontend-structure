import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url'
import mediaTypes from "./media-types.js"

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const errorHTML = path.resolve(__dirname + '/../frontend/error.html');



function htmlResponse(filePath, res, statusCode) {
    fs.readFile(filePath, "binary", (err, data) => {
        if(err) {
            return htmlResponse(errorHTML, res, 404);
        }
        const extension = filePath.split('.');
        res.writeHead(statusCode, {'Content-type': mediaTypes[extension.pop()]});
        res.write(data, "binary");
        res.end();
    });
}

const server = http.createServer((req, res) => {
    let filePath = path.resolve(__dirname + '/../frontend' + req.url);

    fs.access(filePath, (err) => {
        if(err) {
            return htmlResponse(errorHTML, res, 500);
        }

        if(fs.statSync(filePath).isDirectory()) {
            filePath = filePath + '/index.html';
        }

        htmlResponse(filePath, res, 200);
    })
});

server.listen(9001, "127.0.0.1", () => {
    const addr = server.address();
    console.log(`http://${addr.address}:${addr.port}`);
})