const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require("koa-router");
const cors = require("@koa/cors");

const PORT = 3000;

const app = new Koa();
app.use(koaBody());
app.use(cors());

const pub = new Router();

pub.post("/api/points", async (ctx) => {
  
  let { points } = ctx.request.body;
  if (!points) ctx.throw(400, "NO points");
  let pointsArr = sortedArray(points);
  ctx.body = { info: "ok", pointsArr };
});

/* Не совсем понятно, как на стороне сервера просортировать точки, чтобы они в спираль превратились
 * 
 * 
 */

pub.post("/api/spiral", async (ctx) => {
  
  let { points } = ctx.request.body;
  if (!points) ctx.throw(400, "NO points");
  
  ctx.body = { info: "ok" };
});

app.use(pub.routes()).use(pub.allowedMethods());
app.listen(PORT);
console.log(`localhost:${PORT}`);

function sortedArray(arr) {
  arr.sort(function (a, b) {
    return a.x - b.x;
  });
  return arr;
}
