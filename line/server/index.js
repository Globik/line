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

pub.post("/api/spiral", async (ctx) => {
  let { points } = ctx.request.body;
  if (!points) ctx.throw(400, "NO points");
  let data = spiral(points);
  ctx.body = { info: "ok", arr: data.arr, n: data.n, m: data.m };
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

function spiral(points) {
  let len = Math.round(Math.sqrt(points.length));
  
  let array = [];
  n = len;
  m = len;
  let s = m * n;
  for (let i = 0; i < len; i++) {
    array[i] = [];
    for (let k = 0; k < len; k++) array[i][k] = [0];
  }

  for (let y = 0; y < n; y++) {
    array[0][y] = points[s - 1].x;
    s--;
  }
  for (let x = 1; x < m; x++) {
    array[x][n - 1] = points[s - 1].x;
    s--;
  }
  for (let y = n - 2; y >= 0; y--) {
    array[m - 1][y] = points[s - 1].x;
    s--;
  }
  for (let x = m - 2; x > 0; x--) {
    array[x][0] = points[s - 1].x;
    s--;
  }

  for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
      if (array[x][y] == 0) {
        array[x][y] = points[s - 1].x;
      }
    }
  }
  return {arr: array, m: m, n: n}
}
