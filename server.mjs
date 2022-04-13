import http from "http";
import fs from "fs";
import mime from "mime";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const clientRoot = new URL("./dist/client/", import.meta.url);

http
  .createServer(async (req, res) => {
    let local = new URL("." + req.url, clientRoot);
    try {
      const data = await fs.promises.readFile(local);
      res.writeHead(200, {
        "Content-Type": mime.getType(req.url),
      });
      res.end(data);
    } catch {
      //res.writeHead(404);
      //res.end();
      ssrHandler(req, res, (err) => {
        if (err) {
          res.writeHead(500);
          res.end(err.toString());
        } else {
          // Serve your static assets here maybe?
          // 404?
          res.writeHead(404);
          res.end();
        }
      });
    }
  })
  .listen(8080);
