import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import router from "./router";

const App = new Koa();
const port = 8000;

App.use(parser())
  .use(cors())
  .use(router.routes());

App.listen(port, () => {
  console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
});