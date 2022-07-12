import Router from "koa-router";
import { getEvents, postEvent } from "./controllers/events.controllers";

const router = new Router();

router.get("/events_list", getEvents);
router.post("/post_event", postEvent);

export default router;
